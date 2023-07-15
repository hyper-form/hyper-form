import { Visibility } from '../share/constants'
import {
  isArray,
  isNil,
  isObject,
  isFunction,
  isNumber,
  isString,
  includes,
  isBoolean
} from 'lodash-es'

export const FormStoreSymbol = Symbol.for('FormStore')

export interface FormStore {
  createForm: (formName: string) => void
  removeForm: (formName: string) => void
  createField: (formName: string, fieldName: string) => void
  removeField: (formName: string, fieldName: string) => void
  createArrayField: (formName: string, fieldName: string) => void
  removeArrayField: (formName: string, fieldName: string) => void
  createArrayFieldItem: (
    formName: string,
    fieldName: string,
    index: number
  ) => void
  removeArrayFieldItem: (
    formName: string,
    fieldName: string,
    index: number
  ) => void
  changeValue: (formName: string, fieldName: string, value: string) => void
  changeVisibility: (
    formName: string,
    fieldName: string,
    visibility: Visibility
  ) => void
  changeAlive: (formName: string, fieldName: string, alive: number) => void
  changeEditing: (formName: string, fieldName: string, editing: boolean) => void
  changeDirty: (formName: string, fieldName: string, dirty: boolean) => void
  changeDisabled: (
    formName: string,
    fieldName: string,
    disabled: boolean
  ) => void
  getValue: (formName: string, fieldName: string) => string
  getVisibility: (formName: string, fieldName: string) => Visibility
  getAlive: (formName: string, fieldName: string) => boolean
  getEditing: (formName: string, fieldName: string) => boolean
  getDirty: (formName: string, fieldName: string) => boolean
  getDisabled: (formName: string, fieldName: string) => boolean
}

export interface Field {
  value: string
  visibility: Visibility
  alive: number
  editing: boolean
  dirty: boolean
  disabled: boolean
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
  if (!('alive' in obj)) return false
  if (!('editing' in obj)) return false
  if (!('dirty' in obj)) return false
  if (!('disabled' in obj)) return false
  if (!isString(obj.value)) return false
  if (!isNumber(obj.alive)) return false
  if (!isBoolean(obj.dirty)) return false
  if (!isBoolean(obj.editing)) return false
  if (!isBoolean(obj.disabled)) return false
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
