import { calcEstimate, formatCurrency, formatHours } from '../utils/calculate'
import { SectionHeader } from './GlobalSettings'
import { ANIMATIONS, PAGE_TYPES } from './PageItem'

function getPageTypeLabel(type) {
  return PAGE_TYPES.find((t) => t.value === type)?.label ?? type
}

function getAnimLabel(anim) {
  return ANIMATIONS.find((a) => a.value === anim)?.label ?? anim
}

export default function EstimateResult({ state }) {
  const est = calcEstimate(state)

  return (
    <section>
      <SectionHeader title="見積もり結果" color="yellow" />

      {state.clientName ? (
        <div className="mb-6">
          <p className="text-sm font-medium text-black">{state.clientName}　<span className="text-gray-400 font-normal">{state.createdDate}</span></p>
        </div>
      ) : null}

      {/* ページ別内訳 */}
      <div className="border border-gray-200 mb-4">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">ページ別内訳</span>
        </div>
        {est.pageResults.map(({ page, hours }, i) => (
          <div key={page.id} className="px-5 py-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm font-medium text-black">
                  {page.name || `ページ${i + 1}`}
                </span>
                <span className="text-xs text-gray-400 ml-2">{getPageTypeLabel(page.type)}</span>
                {page.formCount > 0 && (
                  <p className="text-xs text-gray-400 mt-1">フォーム {page.formCount}件</p>
                )}
              </div>
              <div className="text-right ml-4">
                <span className="text-sm font-mono text-black">{formatHours(hours)}</span>
                <p className="text-xs text-gray-400">{formatCurrency(hours * state.hourlyRate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* サイト全体 */}
      <div className="border border-gray-200 mb-6">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">サイト全体</span>
        </div>
        {est.animationHours > 0 && (
          <div className="px-5 py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm text-gray-700">アニメーション・インタラクション</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {state.animations.filter(a => a !== 'svg_canvas').map((a) => (
                    <span key={a} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600">{getAnimLabel(a)}</span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4">
                <span className="text-sm font-mono text-black">{formatHours(est.animationHours)}</span>
                <p className="text-xs text-gray-400">{formatCurrency(est.animationHours * state.hourlyRate)}</p>
              </div>
            </div>
          </div>
        )}
        {state.wordpress && (
          <Row label="WordPress" hours={est.wordpressHours} rate={state.hourlyRate} />
        )}
        {state.customFieldCount > 0 && (
          <Row
            label={`カスタムフィールド（${state.customFieldCount}タイプ）`}
            hours={est.customFieldHours}
            rate={state.hourlyRate}
          />
        )}
        <div className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
          <span className="text-sm text-gray-700">テスト（{est.pageCount}ページ × ¥2,000）</span>
          <span className="text-sm font-mono text-black">{formatCurrency(est.testAmount)}</span>
        </div>
        {state.publishing && (
          <Row label="公開作業" hours={est.publishingHours} rate={state.hourlyRate} />
        )}
        {state.publishing && (
          <Row label="公開後テスト" hours={est.postLaunchTestHours} rate={state.hourlyRate} />
        )}
        {state.contentFillCount > 0 && (
          <div className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
            <span className="text-sm text-gray-700">流し込み（{state.contentFillCount}ページ × ¥{state.contentFillRate.toLocaleString()}）</span>
            <span className="text-sm font-mono text-black">{formatCurrency(est.contentFillAmount)}</span>
          </div>
        )}
      </div>

      {/* 合計 */}
      <div className="border border-black p-5 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">合計工数</span>
          <span className="font-mono">{formatHours(est.siteTotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            小計（{formatHours(est.siteTotal)} × ¥{state.hourlyRate.toLocaleString()}/時間）
          </span>
          <span className="font-mono">{formatCurrency(est.subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">バッファ（{state.bufferRate}%）</span>
          <span className="font-mono">{formatCurrency(est.bufferAmount)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">テスト（{est.pageCount}ページ × ¥2,000）</span>
          <span className="font-mono">{formatCurrency(est.testAmount)}</span>
        </div>
        {state.contentFillCount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">流し込み</span>
            <span className="font-mono">{formatCurrency(est.contentFillAmount)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="font-medium text-black">合計（税抜）</span>
          <span className="text-2xl font-light font-mono text-black">{formatCurrency(est.total)}</span>
        </div>
        {est.hasSvgCanvas && (
          <p className="text-xs text-gray-500 pt-1">
            ※ SVG・Canvasアニメーションは別途お見積もりになります
          </p>
        )}
      </div>

      <button
        onClick={() => document.getElementById('estimate-copy')?.scrollIntoView({ behavior: 'smooth' })}
        className="mt-4 w-full border border-black text-black text-sm py-3 hover:bg-black hover:text-white transition-colors cursor-pointer"
      >
        見積もりをコピー ↓
      </button>
    </section>
  )
}

function Row({ label, hours, rate }) {
  return (
    <div className="px-5 py-3 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="text-right">
        <span className="text-sm font-mono text-black">{formatHours(hours)}</span>
        <span className="text-xs text-gray-400 ml-3">{formatCurrency(hours * rate)}</span>
      </div>
    </div>
  )
}
