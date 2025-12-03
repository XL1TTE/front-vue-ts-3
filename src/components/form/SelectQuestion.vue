<script lang="ts" setup>
import type { QuestionOption, SelectAnswer } from '../../domain/Question.ts'
import { computed } from 'vue'

const { options } = defineProps<{
  options: Array<QuestionOption>
}>()

const model = defineModel<SelectAnswer | null>({ default: null })

const input = computed<QuestionOption | null>({
  get() {
    if (model.value === null) return null
    return options.find((opt) => opt.value === model.value?.value) || null
  },
  set(answer: QuestionOption | null) {
    if (answer === null) {
      model.value = null
      return
    }
    model.value = {
      type: 'select',
      value: answer.value,
      label: answer.label,
    } satisfies SelectAnswer
  },
})
</script>

<template>
  <select v-model="input" class="border rounded p-2 w-full bg-white">
    <option disabled value="">Выберите вариант...</option>
    <option v-for="option in options" :key="option.value" :value="option">
      {{ option.label }}
    </option>
  </select>
</template>
