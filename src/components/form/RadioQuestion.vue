<script lang="ts" setup>
import type { QuestionOption, RadioAnswer } from '../../domain/Question.ts'
import { computed } from 'vue'

const { name = 'radio-group', options } = defineProps<{
  options: Array<QuestionOption>
  name?: string
}>()

const model = defineModel<RadioAnswer | null>({ default: null })

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
      type: 'radio',
      value: answer.value,
      label: answer.label,
    } satisfies RadioAnswer
  },
})
</script>

<template>
  <div class="space-y-2">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input v-model="input" :name="name" :value="option" type="radio" />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>
