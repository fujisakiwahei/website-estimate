import { useState } from 'react'
import { SectionHeader } from './GlobalSettings'

export default function HearingText({ state }) {
  const [copied, setCopied] = useState(false)

  const text = generateHearingText(state)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section className="pb-10">
      <SectionHeader title="ヒアリング文" color="green" />
      <div className="border border-gray-200 p-5 bg-gray-50">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {text}
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="mt-3 w-full border border-gray-300 text-gray-600 text-sm py-3 hover:border-black hover:text-black transition-colors cursor-pointer"
      >
        {copied ? 'コピーしました！' : 'ヒアリング文をコピー'}
      </button>
    </section>
  )
}

function generateHearingText(state) {
  const client = state.clientName ? `\n宛先：${state.clientName}\n` : ''

  return `【Webサイト制作のご確認事項】${client}
お見積もりにあたり、以下の点を確認させてください。

■ ページ構成
・制作するページ数（URL単位）と各ページの役割を教えてください。
・ページごとに「シンプル」か「複雑なレイアウト」かも教えていただけると助かります。

■ アニメーション・インタラクション
・スクロールアニメーション、パララックス、ページトランジションなど
　ご希望の演出があればお知らせください。

■ フォーム
・お問い合わせフォームや予約フォームの数を教えてください。
・複数ある場合、デザインは共通ですか？

■ WordPress
・WordPressでの構築をご希望ですか？

■ カスタム投稿タイプ
・ニュース・施工事例など更新が必要なコンテンツはありますか？
　その場合、何種類の投稿タイプが必要かお知らせください。

■ 公開作業
・サーバーへのアップロード・DNS設定等の公開作業もご依頼いただけますか？`
}
