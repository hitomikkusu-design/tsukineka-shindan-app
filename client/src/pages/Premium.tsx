import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';
import { Check } from 'lucide-react';

export default function Premium() {
  const { setStep } = useDiagnosis();

  const features = [
    { name: '診断履歴の保存', included: true },
    { name: '詳細な気質分析', included: false },
    { name: 'パーソナライズされたアドバイス', included: false },
    { name: '毎日の心の状態トラッキング', included: false },
    { name: 'AI による最適化提案', included: false },
    { name: '専門家へのアクセス', included: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">プレミアム機能</h1>
          <p className="text-gray-600">さらに詳しい分析とアドバイスを受けましょう</p>
        </div>

        {/* 価格プラン */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 border-2 border-purple-300 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-purple-600">PREMIUM</div>
            <div className="text-4xl font-bold text-gray-900">
              ¥980<span className="text-lg text-gray-600">/月</span>
            </div>
          </div>
          <p className="text-gray-600">最初の7日間は無料でお試しいただけます</p>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6">
            プレミアムに登録する
          </Button>
        </div>

        {/* 機能比較 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">含まれる機能</h3>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                feature.included ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center ${
                  feature.included ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                {feature.included && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        {/* アクション */}
        <div className="space-y-3">
          <Button
            onClick={() => setStep('result')}
            variant="outline"
            className="w-full py-6"
          >
            戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
