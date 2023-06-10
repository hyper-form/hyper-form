import { constant } from 'lodash-es'

export const useFieldDisabled = (
  formName: string,
  fieldName: string
): boolean => constant(true)()
