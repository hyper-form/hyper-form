import { HierarchicalFieldNamePrefix } from '../share/constants'
import { FieldNameContext } from '../contexts/FieldNameContext'
import { useContext } from 'react'
import startsWith from 'lodash-es/startsWith'

export const useHierarchicalFieldName = (propsFieldName: string): string => {
  const contextFieldName = useContext(FieldNameContext)
  return startsWith(propsFieldName, HierarchicalFieldNamePrefix)
    ? `${contextFieldName}${propsFieldName}`
    : propsFieldName
}

export const useFieldName = (): string => {
  const fieldName = useContext(FieldNameContext)
  return fieldName
}
