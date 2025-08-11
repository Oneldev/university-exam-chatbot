
import React from 'react';
import { KnowledgeBaseItem } from '../types';
import { BookOpenIcon, TagIcon, DocumentMagnifyingGlassIcon } from './icons';

interface KnowledgeBasePanelProps {
  items: KnowledgeBaseItem[];
}

const KnowledgeBasePanel: React.FC<KnowledgeBasePanelProps> = ({ items }) => {
  return (
    <div className="mt-8 pt-4 border-t border-slate-700 flex-shrink-0">
      <div className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">Knowledge Base Snippets</div>
      {items && items.length > 0 ? (
        <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
          {items.map((item) => (
            <li key={item.id} className="p-2.5 bg-slate-700 rounded-lg shadow hover:bg-slate-600 transition-colors cursor-pointer group">
              <div className="flex items-center text-sm text-gray-300 group-hover:text-white mb-1">
                <DocumentMagnifyingGlassIcon className="w-4 h-4 mr-2 flex-shrink-0 text-indigo-400" />
                <span className="font-medium truncate">{item.question}</span>
              </div>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed truncate">{item.answerSnippet}</p>
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-500 group-hover:text-indigo-300">
                  <BookOpenIcon className="w-3 h-3 mr-1" />
                  <span>{item.sourceDocument}</span>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center text-gray-500 group-hover:text-teal-400">
                    <TagIcon className="w-3 h-3 mr-1" />
                    <span>{item.tags.join(', ')}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 px-2">No knowledge base items loaded.</p>
      )}
       <button className="mt-4 w-full text-sm bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded-lg transition-colors">
        Manage Knowledge Base
      </button>
    </div>
  );
};

export default KnowledgeBasePanel;
