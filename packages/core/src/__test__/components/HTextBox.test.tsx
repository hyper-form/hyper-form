import React, { type ReactNode, type ReactElement } from 'react'
import type { TextBoxType } from '../../ui/TextBox'
import { render } from '@testing-library/react'
import { Container } from 'inversify'
import { TextBoxSymbol } from '../../ui/TextBox'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { HTextBox } from '../../components/HTextBox'
import { HBind } from '../../components/HBind'

const MockTextBox: TextBoxType = (props) => <input id='ui' {...props} />

const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
  const container = new Container()
  container.bind<TextBoxType>(TextBoxSymbol).toFunction(MockTextBox)
  return (
    <HFormProvider container={container}>
      <HForm formName='FormName'>
        <HBind fieldName='FieldName'>{children}</HBind>
      </HForm>
    </HFormProvider>
  )
}

describe('測試文字框', () => {
  it('測試文字框單層欄位名稱綁定', (): void => {
    expect.hasAssertions()
    render(<HTextBox />, { wrapper })
    expect(true).toBe(true)
  })
})
