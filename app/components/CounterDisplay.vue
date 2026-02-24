<script setup lang="ts">
import NumberFlow from '@number-flow/vue'
import type { Counter } from '~/lib/counter'

interface Props {
  categoryId: number
  counter: Counter
}

const props = defineProps<Props>()

const counter2 = computed(() => props.counter!)
</script>

<template>
  <UCard

    variant="soft"
  >
    <div class="flex flex-col items-center gap-4">
      <div

        class="flex gap-2 w-full"
      >
        <div class="flex-1 flex flex-row items-center justify-center">
          <UButton
            color="primary"
            size="xl"
            class="py-8 active:scale-95 transition-all duration-150"
            block
            @click="counter2.value++"
          >
            <div class="flex flex-col">
              <div
                class="text-xl"
              >
                {{ counter2.name }}
              </div>
              <div class="text-3xl">
                <NumberFlow :value="counter2.value" />
              </div>
            </div>
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>
