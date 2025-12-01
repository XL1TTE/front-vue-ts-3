<script lang="ts" setup>
defineProps<{
  placeholder: string
}>()

const modelValue = defineModel<string>()
</script>

<template>
  <input
    v-model="modelValue"
    :placeholder="placeholder"
    class="border rounded p-2 w-full"
    type="text"
  />
</template>
