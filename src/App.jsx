import { useReducer } from 'react'
import './App.css'
import GlobalSettings from './components/GlobalSettings'
import PageList from './components/PageList'
import SiteOptions from './components/SiteOptions'
import EstimateResult from './components/EstimateResult'
import HearingText from './components/HearingText'
import EstimateCopy from './components/EstimateCopy'

const today = new Date().toISOString().slice(0, 10)

const initialState = {
  clientName: '',
  createdDate: today,
  hourlyRate: 5000,
  bufferRate: 20,
  pages: [
    {
      id: 1,
      name: 'トップ',
      type: 'top',
      formCount: 0,
      formSameDesign: true,
    },
  ],
  animations: [],
  wordpress: false,
  customFieldCount: 0,
  publishing: false,
  contentFillCount: 0,
  contentFillRate: 3000,
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
      const has = state.animations.includes(action.animation)
      return {
        ...state,
        animations: has
          ? state.animations.filter((a) => a !== action.animation)
          : [...state.animations, action.animation],
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
        <div className="px-6 md:px-8 py-5 md:py-6 flex items-center gap-4">
          <img src="/icon-192.png" alt="" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-xl md:text-2xl font-medium tracking-tight text-black">
              Web見積もりツール
            </h1>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">Webサイトコーディング工数・金額自動計算</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 md:shrink-0 border-b md:border-b-0 md:border-r border-gray-200 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <div className="p-6">
            <GlobalSettings state={state} dispatch={dispatch} />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 md:px-10 py-6 md:py-8 space-y-8 md:space-y-10">
          <PageList state={state} dispatch={dispatch} />
          <SiteOptions state={state} dispatch={dispatch} />
          <EstimateResult state={state} />
          <HearingText state={state} />
          <EstimateCopy state={state} />
        </main>
      </div>
    </div>
  )
}
