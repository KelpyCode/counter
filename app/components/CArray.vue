<script setup lang="ts" generic="T">
interface Props<T> {
  modelValue: T[]
  default: () => T
}

const props = defineProps<Props<T>>()
const value = useVModel(props, 'modelValue')

function addItem() {
  value.value.push(props.default())
}

function deleteItem(index: number) {
  value.value.splice(index, 1)
}
</script>

<template>
  <div
    v-auto-animate
    class="flex flex-col gap-4"
  >
    <div
      v-for="(item, index) in value"
      :key="index"
      class="flex flex-row items-center justify-center gap-2 bg-accented/20 p-4 rounded-2xl"
    >
      <slot
        :item="item"
        :index="index"
      />

      <UButton
        icon="i-lucide-trash"
        color="error"
        variant="ghost"
        @click="deleteItem(index)"
      />
    </div>

    <UButton
      class="mt-2"
      icon="i-lucide-plus"
      color="primary"
      variant="outline"
      @click="addItem()"
    >
      Add item
    </UButton>
  </div>
</template>
