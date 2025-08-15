import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, ProcessedFile, FileCategory } from '../types';
import { MessageItem } from './MessageItem';
import FileUploadArea from './FileUploadArea';
import { PaperAirplaneIcon, PaperClipIcon, XCircleIcon, StopIcon } from './icons';
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (prompt: string, file: ProcessedFile | null) => void;
  isSending: boolean;
  onCancelRequest: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isSending, onCancelRequest }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<ProcessedFile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleFileAttached = (file: ProcessedFile | null) => {
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
        alert(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        setAttachedFile(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
        return;
    }
    setAttachedFile(file);
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = useCallback(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput && !attachedFile) return;

    onSendMessage(trimmedInput, attachedFile);
    
    setInputValue('');
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textAreaRef.current) textAreaRef.current.style.height = 'auto';

  }, [inputValue, attachedFile, onSendMessage]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-800/50">
      {/* Message Area */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-slate-800/70 border-t border-slate-700/50">
        <div className="flex flex-row items-end bg-slate-700/80 rounded-2xl w-full p-2 shadow-md focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow duration-200">
          <FileUploadArea onFileSelected={handleFileAttached} ref={fileInputRef}>
            <button className="flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSending}>
              <PaperClipIcon className="w-6 h-6" />
            </button>
          </FileUploadArea>
          <div className="flex-grow mx-2 flex flex-col">
            {attachedFile && (
              <div className="mb-2 px-3 py-1.5 bg-slate-600 rounded-lg text-sm text-gray-200 flex items-center justify-between animate-in fade-in-50">
                <span className="truncate max-w-xs md:max-w-sm lg:max-w-md flex items-center">
                  {attachedFile.type === FileCategory.IMAGE && attachedFile.previewUrl && (
                    <img src={attachedFile.previewUrl} alt="preview" className="h-6 w-6 inline-block mr-2 rounded object-cover"/>
                  )}
                  {attachedFile.name} 
                  <span className="text-gray-400 ml-2 text-xs">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                </span>
                <button onClick={removeAttachedFile} className="ml-2 text-gray-400 hover:text-red-400">
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
            )}
            <textarea
              ref={textAreaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={isSending ? "Generating response..." : "Type your question..."}
              className="w-full border-none focus:outline-none focus:ring-0 bg-transparent text-gray-200 placeholder-gray-400 p-2 resize-none custom-scrollbar"
              rows={1}
              style={{ maxHeight: '120px' }}
              disabled={isSending}
            />
          </div>
          <div className="ml-2">
            {isSending ? (
               <button
                  onClick={onCancelRequest}
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-xl text-white p-3 flex-shrink-0 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  aria-label="Cancel request"
                >
                  <StopIcon className="w-5 h-5" />
                </button>
            ) : (
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() && !attachedFile}
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white p-3 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;