import type { FunctionComponent } from 'react'
import type { TextBoxType } from '../ui/TextBox'
import { useInjection } from 'inversify-react'
import { FieldNameContextProvider } from '../contexts/FieldNameContext'
import { TextBoxSymbol } from '../ui/TextBox'
import { Visibility } from '../share/constants'
import { useHTextBox } from '../hooks/h-textbox'
import { useFieldName } from '../hooks/field-name'
import omit from 'lodash-es/omit'
import React from 'react'

export interface HTextBoxProps {
  fieldName: string
}

export const HTextBox: FunctionComponent<HTextBoxProps> = (props) => {
  const fieldName = useFieldName(props.fieldName)
  const state = useHTextBox(fieldName)

  const TextBox = useInjection<TextBoxType>(TextBoxSymbol)

  return (
    <>
      {state.visibility !== Visibility.Visible
        ? null
        : (
        <FieldNameContextProvider value={fieldName}>
          <TextBox {...omit(state, ['visibility'])} />
        </FieldNameContextProvider>
          )}
    </>
  )
}
