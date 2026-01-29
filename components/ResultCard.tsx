import React, { useState } from 'react';
import { PromptResult } from '../types';
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon, SparklesIcon, LanguageIcon } from '@heroicons/react/24/outline';

interface ResultCardProps {
  result: PromptResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copiedEng, setCopiedEng] = useState(false);
  const [copiedKor, setCopiedKor] = useState(false);

  const handleCopy = (text: string, isEng: boolean) => {
    navigator.clipboard.writeText(text);
    if (isEng) {
      setCopiedEng(true);
      setTimeout(() => setCopiedEng(false), 2000);
    } else {
      setCopiedKor(true);
      setTimeout(() => setCopiedKor(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Style Badges Header */}
        <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between bg-gray-800/80">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-200 font-semibold text-sm tracking-wide">AI Generated Prompts</span>
          </div>
          <div className="flex gap-2">
             <span className="px-2 py-1 rounded-md bg-brand-500/10 text-brand-400 text-xs font-mono border border-brand-500/20">
               {result.visualStyle}
             </span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          {/* Main English Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <span>🇺🇸 Sora 2 Prompt (English)</span>
              </h3>
              <button
                onClick={() => handleCopy(result.englishPrompt, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
              >
                {copiedEng ? (
                  <>
                    <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    <span>Copy English</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-black/30 p-5 rounded-xl border border-gray-700/50">
              <p className="text-gray-100 font-serif leading-relaxed text-lg whitespace-pre-wrap selection:bg-brand-500/30">
                {result.englishPrompt}
              </p>
            </div>
          </div>

          {/* Korean Prompt */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <span>🇰🇷 상세 프롬프트 (Korean)</span>
              </h3>
              <button
                onClick={() => handleCopy(result.koreanPrompt, false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-700/50 hover:bg-gray-700 text-gray-300 text-xs transition-colors"
              >
                {copiedKor ? (
                  <>
                    <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <ClipboardDocumentIcon className="w-4 h-4" />
                    <span>Copy Korean</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-black/30 p-5 rounded-xl border border-gray-700/50">
              <p className="text-gray-200 leading-relaxed text-base whitespace-pre-wrap selection:bg-brand-500/30 font-light">
                {result.koreanPrompt}
              </p>
            </div>
          </div>

          {/* Korean Explanation */}
          <div className="space-y-3 pt-4 border-t border-gray-700/50">
             <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">💡 프롬프트 전략 및 설명</h3>
             <div className="p-4 rounded-xl bg-brand-900/10 border border-brand-500/10">
                <p className="text-gray-300 text-sm leading-7">
                  {result.koreanExplanation}
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultCard;