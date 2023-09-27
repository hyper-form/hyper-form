import { nanoid } from 'nanoid'
import {
  assign,
  map,
  zipObject,
  isUndefined,
  pickBy,
  filter,
  size,
  join,
  includes
} from 'lodash-es'
import {
  ValidateMethodError,
  ValidateMethodErrorCode
} from '../errors/validate-method-error'

export type ValidateMethod = (
  fieldValue: string,
  argumentFieldValue: string[],
  ...extraArgument: unknown[]
) => boolean

interface ValidateMethodDetail {
  name: string
  method: ValidateMethod
}

let validateMethodDetails: Record<string, ValidateMethodDetail | undefined> = {}

export const registerValidateMethod = (
  methodDetail: ValidateMethodDetail
): string => {
  const methodId = nanoid()
  const newValidateMethodDetails = { [methodId]: methodDetail }
  validateMethodDetails = assign(
    validateMethodDetails,
    newValidateMethodDetails
  )
  return methodId
}

export const registerValidateMethods = (
  methodDetails: ValidateMethodDetail[]
): string[] => {
  const methodIds = map(methodDetails, (_) => nanoid())
  const newValidateMethodDetails = zipObject(methodIds, methodDetails)
  validateMethodDetails = assign(
    validateMethodDetails,
    newValidateMethodDetails
  )
  return methodIds
}

export const unregisterValidateMethod = (
  methodId: string,
  throwOnNotFound = false
): void => {
  const exists = !isUndefined(validateMethodDetails[methodId])

  if (!exists) {
    if (throwOnNotFound) {
      throw new ValidateMethodError(
        ValidateMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS,
        `Specific method id not exists, method id ${methodId}`
      )
    }
    return
  }

  validateMethodDetails = pickBy(
    validateMethodDetails,
    (_, k) => k !== methodId
  )
}

export const unregisterValidateMethods = (
  methodIds: string[],
  throwOnNotFound = false
): void => {
  const notExistsMethodIds = filter(methodIds, (methodId) =>
    isUndefined(validateMethodDetails[methodId])
  )

  const exists = size(notExistsMethodIds) === 0

  if (!exists) {
    if (throwOnNotFound) {
      throw new ValidateMethodError(
        ValidateMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS,
        `Specific method id not exists, method id ${join(
          notExistsMethodIds,
          ','
        )}`
      )
    }
    return
  }

  validateMethodDetails = pickBy(
    validateMethodDetails,
    (_, k) => !includes(methodIds, k)
  )
}

export const unregisterAllValidateMethod = (): void => {
  validateMethodDetails = {}
}

export const accessValidateMethod = (methodId: string): ValidateMethod => {
  const methodDetail = validateMethodDetails[methodId]

  if (isUndefined(methodDetail)) {
    throw new ValidateMethodError(
      ValidateMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS
    )
  }

  const { method } = methodDetail

  return method
}
