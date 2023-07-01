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
  createField: (fieldName: string) => void
  removeField: (fieldName: string) => void
  createArrayField: (fieldName: string) => void
  removeArrayField: (fieldName: string) => void
  createArrayFieldItem: (fieldName: string, index: number) => void
  removeArrayFieldItem: (fieldName: string, index: number) => void
  changeValue: (fieldName: string, value: string) => void
  changeVisibility: (fieldName: string, visibility: Visibility) => void
  changeAlive: (fieldName: string, alive: number) => void
  changeEditing: (fieldName: string, editing: boolean) => void
  changeDirty: (fieldName: string, dirty: boolean) => void
}

export interface Field {
  value: string
  visibility: Visibility
  alive: number
  editing: boolean
  dirty: boolean
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
  if (!isString(obj.value)) return false
  if (!isNumber(obj.alive)) return false
  if (!isBoolean(obj.dirty)) return false
  if (!isBoolean(obj.editing)) return false
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
