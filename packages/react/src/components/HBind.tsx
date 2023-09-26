import type { FunctionComponent, ReactNode, ReactElement } from 'react'
import { useHierarchicalFieldName } from '../hooks/field-name'
import { FieldNameContextProvider } from '../contexts/FieldNameContext'
import React from 'react'

export interface HBindProps {
  fieldName: string
  children: ReactNode
}

export const HBind: FunctionComponent<HBindProps> = (props): ReactElement => {
  const { fieldName, children } = props
  const hierarchicalFieldName = useHierarchicalFieldName(fieldName)

  return (
    <FieldNameContextProvider value={hierarchicalFieldName}>
      {children}
    </FieldNameContextProvider>
  )
}
