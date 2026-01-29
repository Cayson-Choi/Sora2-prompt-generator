export interface PromptResult {
  englishPrompt: string;
  koreanPrompt: string;
  koreanExplanation: string;
  visualStyle: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}