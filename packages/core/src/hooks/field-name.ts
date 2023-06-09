import { HierarchicalFieldNamePrefix } from '../share/constants'
import { FieldNameContext } from '../contexts/FieldNameContext'
import { useContext } from 'react'
import startsWith from 'lodash-es/startsWith'

export const useFieldName = (propsFieldName: string): string => {
  const contextFieldName = useContext(FieldNameContext)
  return startsWith(propsFieldName, HierarchicalFieldNamePrefix)
    ? `${contextFieldName}${propsFieldName}`
    : propsFieldName
}
