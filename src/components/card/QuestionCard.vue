<script lang="ts" setup>
import type { Answer, Question, QuestionType } from '../../domain/Question.ts'
import RadioQuestion from '../form/RadioQuestion.vue'
import CheckboxQuestion from '../form/CheckboxQuestion.vue'
import SelectQuestion from '../form/SelectQuestion.vue'
import TextQuestion from '../form/TextQuestion.vue'
import { type Component, ref, watchEffect } from 'vue'

defineProps<{
  question: Question
  answerCached?: Answer
}>()

const emit = defineEmits<{
  (e: 'answer', value: Answer): void
}>()

const currentAnswer = ref<Answer>()

// Broadcast to parent on answer.
watchEffect(() => {
  if (currentAnswer?.value !== undefined) {
    emit('answer', currentAnswer.value)
  }
})

const QuestionTemplatesMap: Record<QuestionType, Component> = {
  radio: RadioQuestion,
  checkbox: CheckboxQuestion,
  select: SelectQuestion,
  text: TextQuestion,
}
</script>

<template>
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">{{ question.title }}</h2>
    <p v-if="question.description" class="text-gray-500 mb-3">
      {{ question.description }}
    </p>

    <component
      :is="QuestionTemplatesMap[question.type]"
      v-model="currentAnswer"
      :options="question.options"
    />
  </div>
</template>
