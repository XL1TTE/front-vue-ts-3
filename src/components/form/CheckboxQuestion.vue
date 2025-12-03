<script lang="ts" setup>
import type { CheckBoxAnswer, QuestionOption } from '../../domain/Question.ts'
import { ref, watch } from 'vue'

defineProps<{
  options: Array<QuestionOption>
}>()

const model = defineModel<CheckBoxAnswer | null>({ default: null })

const answer = ref<Array<{ label: string; value: string }>>(model.value?.values || [])

watch(
  () => answer.value,
  (answer) => {
    model.value = {
      type: 'checkbox',
      values: answer,
    } satisfies CheckBoxAnswer
  },
  { deep: true },
)
</script>

<template>
  <div class="space-y-2">
    <label
      v-for="(option, index) in options"
      :key="index"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input v-model="answer" :value="option" type="checkbox" />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>
