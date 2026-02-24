<script setup lang="ts">
import { migrateOldCounters, useCategories, useCategory, useCategoryId } from '~/lib/category'
import { addCounter } from '~/lib/counter'
import { injectState } from '~/lib/state'
import { applyTheme } from '~/lib/theming'

migrateOldCounters()
const categories = useCategories()
const categoryItems = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))
const state = injectState()
const categoryId = useCategoryId()

const category = useCategory(categoryId)
const counters = computed(() => category.value?.counters || [])
const toast = useToast()

watch(category, (c) => {
  console.log('apply theme', c)
  applyTheme(c!.theme)
}, { immediate: true })

const {
  isSupported,
  isListening,
  result, // final (more confident) transcript
  start,
  stop,
  error
} = useSpeechRecognition({
  lang: 'en-US',
  continuous: false // Changed to true for uninterrupted listening
})

watch(result, (text) => {
  if (!text) return
  const said = text.toLowerCase().trim()
  console.log('→ Phrase detected (final):', said)
})

watchDebounced(result, (text) => {
  if (!text) return
  const said = text.toLowerCase().trim()
  if (state.voiceActive) {
    console.log('→ Phrase detected (debounced):', said)
    const found = [] as string[]
    for (const counter of counters.value) {
      if (!counter.voice.enabled) continue
      for (const command of counter.voice.commands) {
        const saidWords = said.split(' ')
        const phraseWords = command.phrase.toLowerCase().trim().split(' ')
        if (phraseWords.every(word => saidWords.includes(word))) {
          console.log(`Incrementing counter ${counter.name} by ${command.add} because of phrase match with command phrase "${command.phrase}"`)
          counter.value += command.add
          found.push(counter.name)
        }
      }
    }

    toast.add({
      title: '"' + said + '"',
      description: found.length > 0 ? `Matched counters: ${found.join(', ')}` : 'No matches',
      icon: 'i-lucide-speech',
      color: found.length > 0 ? 'success' : 'neutral',
      duration: 3000
    })
  }
}, { debounce: 1000 })

const shouldBeListening = computed(() => state.voiceActive) // Now tied to state.voiceActive

// Auto-restart logic, only when voiceActive is true
watch(isListening, (nowListening) => {
  if (!nowListening && shouldBeListening.value && isSupported.value) {
    setTimeout(() => {
      if (shouldBeListening.value) start()
    }, 200) // Small delay to prevent race conditions
  }
})

watch(error, (e) => {
  if (!e) return

  const err = e as SpeechRecognitionErrorEvent

  const recoverableErrors = ['no-speech', 'aborted', 'network']

  if (recoverableErrors.includes(err.error) && shouldBeListening.value) {
    setTimeout(() => {
      if (shouldBeListening.value) start()
    }, 300) // Delay for stability
  } else if (['audio-capture', 'not-allowed', 'service-not-allowed'].includes(err.error)) {
    console.warn('Speech error:', err.error, err.message)
    console.error('Unrecoverable mic issue — stopping')
  }
})

watch(() => state.voiceActive, (active) => {
  if (!isSupported.value) return
  if (active) {
    start()
  } else {
    stop()
  }
})

watch(() => state.voiceActive, (active) => {
  if (!isSupported.value) return
  if (active && !isListening.value) { // Ensure recognition is not already active
    start()
  } else {
    stop()
  }
})

// Start on mount (or after user gesture)
// onMounted(() => {
//   if (isSupported.value) start()
// })
</script>

<template>
  <UContainer class="mt-4 max-w-[500px] mx-auto">
    <div class="flex flex-row items-center justify-center mb-4 gap-2">
      <USelectMenu
        v-model="categoryId"
        :items="categoryItems"
        value-key="value"
        label-key="label"
        class="w-full flex-1"
        variant="ghost"
        icon="i-lucide-list"
        size="xl"
      >
        <template #content-bottom>
          <UButton
            icon="i-lucide-cog"
            block
            color="neutral"
            to="/categories"
          >
            Manage categories
          </UButton>
        </template>
      </USelectMenu>
      <UButton
        :color="state.voiceActive ? 'success' : 'error'"
        class=" flex-0"
        icon="i-lucide-mic"
        @click="state.voiceActive = !state.voiceActive"
      />
      <UButton
        :color="state.editMode ? 'primary' : 'neutral'"
        class=" flex-0"
        icon="i-lucide-cog"
        @click="state.editMode = !state.editMode"
      />
    </div>
    <div
      v-auto-animate
      class="flex flex-col gap-4"
    >
      <div v-if="counters.length <= 0 && !state.editMode">
        <UEmpty title="No content yet, go into the edit mode at the top right to add new counters" />
      </div>
      <div
        v-auto-animate
        class="flex flex-col gap-4"
      >
        <div
          v-for="counter in counters"
          :key="counter.id"
        >
          <CounterEdit
            v-if="state.editMode"
            :counter="counter"
            :category-id="categoryId"
          />
          <CounterDisplay
            v-else
            :counter="counter"
            :category-id="categoryId"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-2 mt-4">
      <UButton
        v-if="state.editMode"
        color="success"
        icon="i-lucide-plus"
        block
        size="xl"
        @click="addCounter(categoryId)"
      >
        Add counter
      </UButton>
      <UButton
        v-if="state.editMode"
        color="neutral"
        icon="i-lucide-check"
        block
        size="xl"
        @click="state.editMode = false"
      >
        Finish
      </UButton>
    </div>
  </UContainer>
</template>
