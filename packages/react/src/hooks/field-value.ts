import type { FormStore } from '@hyper-form/core'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '@hyper-form/core'

export const useFieldValue = (formName: string, fieldName: string): string => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const value = store.getValue(formName, fieldName)
  return value
}
