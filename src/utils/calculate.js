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

  const animHours = page.animations.reduce((sum, anim) => {
    return sum + (ANIMATION_HOURS[anim] ?? 0)
  }, 0)

  let formHours = 0
  if (page.formCount >= 1) {
    formHours += 4
    if (page.formCount >= 2) {
      const extra = page.formCount - 1
      formHours += extra * (page.formSameDesign ? 2 : 4)
    }
  }

  return base + animHours + formHours
}

export function calcEstimate(state) {
  const pageResults = state.pages.map((page) => ({
    page,
    hours: calcPageHours(page),
  }))

  const pageTotal = pageResults.reduce((sum, r) => sum + r.hours, 0)

  const wordpressHours = state.wordpress ? 2 : 0
  const customFieldHours = state.customFieldCount * 1.5
  const testHours = 3
  const publishingHours = state.publishing ? 3 : 0

  const siteTotal =
    pageTotal + wordpressHours + customFieldHours + testHours + publishingHours

  const subtotal = siteTotal * state.hourlyRate
  const bufferAmount = subtotal * (state.bufferRate / 100)
  const total = subtotal + bufferAmount

  const hasSvgCanvas = state.pages.some((p) => p.animations.includes('svg_canvas'))

  return {
    pageResults,
    wordpressHours,
    customFieldHours,
    testHours,
    publishingHours,
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
  return h % 1 === 0 ? `${h}h` : `${h}h`
}
