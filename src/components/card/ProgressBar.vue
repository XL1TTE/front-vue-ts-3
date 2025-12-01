<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  currentStep: number
  totalSteps: number
}>()

const percent = computed(() => {
  if (!props.totalSteps) return 0
  return ((props.currentStep + 1) / props.totalSteps) * 100
})
</script>

<template>
  <div class="mb-6">
    <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div :style="{ width: percent + '%' }" class="h-2 bg-blue-500 transition-all" />
    </div>
    <p class="mt-2 text-sm text-gray-600 text-center">
      Вопрос {{ currentStep + 1 }} из {{ totalSteps }}
    </p>
  </div>
</template>
