import { CustomError } from 'ts-custom-error'

export enum FormErrorCode {
  FORM_ALREADY_EXISTS
}

export class FormError extends CustomError {
  public constructor (public code: FormErrorCode, message?: string) {
    super(message)
  }
}
