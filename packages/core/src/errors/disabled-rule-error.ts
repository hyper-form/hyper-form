import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum DisabledRuleErrorCode {
  SPECIFIC_FORM_NOT_EXISTS,
  SPECIFIC_RULE_ID_NOT_EXISTS
}

const DisabledRuleErrorMessage: Record<DisabledRuleErrorCode, string> = {
  [DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS]:
    'Specific form have not been created',
  [DisabledRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS]:
    'Specific disabled rule id have not been added'
}

export class DisabledRuleError extends CustomError {
  public constructor (
    public code: DisabledRuleErrorCode,
    customMessage?: string
  ) {
    super(
      isUndefined(customMessage)
        ? DisabledRuleErrorMessage[code]
        : `Disabled rule error with custom error message: "${customMessage}"`
    )
  }
}
