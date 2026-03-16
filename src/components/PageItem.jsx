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

const FORM_COUNTS = [0, 1, 2, 3, 4]

export default function PageItem({ page, index, canRemove, dispatch }) {
  const update = (field) => (e) => {
    dispatch({ type: 'UPDATE_PAGE', id: page.id, field, value: e.target.value })
  }

  return (
    <div className="border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-sky-500 uppercase tracking-widest">
          Page {index + 1}
        </span>
        {canRemove && (
          <button
            onClick={() => dispatch({ type: 'REMOVE_PAGE', id: page.id })}
            className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-1">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="フォーム数">
          <div className="flex gap-2 mt-1">
            {FORM_COUNTS.map((n) => (
              <label key={n} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name={`form-count-${page.id}`}
                  value={n}
                  checked={page.formCount === n}
                  onChange={() => dispatch({ type: 'UPDATE_PAGE', id: page.id, field: 'formCount', value: n })}
                  className="accent-black"
                />
                <span className="text-sm text-gray-700">{n}</span>
              </label>
            ))}
          </div>
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
