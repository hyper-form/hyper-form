import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { FormStore } from '@hyper-form/core'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { FormStoreSymbol } from '@hyper-form/core'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { HBind } from '../../components/HBind'
import { formStore } from '../mocks/stores/form'
import { useFieldDisabled } from '../../hooks/field-disabled'

describe('測試欄位禁用狀態鉤子', (): void => {
  it('測試欄位禁用鉤子取得禁用狀態', (): void => {
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

    const { result } = renderHook(() => useFieldDisabled(formName, fieldName), {
      wrapper
    })
    const { current } = result

    expect(current).toBe(false)
  })
})
