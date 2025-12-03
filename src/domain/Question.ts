interface RadioAnswer {
  type: 'radio'
  value: string
  label: string
}
interface CheckBoxAnswer {
  type: 'checkbox'
  values: Array<{ value: string; label: string }>
}
interface TextAnswer {
  type: 'text'
  value: string
}
interface SelectAnswer {
  type: 'select'
  value: string
  label: string
}
type Answer = RadioAnswer | CheckBoxAnswer | TextAnswer | SelectAnswer

export type QuestionType = 'radio' | 'checkbox' | 'text' | 'select'
interface QuestionOption {
  label: string
  value: string
}

interface BaseQuestion {
  id: string | number
  title: string
  description: string
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio'
  options: QuestionOption[]
}
export interface CheckBoxQuestion extends BaseQuestion {
  type: 'checkbox'
  options: QuestionOption[]
}
export interface TextQuestion extends BaseQuestion {
  type: 'text'
  placeholder: string
}
export interface SelectQuestion extends BaseQuestion {
  type: 'select'
  options: QuestionOption[]
}

export type Question = RadioQuestion | CheckBoxQuestion | TextQuestion | SelectQuestion

export type { Answer, QuestionOption, TextAnswer, RadioAnswer, CheckBoxAnswer, SelectAnswer }
