import React, { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { LoadingState } from '../types';

interface InputAreaProps {
  onGenerate: (text: string) => void;
  loadingState: LoadingState;
}

const InputArea: React.FC<InputAreaProps> = ({ onGenerate, loadingState }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && loadingState !== LoadingState.LOADING) {
      onGenerate(input);
    }
  };

  const isBtnDisabled = !input.trim() || loadingState === LoadingState.LOADING;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 mb-12">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative flex items-start gap-2 bg-gray-800 p-2 rounded-2xl border border-gray-700 focus-within:border-brand-500 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 비 오는 도쿄 거리에서 우산을 쓰고 걷는 사이버펑크 고양이..."
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 p-4 min-h-[120px] focus:outline-none resize-none text-lg leading-relaxed"
            disabled={loadingState === LoadingState.LOADING}
          />
          <button
            type="submit"
            disabled={isBtnDisabled}
            className={`
              absolute bottom-3 right-3 p-3 rounded-xl flex items-center justify-center transition-all duration-300
              ${isBtnDisabled 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/50 hover:scale-105'
              }
            `}
          >
            {loadingState === LoadingState.LOADING ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <PaperAirplaneIcon className="w-5 h-5 -ml-0.5" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-3 flex gap-2 justify-center">
        {['Cinematic', 'Drone Shot', '4K', 'Slow Motion'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setInput((prev) => prev ? `${prev}, ${tag}` : tag)}
            className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full text-gray-400 transition-colors"
          >
            + {tag}
          </button>
        ))}
      </div>
    </form>
  );
};

export default InputArea;