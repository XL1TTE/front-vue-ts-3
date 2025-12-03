<script lang="ts" setup>
import type { Answer, Question, QuestionType } from '../../domain/Question.ts'
import RadioQuestion from '../form/RadioQuestion.vue'
import CheckboxQuestion from '../form/CheckboxQuestion.vue'
import SelectQuestion from '../form/SelectQuestion.vue'
import TextQuestion from '../form/TextQuestion.vue'
import { type Component, ref, watch } from 'vue'

const props = defineProps<{
  question: Question
  cachedAnswer: Answer | null
}>()

const emit = defineEmits<{
  (e: 'onAnswerChanged', answer: Answer | null): void
}>()

// Answer for local card environment.
//  In other words -> answer for current question.
const currentAnswer = ref<Answer | null>(null)

// Map: [question type, renderer]
const QuestionTemplatesMap: Record<QuestionType, Component> = {
  radio: RadioQuestion,
  checkbox: CheckboxQuestion,
  select: SelectQuestion,
  text: TextQuestion,
}

// Watcher: Resets question card state
// when question changed.
watch(
  () => props.question.id,
  () => (currentAnswer.value = props.cachedAnswer ?? null),
)

// Watcher: Emits event to parent -> answer has been changed.
watch(
  () => currentAnswer.value,
  (answer) => emit('onAnswerChanged', answer),
)
// Watcher: Emits event to parent -> answer has been changed.
watch(
  () => props.cachedAnswer,
  (cache) => (currentAnswer.value = cache),
)
</script>

<template>
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">{{ question.title }}</h2>
    <p v-if="question.description" class="text-gray-500 mb-3">
      {{ question.description }}
    </p>

    <component
      :is="QuestionTemplatesMap[question.type]"
      :key="question.id"
      v-model="currentAnswer"
      :name="question.type === 'text' ? question.title : null"
      :options="question.type !== 'text' ? question.options : null"
      :placeholder="question.type === 'text' ? question.placeholder : null"
    />
  </div>
</template>
