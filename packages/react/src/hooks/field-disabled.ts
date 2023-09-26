import type { FormStore } from '@hyper-form/core'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '@hyper-form/core'

export const useFieldDisabled = (
  formName: string,
  fieldName: string
): boolean => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const disabled = store.getDisabled(formName, fieldName)
  return disabled
}
