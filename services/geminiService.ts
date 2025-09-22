
import { GoogleGenAI, GenerateContentResponse, Part, GroundingChunk, Content } from "@google/genai";
import { ProcessedFile, FileCategory, GroundingSource, ChatMessage } from '../types';
import { GEMINI_TEXT_MODEL, SYSTEM_INSTRUCTION } from '../constants';

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY for GoogleGenAI is not set. AI features will be mocked or disabled.");
}

export interface BotResponse {
  text: string;
  groundingSources?: GroundingSource[];
}


export const sendMessageToBot = (prompt: string, file: ProcessedFile | null, history: ChatMessage[], signal: AbortSignal): Promise<BotResponse> => {
  if (signal.aborted) {
    return Promise.reject(new DOMException('Request aborted by user', 'AbortError'));
  }

  return new Promise<BotResponse>((resolve, reject) => {
    const onAbort = () => {
      cleanup();
      reject(new DOMException('Request aborted by user', 'AbortError'));
    };

    const cleanup = () => {
      signal.removeEventListener('abort', onAbort);
    };

    signal.addEventListener('abort', onAbort);

    const execute = async () => {
      try {
        if (!ai) {
          let mockText = `Mock response for: "${prompt}"`;
          if (file) {
            mockText += `\nFile attached: ${file.name} (${file.type}, ${file.mimeType}, ${(file.size / 1024).toFixed(1)} KB).`;
            if (file.type === FileCategory.IMAGE) {
              mockText += "\n(Image content would be analyzed here)";
            } else if (file.type === FileCategory.DOCUMENT) {
               if (file.content && (file.mimeType === 'application/pdf' || file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
                  mockText += `\n(Document content extracted: "${file.content.substring(0,100)}...")`;
               } else {
                  mockText += "\n(Document content would be processed and used for context here)";
               }
            } else if (file.type === FileCategory.TEXT) {
              mockText += `\n(Text file content: "${file.content.substring(0,100)}...")`;
            }
          }
          if (history.length > 0) {
            mockText += `\n(Considering history of ${history.filter(m => m.sender !== 'system').length} messages).`;
          }
          mockText += `\n\nNote: Google AI API key not configured. This is a simulated response.\n\n**Example Formatting:**\n* This is a list item.\n* So is this.\n\n\`\`\`javascript\n// Here is a code block\nconsole.log("Hello, world!");\n\`\`\``;
          await new Promise(res => setTimeout(res, 1500)); 
          if (signal.aborted) return;
          resolve({ text: mockText });
          return;
        }

        const model = ai.models;
        
        // Build chat history from previous messages, including images
        const contentsHistory: Content[] = history
            .filter(msg => (msg.sender === 'user' || msg.sender === 'bot') && !msg.isLoading && !msg.error)
            .map(msg => {
                const parts: Part[] = [];
                if (msg.text) {
                    parts.push({ text: msg.text });
                }
                if (msg.fileInfo && msg.fileInfo.content && msg.fileInfo.type.startsWith('image/')) {
                    const base64Data = msg.fileInfo.content.split(',')[1];
                    if (base64Data) {
                        parts.push({
                          inlineData: {
                            mimeType: msg.fileInfo.type,
                            data: base64Data,
                          },
                        });
                    }
                }
                return ({
                    role: msg.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
                    parts,
                });
            })
            .filter(content => content.parts.length > 0);

        // Create parts for the current message
        const currentParts: Part[] = [];
        if (file) {
          if (file.type === FileCategory.IMAGE && file.content.startsWith('data:image')) {
            const base64Data = file.content.split(',')[1];
            currentParts.push({
              inlineData: {
                mimeType: file.mimeType,
                data: base64Data,
              },
            });
          } else if (file.type === FileCategory.TEXT && file.content) {
            currentParts.push({ text: `Context from uploaded text file (${file.name}):\n${file.content}` });
          } else if (file.type === FileCategory.DOCUMENT && file.content) {
            currentParts.push({ text: `Context from the uploaded document "${file.name}":\n${file.content}` });
          }
        }

        let effectivePrompt = prompt;
        if (!effectivePrompt && file) {
            effectivePrompt = "Analyze the provided attachment, taking our conversation history into account.";
        }
        
        if (effectivePrompt) {
            currentParts.push({ text: effectivePrompt });
        }

        const finalContents: Content[] = [...contentsHistory];
        if (currentParts.length > 0) {
            finalContents.push({ role: 'user', parts: currentParts });
        }
        
        // Ensure we're not sending an empty request or a request that doesn't end with a user turn
        if (finalContents.length === 0 || finalContents[finalContents.length - 1].role !== 'user') {
            resolve({ text: "Please provide a new prompt to continue." });
            return;
        }

        const response: GenerateContentResponse = await model.generateContent({
          model: GEMINI_TEXT_MODEL,
          contents: finalContents, 
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        if (signal.aborted) return;

        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        let groundingSources: GroundingSource[] | undefined;

        if (groundingMetadata?.groundingChunks && groundingMetadata.groundingChunks.length > 0) {
            groundingSources = groundingMetadata.groundingChunks
                .filter((chunk: GroundingChunk) => chunk.web && chunk.web.uri && chunk.web.title)
                .map((chunk: GroundingChunk) => ({
                    uri: chunk.web!.uri!, 
                    title: chunk.web!.title!, 
                }));
        }

        resolve({ text: response.text, groundingSources });

      } catch (error) {
        if (signal.aborted) {
          // Already handled by the abort listener, so we can ignore the error.
          return;
        }
        console.error('Error calling Gemini API:', error);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                reject(error); // Re-throw AbortError so the UI can handle it specifically
                return;
            }
            if (error.message.includes('API key not valid')) {
                reject(new Error("The API key is not valid. Please check your configuration."));
                return;
            }
        }
        reject(new Error(`An error occurred while contacting the AI: ${error instanceof Error ? error.message : String(error)}`));
      } finally {
        cleanup();
      }
    };
    
    execute();
  });
};
