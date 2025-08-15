import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { UserIcon, SparklesIcon, DocumentTextIcon, PhotoIcon, LinkIcon, CopyIcon, CheckIcon } from './icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeBlock: React.FC<React.PropsWithChildren<any>> = ({ node, ...props }) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!node || !node.children || !node.children.length || node.children[0].tagName !== 'code') {
        return <pre {...props} />;
    }

    const codeNode = node.children[0];
    const codeString = codeNode.children[0]?.value || '';

    const handleCopy = () => {
        if (!codeString) return;
        navigator.clipboard.writeText(codeString).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <div className="relative group">
            <pre {...props} className={`${props.className || ''} p-4`}>
                {props.children}
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800/70 text-gray-300 hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                aria-label="Copy code"
            >
                {isCopied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
            </button>
        </div>
    );
};


export const MessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';

  if (message.sender === 'system') {
    return (
      <div className="text-center py-2 message-animate-in">
        <p className="text-xs text-gray-500 italic bg-slate-700/50 inline-block px-3 py-1 rounded-full">{message.text}</p>
      </div>
    );
  }
  
  const FilePreview: React.FC<{ fileInfo: NonNullable<ChatMessage['fileInfo']> }> = ({ fileInfo }) => (
    <div className={`mt-2 p-2 rounded-lg border text-white ${isUser ? 'bg-indigo-700 border-indigo-500/50' : 'bg-slate-700/50 border-slate-600/50'}`}>
      <div className="flex items-center text-sm">
        {fileInfo.type.startsWith('image/') ? <PhotoIcon className="w-5 h-5 mr-2 flex-shrink-0" /> : <DocumentTextIcon className="w-5 h-5 mr-2 flex-shrink-0" />}
        <div className="flex flex-col min-w-0">
          <span className="truncate font-medium">{fileInfo.name}</span>
          <span className="text-xs text-gray-400">({(fileInfo.size / 1024).toFixed(1)} KB)</span>
        </div>
      </div>
      {fileInfo.previewUrl && fileInfo.type.startsWith('image/') && (
        <img src={fileInfo.previewUrl} alt={fileInfo.name} className="mt-2 rounded-lg max-h-48 w-full object-contain" />
      )}
    </div>
  );

  return (
    <div className={`flex items-end gap-2 message-animate-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${isUser ? 'bg-indigo-500' : 'bg-pink-500'} flex-shrink-0 text-white shadow`}>
          {isUser ? <UserIcon className="w-5 h-5" /> : <SparklesIcon className="w-5 h-5" />}
        </div>
        <div className={`relative flex flex-col w-full ${isUser ? 'max-w-lg' : 'md:max-w-4xl lg:max-w-5xl'} ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`text-base py-2.5 px-4 shadow rounded-2xl ${isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-gray-200 rounded-bl-none'} max-w-full overflow-hidden`}>
            {message.isLoading ? (
              <div className="flex items-center space-x-1 text-sm">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
              </div>
            ) : isUser ? (
               <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
            ) : (
               <div className="prose-chat max-w-none text-gray-200">
                  <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                          pre: CodeBlock
                      }}
                  >
                      {message.text}
                  </ReactMarkdown>
              </div>
            )}
            {message.fileInfo && <FilePreview fileInfo={message.fileInfo} />}
            {message.error && <p className="mt-2 text-xs text-red-300 italic">Error: {message.error}</p>}
          </div>

          {message.groundingSources && message.groundingSources.length > 0 && (
            <div className={`pt-3 text-sm w-full max-w-md`}>
              <p className="text-xs font-semibold text-gray-400 mb-1">Sources:</p>
              <ul className="space-y-1.5">
                {message.groundingSources.map((source, index) => (
                  <li key={index} className="text-xs bg-slate-700/50 p-2 rounded-md hover:bg-slate-700/80 transition-colors">
                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200">
                      <LinkIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{source.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
    </div>
  );
};
