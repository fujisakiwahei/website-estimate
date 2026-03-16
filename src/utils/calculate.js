import { PAGE_TYPES, ANIMATIONS } from '../components/PageItem'

const PAGE_HOURS = {
  top: 8,
  sub_simple: 2.5,
  sub_complex: 5,
}

const ANIMATION_HOURS = Object.fromEntries(
  ANIMATIONS.filter((a) => a.hours !== null).map((a) => [a.value, a.hours])
)

export function calcPageHours(page) {
  const base = PAGE_HOURS[page.type] ?? 0

  let formHours = 0
  if (page.formCount >= 1) {
    formHours += 4
    if (page.formCount >= 2) {
      const extra = page.formCount - 1
      formHours += extra * (page.formSameDesign ? 2 : 4)
    }
  }

  return base + formHours
}

export function calcEstimate(state) {
  const pageResults = state.pages.map((page) => ({
    page,
    hours: calcPageHours(page),
  }))

  const pageTotal = pageResults.reduce((sum, r) => sum + r.hours, 0)
  const pageCount = state.pages.length

  const animationHours = state.animations.reduce((sum, anim) => {
    return sum + (ANIMATION_HOURS[anim] ?? 0)
  }, 0)

  const wordpressHours = state.wordpress ? 2 : 0
  const customFieldHours = state.customFieldCount * 1.5
  const publishingHours = state.publishing ? 2 : 0
  const postLaunchTestHours = state.publishing ? 1 : 0

  // テストはページ数 × ¥2,000（時給計算外の固定額）
  const testAmount = pageCount * 2000

  const contentFillAmount = state.contentFillCount * state.contentFillRate

  const siteTotal =
    pageTotal + animationHours + wordpressHours + customFieldHours + publishingHours + postLaunchTestHours

  const subtotal = siteTotal * state.hourlyRate
  const bufferAmount = subtotal * (state.bufferRate / 100)
  const total = subtotal + bufferAmount + testAmount + contentFillAmount

  const hasSvgCanvas = state.animations.includes('svg_canvas')

  return {
    pageResults,
    pageCount,
    animationHours,
    wordpressHours,
    customFieldHours,
    publishingHours,
    postLaunchTestHours,
    testAmount,
    contentFillAmount,
    siteTotal,
    subtotal,
    bufferAmount,
    total,
    hasSvgCanvas,
  }
}

export function formatCurrency(n) {
  return '¥' + Math.round(n).toLocaleString('ja-JP')
}

export function formatHours(h) {
  return `${h}h`
}
