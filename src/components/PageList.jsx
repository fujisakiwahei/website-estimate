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
        className="mt-4 w-full bg-sky-50 border border-sky-300 text-sky-700 font-medium text-sm py-3 hover:bg-sky-100 hover:border-sky-400 transition-colors cursor-pointer"
      >
        ＋ ページを追加
      </button>
    </section>
  )
}
