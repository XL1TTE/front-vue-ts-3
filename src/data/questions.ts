import type { Question } from '../domain/Question.ts'

export const surveyQuestions: Array<Question> = [
  {
    id: 'travel_frequency',
    type: 'radio',
    title: 'Как часто вы путешествуете?',
    description: 'Выберите наиболее подходящий вариант',
    options: [
      { value: 'rarely', label: 'Раз в год или реже' },
      { value: 'sometimes', label: '2-4 раза в год' },
      { value: 'often', label: '5+ раз в год' },
    ],
  },
  {
    id: 'travel_type',
    type: 'checkbox',
    description: 'Выберите один или несколько вариантов',
    title: 'Какие виды путешествий вам интересны?',
    options: [
      { value: 'beach', label: 'Пляжный отдых' },
      { value: 'mountains', label: 'Горы и природа' },
      { value: 'cities', label: 'Города и культура' },
      { value: 'adventure', label: 'Экстрим и приключения' },
      { value: 'wellness', label: 'Spa и релакс' },
    ],
  },
  {
    id: 'budget',
    type: 'select',
    title: 'Какой бюджет вы обычно планируете на поездку?',
    description: 'Выберите вариант из выпадающего списка',
    options: [
      { value: '1', label: 'До $500' },
      { value: '5', label: '$1000–2000' },
      { value: '10', label: '$5000+' },
    ],
  },
  {
    id: 'dream_destination',
    type: 'text',
    title: 'Куда вы мечтаете поехать?',
    description: 'Введите ответ',
    placeholder: 'Например: Исландия, Япония, Новая Зеландия',
  },
]
