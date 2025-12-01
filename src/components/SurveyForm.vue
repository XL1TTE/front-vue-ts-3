<script lang="ts" setup>
import { computed, ref } from 'vue'
import NavigationButtons from './card/NavigationButtons.vue'
import QuestionCard from './card/QuestionCard.vue'
import ProgressBar from './card/ProgressBar.vue'
import type { Answer, Question } from '../domain/Question.ts'

const props = defineProps<{
  questions: Array<Question>
  answers?: Map<string | number, Array<Answer>>
}>()

const emit = defineEmits({
  answer: () => true,
})

const currentStep = ref(0)
const isLastStep = computed(() => currentStep.value === props.questions.length - 1)

const currentQuestion = computed(() => {
  return props.questions[currentStep.value]
})

// const answerOptions = computed(() => {
//   if (currentQuestion?.value !== undefined) {
//     props.answers?.get(currentQuestion.value.id)
//   }
// })

const canGoNext = computed(() => {
  const question = currentQuestion.value
  if (!question) {
    return false
  }
  const answer = props.answers?.get(question.id)
  if (question.type === 'checkbox') {
    return Array.isArray(answer) && answer.length > 0
  }

  return !!answer
})

// function onAnswer() {}
//
// function onGoNext() {
//   if (!canGoNext.value) return
//   if (!isLastStep.value) currentStep.value++
// }
// function onGoBack() {
//   if (currentStep.value > 0) currentStep.value--
// }
</script>

<template>
  <ProgressBar :current-step="currentStep" :total-steps="questions.length" />

  <QuestionCard v-if="currentQuestion" :question="currentQuestion" />

  <NavigationButtons
    :can-go-back="currentStep > 0"
    :can-go-next="canGoNext"
    :is-last-step="isLastStep"
  />
</template>
