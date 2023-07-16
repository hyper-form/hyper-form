import { CustomError } from 'ts-custom-error'

export enum ContainerErrorCode {
  ACCESS_BEFORE_INITIALIZED,
  DUPLICATE_INITIALIZE
}

export class ContainerError extends CustomError {
  constructor (public code: ContainerErrorCode, message?: string) {
    super(message)
  }
}
