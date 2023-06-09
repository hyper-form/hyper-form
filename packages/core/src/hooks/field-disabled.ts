import constant from 'lodash-es/constant'

export const useFieldDisabled = (
  formName: string,
  fieldName: string
): boolean => constant(true)()
