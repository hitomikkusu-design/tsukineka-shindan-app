import React, { createContext, useContext, useState, useCallback } from 'react';
import { AppState, DiagnosisAnswer, DiagnosisResult } from '@/types/diagnosis';
import { calculateDiagnosisResult, saveDiagnosisResult } from '@/lib/diagnosis';

interface DiagnosisContextType {
  state: AppState;
  setStep: (step: AppState['currentStep']) => void;
  addAnswer: (answer: DiagnosisAnswer) => void;
  setResult: (result: DiagnosisResult) => void;
  resetDiagnosis: () => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  finalizeDiagnosis: () => void;
}

const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);

export function DiagnosisProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentStep: 'onboarding',
    currentQuestionIndex: 0,
    answers: [],
    result: null,
  });

  const setStep = useCallback((step: AppState['currentStep']) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const addAnswer = useCallback((answer: DiagnosisAnswer) => {
    setState((prev) => ({
      ...prev,
      answers: [...prev.answers, answer],
    }));
  }, []);

  const setResult = useCallback((result: DiagnosisResult) => {
    setState((prev) => ({ ...prev, result }));
  }, []);

  const resetDiagnosis = useCallback(() => {
    setState({
      currentStep: 'onboarding',
      currentQuestionIndex: 0,
      answers: [],
      result: null,
    });
  }, []);

  const goToNextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, 14),
    }));
  }, []);

  const goToPreviousQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  }, []);

  const finalizeDiagnosis = useCallback(() => {
    const result = calculateDiagnosisResult(state.answers);
    saveDiagnosisResult(result);
    setState((prev) => ({
      ...prev,
      result,
      currentStep: 'result',
    }));
  }, [state.answers]);

  return (
    <DiagnosisContext.Provider
      value={{
        state,
        setStep,
        addAnswer,
        setResult,
        resetDiagnosis,
        goToNextQuestion,
        goToPreviousQuestion,
        finalizeDiagnosis,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within DiagnosisProvider');
  }
  return context;
}
