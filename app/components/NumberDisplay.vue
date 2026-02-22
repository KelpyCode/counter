<!-- components/AnimatedNumber.vue  or  any .vue file -->
<template>
  <ClientOnly>
    <div
      ref="numberRef"
      class="animated-number"
    >
      {{ number }}
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMotion } from '@vueuse/motion'

interface Props {
  targetNumber: number
}

const props = defineProps<Props>()

const number = ref(0)
const duration = 1000 // Animation duration in milliseconds

const numberRef = ref<HTMLElement | null>(null)

const animateNumber = () => {
  const start = number.value
  const end = props.targetNumber
  const startTime = performance.now()

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    number.value = Math.floor(start + (end - start) * progress)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

watch(() => props.targetNumber, animateNumber)

useMotion(numberRef, {
  initial: {
    opacity: 0,
    y: -10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 500
    }
  }
})
</script>

<style scoped>
.animated-number {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
}
</style>
