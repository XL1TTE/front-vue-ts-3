<script lang="ts" setup>
import type { Answer, Question } from '../domain/Question.ts'
import { computed } from 'vue'

const props = defineProps<{
  answers: Record<string | number, Answer>
  surveyQuestions: Array<Question>
}>()

const answersDisplayValue = computed<Record<string | number, string | string[]>>(() => {
  const result: Record<string | number, string | string[]> = {}

  Object.entries(props.answers).forEach(([id, answer]) => {
    switch (answer.type) {
      case 'checkbox':
        result[id] = answer.values.map((item) => item.label)
        break
      case 'radio':
      case 'select':
        result[id] = answer.label
        break
      case 'text':
        result[id] = answer.value
        break
      default:
        result[id] = 'N/A'
    }
  })
  return result
})

const emit = defineEmits<{
  (e: 'answersResetRequested'): void
}>()

const getDisplayValue = (questionId: string | number) => {
  return answersDisplayValue.value[questionId]
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Ваши ответы</h2>
    <div class="space-y-3">
      <div v-for="question in surveyQuestions" :key="question.id" class="border rounded-lg p-3">
        <div class="text-sm text-gray-500">{{ question.title }}</div>
        <div class="font-medium">
          <div class="text-gray-800">
            <template v-if="getDisplayValue(question.id)">
              <ul v-if="Array.isArray(getDisplayValue(question.id))" class="list-disc list-inside">
                <li v-for="answerLabel in getDisplayValue(question.id)" :key="answerLabel">
                  {{ answerLabel }}
                </li>
              </ul>
              <p v-else>
                {{ getDisplayValue(question.id) }}
              </p>
            </template>
            <template v-else>
              <p class="text-gray-400 italic">Ответ не предоставлен</p>
            </template>
          </div>
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
