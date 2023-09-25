import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum VisibilityMethodErrorCode {
  SPECIFIC_METHOD_ID_NOT_EXISTS
}

const VisibilityMethodErrorMessage: Record<VisibilityMethodErrorCode, string> =
  {
    [VisibilityMethodErrorCode.SPECIFIC_METHOD_ID_NOT_EXISTS]:
      'Specific visibility method id have not been registered'
  }

export class VisibilityMethodError extends CustomError {
  public constructor (
    public code: VisibilityMethodErrorCode,
    customMessage?: string
  ) {
    super(
      isUndefined(customMessage)
        ? VisibilityMethodErrorMessage[code]
        : `Visibility method error with custom error message: "${customMessage}"`
    )
  }
}
