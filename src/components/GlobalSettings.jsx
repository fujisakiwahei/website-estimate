export default function GlobalSettings({ state, dispatch }) {
  const set = (field) => (e) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    dispatch({ type: 'SET_GLOBAL', field, value })
  }

  return (
    <section>
      <SectionHeader title="基本設定" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="プロジェクト名">
          <input
            type="text"
            value={state.projectName}
            onChange={set('projectName')}
            placeholder="例：株式会社〇〇 コーポレートサイト"
            className="input"
          />
        </Field>
        <Field label="クライアント名">
          <input
            type="text"
            value={state.clientName}
            onChange={set('clientName')}
            placeholder="例：株式会社〇〇"
            className="input"
          />
        </Field>
        <Field label="時給（円）">
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
      </div>
    </section>
  )
}

export function SectionHeader({ title }) {
  return (
    <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-gray-100">
      {title}
    </h2>
  )
}

export function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">{label}</label>
      {children}
    </div>
  )
}
