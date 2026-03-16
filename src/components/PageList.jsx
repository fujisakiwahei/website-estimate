import PageItem from './PageItem'
import { SectionHeader } from './GlobalSettings'

export default function PageList({ state, dispatch }) {
  return (
    <section>
      <SectionHeader title="ページ設定" />
      <div className="space-y-4">
        {state.pages.map((page, index) => (
          <PageItem
            key={page.id}
            page={page}
            index={index}
            canRemove={state.pages.length > 1}
            dispatch={dispatch}
          />
        ))}
      </div>
      <button
        onClick={() => dispatch({ type: 'ADD_PAGE' })}
        className="mt-4 w-full border border-dashed border-gray-300 text-gray-400 text-sm py-3 hover:border-black hover:text-black transition-colors"
      >
        ＋ ページを追加
      </button>
    </section>
  )
}
