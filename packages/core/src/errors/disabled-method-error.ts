import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum DisabledMethodErrorCode {
  SPECIFIC_METHOD_ID_NOT_EXISTS
}

const DisabledMethodErrorMessage: Record<DisabledMethodErrorCode, string> = {
  [DisabledMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS]:
    'Specific disabled method id have not been registered'
}

export class DisabledMethodError extends CustomError {
  public constructor (
    public code: DisabledMethodErrorCode,
    customMessage?: string
  ) {
    super(
      isUndefined(customMessage)
        ? DisabledMethodErrorMessage[code]
        : `Disabled method error with custom error message: "${customMessage}"`
    )
  }
}
