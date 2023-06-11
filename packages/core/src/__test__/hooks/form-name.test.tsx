import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { FormStore } from '../../stores'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { FormStoreSymbol } from '../../stores'
import { useFormName } from '../../hooks/form-name'
import { noop } from 'lodash-es'

const MockFormStore: FormStore = {
  useForm: () => ({
    createForm: noop,
    removeForm: noop
  })
}

describe('測試表單名稱鉤子', () => {
  it('測試單層表單名稱鉤子', () => {
    expect.assertions(1)

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      const container = new Container()
      container.bind<FormStore>(FormStoreSymbol).toConstantValue(MockFormStore)
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
