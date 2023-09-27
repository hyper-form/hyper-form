import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum GuardErrorCode {
  FOUND_INFINITY_LOOP,
}

const GuardErrorMessage: Record<GuardErrorCode, string> = {
  [GuardErrorCode.FOUND_INFINITY_LOOP]:
    'Found infinity loop within visibility rule and processors'
}

export class GuardError extends CustomError {
  public constructor (public code: GuardErrorCode, customMessage?: string) {
    super(
      isUndefined(customMessage)
        ? GuardErrorMessage[code]
        : `Guard error with custom error message: "${customMessage}"`
    )
  }
}
