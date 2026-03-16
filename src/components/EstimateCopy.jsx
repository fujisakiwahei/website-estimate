import { useState } from 'react'
import { calcEstimate, formatCurrency, formatHours } from '../utils/calculate'
import { SectionHeader } from './GlobalSettings'
import { ANIMATIONS, PAGE_TYPES } from './PageItem'

function getPageTypeLabel(type) {
  return PAGE_TYPES.find((t) => t.value === type)?.label ?? type
}
function getAnimLabel(anim) {
  return ANIMATIONS.find((a) => a.value === anim)?.label ?? anim
}

export default function EstimateCopy({ state }) {
  const [copied, setCopied] = useState(false)
  const [includeClient, setIncludeClient] = useState(true)
  const [includeBuffer, setIncludeBuffer] = useState(true)
  const [includeDate, setIncludeDate] = useState(true)

  const est = calcEstimate(state)

  const generateText = () => {
    const lines = []
    lines.push('【お見積もり】')
    if (includeClient && state.clientName) lines.push(`クライアント：${state.clientName}`)
    if (includeDate) lines.push(`作成日：${state.createdDate}`)
    lines.push('')
    lines.push('■ ページ別内訳')
    est.pageResults.forEach(({ page, hours }, i) => {
      const name = page.name || `ページ${i + 1}`
      lines.push(`  ${name}（${getPageTypeLabel(page.type)}）：${formatHours(hours)}　${formatCurrency(hours * state.hourlyRate)}`)
      if (page.formCount > 0) lines.push(`    └ フォーム ${page.formCount}件`)
    })
    lines.push('')
    lines.push('■ サイト全体')
    if (est.animationHours > 0) {
      lines.push(`  アニメーション（${state.animations.filter(a => a !== 'svg_canvas').map(getAnimLabel).join('・')}）：${formatHours(est.animationHours)}　${formatCurrency(est.animationHours * state.hourlyRate)}`)
    }
    if (state.wordpress) lines.push(`  WordPress：${formatHours(est.wordpressHours)}　${formatCurrency(est.wordpressHours * state.hourlyRate)}`)
    if (state.customFieldCount > 0) lines.push(`  カスタムフィールド（${state.customFieldCount}タイプ）：${formatHours(est.customFieldHours)}　${formatCurrency(est.customFieldHours * state.hourlyRate)}`)
    lines.push(`  テスト（${est.pageCount}ページ × ¥2,000）：${formatCurrency(est.testAmount)}`)
    if (state.publishing) lines.push(`  公開作業：${formatHours(est.publishingHours)}　${formatCurrency(est.publishingHours * state.hourlyRate)}`)
    if (state.publishing) lines.push(`  公開後テスト：${formatHours(est.postLaunchTestHours)}　${formatCurrency(est.postLaunchTestHours * state.hourlyRate)}`)
    if (state.contentFillCount > 0) lines.push(`  流し込み（${state.contentFillCount}ページ）：${formatCurrency(est.contentFillAmount)}`)
    lines.push('')
    lines.push(`合計工数：${formatHours(est.siteTotal)}`)
    lines.push(`小計：${formatCurrency(est.subtotal)}`)
    if (includeBuffer) {
      lines.push(`バッファ（${state.bufferRate}%）：${formatCurrency(est.bufferAmount)}`)
    }
    lines.push(`テスト：${formatCurrency(est.testAmount)}`)
    if (state.contentFillCount > 0) lines.push(`流し込み：${formatCurrency(est.contentFillAmount)}`)
    lines.push('')
    const displayTotal = includeBuffer ? est.total : est.subtotal + est.testAmount + est.contentFillAmount
    lines.push(`合計（税抜）：${formatCurrency(displayTotal)}`)
    if (est.hasSvgCanvas) lines.push('※ SVG・Canvasアニメーションは別途お見積もりになります')
    return lines.join('\n')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateText()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="estimate-copy" className="pb-10">
      <SectionHeader title="見積もり文コピー" color="yellow" />

      <div className="flex flex-wrap gap-6 mb-5">
        <CheckOption
          checked={includeClient}
          onChange={setIncludeClient}
          label="クライアント名を含める"
        />
        <CheckOption
          checked={includeBuffer}
          onChange={setIncludeBuffer}
          label={`バッファを含める（${state.bufferRate}%）`}
        />
        <CheckOption
          checked={includeDate}
          onChange={setIncludeDate}
          label="作成日を含める"
        />
      </div>

      <div className="border border-gray-200 p-5 bg-gray-50 mb-3">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
          {generateText()}
        </pre>
      </div>

      <button
        onClick={handleCopy}
        className="w-full border border-black text-black text-sm py-3 hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        {copied ? 'コピーしました！' : '見積もり文をコピー'}
      </button>
    </section>
  )
}

function CheckOption({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`w-4 h-4 border flex items-center justify-center transition-colors ${
          checked ? 'bg-indigo-500 border-indigo-500' : 'bg-white border-gray-300'
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}
