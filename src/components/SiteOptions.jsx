import { SectionHeader, Field } from './GlobalSettings'
import { ANIMATIONS } from './PageItem'

export default function SiteOptions({ state, dispatch }) {
  const setOption = (field) => (value) => {
    dispatch({ type: 'SET_SITE_OPTION', field, value })
  }

  const toggleAnimation = (anim) => {
    dispatch({ type: 'TOGGLE_ANIMATION', animation: anim })
  }

  return (
    <section>
      <SectionHeader title="サイト全体" />

      {/* アニメーション */}
      <div className="mb-6">
        <Field label="アニメーション・インタラクション">
          <div className="flex flex-wrap gap-2 mt-1">
            {ANIMATIONS.map((a) => (
              <label
                key={a.value}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-sm cursor-pointer transition-colors ${
                  state.animations.includes(a.value)
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={state.animations.includes(a.value)}
                  onChange={() => toggleAnimation(a.value)}
                  className="sr-only"
                />
                {a.label}
                {a.hours === null ? (
                  <span className="text-xs opacity-70">別途</span>
                ) : (
                  <span className="text-xs opacity-70">{a.hours}h</span>
                )}
              </label>
            ))}
          </div>
          {state.animations.includes('svg_canvas') && (
            <p className="text-xs text-gray-400 mt-2">
              ※ SVG・Canvasアニメーションは別途お見積もりになります
            </p>
          )}
        </Field>
      </div>

      {/* その他オプション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Field label="WordPress">
          <Toggle
            value={state.wordpress}
            onChange={setOption('wordpress')}
            label={`${state.wordpress ? 'あり' : 'なし'}（+2h）`}
          />
        </Field>

        <Field label="カスタムフィールド数（投稿タイプ）">
          <input
            type="number"
            value={state.customFieldCount}
            onChange={(e) => setOption('customFieldCount')(Number(e.target.value))}
            min={0}
            className="input"
          />
          <span className="text-xs text-gray-400 mt-1">1タイプあたり 1.5h</span>
        </Field>

        <Field label="公開作業">
          <Toggle
            value={state.publishing}
            onChange={setOption('publishing')}
            label={`${state.publishing ? 'あり' : 'なし'}（+3h）`}
          />
        </Field>
      </div>

      {/* 流し込みページ数 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="流し込みページ数">
          <input
            type="number"
            value={state.contentFillCount}
            onChange={(e) => setOption('contentFillCount')(Number(e.target.value))}
            min={0}
            className="input"
          />
          <span className="text-xs text-gray-400 mt-1">
            {state.contentFillCount > 0
              ? `${state.contentFillCount}ページ × ¥${state.contentFillRate.toLocaleString()} = ¥${(state.contentFillCount * state.contentFillRate).toLocaleString()}`
              : '1ページあたりの金額はサイドバーで設定'}
          </span>
        </Field>
      </div>
    </section>
  )
}

function Toggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`px-4 py-2 border text-sm transition-colors w-fit mt-1 ${
        value
          ? 'bg-indigo-500 text-white border-indigo-500'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
      }`}
    >
      {label}
    </button>
  )
}
