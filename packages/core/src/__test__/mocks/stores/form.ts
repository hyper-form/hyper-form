import type { FormStore } from '../../../stores/form'
import { noop } from 'lodash-es'

export const formStore: FormStore = {
  useForm: () => ({
    createForm: noop,
    removeForm: noop
  })
}
