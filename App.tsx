import React, { useState, useEffect, useCallback } from 'react';
import ChatInterface from './components/ChatInterface';
import ChatHistoryPanel from './components/ChatHistoryPanel';
import Header from './components/Header';
import { ChatMessage, PastConversation, ProcessedFile } from './types';
import { welcomeMessage } from './constants';
import { sendMessageToBot } from './services/geminiService';

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  return `${diffInDays} days ago`;
};

const App: React.FC = () => {
  const [pastConversationsMeta, setPastConversationsMeta] = useState<PastConversation[]>([]);
  const [allConversationsData, setAllConversationsData] = useState<Record<string, ChatMessage[]>>({});
  const [currentChatMessages, setCurrentChatMessages] = useState<ChatMessage[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const apiKey = process.env.API_KEY;
  const [showApiKeyWarning, setShowApiKeyWarning] = useState<boolean>(!apiKey);

  const startNewChat = useCallback(() => {
    const newConvId = `conv-${Date.now()}`;
    const newWelcomeMessage = { ...welcomeMessage, id: `welcome-${newConvId}` };
    const newConvMeta: PastConversation = {
      id: newConvId,
      title: "New Chat",
      lastMessageTimestamp: new Date(),
      messageCount: 1
    };

    setPastConversationsMeta(prev => [newConvMeta, ...prev.filter(c => c.id !== newConvId)]);
    setAllConversationsData(prev => ({ ...prev, [newConvId]: [newWelcomeMessage] }));
    setActiveConversationId(newConvId);
    setCurrentChatMessages([newWelcomeMessage]);
    
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
    if (pastConversationsMeta.length === 0) {
      startNewChat();
    } else {
      // On initial load, select the most recent chat
      const mostRecentChat = pastConversationsMeta.sort((a, b) => b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime())[0];
      handleSelectConversation(mostRecentChat);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleSelectConversation = useCallback((conversation: PastConversation) => {
    if (isSending) {
      abortController?.abort();
      setIsSending(false);
    }
    setActiveConversationId(conversation.id);
    setCurrentChatMessages(allConversationsData[conversation.id] || [welcomeMessage]);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [allConversationsData, isSending, abortController]);

  useEffect(() => {
    if (activeConversationId && currentChatMessages.length > 0) {
      setAllConversationsData(prevData => ({
        ...prevData,
        [activeConversationId]: currentChatMessages,
      }));

      setPastConversationsMeta(prevMeta =>
        prevMeta.map(conv => {
          if (conv.id === activeConversationId) {
            let newTitle = conv.title;
            if ((conv.title === "New Chat" || conv.title.startsWith("File Upload")) && currentChatMessages.length > 1) {
              const firstUserMessage = currentChatMessages.find(m => m.sender === 'user');
              if (firstUserMessage?.text) {
                newTitle = firstUserMessage.text.substring(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '');
              } else if (firstUserMessage?.fileInfo) {
                newTitle = firstUserMessage.fileInfo.name || "File Upload";
                newTitle = newTitle.substring(0, 30) + (newTitle.length > 30 ? '...' : '');
              }
            }
            return {
              ...conv,
              title: newTitle,
              messageCount: currentChatMessages.length,
              lastMessageTimestamp: currentChatMessages[currentChatMessages.length - 1].timestamp,
            };
          }
          return conv;
        }).sort((a, b) => b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime())
      );
    }
  }, [currentChatMessages, activeConversationId]);
  
  const handleSendMessage = async (prompt: string, file: ProcessedFile | null) => {
    if (!prompt && !file) return;

    const controller = new AbortController();
    setAbortController(controller);
    setIsSending(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: prompt,
      sender: 'user',
      timestamp: new Date(),
      fileInfo: file ? { name: file.name, type: file.mimeType, size: file.size, previewUrl: file.previewUrl } : undefined,
    };

    const botMessageId = `bot-${Date.now()}`;
    const loadingBotMessage: ChatMessage = {
      id: botMessageId,
      text: 'Thinking...',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };
    
    setCurrentChatMessages(prev => [...prev, userMessage, loadingBotMessage]);

    try {
      const botResponse = await sendMessageToBot(prompt, file, controller.signal);
      const finalBotMessage: ChatMessage = {
        ...loadingBotMessage,
        text: botResponse.text,
        isLoading: false,
        groundingSources: botResponse.groundingSources,
      };
       setCurrentChatMessages(prev => prev.map(msg => msg.id === botMessageId ? finalBotMessage : msg));
    } catch (error: any) {
        let errorText = "Sorry, I couldn't process your request. Please try again.";
        if (error.name === 'AbortError') {
            errorText = "Request cancelled.";
        } else {
            console.error("Error sending message:", error);
        }
        const errorBotMessage: ChatMessage = {
            ...loadingBotMessage,
            text: errorText,
            isLoading: false,
            error: (error instanceof Error ? error.message : String(error)),
        };
        setCurrentChatMessages(prev => prev.map(msg => msg.id === botMessageId ? errorBotMessage : msg));
    } finally {
      setIsSending(false);
      setAbortController(null);
    }
  };

  const handleCancelRequest = () => {
    if (abortController) {
      abortController.abort();
    }
  };
    
  const activeConversationTitle = pastConversationsMeta.find(c => c.id === activeConversationId)?.title || "Chat";
  
  const conversationsWithRelativeTime = pastConversationsMeta.map(conv => ({
    ...conv,
    relativeTime: formatRelativeTime(conv.lastMessageTimestamp)
  }));


  return (
    <div className="h-screen w-full antialiased text-gray-200 bg-slate-900">
      {showApiKeyWarning && (
          <div className="fixed top-0 left-0 right-0 bg-red-600/90 backdrop-blur-sm text-white p-3 text-center z-50 shadow-lg">
              <strong>Warning:</strong> API_KEY environment variable is not set. AI features will not work.
              <button onClick={() => setShowApiKeyWarning(false)} className="ml-4 px-2 py-1 bg-red-800 hover:bg-red-900 rounded text-sm font-semibold">Dismiss</button>
          </div>
      )}
      <div className="relative h-full w-full flex">
        {/* Overlay for mobile */}
        <div
            className={`fixed inset-0 bg-black bg-opacity-60 z-20 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleSidebar}
        />
        
        {/* Left Sidebar */}
        <ChatHistoryPanel 
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          conversations={conversationsWithRelativeTime} 
          onSelectConversation={handleSelectConversation} 
          activeConversationId={activeConversationId} 
          onNewChat={startNewChat}
        />

        {/* Main Content Area */}
        <main className={`flex flex-col h-full flex-1 bg-slate-800/50 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-80' : ''}`}>
            <Header 
              onToggleSidebar={toggleSidebar}
              onNewChat={startNewChat}
              chatTitle={activeConversationTitle}
            />
            <div className="flex-1 overflow-hidden">
              <ChatInterface 
                key={activeConversationId}
                messages={currentChatMessages} 
                onSendMessage={handleSendMessage}
                isSending={isSending}
                onCancelRequest={handleCancelRequest}
              />
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;