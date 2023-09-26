import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { FormStore } from '@hyper-form/core'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { FormStoreSymbol } from '@hyper-form/core'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { useFormName } from '../../hooks/form-name'
import { formStore } from '../mocks/stores/form'

describe('測試表單名稱鉤子', () => {
  it('測試單層表單名稱鉤子', () => {
    expect.assertions(1)

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      const container = new Container()
      container.bind<FormStore>(FormStoreSymbol).toConstantValue(formStore)
      return (
        <HFormProvider container={container}>
          <HForm formName='FormName'>{children}</HForm>
        </HFormProvider>
      )
    }

    const { result } = renderHook(() => useFormName(), { wrapper })
    const { current } = result

    expect(current).toBe('FormName')
  })
})
