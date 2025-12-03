
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatSession, Message, Listing } from '../types';
import { CURRENT_USER } from '../services/mockData';
import { Search, Send, CheckCheck, Check, AlertTriangle, ShieldAlert, ShoppingBag, ExternalLink, MoreVertical, Flag, Ban, Paperclip, Zap, X, Image as ImageIcon, Briefcase, Play, CheckCircle, Clock, ShieldCheck, Star, Lock, RefreshCcw, BellRing, ChevronLeft, Database } from 'lucide-react';

interface ChatViewProps {
  currentUser: User;
  initialPartnerId?: string; // If navigated from listing
  onNavigate: (view: string, data?: any) => void;
  chats: ChatSession[];
  onSendMessage: (chatId: string, message: Message) => void;
  setChats: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

const SELLER_TEMPLATES = [
  "Здравствуйте! Я готов выполнить заказ.",
  "Заходите в игру, ожидаю вас.",
  "Товар передан. Пожалуйста, подтвердите получение.",
  "Спасибо за покупку! Буду рад отзыву 🤝",
  "Секунду, уточняю наличие..."
];

export const ChatView: React.FC<ChatViewProps> = ({ currentUser, initialPartnerId, onNavigate, chats, onSendMessage, setChats }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  
  // UI States
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isSeller = currentUser.role === 'seller';

  useEffect(() => {
    // If we have an initialPartnerId (coming from "Write to seller"), find or create chat
    if (initialPartnerId) {
      const existingChat = chats.find(c => c.partner.id === initialPartnerId);
      if (existingChat) {
        setSelectedChatId(existingChat.id);
      } else {
        const newChat: ChatSession = {
          id: `new-${Date.now()}`,
          partner: { 
             ...CURRENT_USER, // Placeholder, usually would fetch user
             id: initialPartnerId,
             username: 'Seller',
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
       setSelectedChatId(chats[0].id);
    }
  }, [initialPartnerId]);

  // Close menus when switching chats
  useEffect(() => {
    setIsHeaderMenuOpen(false);
    setShowTemplates(false);
    setShowImageInput(false);
    setImageUrl('');
  }, [selectedChatId]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  // --- ORDER CONTROL LOGIC ---
  // Find the most recent order message in the chat
  const activeOrderMessage = activeChat?.messages
    .filter(m => m.type === 'order' && m.orderDetails)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

  const updateOrderStatus = (status: 'paid' | 'delivery_confirmed' | 'completed' | 'disputed') => {
    if (!selectedChatId || !activeOrderMessage) return;

    // Update the message in state
    setChats(prev => prev.map(c => {
      if (c.id === selectedChatId) {
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id === activeOrderMessage.id && m.orderDetails) {
              return { ...m, orderDetails: { ...m.orderDetails, status } };
            }
            return m;
          })
        };
      }
      return c;
    }));
  };

  const sendSystemMessage = (text: string, type: 'system' | 'admin' = 'system') => {
    if (!selectedChatId) return;
    const msg: Message = {
      id: `sys-${Date.now()}`,
      senderId: type === 'admin' ? 'admin' : 'system',
      type: type,
      text: text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    onSendMessage(selectedChatId, msg);
  };

  // --- HANDLERS FOR PANEL BUTTONS ---

  const handleSellerConfirmDelivery = () => {
    if(confirm('Вы действительно передали товар покупателю?')) {
       updateOrderStatus('delivery_confirmed');
       sendSystemMessage('Продавец подтвердил выполнение заказа. Покупатель, проверьте получение и подтвердите заказ.', 'system');
    }
  };

  const handleBuyerConfirmOrder = () => {
    // Open review modal
    setShowReviewModal(true);
  };

  const submitReview = () => {
    updateOrderStatus('completed');
    sendSystemMessage(`Покупатель подтвердил выполнение заказа и оставил отзыв: ${reviewRating}★`, 'success' as any); // Using success for generic positive feedback
    setShowReviewModal(false);
    setReviewText('');
    setReviewRating(5);
  };

  const handleDispute = () => {
    if(confirm('Открыть спор? К чату подключится арбитр, а средства будут заморожены.')) {
       updateOrderStatus('disputed');
       // Send Admin Message as requested
       setTimeout(() => {
          sendSystemMessage('Видим что у вас возникли разногласия, пожалуйста дождитесь ответа службы поддержки.', 'admin');
       }, 300);
    }
  };

  const handleCloseDispute = () => {
     if(confirm('Закрыть спор и продолжить сделку?')) {
        // Revert to paid status (assuming transaction resumes)
        updateOrderStatus('paid');
        sendSystemMessage('Спор закрыт покупателем. Сделка снова активна.', 'system');
     }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isPartnerTyping, showImageInput]);

  const handleSendMessageInternal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChatId) return;

