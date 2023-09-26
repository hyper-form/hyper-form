import { useEffect } from 'react'
import { createForm, removeForm } from '@hyper-form/core'

export const useHForm = (formName: string): void => {
  useEffect(() => {
    createForm(formName)
    return () => {
      removeForm(formName)
    }
  })
}
