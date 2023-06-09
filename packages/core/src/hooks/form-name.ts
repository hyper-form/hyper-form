import { FormNameContext } from '../contexts/FormNameContext'
import { useContext } from 'react'

export const useFormName = (): string => {
  const formName = useContext(FormNameContext)
  return formName
}
