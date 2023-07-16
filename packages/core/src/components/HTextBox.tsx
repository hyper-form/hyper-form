import type {
  FunctionComponent,
  InputHTMLAttributes,
  FocusEvent,
  ChangeEvent
} from 'react'
import type { TextBoxType } from '../ui/TextBox'
import { useInjection } from 'inversify-react'
import { FieldNameContextProvider } from '../contexts/FieldNameContext'
import { TextBoxSymbol } from '../ui/TextBox'
import { Visibility } from '../share/constants'
import { useHTextBox } from '../hooks/h-textbox'
import React from 'react'

export type HTextBoxProps = InputHTMLAttributes<HTMLInputElement>

export const HTextBox: FunctionComponent<HTextBoxProps> = (props) => {
  const { onBlur, onFocus, onChange } = props
  const {
    formName,
    fieldName,
    value,
    visibility,
    disabled,
    changeValue,
    changeEditing
  } = useHTextBox()

  const TextBox = useInjection<TextBoxType>(TextBoxSymbol)

  const handleFocus = (e: FocusEvent<HTMLInputElement, Element>): void => {
    changeEditing(formName, fieldName, false)
    onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement, Element>): void => {
    changeEditing(formName, fieldName, true)
    onBlur?.(e)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    changeValue(formName, fieldName, value)
    onChange?.(e)
  }

  return (
    <>
      {visibility !== Visibility.Visible
        ? null
        : (
          <FieldNameContextProvider value={fieldName}>
            <TextBox
              {...props}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
              value={value}
            />
          </FieldNameContextProvider>
          )}
    </>
  )
}
