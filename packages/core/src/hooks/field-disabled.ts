import type { FormStore } from '../stores/form'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '../stores/form'

export const useFieldDisabled = (
  formName: string,
  fieldName: string
): boolean => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const disabled = store.getDisabled(formName, fieldName)
  return disabled
}
