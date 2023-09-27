import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum VisibilityRuleErrorCode {
  SPECIFIC_FORM_NOT_EXISTS,
  SPECIFIC_RULE_ID_NOT_EXISTS
}

const VisibilityRuleErrorMessage: Record<VisibilityRuleErrorCode, string> = {
  [VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS]:
    'Specific form have not been created',
  [VisibilityRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS]:
    'Specific visibility rule id have not been added'
}

export class VisibilityRuleError extends CustomError {
  public constructor (
    public code: VisibilityRuleErrorCode,
    customMessage?: string
  ) {
    super(
      isUndefined(customMessage)
        ? VisibilityRuleErrorMessage[code]
        : `Visibility rule error with custom error message: "${customMessage}"`
    )
  }
}
