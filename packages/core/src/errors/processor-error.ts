import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum ProcessorErrorCode {
  SPECIFIC_FORM_NOT_EXISTS,
  SPECIFIC_PROCESSOR_ID_NOT_EXISTS
}

const ProcessorErrorMessage: Record<ProcessorErrorCode, string> = {
  [ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS]:
    'Specific form have not been created',
  [ProcessorErrorCode.SPECIFIC_PROCESSOR_ID_NOT_EXISTS]:
    'Specific processor id have not been added'
}

export class ProcessorError extends CustomError {
  public constructor (public code: ProcessorErrorCode, customMessage?: string) {
    super(
      isUndefined(customMessage)
        ? ProcessorErrorMessage[code]
        : `Processor error with custom error message: "${customMessage}"`
    )
  }
}
