import type { Visibility } from '@hyper-form/core'
import { useEffect } from 'react'
import { createField, changeValue, changeEditing } from '@hyper-form/core'
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
  const visibility = useFieldVisibility(formName, fieldName)
  const disabled = useFieldDisabled(formName, fieldName)
  const value = useFieldValue(formName, fieldName)

  useEffect(() => {
    createField(formName, fieldName)
  }, [])

  return {
    formName,
    fieldName,
    visibility,
    disabled,
    value,
    changeValue,
    changeEditing
  }
}
