import type {
  FunctionComponent,
  ClassicComponentClass,
  InputHTMLAttributes
} from 'react'

export const TextBoxSymbol = Symbol.for('TextBox')
export type TextBoxProps = InputHTMLAttributes<HTMLInputElement>
export type TextBoxType =
  | FunctionComponent<TextBoxProps>
  | ClassicComponentClass<TextBoxProps>
