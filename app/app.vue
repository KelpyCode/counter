<script setup>
import { provideState } from './lib/state'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Counter'
const description = 'A FREE counter app for everyone'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

useHead({
  meta: {
    // Disable zooming on mobile devices
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
  }
})

const state = provideState()
</script>

<template>
  <UApp>
    <div class="flex flex-row w-full">
      <div class="flex-1" />
      <div class="mr-2">
        <UButton
          :color="state.editMode ? 'primary' : 'neutral'"
          class="mt-4 flex-0"
          icon="i-lucide-cog"
          @click="state.editMode = !state.editMode"
        />
        <UColorModeButton />
      </div>
    </div>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
