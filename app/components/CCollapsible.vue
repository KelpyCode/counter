<script setup lang="ts">
interface Props {
  label: string
  leadingIcon?: string
}

defineProps<Props>()
</script>

<template>
  <UCollapsible class="flex flex-col gap-2">
    <UButton
      class="group"
      :label="label"
      color="neutral"
      variant="soft"
      :leading-icon="leadingIcon"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      block
    />

    <template #content>
      <div class="px-2">
        <div class="px-4 py-2 bg-accented/15 flex flex-col gap-4">
          <slot />
        </div>
      </div>
    </template>
  </UCollapsible>
</template>
