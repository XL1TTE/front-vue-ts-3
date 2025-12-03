<script lang="ts" setup>
import { computed, ref } from 'vue'
import type {
  CheckBoxQuestion,
  Question,
  QuestionOption,
  QuestionType,
  RadioQuestion,
  SelectQuestion,
  TextQuestion,
} from '../../domain/Question.ts'

const availableTypes: QuestionType[] = ['radio', 'checkbox', 'text', 'select']

const title = ref('')
const description = ref('')
const placeholder = ref('')
const selectedType = ref<QuestionType>('radio')
const optionsInput = ref('')

const optionsArray = computed<QuestionOption[]>(() => {
  if (selectedType.value === 'text') return []

  return optionsInput.value
    .split(';')
    .map((label) => label.trim())
    .filter((label) => label.length > 0)
    .map((label) => ({
      label,
      value: label.toLowerCase().replace(/\s/g, '-'),
    }))
})

const emit = defineEmits<{
  (e: 'questionCreated', question: Question): void
}>()

const createQuestion = () => {
  if (!title.value.trim()) return

  let newQuestion: Question
  const baseDetails = {
    id: Date.now(),
    title: title.value.trim(),
    description: description.value.trim(),
  }

  switch (selectedType.value) {
    case 'text':
      newQuestion = {
        ...baseDetails,
        type: 'text',
        placeholder: placeholder.value.trim(),
      } satisfies TextQuestion
      break

    case 'radio':
      newQuestion = {
        ...baseDetails,
        type: selectedType.value,
        options: optionsArray.value,
      } satisfies RadioQuestion
      break
    case 'checkbox':
      newQuestion = {
        ...baseDetails,
        type: selectedType.value,
        options: optionsArray.value,
      } satisfies CheckBoxQuestion
      break
    case 'select':
      newQuestion = {
        ...baseDetails,
        type: selectedType.value,
        options: optionsArray.value,
      } satisfies SelectQuestion
      break
  }

  emit('questionCreated', newQuestion)
  resetForm()
}

const resetForm = () => {
  title.value = ''
  description.value = ''
  placeholder.value = ''
  optionsInput.value = ''
  selectedType.value = 'text'
}
</script>

<template>
  <div class="bg-white p-6 shadow-lg rounded-lg mb-6">
    <h2 class="text-xl font-semibold mb-4">Создать новый вопрос</h2>

    <form class="space-y-4" @submit.prevent="createQuestion">
      <div>
        <label class="block text-sm font-medium text-gray-700" for="questionTitle"
          >Заголовок вопроса</label
        >
        <input
          id="questionTitle"
          v-model="title"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
          type="text"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700" for="questionDescription"
          >Описание (опционально)</label
        >
        <input
          id="questionDescription"
          v-model="description"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700" for="questionType"
          >Тип вопроса</label
        >
        <select
          id="questionType"
          v-model="selectedType"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option v-for="type in availableTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div v-if="selectedType === 'text'">
        <label class="block text-sm font-medium text-gray-700" for="placeholder"
          >Placeholder (подсказка в поле ввода)</label
        >
        <input
          id="placeholder"
          v-model="placeholder"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
        />
      </div>

      <div v-else-if="['radio', 'checkbox', 'select'].includes(selectedType)">
        <label class="block text-sm font-medium text-gray-700" for="options">
          Опции (через точку с запятой ";")
        </label>
        <input
          id="options"
          v-model="optionsInput"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Опция A; Опция B; Опция C"
          required
          type="text"
        />
        <p class="text-sm text-gray-500 mt-1">Будет создано опций: {{ optionsArray.length }}</p>
      </div>

      <button
        class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        type="submit"
      >
        Добавить вопрос
      </button>
    </form>
  </div>
</template>
