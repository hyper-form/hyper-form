import type { FormStore } from '../../../stores/form'
import { noop, constant } from 'lodash-es'
import { Visibility } from '../../../share/constants'

export const formStore: FormStore = {
  createForm: noop,
  removeForm: noop,
  createField: noop,
  removeField: noop,
  createArrayField: noop,
  removeArrayField: noop,
  createArrayFieldItem: noop,
  removeArrayFieldItem: noop,
  changeValue: noop,
  changeVisibility: noop,
  changeAlive: noop,
  changeEditing: noop,
  changeDirty: noop,
  changeDisabled: noop,
  getValue: constant(''),
  getVisibility: (formName: string, fieldName: string) => Visibility.Visible,
  getAlive: constant(true),
  getEditing: constant(true),
  getDirty: constant(true),
  getDisabled: constant(false)
}
