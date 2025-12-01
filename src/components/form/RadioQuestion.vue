<script lang="ts" setup>
import type { Option } from '../../domain/Question.ts'

const { name = 'radio-group' } = defineProps<{
  options: Array<Option>
  name?: string
}>()

// Single answer as option id
const modelValue = defineModel<string>()
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
