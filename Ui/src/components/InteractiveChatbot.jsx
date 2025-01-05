import React, { useState, useEffect } from 'react';
import ChatImage from '../assets/chat.png';

const InteractiveChatbot = () => {
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
      
    </div>
  );
};

export default InteractiveChatbot;
