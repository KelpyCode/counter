<script setup lang="ts">
import { addCounter, deleteCounter, moveCounter, useCounters } from '~/lib/counter'

const counters = useCounters()
const editMode = ref(false)
</script>

<template>
  <UContainer class="mt-4 max-w-[500px] mx-auto">
    <div class="flex flex-col gap-4">
      <UCard
        v-for="counter in counters"
        :key="counter.id"
      >
        <div class="flex flex-col items-center gap-4">
          <template v-if="editMode">
            <div>
              <UInput
                v-model="counter.name"
                placeholder="Counter Name"
                size="xl"
              />
            </div>
            <div>
              <UInputNumber
                v-model="counter.value"
                placeholder="Counter Value"
                size="xl"
              />
            </div>
          </template>
          <template v-else>
            <div
              class="text-3xl"
            >
              {{ counter.name }}
            </div>
          </template>

          <div

            class="flex gap-2 w-full"
          >
            <div class="flex-1 flex flex-row items-center justify-center">
              <UButton
                v-if="false"
                color="secondary"
                icon="i-lucide-minus"
                size="xl"
                @click="counter.value--"
              />
              <UButton
                v-if="!editMode"
                color="info"
                size="xl"
                class="py-8 active:scale-95 transition-transform duration-150"
                block
                @click="counter.value++"
              >
                <div class="text-3xl">
                  {{ counter.value }}
                </div>
              </UButton>
            </div>
            <div
              v-if="editMode"
              class="flex flex-row gap-4 w-full"
            >
              <UButton
                color="secondary"
                icon="i-lucide-arrow-up"
                size="xl"
                @click="moveCounter(counter.id, 'up')"
              />
              <UButton
                color="secondary"
                icon="i-lucide-arrow-down"
                size="xl"
                @click="moveCounter(counter.id, 'down')"
              />
              <div class="flex-1" />
              <UButton
                color="error"
                icon="i-lucide-trash-2"
                size="xl"
                @click="deleteCounter(counter.id)"
              />
            </div>

            <!-- <UButton
              @click="deleteCounter(counter.id)"
            >
              Delete
            </UButton> -->
          </div>
        </div>
      </UCard>
    </div>

    <div class="flex flex-row gap-4">
      <UButton
        color="primary"
        class="mt-4 flex-0"
        icon="i-lucide-cog"
        @click="editMode = !editMode"
      />

      <UButton
        v-if="editMode"
        color="primary"
        class="mt-4 w-full"
        icon="i-lucide-plus"
        block
        @click="addCounter()"
      />
    </div>
  </UContainer>
</template>
