<script lang="ts" setup>
import SurveyForm from './components/SurveyForm.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import { surveyQuestions } from './data/questions.js'
import type { Answer, Question } from './domain/Question.ts'
import { computed, reactive, ref } from 'vue'
import QuestionCreator from './components/form/QuestionCreator.vue'

const questions = ref([...surveyQuestions])
const cachedAnswers = reactive<Record<string | number, Answer>>({})
const sessionKey = ref(0)

function onAnswer(answer: Answer | null, question: Question): void {
  if (answer !== null) {
    cachedAnswers[question.id] = answer
  }
}

const answersSummary = computed(() => cachedAnswers)

function resetSurvey() {
  Object.keys(cachedAnswers).forEach((key) => {
    delete cachedAnswers[key]
  })
  ++sessionKey.value
}

const addQuestion = (newQuestion: Question) => {
  questions.value.push(newQuestion)
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
            :questions="questions"
            @answer="onAnswer"
            @submit-form="resetSurvey"
          />
        </div>

        <SummaryPanel
          :answers="answersSummary"
          :survey-questions="questions"
          @answers-reset-requested="resetSurvey"
        />

        <QuestionCreator @question-created="addQuestion" />
      </div>
    </div>
  </div>
</template>
