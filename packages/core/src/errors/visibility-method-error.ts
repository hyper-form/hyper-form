import { CustomError } from 'ts-custom-error'

export enum VisibilityMethodErrorCode {
  SPECIFIC_METHOD_ID_NOT_EXISTS
}

export class VisibilityMethodError extends CustomError {
  public constructor (public code: VisibilityMethodErrorCode, message?: string) {
    super(message)
  }
}
