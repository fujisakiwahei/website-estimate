import { Field } from './GlobalSettings'

const PAGE_TYPES = [
  { value: 'top', label: 'トップ', hours: 8 },
  { value: 'sub_simple', label: '下層（シンプル）', hours: 2.5 },
  { value: 'sub_complex', label: '下層（複雑）', hours: 5 },
]

const ANIMATIONS = [
  { value: 'scroll_fade', label: 'スクロールアニメーション', hours: 2 },
  { value: 'hover', label: 'ホバーエフェクト', hours: 1 },
  { value: 'parallax', label: 'パララックス', hours: 3 },
  { value: 'transition', label: 'ページトランジション', hours: 2 },
  { value: 'loading', label: 'ローディングアニメーション', hours: 5 },
  { value: 'svg_canvas', label: 'SVG・Canvasアニメーション', hours: null },
  { value: 'modal_drawer', label: 'モーダル・ドロワー', hours: 2 },
  { value: 'tab_accordion', label: 'タブ・アコーディオン', hours: 1 },
]

export { PAGE_TYPES, ANIMATIONS }

export default function PageItem({ page, index, canRemove, dispatch }) {
  const update = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    dispatch({ type: 'UPDATE_PAGE', id: page.id, field, value })
  }

  const toggleAnimation = (anim) => {
    dispatch({ type: 'TOGGLE_ANIMATION', id: page.id, animation: anim })
  }

  return (
    <div className="border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          Page {index + 1}
        </span>
        {canRemove && (
          <button
            onClick={() => dispatch({ type: 'REMOVE_PAGE', id: page.id })}
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            削除
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Field label="ページ名">
          <input
            type="text"
            value={page.name}
            onChange={update('name')}
            placeholder="例：トップ、会社概要"
            className="input"
          />
        </Field>

        <Field label="ページ種別">
          <div className="flex gap-3 mt-1">
            {PAGE_TYPES.map((t) => (
              <label key={t.value} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name={`type-${page.id}`}
                  value={t.value}
                  checked={page.type === t.value}
                  onChange={update('type')}
                  className="accent-black"
                />
                <span className="text-sm text-gray-700">{t.label}</span>
              </label>
            ))}
          </div>
        </Field>
      </div>

      <div className="mb-4">
        <Field label="アニメーション・インタラクション">
          <div className="flex flex-wrap gap-2 mt-1">
            {ANIMATIONS.map((a) => (
              <label
                key={a.value}
                className={`flex items-center gap-1.5 px-3 py-1.5 border text-sm cursor-pointer transition-colors ${
                  page.animations.includes(a.value)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={page.animations.includes(a.value)}
                  onChange={() => toggleAnimation(a.value)}
                  className="sr-only"
                />
                {a.label}
                {a.hours === null ? (
                  <span className="text-xs opacity-60">別途</span>
                ) : (
                  <span className="text-xs opacity-60">{a.hours}h</span>
                )}
              </label>
            ))}
          </div>
          {page.animations.includes('svg_canvas') && (
            <p className="text-xs text-gray-400 mt-2">
              ※ SVG・Canvasアニメーションは別途お見積もりになります
            </p>
          )}
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="フォーム数">
          <input
            type="number"
            value={page.formCount}
            onChange={update('formCount')}
            min={0}
            className="input"
          />
        </Field>

        {page.formCount >= 2 && (
          <Field label="2件目以降のデザイン">
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name={`form-design-${page.id}`}
                  checked={page.formSameDesign === true}
                  onChange={() => dispatch({ type: 'UPDATE_PAGE', id: page.id, field: 'formSameDesign', value: true })}
                  className="accent-black"
                />
                <span className="text-sm text-gray-700">同デザイン（2h/件）</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name={`form-design-${page.id}`}
                  checked={page.formSameDesign === false}
                  onChange={() => dispatch({ type: 'UPDATE_PAGE', id: page.id, field: 'formSameDesign', value: false })}
                  className="accent-black"
                />
                <span className="text-sm text-gray-700">別デザイン（4h/件）</span>
              </label>
            </div>
          </Field>
        )}
      </div>
    </div>
  )
}
