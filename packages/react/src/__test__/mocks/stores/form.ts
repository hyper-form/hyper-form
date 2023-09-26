import type { FormStore } from '@hyper-form/core'
import { noop, constant } from 'lodash-es'
import { Visibility } from '@hyper-form/core'

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
  getVisibility: constant(Visibility.Visible),
  getAlive: constant(true),
  getEditing: constant(true),
  getDirty: constant(true),
  getDisabled: constant(false)
}
