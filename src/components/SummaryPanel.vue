<script lang="ts" setup>
import type { Question } from '../domain/Question.ts'

defineProps<{
  answers: Record<string | number, string | Array<string> | null>
  surveyQuestions: Array<Question>
}>()

const emit = defineEmits<{
  (e: 'answersResetRequested'): void
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Ваши ответы</h2>
    <div class="space-y-3">
      <div v-for="question in surveyQuestions" :key="question.id" class="border rounded-lg p-3">
        <div class="text-sm text-gray-500">{{ question.title }}</div>
        <div class="font-medium">
          <template v-if="Array.isArray(answers[question.id])">
            <ul v-for="answer in answers[question.id]">
              <li>- {{ answer }}</li>
            </ul>
          </template>
          <template v-else>
            {{ answers[question.id] ?? '—' }}
          </template>
        </div>
      </div>
    </div>

    <button
      class="mt-6 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
      @click="emit('answersResetRequested')"
    >
      Сбросить ответы
    </button>
  </div>
</template>
