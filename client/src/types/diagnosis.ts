// 診断データ型定義

export interface DiagnosisQuestion {
  id: number;
  text: string;
  category: 'personality' | 'behavior' | 'emotion' | 'lifestyle' | 'preference';
}

export interface DiagnosisAnswer {
  questionId: number;
  score: number; // 1-5
}

export interface DiagnosisResult {
  mainPersonality: string;
  mainScore: number;
  subPersonality: string;
  subScore: number;
  currentDisorder: string;
  disorderLevel: number; // 1-5
  timestamp: number;
}

export interface AppState {
  currentStep: 'onboarding' | 'diagnosis' | 'result' | 'daily-care' | 'premium' | 'disclaimer';
  currentQuestionIndex: number;
  answers: DiagnosisAnswer[];
  result: DiagnosisResult | null;
}
