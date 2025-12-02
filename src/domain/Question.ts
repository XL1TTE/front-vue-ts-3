interface Option {
  value: string
  label: string
}

type Answer = Option | Array<Option> | null

const QuestionType = {
  radio: 0,
  checkbox: 1,
  text: 2,
  select: 3,
}

interface Question {
  id: string | number
  type: QuestionType
  title: string
  description?: string
  placeholder?: string
  options?: Option[]
}

export type QuestionType = keyof typeof QuestionType
export type { Question, Option, Answer }
