interface Option {
  value: string
  label: string
}

interface Answer {
  value: string | number | Array<string>
}

interface Question {
  id: string | number
  type: 'radio' | 'checkbox' | 'text' | 'select'
  title: string
  description?: string
  placeholder?: string
  options?: Option[]
}

export type { Question, Option, Answer }
