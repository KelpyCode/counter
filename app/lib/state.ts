export interface State {
  editMode: boolean
  voiceActive: boolean
}

export function provideState() {
  const state = reactive<State>({
    editMode: false,
    voiceActive: false
  })

  provide('state', state)
  return state
}

export function injectState() {
  const state = inject('state')

  if (!state) {
    throw new Error('State not provided')
  }

  return state as State
}
