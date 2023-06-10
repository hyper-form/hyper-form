import React, { type ReactNode, type ReactElement } from 'react'
import type { TextBoxType } from '../../ui/TextBox'
import { FormStoreSymbol, type FormStore } from '../../stores'
import { render, screen } from '@testing-library/react'
import { Container } from 'inversify'
import { TextBoxSymbol } from '../../ui/TextBox'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { HTextBox } from '../../components/HTextBox'
import { HBind } from '../../components/HBind'
import noop from 'lodash-es/noop'

const MockTextBox: TextBoxType = (props) => (
  <input data-testid='ui' {...props} />
)

const MockFormStore: FormStore = {
  useForm: () => ({
    createForm: noop,
    removeForm: noop
  })
}

const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
  const container = new Container()
  container.bind<TextBoxType>(TextBoxSymbol).toFunction(MockTextBox)
  container.bind<FormStore>(FormStoreSymbol).toConstantValue(MockFormStore)
  return (
    <HFormProvider container={container}>
      <HForm formName='FormName'>
        <HBind fieldName='FieldName'>{children}</HBind>
      </HForm>
    </HFormProvider>
  )
}

describe('測試文字框', () => {
  it('測試文字框成功渲染', (): void => {
    expect.assertions(1)
    render(<HTextBox />, { wrapper })
    const ui = screen.queryAllByTestId('ui')
    expect(ui).not.toBeNull()
  })
})
