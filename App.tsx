import React, { useState } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultCard from './components/ResultCard';
import { generateSoraPrompt } from './services/gemini';
import { LoadingState, PromptResult } from './types';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text: string) => {
    setLoadingState(LoadingState.LOADING);
    setError(null);
    setResult(null);

    try {
      const data = await generateSoraPrompt(text);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("프롬프트 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black pb-20">
      <Header />
      
      <main className="w-full flex-1 flex flex-col items-center max-w-5xl">
        <InputArea onGenerate={handleGenerate} loadingState={loadingState} />

        {loadingState === LoadingState.LOADING && (
          <div className="text-center py-12 animate-pulse">
            <div className="inline-block w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-brand-300 font-medium">Gemini가 최적의 영상을 상상하고 있습니다...</p>
            <p className="text-gray-500 text-sm mt-2">조명, 카메라 앵글, 디테일을 추가하는 중</p>
          </div>
        )}

        {loadingState === LoadingState.ERROR && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3 max-w-lg mx-auto">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            <p>{error}</p>
          </div>
        )}

        {loadingState === LoadingState.SUCCESS && result && (
          <ResultCard result={result} />
        )}
      </main>

      <footer className="mt-20 text-gray-600 text-sm">
        <p>Powered by Google Gemini 3.0 Flash</p>
      </footer>
    </div>
  );
};

export default App;