import type { WatchSource } from 'vue'
import type { Counter } from './counter'
import type { CategoryTheme } from './theming'

export interface Category {
  id: number
  name: string
  counters: Counter[]
  theme: CategoryTheme
}

export function migrateOldCounters() {
  const storage = useLocalStorage<Counter[]>('counters', [])
  const categories = useLocalStorage<Category[]>('categories', [])

  if (storage.value.length > 0 && categories.value.length === 0) {
    categories.value.push({ id: 0, name: 'Default', counters: storage.value, theme: { primary: 'green', neutral: 'slate', secondary: 'blue' } })
    storage.value = []
  }

  categories.value.forEach((category) => {
    if (!category.theme) {
      category.theme = {
        primary: 'green',
        neutral: 'slate',
        secondary: 'blue'
      }
    }
  })
}

export function useCategories() {
  const storage = useLocalStorage<Category[]>('categories', [])

  if (storage.value.length === 0) {
    storage.value = [{ id: 0, name: 'Default', counters: [], theme: { primary: 'green', neutral: 'slate', secondary: 'blue' } }]
  }

  return storage
}

export function useCategory(categoryId: WatchSource<number> | number) {
  const categories = useCategories()
  return computed({
    get() {
      const id = (unref(categoryId))
      return categories.value.find(c => c.id === id)
    },
    set(category) {
      const id = (unref(categoryId))
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = category!
      }
    }
  })
}

export function useCategoryId() {
  const route = useRoute()
  return computed<number>({
    get() {
      // Fallback to first category if no category query param is set
      const categoryId = parseInt(route.query.category as string) || useCategories().value[0]!.id
      return categoryId
    },
    set(value: number) {
      const query = { ...route.query, category: value.toString() } as { category?: string }
      if (value === null) {
        delete query.category
      }
      navigateTo({ query })
    }
  })
}

export function moveCategory(categoryId: number, direction: 'up' | 'down') {
  const categories = useCategories()
  const index = categories.value.findIndex(c => c.id === categoryId)
  if (index === -1) return

  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= categories.value.length) return

  const temp = categories.value[newIndex]
  categories.value[newIndex] = categories.value[index]!
  categories.value[index] = temp!
}

export function deleteCategory(categoryId: number) {
  const categories = useCategories()
  categories.value = categories.value.filter(c => c.id !== categoryId)
}

export function addCategory() {
  const categories = useCategories()
  const d = Date.now()
  const newCategory: Category = {
    id: d,
    name: `Category ${categories.value.length + 1}`,
    counters: [],
    theme: {
      primary: 'green',
      neutral: 'slate',
      secondary: 'blue'
    }
  }
  categories.value.push(newCategory)
}
