import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';

export default function Onboarding() {
  const { setStep } = useDiagnosis();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="text-6xl mb-4">🌙</div>
        <h1 className="text-4xl font-bold text-gray-900">月音香診断</h1>
        <p className="text-lg text-gray-600">
          あなたの心の状態を診断します。15の質問に答えることで、あなたの気質と今の心の乱れが分かります。
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left space-y-2">
          <h3 className="font-semibold text-blue-900">診断でわかること</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ あなたの基本気質（メイン・サブ）</li>
            <li>✓ 今の心の乱れレベル</li>
            <li>✓ 今日の整え方のアドバイス</li>
          </ul>
        </div>

        <Button
          onClick={() => setStep('diagnosis')}
          size="lg"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          診断を始める
        </Button>

        <button
          onClick={() => setStep('disclaimer')}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          免責表示を見る
        </button>
      </div>
    </div>
  );
}
