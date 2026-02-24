<script setup lang="ts">
import { deleteCounter, moveCounter, type Counter } from '~/lib/counter'
import { soundMap } from '~/lib/sounds'

interface Props {
  categoryId: number
  counter: Counter
}

const props = defineProps<Props>()
const counter2 = computed(() => props.counter!)

const confirmDelete = ref(false)
const confirmDeleteTimeout = ref<number | null>(null)
function deleteWithConfirmation() {
  if (confirmDelete.value) {
    deleteCounter(props.categoryId, counter2.value.id)
  } else {
    confirmDelete.value = true
    if (confirmDeleteTimeout.value) {
      clearTimeout(confirmDeleteTimeout.value)
    }
    confirmDeleteTimeout.value = window.setTimeout(() => {
      confirmDelete.value = false
    }, 3000)
  }
}

const soundRef = ref<string>('')

watch(() => counter2.value.sound, (newSound) => {
  if (newSound === '!') {
    soundRef.value = ''
    return
  }
  soundRef.value = 'sounds/' + (newSound ?? '')
}, { immediate: true })

const sound = useSound(soundRef)
</script>

<template>
  <UCard

    variant="soft"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="flex flex-row gap-4 w-full"
      >
        <UButton
          color="secondary"
          icon="i-lucide-arrow-up"
          size="xl"
          variant="soft"
          @click="moveCounter(categoryId, counter2.id, 'up')"
        />
        <UButton
          color="secondary"
          icon="i-lucide-arrow-down"
          variant="soft"
          size="xl"
          @click="moveCounter(categoryId, counter2.id, 'down')"
        />
        <div class="flex-1" />
        <UButton
          color="error"
          icon="i-lucide-trash-2"
          :variant="confirmDelete ? 'solid' : 'soft'"
          :size="confirmDelete ? 'sm' : 'xl'"
          @click="deleteWithConfirmation"
        >
          <span v-if="confirmDelete">Really?</span>
        </UButton>
      </div>

      <div class="w-full">
        <UInput
          v-model="counter2.name"
          placeholder="Counter Name"
          class="w-full"
          size="xl"
        />
      </div>
      <div class="w-full">
        <UInputNumber
          v-model="counter2.value"
          placeholder="Counter Value"
          class="w-full"
          size="xl"
        />
      </div>

      <USeparator label="Settings" />

      <CCollapsible
        label="Sound"
        class="w-full"
      >
        <UFormField
          label="Click sound"
          class="w-full"
        >
          <div class="flex flex-row gap-2">
            <USelect
              v-model="counter2.sound"
              :items="soundMap"
              placeholder="Select a sound"
              class="w-full"
              size="xl"
              value-key="file"
              label-key="name"
            />
            <UButton
              :disabled="counter2.sound === '!' || !counter2.sound"
              color="primary"
              variant="soft"
              icon="i-lucide-play"
              size="md"
              @click="sound.play()"
            />
          </div>
        </UFormField>
      </CCollapsible>
      <CCollapsible
        label="Voice activation"
        class="w-full"
        :leading-icon="counter2.voice.enabled ? 'i-lucide-check' : 'i-lucide-x'"
      >
        <div
          v-auto-animate
          class="flex flex-col gap-4"
        >
          <UCheckbox
            v-model="counter2.voice.enabled"
            label="Enable voice activation"
            size="xl"
          />
          <CArray
            v-if="counter2.voice.enabled"
            v-model="counter2.voice.commands"
            :default="() => ({ add: 1, phrase: '' })"
          >
            <template #default="{ item }">
              <div class="flex flex-col gap-4">
                <UFormField label="Phrase">
                  <UInput
                    v-model="item.phrase"
                    placeholder="hello world"
                    class="w-full"
                    size="xl"
                  />
                </UFormField>
                <UFormField label="Increment by">
                  <UInputNumber
                    v-model="item.add"
                    placeholder="1"
                    class="w-full"
                    size="xl"
                  />
                </UFormField>
              </div>
            </template>
          </CArray>
        </div>
      </CCollapsible>
    </div>
  </UCard>
</template>
