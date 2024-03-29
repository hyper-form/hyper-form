import type { Visibility } from '../share/constants'
import { nanoid } from 'nanoid'
import {
  isUndefined,
  map,
  assign,
  zipObject,
  pickBy,
  filter,
  size,
  join,
  includes
} from 'lodash-es'
import {
  VisibilityMethodError,
  VisibilityMethodErrorCode
} from '../errors/visibility-method-error'

export type VisibilityMethod = (
  fieldValue: string,
  argumentFieldValue: string[],
  ...extraArgument: unknown[]
) => Visibility

interface VisibilityMethodDetail {
  name: string
  method: VisibilityMethod
}

let visibilityMethodDetails: Record<
string,
VisibilityMethodDetail | undefined
> = {}

export const registerVisibilityMethod = (
  methodDetail: VisibilityMethodDetail
): string => {
  const methodId = nanoid()
  const newVisibilityMethodDetails = { [methodId]: methodDetail }
  visibilityMethodDetails = assign(
    visibilityMethodDetails,
    newVisibilityMethodDetails
  )
  return methodId
}

export const registerVisibilityMethods = (
  methodDetails: VisibilityMethodDetail[]
): string[] => {
  const methodIds = map(methodDetails, (_) => nanoid())
  const newVisibilityMethodDetails = zipObject(methodIds, methodDetails)
  visibilityMethodDetails = assign(
    visibilityMethodDetails,
    newVisibilityMethodDetails
  )
  return methodIds
}

export const unregisterVisibilityMethod = (
  methodId: string,
  throwOnNotFound = false
): void => {
  const exists = !isUndefined(visibilityMethodDetails[methodId])

  if (!exists) {
    if (throwOnNotFound) {
      throw new VisibilityMethodError(
        VisibilityMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS
      )
    }
    return
  }

  visibilityMethodDetails = pickBy(
    visibilityMethodDetails,
    (_, k) => k !== methodId
  )
}

export const unregisterVisibilityMethods = (
  methodIds: string,
  throwOnNotFound = false
): void => {
  const notExistsMethodIds = filter(methodIds, (methodId) =>
    isUndefined(visibilityMethodDetails[methodId])
  )

  const exists = size(notExistsMethodIds) === 0

  if (!exists) {
    if (throwOnNotFound) {
      throw new VisibilityMethodError(
        VisibilityMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS,
        `Specific method id not exists, method id ${join(
          notExistsMethodIds,
          ','
        )}`
      )
    }
    return
  }

  visibilityMethodDetails = pickBy(
    visibilityMethodDetails,
    (_, k) => !includes(methodIds, k)
  )
}

export const unregisterAllVisibilityMethod = (): void => {
  visibilityMethodDetails = {}
}

export const accessVisibilityMethod = (methodId: string): VisibilityMethod => {
  const methodDetail = visibilityMethodDetails[methodId]

  if (isUndefined(methodDetail)) {
    throw new VisibilityMethodError(
      VisibilityMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS
    )
  }

  const { method } = methodDetail

  return method
}
