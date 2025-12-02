<script lang="ts" setup>
import type { Answer, Option } from '../../domain/Question.ts'

const { name = 'radio-group' } = defineProps<{
  options: Array<Option>
  name?: string
}>()

const modelValue = defineModel<Answer>()
</script>

<template>
  <div class="space-y-2">
    <label
      v-for="option in options"
      :key="option.value"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input v-model="modelValue" :name="name" :value="option.value" type="radio" />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>
