<script lang="ts" setup>
import { getTailwindColors } from '~/lib/theming'

interface Props {
  modelValue: string
}
const props = defineProps<Props>()
const value = useVModel(props, 'modelValue')

const colors = getTailwindColors()
</script>

<template>
  <USelectMenu
    v-model="value"
    :items="colors"
    size="xl"
    class="w-full"
  />
</template>
