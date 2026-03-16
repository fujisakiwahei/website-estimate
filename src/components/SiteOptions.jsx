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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Field label="WordPress（+2h）">
          <ToggleSwitch
            value={state.wordpress}
            onChange={setOption('wordpress')}
          />
        </Field>

        <Field label="カスタムフィールド数（投稿タイプ）">
          <input
            type="number"
            value={state.customFieldCount}
            onChange={(e) => setOption('customFieldCount')(Number(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
            min={0}
            inputMode="numeric"
            className="input"
          />
          <span className="text-xs text-gray-400">1タイプあたり 1.5h</span>
        </Field>

        <Field label="公開作業（+2h）">
          <ToggleSwitch
            value={state.publishing}
            onChange={setOption('publishing')}
          />
        </Field>
      </div>

      {/* 流し込みページ数 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="流し込みページ数">
          <input
            type="number"
            value={state.contentFillCount}
            onChange={(e) => setOption('contentFillCount')(Number(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
            min={0}
            inputMode="numeric"
            className="input"
          />
          <span className="text-xs text-gray-400">
            {state.contentFillCount > 0
              ? `${state.contentFillCount}ページ × ¥${state.contentFillRate.toLocaleString()} = ¥${(state.contentFillCount * state.contentFillRate).toLocaleString()}`
              : <>1ページあたりの金額は<button type="button" onClick={() => document.getElementById('global-settings')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-500 underline cursor-pointer">基本設定</button>で設定</>}
          </span>
        </Field>
      </div>
    </section>
  )
}

function ToggleSwitch({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 mt-1 cursor-pointer group"
      aria-checked={value}
      role="switch"
    >
      <span
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${
          value ? 'bg-indigo-500' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      <span className={`text-sm ${value ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
        {value ? 'あり' : 'なし'}
      </span>
    </button>
  )
}
