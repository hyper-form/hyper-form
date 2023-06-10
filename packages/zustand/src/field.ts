import type { Visibility } from '../share/constants'
import type { Set, State } from './share'
import type { Draft } from 'immer'
import { FieldError, FieldErrorCode } from '../errors/field-error'
import { isField } from './share'
import { isUndefined } from 'lodash-es'
import js from 'jsonpath'

const check = (
  state: Draft<State>,
  formName: string,
  fieldName: string
): void => {
  if (isUndefined(state.forms[formName])) {
    throw new FieldError(
      FieldErrorCode.FORM_NOT_EXISTS,
      `Form not exists for set field name: ${fieldName} for form name: ${formName}`
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const field = js.value(state.forms, fieldName)
  if (isUndefined(field)) {
    throw new FieldError(
      FieldErrorCode.FORM_NOT_EXISTS,
      `Form not exists for set field name: ${fieldName} for form name: ${formName}`
    )
  }

  if (!isField(field)) {
    throw new FieldError(
      FieldErrorCode.FORM_NOT_EXISTS,
      `Form not exists for set field name: ${fieldName} for form name: ${formName}`
    )
  }
}

export const setValue =
  (set: Set) => (formName: string, fieldName: string, value: string) => {
    set((state) => {
      check(state, formName, fieldName)
      // TODO: 設定值
    })
  }

export const setVisibility =
  (set: Set) =>
  (formName: string, fieldName: string, visibility: Visibility) => {
    set((state) => {
      check(state, formName, fieldName)
      // TODO: 設定值
    })
  }

export const setRemaining =
  (set: Set) => (formName: string, fieldName: string, remaining: number) => {
    set((state) => {
      check(state, formName, fieldName)
      // TODO: 設定值
    })
  }
