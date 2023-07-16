import { useEffect } from 'react'
import { createForm, removeForm } from '../changers/form'

export const useHForm = (formName: string): void => {
  useEffect(() => {
    createForm(formName)
    return () => {
      removeForm(formName)
    }
  })
}
