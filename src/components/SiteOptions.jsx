import { SectionHeader, Field } from './GlobalSettings'

export default function SiteOptions({ state, dispatch }) {
  const setOption = (field) => (value) => {
    dispatch({ type: 'SET_SITE_OPTION', field, value })
  }

  return (
    <section>
      <SectionHeader title="サイト全体オプション" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </section>
  )
}

function Toggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-4 py-2 border text-sm transition-colors w-fit mt-1 ${
        value
          ? 'bg-black text-white border-black'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
      }`}
    >
      <span
        className={`w-3 h-3 border-2 transition-colors ${
          value ? 'bg-white border-white' : 'bg-white border-gray-400'
        }`}
      />
      {label}
    </button>
  )
}
