import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';
import { PERSONALITY_TYPES } from '@/data/questions';

export default function Result() {
  const { state, setStep, resetDiagnosis } = useDiagnosis();
  const result = state.result;

  if (!result) {
    return <div>結果がありません</div>;
  }

  const mainPersonality = PERSONALITY_TYPES.find((p) => p.id === result.mainPersonality);
  const subPersonality = PERSONALITY_TYPES.find((p) => p.id === result.subPersonality);

  const disorderColors = {
    1: 'bg-green-50 border-green-200',
    2: 'bg-yellow-50 border-yellow-200',
    3: 'bg-orange-50 border-orange-200',
    4: 'bg-red-50 border-red-200',
  };

  const disorderTextColors = {
    1: 'text-green-900',
    2: 'text-yellow-900',
    3: 'text-orange-900',
    4: 'text-red-900',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">月音香診断結果</h1>
          <p className="text-gray-600">あなたの心の状態が分かりました</p>
        </div>

        {/* メイン気質 */}
        <div className="bg-white border-2 border-purple-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">メイン気質</h2>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-600">{mainPersonality?.name}</div>
            <p className="text-gray-600">{mainPersonality?.description}</p>
            <div className="text-sm text-gray-500">スコア: {result.mainScore}/5</div>
          </div>
        </div>

        {/* サブ気質 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">サブ気質</h2>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-700">{subPersonality?.name}</div>
            <p className="text-gray-600">{subPersonality?.description}</p>
            <div className="text-sm text-gray-500">スコア: {result.subScore}/5</div>
          </div>
        </div>

        {/* 今の乱れ */}
        <div
          className={`border-2 rounded-lg p-6 space-y-4 ${disorderColors[result.disorderLevel as keyof typeof disorderColors]}`}
        >
          <h2 className={`text-lg font-semibold ${disorderTextColors[result.disorderLevel as keyof typeof disorderTextColors]}`}>
            今の心の状態
          </h2>
          <div className="space-y-2">
            <div className={`text-3xl font-bold ${disorderTextColors[result.disorderLevel as keyof typeof disorderTextColors]}`}>
              {result.currentDisorder}
            </div>
            <p className="text-gray-600">
              {result.disorderLevel === 1 && 'バランスの取れた良い状態です。このまま保つよう心がけましょう。'}
              {result.disorderLevel === 2 && 'ストレスが少し溜まっています。リラックスの時間を作りましょう。'}
              {result.disorderLevel === 3 && 'ストレスが溜まっています。今日の整え方を参考に対策しましょう。'}
              {result.disorderLevel === 4 && 'かなりストレスを感じています。今日の整え方を実践することをお勧めします。'}
            </p>
          </div>
        </div>

        {/* アクション */}
        <div className="space-y-3">
          <Button
            onClick={() => setStep('daily-care')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            今日の整え方を見る
          </Button>
          <Button
            onClick={() => setStep('premium')}
            variant="outline"
            className="w-full py-6"
          >
            プレミアム機能を見る
          </Button>
          <Button
            onClick={() => {
              resetDiagnosis();
            }}
            variant="ghost"
            className="w-full py-6"
          >
            もう一度診断する
          </Button>
        </div>
      </div>
    </div>
  );
}
