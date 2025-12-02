
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatSession, Message } from '../types';
import { MOCK_CHATS, CURRENT_USER } from '../services/mockData';
import { Search, Send, Paperclip, MoreVertical, CheckCheck, Check, Phone, Video } from 'lucide-react';

interface ChatViewProps {
  currentUser: User;
  initialPartnerId?: string; // If navigated from listing
  onNavigate: (view: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ currentUser, initialPartnerId, onNavigate }) => {
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we have an initialPartnerId (coming from "Write to seller"), find or create chat
    if (initialPartnerId) {
      const existingChat = chats.find(c => c.partner.id === initialPartnerId);
      if (existingChat) {
        setSelectedChatId(existingChat.id);
      } else {
        // Create a temporary mock chat for demo
        // In real app, you would fetch user details
        const newChat: ChatSession = {
          id: `new-${Date.now()}`,
          partner: { 
             ...CURRENT_USER, // Placeholder for simplicity
             id: initialPartnerId,
             username: 'New Contact',
             avatar: 'https://ui-avatars.com/api/?name=User&background=random'
          },
          lastMessage: '',
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0,
          messages: []
        };
        setChats([newChat, ...chats]);
        setSelectedChatId(newChat.id);
      }
    } else if (chats.length > 0 && !selectedChatId) {
       // Default select first chat
       setSelectedChatId(chats[0].id);
    }
  }, [initialPartnerId]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChatId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: messageInput,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    // Update chats state
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: messageInput,
          lastMessageTime: new Date().toISOString()
        };
      }
      return chat;
    }));

    setMessageInput('');
    
    // Simulate reply
    setTimeout(() => {
       const reply: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: activeChat?.partner.id || 'unknown',
          text: "Спасибо за сообщение! Я отвечу в ближайшее время.",
          timestamp: new Date().toISOString(),
          isRead: false
       };
       setChats(prevChats => prevChats.map(chat => {
          if (chat.id === selectedChatId) {
             return {
                ...chat,
                messages: [...chat.messages, reply],
                lastMessage: reply.text,
                lastMessageTime: new Date().toISOString()
             }
          }
          return chat;
       }))
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-950 flex overflow-hidden">
      
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-slate-800 bg-slate-900/50 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800">
           <h2 className="text-xl font-bold text-white mb-4">Сообщения</h2>
           <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Поиск диалогов..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-500"
              />
           </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {chats.map(chat => (
             <div 
               key={chat.id}
               onClick={() => setSelectedChatId(chat.id)}
               className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-slate-800/50 hover:bg-slate-800/50 ${selectedChatId === chat.id ? 'bg-slate-800 border-l-2 border-l-brand-500' : 'border-l-2 border-l-transparent'}`}
             >
                <div className="relative flex-shrink-0">
                   <img src={chat.partner.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-sm font-bold text-white truncate">{chat.partner.username}</h3>
                      <span className="text-xs text-slate-500">{new Date(chat.lastMessageTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   </div>
                   <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-white font-medium' : 'text-slate-400'}`}>
                      {chat.lastMessage || 'Начните диалог'}
                   </p>
                </div>
                {chat.unreadCount > 0 && (
                   <div className="flex flex-col justify-center">
                      <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-[10px] font-bold text-white">
                         {chat.unreadCount}
                      </div>
                   </div>
                )}
             </div>
           ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChat ? (
        <div className={`flex-1 flex flex-col bg-slate-950 relative ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
           
           {/* Chat Header */}
           <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/30 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                 <button onClick={() => setSelectedChatId(null)} className="md:hidden text-slate-400 mr-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <img src={activeChat.partner.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                 <div>
                    <h3 className="font-bold text-white">{activeChat.partner.username}</h3>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> В сети
                    </span>
                 </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                 <button className="hover:text-white transition-colors"><Phone className="w-5 h-5" /></button>
                 <button className="hover:text-white transition-colors"><Video className="w-5 h-5" /></button>
                 <button className="hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
              </div>
           </div>

           {/* Messages */}
           <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              {activeChat.messages.map((msg, index) => {
                 const isMe = msg.senderId === currentUser.id;
                 return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-md ${isMe ? 'bg-brand-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-brand-200' : 'text-slate-500'}`}>
                             {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                             {isMe && (
                                msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                             )}
                          </div>
                       </div>
                    </div>
                 )
              })}
              <div ref={messagesEndRef} />
           </div>

           {/* Input Area */}
           <div className="p-4 border-t border-slate-800 bg-slate-900/50">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-end max-w-4xl mx-auto">
                 <button type="button" className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
                    <Paperclip className="w-5 h-5" />
                 </button>
                 <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                    <input 
                      type="text" 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="w-full bg-transparent border-none text-white px-4 py-3 focus:ring-0 placeholder-slate-500"
                    />
                 </div>
                 <button 
                   type="submit" 
                   disabled={!messageInput.trim()}
                   className="p-3 bg-brand-600 text-white rounded-xl hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 transition-all"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </form>
           </div>

        </div>
      ) : (
         <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-slate-950 text-slate-500">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
               <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Ваши сообщения</h2>
            <p className="max-w-xs text-center">Выберите диалог из списка слева, чтобы начать общение</p>
         </div>
      )}

    </div>
  );
};
