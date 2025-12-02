<script lang="ts" setup>
import SurveyForm from './components/SurveyForm.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import { surveyQuestions } from './data/questions.js'
import type { Answer, Option, Question } from './domain/Question.ts'
import { computed, reactive, ref } from 'vue'

const cachedAnswers = reactive<Record<string | number, Answer>>({})
const sessionKey = ref(0)

function onAnswer(answer: Answer, question: Question): void {
  cachedAnswers[question.id] = answer
}

const answersForSummary = computed(() => {
  const result: Record<string | number, string | Array<string> | null> = {}

  Object.entries(cachedAnswers).forEach(([id, answer]) => {
    let renderedAnswers: string | Array<string> | null

    if (Array.isArray(answer)) {
      renderedAnswers = answer.map((answer: Option) => {
        return answer.label
      })
    } else {
      renderedAnswers = answer?.label ?? null
    }
    result[id] = renderedAnswers
  })
  return result
})

function resetSurvey() {
  Object.keys(cachedAnswers).forEach((key) => {
    delete cachedAnswers[key]
  })
  ++sessionKey.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <div class="max-w-6xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Опрос о путешествиях</h1>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="bg-white rounded-2xl shadow p-6">
          <SurveyForm
            :key="sessionKey"
            :answersCache="cachedAnswers"
            :questions="surveyQuestions"
            :session-key="sessionKey"
            @answer="onAnswer"
          />
        </div>

        <SummaryPanel
          :answers="answersForSummary"
          :survey-questions="surveyQuestions"
          @answers-reset-requested="resetSurvey"
        />
      </div>
    </div>
  </div>
</template>
