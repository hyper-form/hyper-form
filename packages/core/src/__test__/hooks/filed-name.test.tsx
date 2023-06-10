import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { Container } from 'inversify'
import { HFormProvider } from '../../components/HFormProvider'
import { HForm } from '../../components/HForm'
import { HBind } from '../../components/HBind'
import { useFieldName } from '../../hooks/field-name'

const container = new Container()

describe('測試欄位名稱鉤子', (): void => {
  it('測試單層欄位名稱鉤子', (): void => {
    expect.hasAssertions()

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      return (
        <HFormProvider container={container}>
          <HForm formName='FormName'>
            <HBind fieldName='FieldName'>{children}</HBind>
          </HForm>
        </HFormProvider>
      )
    }

    const { result } = renderHook(() => useFieldName(), { wrapper })
    const { current } = result

    expect(current).toBe('FieldName')
  })

  it('測試內層欄位名稱鉤子', (): void => {
    expect.hasAssertions()

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      return (
        <HFormProvider container={container}>
          <HForm formName='FormName'>
            <HBind fieldName='Level1FieldName'>
              <HBind fieldName='Level2FormName'>{children}</HBind>
            </HBind>
          </HForm>
        </HFormProvider>
      )
    }

    const { result } = renderHook(() => useFieldName(), { wrapper })
    const { current } = result

    expect(current).toBe('Level2FormName')
  })

  it('測試嵌套欄位名稱鉤子', (): void => {
    expect.hasAssertions()

    const wrapper = ({ children }: { children: ReactNode }): ReactElement => {
      return (
        <HFormProvider container={container}>
          <HForm formName='FormName'>
            <HBind fieldName='Level1FieldName'>
              <HBind fieldName='.Level2FormName'>{children}</HBind>
            </HBind>
          </HForm>
        </HFormProvider>
      )
    }

    const { result } = renderHook(() => useFieldName(), { wrapper })
    const { current } = result

    expect(current).toBe('Level1FieldName.Level2FormName')
  })
})
