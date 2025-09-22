

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  fileInfo?: {
    name: string;
    type: string; // MIME type
    size: number; // bytes
    previewUrl?: string; // For images, a base64 data URL
    content?: string; // Base64 for images, text for docs
  };
  isLoading?: boolean; // For bot messages that are being generated
  error?: string; // If an error occurred generating this message
  groundingSources?: GroundingSource[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
}

export interface PastConversation {
  id: string;
  title: string;
  lastMessageTimestamp: Date;
  messageCount: number;
}

export interface KnowledgeBaseItem {
  id: string;
  question: string;
  answerSnippet: string; // A short part of the answer
  sourceDocument: string; // e.g., "Exam_Spring_2023.pdf"
  tags: string[];
}

export enum FileCategory {
  IMAGE = 'image',
  DOCUMENT = 'document',
  TEXT = 'text',
  UNKNOWN = 'unknown'
}

export interface ProcessedFile {
  name: string;
  type: FileCategory; // More specific category
  mimeType: string; // Original MIME type
  size: number;
  content: string; // Base64 for images, text for TXT, path/reference for others (or raw File object for backend)
  fileObject: File; // The original File object
  previewUrl?: string; // Data URL for image previews
}
