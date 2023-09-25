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
  DisabledMethodError,
  DisabledMethodErrorCode
} from '../errors/disabled-method-error'

export type DisabledMethod = (
  fieldValue: string,
  argumentFieldValue: string[],
  ...extraArgument: unknown[]
) => boolean

interface DisabledMethodDetail {
  name: string
  method: DisabledMethod
}

let disabledMethodDetails: Record<string, DisabledMethodDetail | undefined> = {}

export const registerDisabledMethod = (
  methodDetail: DisabledMethodDetail
): string => {
  const methodId = nanoid()
  const newDisabledMethodDetails = { [methodId]: methodDetail }
  disabledMethodDetails = assign(
    disabledMethodDetails,
    newDisabledMethodDetails
  )
  return methodId
}

export const registerDisabledMethods = (
  methodDetails: DisabledMethodDetail[]
): string[] => {
  const methodIds = map(methodDetails, (_) => nanoid())
  const newDisabledMethodDetails = zipObject(methodIds, methodDetails)
  disabledMethodDetails = assign(
    disabledMethodDetails,
    newDisabledMethodDetails
  )
  return methodIds
}

export const unregisterDisabledMethod = (
  methodId: string,
  throwOnNotFound = false
): void => {
  const exists = !isUndefined(disabledMethodDetails[methodId])

  if (!exists && throwOnNotFound) {
    throw new DisabledMethodError(
      DisabledMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS,
      `Specific method id not exists, method id ${methodId}`
    )
  }

  disabledMethodDetails = pickBy(
    disabledMethodDetails,
    (_, k) => k !== methodId
  )
}

export const unregisterDisabledMethods = (
  methodIds: string[],
  throwOnNotFound = false
): void => {
  const notExistsMethodIds = filter(methodIds, (methodId) =>
    isUndefined(disabledMethodDetails[methodId])
  )

  const exists = size(notExistsMethodIds) === 0

  if (!exists && throwOnNotFound) {
    throw new DisabledMethodError(
      DisabledMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS,
      `Specific method id not exists, method id ${join(
        notExistsMethodIds,
        ','
      )}`
    )
  }

  disabledMethodDetails = pickBy(
    disabledMethodDetails,
    (_, k) => !includes(methodIds, k)
  )
}

export const unregisterAllDisabledMethod = (): void => {
  disabledMethodDetails = {}
}

export const accessDisabledMethod = (methodId: string): DisabledMethod => {
  const methodDetail = disabledMethodDetails[methodId]

  if (isUndefined(methodDetail)) {
    throw new DisabledMethodError(
      DisabledMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS
    )
  }

  const { method } = methodDetail

  return method
}
