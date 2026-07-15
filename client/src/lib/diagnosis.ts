import { DiagnosisAnswer, DiagnosisResult } from '@/types/diagnosis';
import { DIAGNOSIS_QUESTIONS } from '@/data/questions';

export function calculateDiagnosisResult(answers: DiagnosisAnswer[]): DiagnosisResult {
  // カテゴリごとのスコア計算
  const categoryScores = {
    personality: 0,
    behavior: 0,
    emotion: 0,
    lifestyle: 0,
    preference: 0,
  };

  const categoryCounts = {
    personality: 0,
    behavior: 0,
    emotion: 0,
    lifestyle: 0,
    preference: 0,
  };

  // 各回答をカテゴリに集計
  answers.forEach((answer) => {
    const question = DIAGNOSIS_QUESTIONS.find((q) => q.id === answer.questionId);
    if (question) {
      categoryScores[question.category] += answer.score;
      categoryCounts[question.category]++;
    }
  });

  // 平均スコア計算
  const avgScores = Object.entries(categoryScores).map(([category, score]) => ({
    category,
    avg: score / (categoryCounts[category as keyof typeof categoryCounts] || 1),
  }));

  // 上位2つのカテゴリを取得
  const sorted = avgScores.sort((a, b) => b.avg - a.avg);
  const mainCategory = sorted[0].category;
  const subCategory = sorted[1].category;

  // 気質タイプ決定（カテゴリベース）
  const personalityMap: Record<string, string> = {
    personality: 'luna',
    behavior: 'wind',
    emotion: 'star',
    lifestyle: 'sol',
    preference: 'star',
  };

  const mainPersonality = personalityMap[mainCategory] || 'luna';
  const subPersonality = personalityMap[subCategory] || 'wind';

  // 全体スコアから「乱れ」レベルを計算
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const avgTotalScore = totalScore / answers.length;

  // スコアが低い（1に近い）ほど乱れている
  let disorderLevel = 1;
  if (avgTotalScore >= 4.5) {
    disorderLevel = 1; // 整っている
  } else if (avgTotalScore >= 3.5) {
    disorderLevel = 2; // やや乱れている
  } else if (avgTotalScore >= 2.5) {
    disorderLevel = 3; // 乱れている
  } else {
    disorderLevel = 4; // かなり乱れている
  }

  const disorderNames = ['', '整っている', 'やや乱れている', '乱れている', 'かなり乱れている'];

  return {
    mainPersonality,
    mainScore: Math.round(sorted[0].avg * 10) / 10,
    subPersonality,
    subScore: Math.round(sorted[1].avg * 10) / 10,
    currentDisorder: disorderNames[disorderLevel],
    disorderLevel,
    timestamp: Date.now(),
  };
}

export function saveDiagnosisResult(result: DiagnosisResult): void {
  const history = getDiagnosisHistory();
  history.push(result);
  localStorage.setItem('tsukineka_diagnosis_history', JSON.stringify(history));
  localStorage.setItem('tsukineka_latest_result', JSON.stringify(result));
}

export function getDiagnosisHistory(): DiagnosisResult[] {
  const stored = localStorage.getItem('tsukineka_diagnosis_history');
  return stored ? JSON.parse(stored) : [];
}

export function getLatestResult(): DiagnosisResult | null {
  const stored = localStorage.getItem('tsukineka_latest_result');
  return stored ? JSON.parse(stored) : null;
}

export function clearDiagnosisData(): void {
  localStorage.removeItem('tsukineka_diagnosis_history');
  localStorage.removeItem('tsukineka_latest_result');
}
