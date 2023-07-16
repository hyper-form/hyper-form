import type { FunctionComponent, ReactNode } from 'react'
import type { Container } from 'inversify'
import { Provider } from 'inversify-react'
import { useHFormProvider } from '../hooks/h-form-provider'
import React from 'react'

export interface HFormProviderProps {
  container: Container
  children?: ReactNode
}

export const HFormProvider: FunctionComponent<HFormProviderProps> = (props) => {
  const { children, container } = props
  useHFormProvider(container)
  return (
    <>
      <Provider container={container}>{children}</Provider>
    </>
  )
}
