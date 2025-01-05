import React, { useEffect } from 'react';
import ChatIcon from '../assets/chat_icon.png'; // Ensure this path is correct

const Chatbot = () => {
  useEffect(() => {
    // Load Botpress webchat script
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
    script1.async = true;
    document.body.appendChild(script1);

    // Load Botpress config script
    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/01/05/16/20250105165416-2BABZS29.js';
    script2.async = true;
    document.body.appendChild(script2);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const toggleChatbot = () => {
    if (window.botpressWebChat) {
      const isVisible = window.botpressWebChat.isOpen(); // Check if chatbot is open
      if (isVisible) {
        window.botpressWebChat.hide();
      } else {
        window.botpressWebChat.show();
      }
    } else {
      console.error('Botpress is not loaded yet.');
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img src={ChatIcon} alt="Chatbot Icon" className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Chatbot;
