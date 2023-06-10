import { Visibility } from '../share/constants'
import isArray from 'lodash-es/isArray'
import isNil from 'lodash-es/isNil'
import isObject from 'lodash-es/isObject'
import isFunction from 'lodash-es/isFunction'
import isNumber from 'lodash-es/isNumber'
import isString from 'lodash-es/isString'
import includes from 'lodash-es/includes'

export const FormStoreSymbol = Symbol.for('FormStore')

export interface FormStore {
  useForm: () => {
    createForm: (formName: string) => void
    removeForm: (formName: string) => void
  }
}

export interface Field {
  value: string
  visibility: Visibility
  remaining: number
}

export type FormData = Record<string, Field | FormData[]>
export type Form = Record<string, FormData>

export interface State {
  forms: Form
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isField = (obj: any): obj is Field => {
  if (!isObject(obj)) return false
  if (isArray(obj)) return false
  if (isNil(obj)) return false
  if (isFunction(obj)) return false
  if (!('value' in obj)) return false
  if (!('visibility' in obj)) return false
  if (!('remaining' in obj)) return false
  if (!isString(obj.value)) return false
  if (!isNumber(obj.remaining)) return false
  if (
    !includes(
      [Visibility.Gone, Visibility.InVisible, Visibility.Visible],
      obj.visibility
    )
  ) {
    return false
  }
  return true
}
