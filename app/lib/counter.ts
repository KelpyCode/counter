export interface Counter {
  id: number
  name: string
  value: number
  lastChanged: number
  created: number
}

export function useCounters() {
  const storage = useLocalStorage<Counter[]>('counters', [])

  return storage
}

export function addCounter() {
  const storage = useLocalStorage<Counter[]>('counters', [])
  const counters = storage.value
  const d = Date.now()
  const newCounter: Counter = {
    id: d,
    name: `Counter ${counters.length + 1}`,
    value: 0,
    lastChanged: d,
    created: d
  }
  storage.value = [...counters, newCounter]
}

export function updateCounter(id: number, value: number) {
  const storage = useLocalStorage<Counter[]>('counters', [])
  const counters = storage.value
  const counter = counters.find(c => c.id === id)
  if (counter) {
    counter.value = value
    counter.lastChanged = Date.now()
    storage.value = [...counters]
  }
}

export function deleteCounter(id: number) {
  const storage = useLocalStorage<Counter[]>('counters', [])
  const counters = storage.value
  storage.value = counters.filter(c => c.id !== id)
}

export function moveCounter(id: number, direction: 'up' | 'down') {
  const storage = useLocalStorage<Counter[]>('counters', [])
  const counters = storage.value
  const index = counters.findIndex(c => c.id === id)
  if (index === -1) return

  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= counters.length) return

  const temp = counters[index]
  counters[index] = counters[newIndex]!
  counters[newIndex] = temp!
  storage.value = [...counters]
}
