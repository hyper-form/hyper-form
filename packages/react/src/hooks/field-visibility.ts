import { type FormStore, type Visibility } from '@hyper-form/core'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '@hyper-form/core'

export const useFieldVisibility = (
  formName: string,
  fieldName: string
): Visibility => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const visibility = store.getVisibility(formName, fieldName)
  return visibility
}
