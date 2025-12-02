<script lang="ts" setup>
import { computed, ref } from 'vue'
import NavigationButtons from './card/NavigationButtons.vue'
import QuestionCard from './card/QuestionCard.vue'
import ProgressBar from './card/ProgressBar.vue'
import type { Answer, Question } from '../domain/Question.ts'

const props = defineProps<{
  questions: Array<Question>
  answersCache: Record<string | number, Answer>
}>()

const emit = defineEmits<{
  (e: 'answer', answer: Answer, question: Question): void
}>()

const currentStep = ref(0)
const isLastStep = computed(() => currentStep.value === props.questions.length - 1)

// Compute current question instance by index.
const currentQuestion = computed(() => {
  return props.questions[currentStep.value]
})

// Compute cached answers for current question if any exists.
const cachedAnswersForCurrentQuestion = computed(() => {
  if (!currentQuestion.value) return null

  const cached = props.answersCache[currentQuestion.value.id]
  return cached ? cached : null
})

/// Evaluates if user should be able to request next question.
const canGoNext = computed(() => {
  const question = currentQuestion.value
  const answer = cachedAnswersForCurrentQuestion.value

  if (!question) {
    return false
  }

  // For questions with multiple answers user
  // must provide at least one.
  if (Array.isArray(answer)) {
    return answer.length > 0
  }

  return !!answer
})

// Should be triggered when user choose any of answers.
function onAnswer(answer: Answer) {
  if (currentQuestion.value) {
    emit('answer', answer, currentQuestion.value)
  }
}

function onNextRequested() {
  if (!canGoNext.value) return
  if (!isLastStep.value) currentStep.value++
}
function onPreviousRequested() {
  if (currentStep.value > 0) currentStep.value--
}
</script>

<template>
  <ProgressBar :current-step="currentStep" :total-steps="questions.length" />

  <QuestionCard
    v-if="currentQuestion"
    :answer-cached="cachedAnswersForCurrentQuestion"
    :question="currentQuestion"
    @answer="onAnswer"
  />

  <NavigationButtons
    :can-go-back="currentStep > 0"
    :can-go-next="canGoNext"
    :is-last-step="isLastStep"
    @requested-next="onNextRequested"
    @requested-previous="onPreviousRequested"
  />
</template>
