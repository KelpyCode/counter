import { useCategory } from './category'

export interface Counter {
  id: number
  name: string
  value: number
  lastChanged: number
  created: number
  showLastChanged?: boolean
}

/**
 * @deprecated use useCategories instead
 */
export function useCounters() {
  const storage = useLocalStorage<Counter[]>('counters', [])

  return storage
}

export function addCounter(categoryId: number) {
  const storage = useCategory(categoryId)

  const counters = storage.value?.counters || []
  const d = Date.now()
  const newCounter: Counter = {
    id: d,
    name: `Counter ${counters.length + 1}`,
    value: 0,
    lastChanged: d,
    created: d
  }
  storage.value!.counters.push(newCounter)
  storage.value = { ...storage.value! }
}

export function updateCounter(categoryId: number, id: number, value: number) {
  const storage = useCategory(categoryId)
  const counters = storage.value?.counters || []
  const counter = counters.find(c => c.id === id)
  if (counter) {
    counter.value = value
    counter.lastChanged = Date.now()
    storage.value = { ...storage.value! }
  }
}

export function deleteCounter(categoryId: number, id: number) {
  const storage = useCategory(categoryId)
  const counters = storage.value?.counters || []
  storage.value!.counters = counters.filter(c => c.id !== id)
  storage.value = { ...storage.value! }
}

export function moveCounter(categoryId: number, id: number, direction: 'up' | 'down') {
  const storage = useCategory(categoryId)
  const counters = storage.value?.counters || []
  const index = counters.findIndex(c => c.id === id)
  if (index === -1) return

  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= counters.length) return

  const temp = counters[index]
  counters[index] = counters[newIndex]!
  counters[newIndex] = temp!
  storage.value!.counters = counters
  storage.value = { ...storage.value! }
}
