<script setup lang="ts">
import { addCategory, deleteCategory, moveCategory, useCategories } from '~/lib/category'
import { applyTheme } from '~/lib/theming'

const categories = useCategories()
</script>

<template>
  <UContainer class="mt-4 max-w-[500px] mx-auto">
    <div class="mb-4 flex flex-row items-center">
      <div class="flex-1">
        <UButton
          icon="i-lucide-arrow-left"
          to="/"
          color="neutral"
        >
          Back
        </UButton>
      </div>
      <div class="text-3xl">
        Categories
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <UCard
        v-for="category in categories"
        :key="category.id"
      >
        <div class="flex flex-col gap-2">
          <UInput
            v-model="category.name"
            placeholder="Category Name"
            class="w-full"
            size="xl"
          />

          <UCollapsible class="flex flex-col gap-2">
            <UButton
              class="group"
              label="Theming"
              color="neutral"
              variant="soft"
              trailing-icon="i-lucide-chevron-down"
              :ui="{
                trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
              }"
              block
            />

            <template #content>
              <div class="px-2">
                <div class="px-4 py-2 bg-accented/15 flex flex-col gap-4">
                  <UFormField label="Primary">
                    <TailwindColorSelect
                      v-model="category.theme.primary"
                      @focus="applyTheme(category.theme)"
                      @change="applyTheme(category.theme)"
                    />
                  </UFormField>
                  <UFormField label="Secondary">
                    <TailwindColorSelect
                      v-model="category.theme.secondary"
                      @focus="applyTheme(category.theme)"
                      @change="applyTheme(category.theme)"
                    />
                  </UFormField>
                  <UFormField label="Neutral">
                    <TailwindColorSelect
                      v-model="category.theme.neutral"
                      @focus="applyTheme(category.theme)"
                      @change="applyTheme(category.theme)"
                    />
                  </UFormField>
                </div>
              </div>
            </template>
          </UCollapsible>
        </div>

        <div
          class="flex flex-row gap-4 w-full mt-4"
        >
          <UButton
            color="secondary"
            icon="i-lucide-arrow-up"
            size="xl"
            @click="moveCategory(category.id, 'up')"
          />
          <UButton
            color="secondary"
            icon="i-lucide-arrow-down"
            size="xl"
            @click="moveCategory(category.id, 'down')"
          />
          <div class="flex-1" />
          <UButton
            color="error"
            icon="i-lucide-trash-2"
            size="xl"
            @click="deleteCategory(category.id)"
          />
        </div>
      </UCard>
    </div>

    <div class="flex flex-row gap-4">
      <UButton
        color="primary"
        class="mt-4 w-full"
        icon="i-lucide-plus"
        block
        @click="addCategory()"
      />
    </div>
  </UContainer>
</template>
