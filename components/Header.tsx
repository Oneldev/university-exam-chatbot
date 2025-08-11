import React from 'react';
import { MenuIcon, PlusIcon } from './icons';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  chatTitle: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNewChat, chatTitle }) => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between h-16 px-4 bg-slate-900/70 backdrop-blur-sm border-b border-slate-800 z-10">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-full"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-semibold text-gray-200 truncate hidden sm:block">
          {chatTitle}
        </h1>
      </div>
      <div className="flex items-center">
        <button
          onClick={onNewChat}
          className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-full"
          aria-label="New Chat"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