    sendMessage(messageInput.trim(), 'text');
  };

  const sendMessage = (content: string, type: 'text' | 'image' | 'system' = 'text') => {
    if (!selectedChatId) return;

    // --- LINK CENSORSHIP LOGIC (Only for text) ---
    if (type === 'text') {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const urls = content.match(linkRegex);
        
        let isBlocked = false;
        
        if (urls) {
           const hasExternal = urls.some(url => !url.includes('lootbuy'));
           if (hasExternal) {
              isBlocked = true;
           }
        }
    
        if (isBlocked) {
           const warningMessage: Message = {
              id: `warn-${Date.now()}`,
              senderId: 'system',
              type: 'warning',
              text: 'Сообщение скрыто. Ссылки на сторонние ресурсы запрещены! Сделки вне LootBuy не безопасны.',
              timestamp: new Date().toISOString(),
              isRead: true
           };
           onSendMessage(selectedChatId, warningMessage);
           setMessageInput('');
           return;
        }
    }

    // --- NORMAL SEND ---
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      type: type as any,
      text: type === 'text' ? content : undefined,
      image: type === 'image' ? content : undefined,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    onSendMessage(selectedChatId, newMessage);
    setMessageInput('');
    setShowTemplates(false);
    setShowImageInput(false);
    setImageUrl('');

    // Simulate Partner Typing
    setTimeout(() => setIsPartnerTyping(true), 1000);
    setTimeout(() => setIsPartnerTyping(false), 3500);
  };

  const handleSendImage = () => {
     if (imageUrl.trim()) {
        sendMessage(imageUrl, 'image');
     }
  };

  // --- NEW WORKFLOW ACTIONS ---
  
  const handleBuyerRequestData = () => {
     sendMessage("Пожалуйста, предоставьте данные", "text");
     alert("Уведомление отправлено продавцу: Запрос данных");
  };

  const handleSellerStartWork = () => {
     sendMessage("Принял в работу, пожалуйста ожидайте", "text");
     alert("Уведомление отправлено покупателю: Заказ в работе");
  };

  const handleSellerAction = (action: string) => {
     let text = "";
     if (action === 'finish') text = "✅ Заказ выполнен! Пожалуйста, проверьте и подтвердите получение.";
     
     if (text) {
        sendMessage(text, 'text');
     }
  };

  const handleOrderClick = (msg: Message) => {
    if (!msg.orderDetails || !activeChat) return;
    const isMeBuyer = msg.senderId === currentUser.id;
    const seller = isMeBuyer ? activeChat.partner : currentUser;

    const mockListing: Partial<Listing> = {
      id: msg.orderDetails.id,
      title: msg.orderDetails.title,
      price: msg.orderDetails.price,
      currency: msg.orderDetails.currency,
      seller: seller,
      gameId: 'g1',
      type: 'item',
      stock: 1,
      deliveryTime: 'N/A',
      tags: [],
      description: 'Детали заказа из чата.',
      screenshots: msg.orderDetails.image ? [msg.orderDetails.image] : []
    };

    onNavigate('listing-detail', mockListing);
  };

  const handleBlockUser = () => {
    if (confirm('Вы уверены, что хотите заблокировать этого пользователя? Вы больше не сможете получать от него сообщения.')) {
        setIsHeaderMenuOpen(false);
    }
  };

  const handleReportUser = () => {
    setIsHeaderMenuOpen(false);
    alert('Жалоба отправлена модераторам.');
  };

  const insertTemplate = (text: string) => {
    setMessageInput(text);
    setShowTemplates(false);
  };

  // Helper to format date for headers
  const getMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Сегодня';
    if (date.toDateString() === yesterday.toDateString()) return 'Вчера';
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  const orderStatusMap: Record<string, string> = {
    'paid': 'Оплачен',
    'delivery_confirmed': 'Доставка подтверждена',
    'completed': 'Завершен',
    'disputed': 'Спор открыт',
    'cancelled': 'Отменен'
  };

  return (
    <div className="h-[calc(100vh-64px)] supports-[height:100dvh]:h-[calc(100dvh-64px)] bg-slate-950 flex overflow-hidden font-sans relative">
      
      {/* Lightbox Modal */}
      {zoomedImage && (
         <div 
           className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
           onClick={() => setZoomedImage(null)}
         >
            <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white">
               <X className="w-8 h-8" />
            </button>
            <img 
               src={zoomedImage} 
               alt="Zoomed" 
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
               onClick={(e) => e.stopPropagation()}
            />
         </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
              <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-brand-400" />
                 </div>
                 <h2 className="text-xl font-bold text-white mb-2">Заказ выполнен!</h2>
                 <p className="text-slate-400 text-sm">Пожалуйста, оцените работу продавца</p>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                 {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                       key={star} 
                       onClick={() => setReviewRating(star)}
                       className="p-1 transition-transform hover:scale-110"
                    >
                       <Star 
                          className={`w-8 h-8 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                       />
                    </button>
                 ))}
              </div>

              <textarea 
                 className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-brand-500 mb-6 h-32 resize-none"
                 placeholder="Напишите ваш отзыв..."
                 value={reviewText}
                 onChange={(e) => setReviewText(e.target.value)}
              />

              <div className="flex gap-3">
                 <button 
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-colors"
                 >
                    Отмена
                 </button>
                 <button 
                    onClick={submitReview}
                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20"
                 >
                    Отправить отзыв
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-anim { animation: slideUpFade 0.3s ease-out forwards; }
        .glass-header { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
      `}</style>

      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-slate-800 bg-slate-900/50 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* ACTIVE PARTNER HEADER (Moved from Main Chat) */}
        {activeChat && (
          <div 
             className="p-6 border-b border-slate-800 bg-slate-900 flex flex-col items-center text-center cursor-pointer hover:bg-slate-800/80 transition-colors"
             onClick={() => onNavigate('profile', activeChat.partner)}
             title="Перейти в профиль"
          >
             <div className="relative mb-3">
                <img src={activeChat.partner.avatar} alt="" className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-800 border border-slate-700" />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-4 border-slate-900 rounded-full animate-pulse"></div>
             </div>
             <h2 className="text-xl font-black text-white hover:text-brand-400 transition-colors">{activeChat.partner.username}</h2>
             <span className="text-xs font-medium text-green-400 mt-1 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> В сети
             </span>
          </div>
        )}

        <div className="p-4 border-b border-slate-800">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Сообщения</h3>
           <div className="relative group">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Поиск диалогов..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {chats.map(chat => (
             <div 
               key={chat.id}
               onClick={() => setSelectedChatId(chat.id)}
               className={`p-4 flex gap-3 cursor-pointer transition-all border-b border-slate-800/50 hover:bg-slate-800/80 ${selectedChatId === chat.id ? 'bg-slate-800 border-l-4 border-l-brand-500' : 'border-l-4 border-l-transparent'}`}
             >
                <div className="relative flex-shrink-0">
                   <img src={chat.partner.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800" />
                   {/* Online status indicator small */}
                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-slate-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className={`text-sm font-bold truncate ${selectedChatId === chat.id ? 'text-white' : 'text-slate-300'}`}>{chat.partner.username}</h3>
                      <span className="text-[10px] text-slate-500 font-medium">{new Date(chat.lastMessageTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   </div>
                   <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-white font-medium' : 'text-slate-500'}`}>
                      {chat.lastMessage.startsWith('http') ? '📷 Изображение' : (chat.lastMessage || 'Начните диалог')}
                   </p>
                </div>
                {chat.unreadCount > 0 && (
                   <div className="flex flex-col justify-center">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-brand-600 to-brand-400 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brand-500/20">
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
           
           {/* Chat Header (Simplified for Mobile or Menu Actions) */}
           <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 glass-header z-30 relative shrink-0">
              <div className="flex items-center gap-3">
                 <button onClick={() => setSelectedChatId(null)} className="md:hidden text-slate-400 mr-2 hover:text-white">
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <span className="text-sm text-slate-500">ID чата: <span className="text-slate-400 font-mono">{activeChat.id}</span></span>
              </div>
              
              {/* Header Actions Menu */}
              <div className="relative">
                 <button 
                   onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)} 
                   className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                 >
                    <MoreVertical className="w-5 h-5" />
                 </button>

                 {isHeaderMenuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsHeaderMenuOpen(false)}
                      ></div>
                      <div className="absolute right-0 top-12 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in">
                         <button 
                           onClick={handleReportUser}
                           className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white flex items-center transition-colors"
                         >
                            <Flag className="w-4 h-4 mr-2" /> Пожаловаться
                         </button>
                         <button 
                           onClick={handleBlockUser}
                           className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 flex items-center transition-colors border-t border-slate-800"
                         >
                            <Ban className="w-4 h-4 mr-2" /> Заблокировать
                         </button>
                      </div>
                    </>
                 )}
              </div>
           </div>

           {/* --- ORDER CONTROL PANEL (STICKY) --- */}
           {activeOrderMessage && activeOrderMessage.orderDetails && activeOrderMessage.orderDetails.status !== 'cancelled' && (
             <div className="bg-slate-900/90 backdrop-blur border-b border-slate-800 p-2 sm:p-4 z-20 shadow-lg shrink-0">
                <div className="flex flex-col xl:flex-row items-center justify-between gap-3 xl:gap-4 max-w-5xl mx-auto w-full">
                   
                   {/* Left: Status & ID */}
                   <div className="flex items-center gap-4 w-full xl:w-auto justify-start">
                      <div className={`px-3 py-1.5 sm:px-4 sm:py-2 border text-[10px] sm:text-xs font-bold rounded-lg uppercase whitespace-nowrap flex items-center ${
                         activeOrderMessage.orderDetails.status === 'disputed' 
                            ? 'bg-red-900/30 border-red-500/30 text-red-400' 
                            : 'bg-brand-900/30 border-brand-500/30 text-brand-400'
                      }`}>
                         {activeOrderMessage.orderDetails.status === 'disputed' && <Lock className="w-3 h-3 mr-2" />}
                         {orderStatusMap[activeOrderMessage.orderDetails.status]}
                         {activeOrderMessage.orderDetails.status === 'disputed' && " (Заморожено)"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">№ Заказа</span>
                        <span className="text-xs sm:text-sm text-white font-mono">#{activeOrderMessage.orderDetails.id.split('-')[1]}</span>
                      </div>
                   </div>

                   {/* Right: Actions */}
                   <div className="flex items-center gap-2 w-full xl:w-auto overflow-x-auto pb-1 xl:pb-0 no-scrollbar">
                      
                      {/* === SELLER CONTROLS === */}
                      {isSeller ? (
                         <>
                            {/* Workflow: Start Work */}
                            {activeOrderMessage.orderDetails.status === 'paid' && (
                               <button 
                                  onClick={handleSellerStartWork}
                                  className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center"
                               >
                                  <Play className="w-4 h-4 mr-2 text-yellow-500" /> Взять в работу
                               </button>
                            )}

                            {/* Main Action: Confirm Delivery */}
                            {activeOrderMessage.orderDetails.status === 'disputed' ? (
                               <button disabled className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 bg-slate-800 border border-slate-700 text-slate-500 text-xs sm:text-sm font-bold rounded-lg cursor-not-allowed flex items-center">
                                  <Lock className="w-4 h-4 mr-2" /> Действия заблокированы
                               </button>
                            ) : activeOrderMessage.orderDetails.status === 'paid' || activeOrderMessage.orderDetails.status === 'delivery_confirmed' ? (
                               <button 
                                 onClick={handleSellerConfirmDelivery}
                                 disabled={activeOrderMessage.orderDetails.status === 'delivery_confirmed'}
                                 className={`flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center ${
                                    activeOrderMessage.orderDetails.status === 'delivery_confirmed' 
                                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                                 }`}
                               >
                                  <CheckCircle className="w-4 h-4 mr-2" /> 
                                  {activeOrderMessage.orderDetails.status === 'delivery_confirmed' ? 'Доставка подтверждена' : 'Подтвердить доставку'}
                               </button>
                            ) : null}

                             {/* Workflow: Finish (Extra Visual) */}
                            {activeOrderMessage.orderDetails.status === 'paid' && (
                                <button 
                                   onClick={() => handleSellerAction('finish')}
                                   className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                                   title="Отправить сообщение о завершении"
                                >
                                   <CheckCircle className="w-4 h-4" />
                                </button>
                            )}
                         </>
                      ) : (
                         /* === BUYER CONTROLS === */
                         <>
                            {/* Workflow: Request Data */}
                            {activeOrderMessage.orderDetails.status !== 'completed' && activeOrderMessage.orderDetails.status !== 'disputed' && (
                               <button 
                                  onClick={handleBuyerRequestData}
                                  className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center"
                               >
                                  <BellRing className="w-4 h-4 mr-2 text-brand-400" /> Запросить данные
                               </button>
                            )}

                            {activeOrderMessage.orderDetails.status === 'disputed' ? (
                               <button 
                                 onClick={handleCloseDispute}
                                 className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-500 text-white border border-green-500/30 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center shadow-lg shadow-green-900/20"
                               >
                                  <RefreshCcw className="w-4 h-4 mr-2" /> Закрыть спор
                               </button>
                            ) : (
                               <>
                                  {activeOrderMessage.orderDetails.status !== 'completed' && (
                                     <button 
                                       onClick={handleDispute}
                                       className="flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/30 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center"
                                     >
                                        <ShieldAlert className="w-4 h-4 mr-2" /> Открыть спор
                                     </button>
                                  )}
                                  
                                  {activeOrderMessage.orderDetails.status !== 'completed' && (
                                     <button 
                                       onClick={handleBuyerConfirmOrder}
                                       disabled={activeOrderMessage.orderDetails.status === 'paid'}
                                       className={`flex-shrink-0 px-4 py-2 sm:px-6 sm:py-3 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center ${
                                          activeOrderMessage.orderDetails.status === 'delivery_confirmed' 
                                          ? 'bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20' 
                                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                       }`}
                                     >
                                        <CheckCheck className="w-4 h-4 mr-2" /> Подтвердить заказ
                                     </button>
                                  )}
                               </>
                            )}
                         </>
                      )}
                   </div>
                </div>
             </div>
           )}

           {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-950 min-h-0">
             <div className="max-w-4xl mx-auto w-full space-y-1">
              {activeChat.messages.map((msg, index) => {
                 const isMe = msg.senderId === currentUser.id;
                 const prevMsg = activeChat.messages[index - 1];
                 const nextMsg = activeChat.messages[index + 1];
                 
                 // Date Grouping Logic
                 const showDateHeader = !prevMsg || getMessageDate(msg.timestamp) !== getMessageDate(prevMsg.timestamp);
                 
                 // Message Grouping Styling
                 const isFirstInGroup = !prevMsg || prevMsg.senderId !== msg.senderId || showDateHeader;
                 const isLastInGroup = !nextMsg || nextMsg.senderId !== msg.senderId;
                 
                 // Bubbles Radius
                 const roundedClass = isMe 
                    ? `${isFirstInGroup ? 'rounded-tr-2xl' : 'rounded-tr-md'} ${isLastInGroup ? 'rounded-br-2xl' : 'rounded-br-md'} rounded-l-2xl`
                    : `${isFirstInGroup ? 'rounded-tl-2xl' : 'rounded-tl-md'} ${isLastInGroup ? 'rounded-bl-2xl' : 'rounded-bl-md'} rounded-r-2xl`;

                 const mtClass = isFirstInGroup ? 'mt-4' : 'mt-1';

                 // --- RENDER ADMIN / SYSTEM / WARNING MESSAGE ---
                 if (msg.type === 'admin' || msg.type === 'system' || msg.type === 'warning') {
                    return (
                       <div key={msg.id} className="flex flex-col items-center my-6 animate-fade-in w-full">
                          {showDateHeader && (
                             <div className="mb-4 sticky top-2 z-10 px-3 py-1 bg-slate-900/60 backdrop-blur-sm rounded-full text-[10px] font-bold text-slate-500 border border-slate-800 shadow-sm">
                                {getMessageDate(msg.timestamp)}
                             </div>
                          )}
                          
                          {/* ADMIN MESSAGE STYLE */}
                          {msg.type === 'admin' ? (
                             <div className="max-w-xl w-full mx-auto bg-slate-900 border border-brand-500/50 rounded-xl overflow-hidden shadow-2xl">
                                <div className="bg-brand-600/20 px-4 py-2 flex items-center gap-2 border-b border-brand-500/30">
                                   <ShieldCheck className="w-4 h-4 text-brand-400" />
                                   <span className="text-xs font-black text-brand-100 uppercase tracking-widest">LOOTBUY ADMINISTRATOR</span>
                                </div>
                                <div className="p-4 text-sm text-slate-200 leading-relaxed text-center font-medium">
                                   {msg.text}
                                </div>
                             </div>
                          ) : (
                             // SYSTEM / WARNING STYLE
                             <div className={`max-w-md text-center text-xs px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${msg.type === 'warning' ? 'bg-red-950/20 border-red-500/30 text-red-300' : 'bg-slate-900/50 border-slate-700 text-slate-400'}`}>
                                {msg.type === 'warning' && <AlertTriangle className="w-5 h-5 mx-auto mb-2 text-red-500" />}
                                {msg.text}
                             </div>
                          )}
                       </div>
                    );
                 }

                 return (
                    <React.Fragment key={msg.id}>
                       {showDateHeader && (
                          <div className="flex justify-center my-6 sticky top-2 z-10">
                             <div className="px-3 py-1 bg-slate-900/80 backdrop-blur rounded-full text-[10px] font-bold text-slate-500 border border-slate-800 shadow-sm">
                                {getMessageDate(msg.timestamp)}
                             </div>
                          </div>
                       )}

                       {/* --- ORDER TICKET WIDGET --- */}
                       {msg.type === 'order' && msg.orderDetails ? (
                          <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${mtClass} msg-anim`}>
                             <div 
                                onClick={() => handleOrderClick(msg)}
                                className={`
                                  relative w-full max-w-sm rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1
                                  ${isMe ? 'bg-slate-900 border border-slate-700 shadow-[0_0_15px_rgba(14,165,233,0.1)]' : 'bg-slate-900 border border-slate-700 shadow-lg'}
                                `}
                             >  
                                {/* Gradient Top Border */}
                                <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-accent-purple to-brand-500"></div>
                                
                                {/* Header */}
                                <div className="p-4 bg-slate-800/50 flex justify-between items-start">
                                   <div className="flex items-center gap-2">
                                      <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-700">
                                         <ShoppingBag className="w-4 h-4 text-slate-400" />
                                      </div>
                                      <div>
                                         <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Новый заказ</div>
                                         <div className="text-xs text-slate-300 font-mono">#{msg.orderDetails.id.split('-')[1]}</div>
                                      </div>
                                   </div>
                                   <div className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${msg.orderDetails.status === 'completed' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-brand-500/10 border-brand-500/20 text-brand-400'}`}>
                                      {orderStatusMap[msg.orderDetails.status]}
                                   </div>
                                </div>

                                {/* Perforation Line */}
                                <div className="relative h-px bg-slate-800 w-full my-0">
                                   <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-slate-950"></div>
                                   <div className="absolute -right-1.5 -top-1.5 w-3 h-3 rounded-full bg-slate-950"></div>
                                </div>

                                {/* Content */}
                                <div className="p-4 flex gap-4 bg-gradient-to-b from-slate-900/50 to-transparent">
                                   <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex-shrink-0 overflow-hidden">
                                      {msg.orderDetails.image ? (
                                         <img src={msg.orderDetails.image} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                         <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-600">IMG</div>
                                      )}
                                   </div>
                                   <div className="flex-1 min-w-0">
                                      <h4 className="text-sm font-bold text-white leading-tight mb-2 line-clamp-2 group-hover:text-brand-400 transition-colors">
                                         {msg.orderDetails.title}
                                      </h4>

                                      {/* Extended Order Details (New Section) */}
                                      {(msg.orderDetails.amount || (msg.orderDetails.meta && Object.keys(msg.orderDetails.meta).length > 0)) && (
                                         <div className="mb-2 space-y-1 bg-slate-950/30 p-2 rounded-lg border border-slate-800/50">
                                            {msg.orderDetails.amount && (
                                              <div className="flex justify-between items-center text-xs">
                                                 <span className="text-slate-500">Количество:</span>
                                                 <span className="text-white font-mono font-bold">{msg.orderDetails.amount}</span>
                                              </div>
                                            )}
                                            {msg.orderDetails.meta && Object.entries(msg.orderDetails.meta).map(([key, val]) => (
                                              <div key={key} className="flex justify-between items-center text-xs">
                                                 <span className="text-slate-500">{key}:</span>
                                                 <span className="text-slate-300 font-medium">{val}</span>
                                              </div>
                                            ))}
                                         </div>
                                      )}

                                      <div className="flex justify-between items-end">
                                         <span className="text-lg font-black text-brand-400">{msg.orderDetails.price} {msg.orderDetails.currency}</span>
                                         <span className="text-[10px] text-slate-500 flex items-center group-hover:text-white transition-colors">
                                            Открыть <ExternalLink className="w-3 h-3 ml-1" />
                                         </span>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ) : (
                          
                          /* --- TEXT OR IMAGE MESSAGE --- */
                          <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${mtClass} group msg-anim`}>
                             {/* Avatar (Partner only, only last in group) */}
                             {!isMe && (
                                <div className="w-8 flex-shrink-0 flex items-end mr-2">
                                   {isLastInGroup && (
                                      <img src={activeChat.partner.avatar} className="w-8 h-8 rounded-full bg-slate-800 object-cover" alt="" />
                                   )}
                                </div>
                             )}

                             <div 
                                className={`
                                   relative max-w-[75%] md:max-w-[60%] shadow-sm text-sm leading-relaxed overflow-hidden
                                   ${roundedClass}
                                   ${isMe 
                                      ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-brand-500/10' 
                                      : 'bg-slate-800 text-slate-200 border border-slate-700/50'
                                   }
                                `}
                             >
                                {msg.image ? (
                                   // Image Message
                                   <div 
                                     className="cursor-pointer group/img"
                                     onClick={() => setZoomedImage(msg.image || '')}
                                   >
                                      <img src={msg.image} alt="Attachment" className="max-w-full rounded-lg" />
                                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors flex items-center justify-center">
                                         <ImageIcon className="text-white opacity-0 group-hover/img:opacity-100 drop-shadow-lg w-8 h-8 transform scale-75 group-hover/img:scale-100 transition-all" />
                                      </div>
                                   </div>
                                ) : (
                                   // Text Message
                                   <div className="px-4 py-2.5">
                                      <p className="whitespace-pre-wrap">{msg.text}</p>
                                   </div>
                                )}

                                <div className={`flex items-center justify-end gap-1 px-2 pb-1 text-[10px] ${isMe ? 'text-brand-100/70' : 'text-slate-500'} ${msg.image ? 'absolute bottom-1 right-2 bg-black/50 rounded px-1.5 py-0.5 text-white' : ''}`}>
                                   {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                   {isMe && (
                                      msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                                   )}
                                </div>
                             </div>
                          </div>
                       )}
                    </React.Fragment>
                 );
              })}
              
              {/* Partner Typing Indicator */}
              {isPartnerTyping && (
                 <div className="flex justify-start mt-2 ml-10 msg-anim">
                    <div className="bg-slate-800 border border-slate-700/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                       <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                       <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                       <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </div>
                 </div>
              )}
              </div>
              <div ref={messagesEndRef} className="h-4" />
           </div>

           {/* Input Area (Glass Footer) */}
           <div className="p-4 bg-slate-900/90 border-t border-slate-800 backdrop-blur z-20 relative shrink-0">
              
              {/* Image Input Popover */}
              {showImageInput && (
                <div className="absolute bottom-full left-4 mb-2 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-4 animate-slideUpFade z-50">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-slate-400">Прикрепить ссылку на скриншот</span>
                       <button onClick={() => setShowImageInput(false)}><X className="w-4 h-4 text-slate-500 hover:text-white" /></button>
                    </div>
                    <div className="flex gap-2">
                       <input 
                         type="text" 
                         value={imageUrl}
                         onChange={(e) => setImageUrl(e.target.value)}
                         placeholder="https://imgur.com/..."
                         className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                       />
                       <button 
                         onClick={handleSendImage}
                         className="bg-brand-600 hover:bg-brand-500 text-white rounded-lg px-3 py-2 text-xs font-bold transition-colors"
                       >
                         OK
                       </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2">Картинка будет отображена в чате.</p>
                </div>
              )}

              {/* Quick Replies Popup */}
              {showTemplates && (
                <div className="absolute bottom-full left-16 mb-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-slideUpFade">
                   <div className="flex justify-between items-center px-4 py-2 bg-slate-900 border-b border-slate-700">
                      <span className="text-xs font-bold text-slate-400">Быстрые ответы</span>
                      <button onClick={() => setShowTemplates(false)}><X className="w-4 h-4 text-slate-500 hover:text-white" /></button>
                   </div>
                   <div className="py-1 max-h-48 overflow-y-auto custom-scrollbar">
                      {SELLER_TEMPLATES.map((tmpl, idx) => (
                         <button 
                           key={idx}
                           onClick={() => insertTemplate(tmpl)}
                           className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700/50 last:border-0"
                         >
                            {tmpl}
                         </button>
                      ))}
                   </div>
                </div>
              )}

              <form onSubmit={handleSendMessageInternal} className="flex gap-3 items-end max-w-4xl mx-auto">
                 
                 {/* Attachment Button */}
                 <button 
                   type="button" 
                   onClick={() => setShowImageInput(!showImageInput)}
                   className={`p-3.5 rounded-xl border transition-colors ${showImageInput ? 'bg-brand-500/10 border-brand-500 text-brand-400' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border-slate-700'}`}
                   title="Прикрепить скриншот (URL)"
                 >
                    <Paperclip className="w-5 h-5" />
                 </button>

                 {/* Quick Replies Button (Only for sellers mostly, but anyone can use) */}
                 {isSeller && (
                   <button 
                     type="button" 
                     onClick={() => setShowTemplates(!showTemplates)}
                     className={`p-3.5 rounded-xl border transition-colors ${showTemplates ? 'bg-brand-500/10 border-brand-500 text-brand-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'}`}
                     title="Быстрые ответы"
                   >
                      <Zap className="w-5 h-5" />
                   </button>
                 )}

                 <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all shadow-inner">
                    <input 
                      type="text" 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Напишите сообщение..."
                      className="w-full bg-transparent border-none text-white px-4 py-3.5 focus:ring-0 placeholder-slate-500 text-sm"
                    />
                 </div>
                 <button 
                   type="submit" 
                   disabled={!messageInput.trim()}
                   className="p-3.5 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all duration-200"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </form>
           </div>

        </div>
      ) : (
         <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-slate-950 text-slate-500 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/10 via-slate-950 to-slate-950"></div>
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-2xl border border-slate-800 rotate-3 hover:rotate-6 transition-transform duration-500">
                 <span className="text-4xl">💬</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">LootBuy Chat</h2>
              <p className="max-w-xs text-center text-slate-400">Выберите диалог слева для безопасного общения с продавцами</p>
            </div>
         </div>
      )}

    </div>
  );
};
