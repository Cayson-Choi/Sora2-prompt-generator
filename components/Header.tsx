import React from 'react';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-600/10 blur-3xl rounded-full -z-10"></div>
      
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-lg shadow-brand-500/30">
          <VideoCameraIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight mb-3">
        Sora 2 Prompt Architect
      </h1>
      
      <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base px-4">
        당신의 아이디어를 입력하세요. <br/>
        <span className="text-brand-400 font-medium">Gemini AI</span>가 한국어와 영어로 최적화된 프롬프트를 생성합니다.
      </p>
    </header>
  );
};

export default Header;