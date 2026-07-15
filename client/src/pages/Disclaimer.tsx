import { Button } from '@/components/ui/button';
import { useDiagnosis } from '@/contexts/DiagnosisContext';

export default function Disclaimer() {
  const { setStep } = useDiagnosis();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">免責表示</h1>
        </div>

        {/* コンテンツ */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 text-gray-700 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">1. 診断の目的</h2>
            <p>
              本診断は、あなたの心理的特性と現在の心の状態を理解するための参考情報を提供することを目的としています。医学的診断ではありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">2. 医学的効力について</h2>
            <p>
              本診断の結果は、医学的な診断や治療の代わりになるものではありません。心身の不調を感じた場合は、必ず医師や専門家にご相談ください。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">3. 個人差について</h2>
            <p>
              診断結果は、一般的な傾向に基づいています。個人差が大きく、すべての人に当てはまるわけではありません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">4. 提供情報の正確性</h2>
            <p>
              本アプリケーションは、提供される情報の正確性、完全性、有用性について、いかなる保証もいたしません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">5. 利用者の責任</h2>
            <p>
              本診断の結果に基づいて行った行動および、その結果について、当社は一切の責任を負いません。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-semibold text-gray-900">6. プライバシー</h2>
            <p>
              診断データはお客様のデバイスに保存されます。詳細はプライバシーポリシーをご参照ください。
            </p>
          </section>
        </div>

        {/* アクション */}
        <div className="space-y-3">
          <Button
            onClick={() => setStep('onboarding')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
          >
            同意して戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
