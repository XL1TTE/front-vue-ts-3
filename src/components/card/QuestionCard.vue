<script lang="ts" setup>
import type { Answer, Question } from '../../domain/Question.ts'

defineProps<{
  question: Question
  answer?: Answer
}>()

const emit = defineEmits({
  answer: () => true,
})
</script>

<template>
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">{{ question.title }}</h2>
    <p v-if="question.description" class="text-gray-500 mb-3">
      {{ question.description }}
    </p>
  </div>
</template>
