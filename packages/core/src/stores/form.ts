import type { Set } from './share'
import { FormError, FormErrorCode } from '../errors/form-error'
import isUndefined from 'lodash-es/isUndefined'
import omit from 'lodash-es/omit'

export const createForm = (set: Set) => (formName: string) => {
  set((state) => {
    if (!isUndefined(state.forms[formName])) {
      throw new FormError(
        FormErrorCode.FORM_ALREADY_EXISTS,
        `Form already exists with form name: ${formName}`
      )
    }
    state.forms[formName] = {}
  })
}

export const removeForm = (set: Set) => (formName: string) => {
  set((state) => {
    if (isUndefined(state.forms[formName])) {
      return
    }
    state.forms = omit(state.forms, [formName])
  })
}
