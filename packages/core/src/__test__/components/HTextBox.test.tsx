import React from 'react'
import type { TextBoxType } from '../../ui/TextBox'
import { render } from '@testing-library/react'
import { Container } from 'inversify'
import { TextBoxSymbol } from '../../ui/TextBox'
import { HFormProvider } from '../../components/HFormProvider'
import { HTextBox } from '../../components/HTextBox'
import { HBind } from '../../components/HBind'

const MockTextBox: TextBoxType = (props) => <input {...props}></input>

test('測試文字框單層欄位名稱綁定', (): void => {
  const container = new Container()
  container.bind<TextBoxType>(TextBoxSymbol).toFunction(MockTextBox)

  render(
    <HFormProvider container={container}>
      <HBind fieldName="A">
        <HTextBox />
      </HBind>
    </HFormProvider>
  )
})
