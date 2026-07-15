import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';
import { DIAGNOSIS_QUESTIONS } from '@/data/questions';
import { useState } from 'react';

export default function Diagnosis() {
  const { state, addAnswer, goToNextQuestion, goToPreviousQuestion, finalizeDiagnosis } =
    useDiagnosis();
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const currentQuestion = DIAGNOSIS_QUESTIONS[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === DIAGNOSIS_QUESTIONS.length - 1;
  const isFirstQuestion = state.currentQuestionIndex === 0;

  const handleAnswer = (score: number) => {
    setSelectedScore(score);
    addAnswer({
      questionId: currentQuestion.id,
      score,
    });

    // 自動で次の質問へ
    setTimeout(() => {
      if (isLastQuestion) {
        finalizeDiagnosis();
      } else {
        goToNextQuestion();
        setSelectedScore(null);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* プログレスバー */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>質問 {state.currentQuestionIndex + 1} / 15</span>
            <span>{Math.round(((state.currentQuestionIndex + 1) / 15) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((state.currentQuestionIndex + 1) / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* 質問 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">{currentQuestion.text}</h2>

          {/* スコア選択 */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer(score)}
                disabled={selectedScore !== null}
                className={`py-4 rounded-lg font-semibold transition-all ${
                  selectedScore === score
                    ? 'bg-purple-600 text-white scale-105'
                    : selectedScore !== null
                      ? 'bg-gray-100 text-gray-400'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                }`}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>全く当てはまらない</span>
            <span>非常に当てはまる</span>
          </div>
        </div>

        {/* ナビゲーション */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={goToPreviousQuestion}
            disabled={isFirstQuestion || selectedScore !== null}
            variant="outline"
            className="px-8"
          >
            前へ
          </Button>
          {isLastQuestion && selectedScore !== null && (
            <Button
              onClick={finalizeDiagnosis}
              className="px-8 bg-purple-600 hover:bg-purple-700 text-white"
            >
              診断を完了する
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
