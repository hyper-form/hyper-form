import type { InputHTMLAttributes } from 'react'
import type { Visibility } from '../share/constants'
import { useFieldVisibility } from './field-visibility'
import { useFieldDisabled } from './field-disabled'
import { useFieldValue } from './field-value'

export type HTextBoxState = {
  visibility: Visibility
} & InputHTMLAttributes<HTMLInputElement>

export const useHTextBox = (
  formName: string,
  fieldName: string
): HTextBoxState => {
  return {
    visibility: useFieldVisibility(formName, fieldName),
    disabled: useFieldDisabled(formName, fieldName),
    value: useFieldValue(formName, fieldName)
  }
}
