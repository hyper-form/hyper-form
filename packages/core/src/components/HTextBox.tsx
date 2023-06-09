import type { FunctionComponent, InputHTMLAttributes } from 'react'
import type { TextBoxType } from '../ui/TextBox'
import { useInjection } from 'inversify-react'
import { FieldNameContextProvider } from '../contexts/FieldNameContext'
import { TextBoxSymbol } from '../ui/TextBox'
import { Visibility } from '../share/constants'
import { useHTextBox } from '../hooks/h-textbox'
import { useFormName } from '../hooks/form-name'
import { useFieldName } from '../hooks/field-name'
import omit from 'lodash-es/omit'
import React from 'react'

export type HTextBoxProps = InputHTMLAttributes<HTMLInputElement>

export const HTextBox: FunctionComponent<HTextBoxProps> = (props) => {
  const formName = useFormName()
  const fieldName = useFieldName()

  const state = useHTextBox(formName, fieldName)

  const TextBox = useInjection<TextBoxType>(TextBoxSymbol)

  return (
    <>
      {state.visibility !== Visibility.Visible
        ? null
        : (
        <FieldNameContextProvider value={fieldName}>
          <TextBox {...{ ...omit(state, ['visibility']), ...props }} />
        </FieldNameContextProvider>
          )}
    </>
  )
}
