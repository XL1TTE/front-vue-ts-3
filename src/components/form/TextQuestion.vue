<script lang="ts" setup>
import type { TextAnswer } from '../../domain/Question.ts'
import { ref } from 'vue'

defineProps<{
  placeholder: string
}>()

const model = defineModel<TextAnswer | null>({ default: null })

const input = ref<TextAnswer>({ type: 'text', value: '' })

function onFocusLost() {
  if (input.value.value.length > 1) {
    model.value = input.value
  }
}
</script>

<template>
  <input
    v-model="input.value"
    :placeholder="placeholder"
    class="border rounded p-2 w-full"
    type="text"
    @focusout="onFocusLost"
  />
</template>
