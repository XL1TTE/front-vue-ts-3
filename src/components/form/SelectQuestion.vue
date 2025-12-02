<script lang="ts" setup>
import type { Answer, Option } from '../../domain/Question.ts'

defineProps<{
  options: Array<Option>
}>()

const modelValue = defineModel<Answer>()
</script>

<template>
  <select v-model="modelValue" class="border rounded p-2 w-full bg-white">
    <option disabled value="">Выберите вариант...</option>
    <option v-for="option in options" :key="option.value" :value="option">
      {{ option.label }}
    </option>
  </select>
</template>
