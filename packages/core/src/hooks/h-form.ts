import { useForm } from '../stores'
import { useEffect } from 'react'

export const useHForm = (formName: string): void => {
  const { createForm, removeForm } = useForm()
  useEffect(() => {
    createForm(formName)
    return () => {
      removeForm(formName)
    }
  })
}
