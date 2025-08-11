import React from 'react';
import { PastConversation } from '../types';
import { ChatBubbleLeftEllipsisIcon, PlusIcon, XCircleIcon } from './icons';

interface ChatHistoryPanelProps {
  conversations: (PastConversation & { relativeTime: string })[];
  onSelectConversation: (conversation: PastConversation) => void;
  activeConversationId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const ChatHistoryPanel: React.FC<ChatHistoryPanelProps> = ({ conversations, onSelectConversation, activeConversationId, isOpen, onToggle, onNewChat }) => {
  return (
    <aside className={`fixed z-30 inset-y-0 left-0 flex flex-col w-80 bg-slate-900 border-r border-slate-800 flex-shrink-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex flex-row items-center justify-between h-16 px-4 flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center">
            <div className="flex items-center justify-center rounded-2xl text-indigo-100 bg-indigo-500 h-10 w-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
            </div>
            <div className="ml-3 font-bold text-2xl text-gray-100">ExamBot</div>
          </div>
          <button onClick={onToggle} className="text-gray-500 hover:text-white lg:hidden" aria-label="Close sidebar">
            <XCircleIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <button onClick={onNewChat} className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-100 shadow-lg">
            <PlusIcon className="w-5 h-5 mr-2" />
            New Chat
          </button>
        </div>
        
        <div className="px-2 flex-grow overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-gray-500 uppercase mt-4 mb-2 px-2">Chat History</div>
          {conversations.length > 0 ? (
            <ul className="space-y-1">
              {conversations.map((conv) => (
                <li key={conv.id}>
                  <button
                    onClick={() => onSelectConversation(conv)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg group transition-colors relative
                      ${activeConversationId === conv.id 
                        ? 'bg-indigo-500/20 text-white' 
                        : 'text-gray-400 hover:bg-slate-800 hover:text-gray-200'
                      }`}
                  >
                    {activeConversationId === conv.id && <div className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-full"></div>}
                    <ChatBubbleLeftEllipsisIcon className={`w-5 h-5 mr-3 flex-shrink-0 ${activeConversationId === conv.id ? 'text-indigo-400' : 'text-gray-500 group-hover:text-indigo-400'}`} />
                    <div className="flex flex-col items-start min-w-0 text-left">
                      <span className="text-sm font-medium truncate block max-w-full">{conv.title}</span>
                      <span className={`text-xs truncate block ${activeConversationId === conv.id ? 'text-indigo-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                        {conv.relativeTime}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 px-2 mt-4">No past conversations.</p>
          )}
        </div>
        <div className="p-4 text-center text-xs text-gray-600">
           AI Prep Assistant
        </div>
      </div>
    </aside>
  );
};

export default ChatHistoryPanel;
