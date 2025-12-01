<script lang="ts" setup>
import type { Option } from '../../domain/Question.ts'

defineProps<{
  options: Array<Option>
}>()

// Multiple answers as option ids
const modelValue = defineModel<Array<string>>()
</script>

<template>
  <div class="space-y-2">
    <label
      v-for="option in options"
      :key="option.value"
      class="flex items-center gap-2 cursor-pointer"
    >
      <input v-model="modelValue" :value="option" type="checkbox" />
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>
