<script lang="ts" setup>
import type { Answer, Question, QuestionType } from '../../domain/Question.ts'
import RadioQuestion from '../form/RadioQuestion.vue'
import CheckboxQuestion from '../form/CheckboxQuestion.vue'
import SelectQuestion from '../form/SelectQuestion.vue'
import TextQuestion from '../form/TextQuestion.vue'
import { type Component, ref, watch } from 'vue'

const props = defineProps<{
  question: Question
  answerCached?: Answer
}>()

const emit = defineEmits<{
  (e: 'answer', answer: Answer): void
}>()

const localAnswers = ref<Answer | string>(null)

const QuestionTemplatesMap: Record<QuestionType, Component> = {
  radio: RadioQuestion,
  checkbox: CheckboxQuestion,
  select: SelectQuestion,
  text: TextQuestion,
}

// Reset answers on question changed.
watch(
  () => props.question,
  () => {
    if (props.answerCached !== undefined && props.answerCached !== null) {
      localAnswers.value = props.answerCached
    } else {
      localAnswers.value = props.question.type === 'checkbox' ? [] : null
    }
  },
)

watch(
  () => localAnswers.value,
  (answers) => {
    if (typeof answers === 'string') {
      emit('answer', { label: answers, value: answers })
    } else {
      emit('answer', answers)
    }
  },
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
      v-model="localAnswers"
      :name="question.type === 'text' ? question.title : null"
      :options="question.options"
      :placeholder="question.type === 'text' ? question.placeholder : null"
    />
  </div>
</template>
