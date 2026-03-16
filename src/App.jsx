import { useReducer } from 'react'
import './App.css'
import GlobalSettings from './components/GlobalSettings'
import PageList from './components/PageList'
import SiteOptions from './components/SiteOptions'
import EstimateResult from './components/EstimateResult'
import HearingText from './components/HearingText'

const today = new Date().toISOString().slice(0, 10)

const initialState = {
  projectName: '',
  clientName: '',
  createdDate: today,
  hourlyRate: 5000,
  bufferRate: 20,
  pages: [
    {
      id: 1,
      name: 'トップ',
      type: 'top',
      animations: [],
      formCount: 0,
      formSameDesign: true,
    },
  ],
  wordpress: false,
  customFieldCount: 0,
  publishing: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_GLOBAL':
      return { ...state, [action.field]: action.value }
    case 'ADD_PAGE':
      return {
        ...state,
        pages: [
          ...state.pages,
          {
            id: Date.now(),
            name: '',
            type: 'sub_simple',
            animations: [],
            formCount: 0,
            formSameDesign: true,
          },
        ],
      }
    case 'REMOVE_PAGE':
      return { ...state, pages: state.pages.filter((p) => p.id !== action.id) }
    case 'UPDATE_PAGE':
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.id === action.id ? { ...p, [action.field]: action.value } : p
        ),
      }
    case 'TOGGLE_ANIMATION': {
      const page = state.pages.find((p) => p.id === action.id)
      const has = page.animations.includes(action.animation)
      const updated = has
        ? page.animations.filter((a) => a !== action.animation)
        : [...page.animations, action.animation]
      return {
        ...state,
        pages: state.pages.map((p) =>
          p.id === action.id ? { ...p, animations: updated } : p
        ),
      }
    }
    case 'SET_SITE_OPTION':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-medium tracking-tight text-black">
            Web見積もりツール
          </h1>
          <p className="text-sm text-gray-400 mt-1">Webサイトコーディング工数・金額自動計算</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <GlobalSettings state={state} dispatch={dispatch} />
        <PageList state={state} dispatch={dispatch} />
        <SiteOptions state={state} dispatch={dispatch} />
        <EstimateResult state={state} />
        <HearingText state={state} />
      </main>

      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-6 text-xs text-gray-400">
          Web見積もりツール
        </div>
      </footer>
    </div>
  )
}
