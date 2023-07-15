import { type FormStore } from '../stores/form'
import { type Visibility } from '../share/constants'
import { useInjection } from 'inversify-react'
import { FormStoreSymbol } from '../stores/form'

export const useFieldVisibility = (
  formName: string,
  fieldName: string
): Visibility => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const visibility = store.getVisibility(formName, fieldName)
  return visibility
}
