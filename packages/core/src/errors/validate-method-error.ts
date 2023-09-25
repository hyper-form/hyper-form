import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum ValidateMethodErrorCode {
  SPECIFIC_METHOD_ID_NOT_EXISTS
}

const ValidateMethodErrorMessage: Record<ValidateMethodErrorCode, string> = {
  [ValidateMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS]:
    'Specific validate method id have not been registered'
}

export class ValidateMethodError extends CustomError {
  public constructor (
    public code: ValidateMethodErrorCode,
    customMessage?: string
  ) {
    const message = isUndefined(customMessage)
      ? ValidateMethodErrorMessage[code]
      : `Validate method error with custom error message: "${customMessage}"`
    super(message)
  }
}
