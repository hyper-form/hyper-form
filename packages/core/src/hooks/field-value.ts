import type { FormStore } from '../stores/form'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '../stores/form'

export const useFieldValue = (formName: string, fieldName: string): string => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const value = store.getValue(formName, fieldName)
  return value
}
