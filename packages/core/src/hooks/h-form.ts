import type { FormStore } from '../stores/form'
import { useInjection } from 'inversify-react'
import { useEffect } from 'react'
import { FormStoreSymbol } from '../stores'

export const useHForm = (formName: string): void => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  useEffect(() => {
    store.createForm(formName)
    return () => {
      store.removeForm(formName)
    }
  })
}
