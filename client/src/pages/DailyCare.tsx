import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';

const CARE_SUGGESTIONS = {
  luna: {
    name: '月の猫',
    suggestions: [
      { title: '瞑想の時間', description: '静かな環境で10分の瞑想を行いましょう' },
      { title: '日記を書く', description: '今日の思いや感情を書き出してみてください' },
      { title: '月を眺める', description: '夜空を眺めてリセットしましょう' },
    ],
  },
  sol: {
    name: '太陽の猫',
    suggestions: [
      { title: '外出する', description: '日光を浴びて気分をリフレッシュしましょう' },
      { title: '運動する', description: 'ウォーキングやヨガで体を動かしましょう' },
      { title: '友人と過ごす', description: '誰かと一緒に時間を過ごしましょう' },
    ],
  },
  star: {
    name: '星の猫',
    suggestions: [
      { title: '創作活動', description: '絵を描いたり、音楽を聴いたりしましょう' },
      { title: '新しいことに挑戦', description: '新しいレシピやスキルに挑戦してみましょう' },
      { title: '自分の時間を大切に', description: '好きなことに没頭する時間を作りましょう' },
    ],
  },
  wind: {
    name: '風の猫',
    suggestions: [
      { title: 'リラックス', description: 'アロマテラピーやバスタイムでリラックスしましょう' },
      { title: '柔軟性を保つ', description: 'ストレッチで体をほぐしましょう' },
      { title: '変化を楽しむ', description: 'いつもと違うルーティンを試してみましょう' },
    ],
  },
};

export default function DailyCare() {
  const { state, setStep } = useDiagnosis();
  const result = state.result;

  if (!result) {
    return <div>結果がありません</div>;
  }

  const suggestions = CARE_SUGGESTIONS[result.mainPersonality as keyof typeof CARE_SUGGESTIONS];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">月音香 今日の整え方</h1>
          <p className="text-gray-600">{suggestions?.name}のあなたへのアドバイス</p>
        </div>

        {/* 心の乱れレベルに応じたメッセージ */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900">
            {result.disorderLevel === 1 &&
              '心が整っています。このバランスを保つために、今日のアドバイスを参考にしてください。'}
            {result.disorderLevel === 2 &&
              'ストレスが少しあります。以下のアドバイスを実践して、心をリセットしましょう。'}
            {result.disorderLevel === 3 &&
              'ストレスが溜まっています。今日のアドバイスを積極的に取り入れてください。'}
            {result.disorderLevel === 4 &&
              'かなりストレスを感じています。まずは以下のアドバイスから始めてみてください。'}
          </p>
        </div>

        {/* 提案 */}
        <div className="space-y-4">
          {suggestions?.suggestions.map((suggestion, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
              <p className="text-gray-600 text-sm">{suggestion.description}</p>
            </div>
          ))}
        </div>

        {/* アクション */}
        <div className="space-y-3">
          <Button
            onClick={() => setStep('result')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            結果に戻る
          </Button>
          <Button
            onClick={() => setStep('premium')}
            variant="outline"
            className="w-full py-6"
          >
            プレミアム機能を見る
          </Button>
        </div>
      </div>
    </div>
  );
}
