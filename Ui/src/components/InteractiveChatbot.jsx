import React, { useState, useEffect } from 'react';
import ChatImage from '../assets/chat.png';
import ChatIcon from '../assets/chat_icon.png'; // Add an icon for the chatbot

const InteractiveChatbot = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [isBotpressLoaded, setBotpressLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
    script.async = true;
  
    script.onload = () => {
      console.log('Botpress script loaded.');
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: 'ffd18f8c-f185-4b9f-8725-ef21a13b158f',
          hostUrl: 'https://cdn.botpress.cloud/webchat/v2',
        });
        console.log('Botpress initialized.');
        setBotpressLoaded(true); // Mark as loaded
      } else {
        console.error('window.botpressWebChat is not available.');
      }
    };
  
    script.onerror = () => {
      console.error('Failed to load Botpress script.');
    };
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  const toggleChatbot = () => {
    if (!isBotpressLoaded || !window.botpressWebChat) {
      console.error('Botpress is not loaded yet.');
      return;
    }

    if (isChatbotVisible) {
      window.botpressWebChat.hide(); // Hide chatbot
    } else {
      window.botpressWebChat.show(); // Show chatbot
    }
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="w-full max-w-screen-xl px-4 sm:px-8 mb-8 sm:mb-12 relative">
      {/* Heading */}
      <div className="font-roboto text-left text-[#4F4F4F] text-2xl sm:text-[35.15px] font-bold leading-[1.2] sm:leading-[42.18px] mb-4">
        Interactive Chatbot
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={ChatImage}
          alt="Interactive Chatbot"
          className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl h-auto object-cover rounded-md sm:rounded-[24px] shadow-lg"
        />
      </div>

      {/* Chatbot Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-white-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img src={ChatIcon} alt="Chatbot Icon" className="w-8 h-8" />
      </button>
    </div>
  );
};

export default InteractiveChatbot;
