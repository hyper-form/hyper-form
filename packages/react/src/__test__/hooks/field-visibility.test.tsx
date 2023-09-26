import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { FormStore } from '@hyper-form/core'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { FormStoreSymbol, Visibility } from '@hyper-form/core'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { HBind } from '../../components/HBind'
import { formStore } from '../mocks/stores/form'
import { useFieldVisibility } from '../../hooks/field-visibility'

describe('測試欄位可見鉤子', (): void => {
  it('測試欄位可見鉤子取得欄位是否可見', (): void => {
    expect.assertions(1)

    const formName = 'FormName'
    const fieldName = 'FieldName'

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      const container = new Container()
      container.bind<FormStore>(FormStoreSymbol).toConstantValue(formStore)
      return (
        <HFormProvider container={container}>
          <HForm formName={formName}>
            <HBind fieldName={fieldName}>{children}</HBind>
          </HForm>
        </HFormProvider>
      )
    }

    const { result } = renderHook(
      () => useFieldVisibility(formName, fieldName),
      {
        wrapper
      }
    )
    const { current } = result

    expect(current).toBe(Visibility.Visible)
  })
})
