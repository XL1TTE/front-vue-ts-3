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
  (e: 'answer', answer: Answer | null, question: Question): void
  (e: 'submitForm'): void
}>()

const currentStep = ref(0)
const isLastStep = computed(() => currentStep.value === props.questions.length - 1)

// Compute current question instance by index.
const currentQuestion = computed(() => {
  return props.questions[currentStep.value] ?? null
})

// Compute cached answers for current question if any,
// other way -> null.
const cachedAnswer = computed(() => {
  if (!currentQuestion.value) return null

  const cached = props.answersCache[currentQuestion.value.id]
  return cached ?? null
})

/// Evaluates if user should be able to request next question.
const canRequestNext = computed(() => {
  const cur_question = currentQuestion.value
  const cur_answer = cachedAnswer.value

  // No question to answer -> false
  if (cur_question === null) {
    return false
  }
  // No answer -> false
  if (cur_answer === null) {
    return false
  }

  // Checkbox require at least one answer, otherwise -> false
  if (cur_answer.type === 'checkbox') {
    return cur_answer.values.length > 0
  }

  return true
})

// Callback: Triggered when answer for
// current question has been changed.
function AnswerChanged(answer: Answer | null) {
  if (currentQuestion.value !== null) {
    emit('answer', answer, currentQuestion.value)
  }
}
// Callback: Submits form -> all questions answered.
function SubmitForm() {
  emit('submitForm')
}

function NextQuestion() {
  // noinspection PointlessBooleanExpressionJS
  if (canRequestNext.value === false) return

  // noinspection PointlessBooleanExpressionJS
  if (isLastStep.value === false) currentStep.value++
}
function PreviousQuestion() {
  if (currentStep.value > 0) currentStep.value--
}
</script>

<template>
  <ProgressBar :current-step="currentStep" :total-steps="questions.length" />

  <QuestionCard
    v-if="currentQuestion"
    :cached-answer="cachedAnswer"
    :question="currentQuestion"
    @on-answer-changed="AnswerChanged"
  />

  <NavigationButtons
    :can-go-back="currentStep > 0"
    :can-go-next="canRequestNext"
    :is-last-step="isLastStep"
    @requested-next="NextQuestion"
    @requested-previous="PreviousQuestion"
    @requested-end="SubmitForm"
  />
</template>
