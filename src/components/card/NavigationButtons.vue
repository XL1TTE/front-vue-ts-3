<script lang="ts" setup>
defineProps<{
  canGoBack: boolean
  canGoNext: boolean
  isLastStep: boolean
}>()

const emit = defineEmits<{
  (e: 'requestedNext'): void
  (e: 'requestedPrevious'): void
}>()
</script>

<template>
  <div class="flex justify-between mt-6">
    <button
      :disabled="!canGoBack"
      class="px-4 py-2 rounded bg-gray-100 disabled:opacity-50"
      @click="emit('requestedPrevious')"
    >
      Назад
    </button>

    <button
      :disabled="!canGoNext"
      class="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
      @click="emit('requestedNext')"
    >
      {{ isLastStep ? 'Завершить' : 'Далее' }}
    </button>
  </div>
</template>
