<script lang="ts" setup>
import type { Answer } from '../../domain/Question.ts'

defineProps<{
  placeholder: string
}>()

const modelValue = defineModel<Answer>()
</script>

<template>
  <input
    v-model="modelValue"
    :placeholder="placeholder"
    class="border rounded p-2 w-full"
    type="text"
  />
</template>
