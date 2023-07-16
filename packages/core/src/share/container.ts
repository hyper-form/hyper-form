import type { Container } from 'inversify'
import { isNull } from 'lodash-es'
import { ContainerError, ContainerErrorCode } from '../errors/container-error'

let container: null | Container = null

export const setContainer = (containerArgs: Container): void => {
  if (!isNull(container)) {
    throw new ContainerError(
      ContainerErrorCode.DUPLICATE_INITIALIZE,
      'Duplicate initialize container'
    )
  }

  container = containerArgs
}

export const getContainer = (): Container => {
  if (isNull(container)) {
    throw new ContainerError(
      ContainerErrorCode.ACCESS_BEFORE_INITIALIZED,
      'Access container before initialized'
    )
  }

  return container
}
