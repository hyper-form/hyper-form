import type { Field } from './field'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { FormError, FormErrorCode } from '../errors/form-error'
import isUndefined from 'lodash-es/isUndefined'

export type FormData = Record<string, Field | FormData[]>
export type Form = Record<string, FormData>

interface FormState {
  forms: Form
}

interface FormActions {
  createForm: (formName: string) => void
  removeForm: (formName: string) => void
}

export const useForm = create(
  immer<FormState & FormActions>((set) => ({
    forms: {},
    createForm: (formName: string) => {
      set((state) => {
        if (!isUndefined(state.forms[formName])) {
          throw new FormError(
            FormErrorCode.FORM_ALREADY_EXISTS,
            `Form already exists with form name: ${formName}`
          )
        }
        state.forms[formName] = {}
      })
    },
    removeForm: (formName: string) => {
      set((state) => {
        state.forms[formName] = {}
      })
    }
  }))
)
