import type { Visibility } from '../share/constants'
import { useEffect } from 'react'
import { createField } from '../changers/field'
import { changeValue } from '../changers/value'
import { changeEditing } from '../changers/editing'
import { useFieldVisibility } from './field-visibility'
import { useFieldDisabled } from './field-disabled'
import { useFieldValue } from './field-value'
import { useFormName } from './form-name'
import { useFieldName } from './field-name'

export interface HTextBoxState {
  visibility: Visibility
  fieldName: string
  formName: string
  disabled: boolean
  value: string
  changeValue: typeof changeValue
  changeEditing: typeof changeEditing
}

export const useHTextBox = (): HTextBoxState => {
  const formName = useFormName()
  const fieldName = useFieldName()

  useEffect(() => {
    createField(fieldName)
  }, [])

  return {
    formName,
    fieldName,
    visibility: useFieldVisibility(formName, fieldName),
    disabled: useFieldDisabled(formName, fieldName),
    value: useFieldValue(formName, fieldName),
    changeValue,
    changeEditing
  }
}
