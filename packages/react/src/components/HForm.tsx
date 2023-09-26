import type { FunctionComponent, ReactNode } from 'react'
import { useHForm } from '../hooks/h-form'
import { FormNameContextProvider } from '../contexts/FormNameContext'
import React from 'react'

export interface HFormProps {
  formName: string
  children: ReactNode
}

export const HForm: FunctionComponent<HFormProps> = (props) => {
  const { formName, children } = props
  useHForm(formName)
  return (
    <>
      <FormNameContextProvider value={formName}>
        {children}
      </FormNameContextProvider>
    </>
  )
}
