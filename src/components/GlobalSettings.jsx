export default function GlobalSettings({ state, dispatch }) {
  const set = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    dispatch({ type: 'SET_GLOBAL', field, value })
  }

  return (
    <div className="space-y-5">
      <h2 className="text-sm font-semibold tracking-wide text-sky-900 bg-sky-50 border-l-4 border-sky-400 px-4 py-2.5 -mx-6">
        基本設定
      </h2>
      <Field label="クライアント名">
        <input
          type="text"
          value={state.clientName}
          onChange={set('clientName')}
          placeholder="株式会社〇〇"
          className="input"
        />
      </Field>
      <Field label="時間あたり単価（円）">
        <input
          type="number"
          value={state.hourlyRate}
          onChange={set('hourlyRate')}
          min={0}
          className="input"
        />
      </Field>
      <Field label="バッファ率（%）">
        <input
          type="number"
          value={state.bufferRate}
          onChange={set('bufferRate')}
          min={0}
          max={100}
          className="input"
        />
      </Field>
      <Field label="作成日">
        <input
          type="date"
          value={state.createdDate}
          onChange={set('createdDate')}
          className="input"
        />
      </Field>
      <Field label="流し込み単価（円/ページ）">
        <input
          type="number"
          value={state.contentFillRate}
          onChange={set('contentFillRate')}
          min={0}
          className="input"
        />
      </Field>
    </div>
  )
}

export function SectionHeader({ title, color = 'sky' }) {
  const styles = {
    sky: 'text-sky-900 bg-sky-50 border-sky-400',
    yellow: 'text-yellow-900 bg-yellow-50 border-yellow-400',
    green: 'text-green-900 bg-green-50 border-green-400',
  }
  return (
    <h2 className={`text-sm font-semibold tracking-wide border-l-4 px-4 py-2.5 mb-5 -mx-4 md:-mx-10 ${styles[color]}`}>
      {title}
    </h2>
  )
}

export function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-black">{label}</label>
      {children}
    </div>
  )
}
