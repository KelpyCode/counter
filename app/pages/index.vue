<script setup lang="ts">
import { migrateOldCounters, useCategories, useCategory, useCategoryId } from '~/lib/category'
import { addCounter, deleteCounter, moveCounter } from '~/lib/counter'
import { injectState } from '~/lib/state'
import { applyTheme } from '~/lib/theming'

migrateOldCounters()
const categories = useCategories()
const categoryItems = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))
const state = injectState()
const categoryId = useCategoryId()

const category = useCategory(categoryId)
const counters = computed(() => category.value?.counters || [])

watch(category, (c) => {
  console.log('apply theme', c)
  applyTheme(c!.theme)
}, { immediate: true })
</script>

<template>
  <UContainer class="mt-4 max-w-[500px] mx-auto">
    <USelectMenu
      v-model="categoryId"
      :items="categoryItems"
      value-key="value"
      label-key="label"
      class="w-full mb-4"
      icon="i-lucide-list"
      size="xl"
    >
      <template #content-bottom>
        <UButton
          icon="i-lucide-cog"
          block
          color="neutral"
          to="/categories"
        />
      </template>
    </USelectMenu>
    <div class="flex flex-col gap-4">
      <div v-if="counters.length <= 0 && !state.editMode">
        <UEmpty title="No content yet, go into the edit mode at the top right to add new counters" />
      </div>
      <UCard
        v-for="counter in counters"
        :key="counter.id"
        variant="soft"
      >
        <div class="flex flex-col items-center gap-4">
          <template v-if="state.editMode">
            <div class="w-full">
              <UInput
                v-model="counter.name"
                placeholder="Counter Name"
                class="w-full"
                size="xl"
              />
            </div>
            <div>
              <UInputNumber
                v-model="counter.value"
                placeholder="Counter Value"
                class="w-full"
                size="xl"
              />
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
                v-if="!state.editMode"
                color="primary"
                size="xl"
                class="py-8 active:scale-95 transition-transform duration-150"
                block
                @click="counter.value++"
              >
                <div class="flex flex-col">
                  <div
                    class="text-xl"
                  >
                    {{ counter.name }}
                  </div>
                  <div class="text-3xl">
                    {{ counter.value }}
                  </div>
                </div>
              </UButton>
            </div>
            <div
              v-if="state.editMode"
              class="flex flex-row gap-4 w-full"
            >
              <UButton
                color="secondary"
                icon="i-lucide-arrow-up"
                size="xl"
                @click="moveCounter(categoryId, counter.id, 'up')"
              />
              <UButton
                color="secondary"
                icon="i-lucide-arrow-down"
                size="xl"
                @click="moveCounter(categoryId, counter.id, 'down')"
              />
              <div class="flex-1" />
              <UButton
                color="error"
                icon="i-lucide-trash-2"
                size="xl"
                @click="deleteCounter(categoryId, counter.id)"
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
        v-if="state.editMode"
        color="primary"
        class="mt-4 w-full"
        icon="i-lucide-plus"
        block
        @click="addCounter(categoryId)"
      />
    </div>
  </UContainer>
</template>
