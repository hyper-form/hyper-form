import type { FormStore } from '../stores'
import { useInjection } from 'inversify-react'
import { useEffect } from 'react'
import { FormStoreSymbol } from '../stores'

export const useHForm = (formName: string): void => {
  const store = useInjection<FormStore>(FormStoreSymbol)
  const { useForm } = store
  const { createForm, removeForm } = useForm()
  useEffect(() => {
    createForm(formName)
    return () => {
      removeForm(formName)
    }
  })
}
