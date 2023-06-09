import { CustomError } from 'ts-custom-error'

export enum FieldErrorCode {
  FORM_NOT_EXISTS,
  FIELD_NOT_EXISTS
}

export class FieldError extends CustomError {
  public constructor(public code: FieldErrorCode, message?: string) {
    super(message)
  }
}
