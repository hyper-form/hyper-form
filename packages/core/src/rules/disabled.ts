import { nanoid } from 'nanoid'
import {
  map,
  isUndefined,
  pickBy,
  assign,
  zipObject,
  includes,
  filter,
  size,
  join
} from 'lodash-es'
import {
  DisabledRuleError,
  DisabledRuleErrorCode
} from '../errors/disabled-rule-error'

interface DisabledRule {
  methodId: string
  fieldNames: string[]
  argumentFieldNames: string[]
}

export type DisabledRuleRecord = Record<string, DisabledRule | undefined>
export type DisabledRuleFormRecord = Record<
string,
DisabledRuleRecord | undefined
>

let disabledRules: DisabledRuleFormRecord = {}

export const addDisabledRule = (
  formName: string,
  rule: DisabledRule
): string => {
  const ruleId = nanoid()
  disabledRules[formName] = assign(disabledRules ?? {}, { [ruleId]: rule })
  return ruleId
}

export const addDisabledRules = (
  formName: string,
  rules: DisabledRule[]
): string[] => {
  const ruleIds = map(rules, (_) => nanoid())
  disabledRules[formName] = assign(
    disabledRules[formName] ?? {},
    zipObject(ruleIds, rules)
  )
  return ruleIds
}

export const removeDisabledRule = (
  formName: string,
  ruleId: string,
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(disabledRules[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new DisabledRuleError(
        DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
      )
    }
    return
  }

  const ruleExists = !isUndefined(
    (disabledRules[formName] as DisabledRuleRecord)[ruleId]
  )
  if (!ruleExists) {
    if (throwOnNotFound) {
      throw new DisabledRuleError(
        DisabledRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS
      )
    }
    return
  }

  disabledRules[formName] = pickBy(
    disabledRules[formName] as DisabledRuleRecord,
    (_, k) => k !== ruleId
  )
}

export const removeDisabledRules = (
  formName: string,
  ruleIds: string[],
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(disabledRules[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new DisabledRuleError(
        DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
      )
    }

    return
  }

  const notExistsRuleIds = filter(ruleIds, (ruleId) =>
    isUndefined((disabledRules[formName] as DisabledRuleRecord)[ruleId])
  )

  const ruleExists = size(notExistsRuleIds) === 0

  if (!ruleExists) {
    if (throwOnNotFound) {
      throw new DisabledRuleError(
        DisabledRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS,
        `Specific rule id not exists, rule id ${join(notExistsRuleIds, ',')}`
      )
    }
  }

  disabledRules[formName] = pickBy(
    disabledRules[formName] as DisabledRuleRecord,
    (_, k) => !includes(ruleIds, k)
  )
}

export const removeAllFormDisabledRule = (
  formName: string,
  throwOnNotFound = false
): void => {
  const disabledRulesForForm = disabledRules[formName]

  const formExists = !isUndefined(disabledRulesForForm)
  if (!formExists && throwOnNotFound) {
    throw new DisabledRuleError(DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  disabledRules = pickBy(disabledRules, (_, k) => k !== formName)
}

export const removeAllDisabledRule = (): void => {
  disabledRules = {}
}

export const accessAllFormDisabledRule = (
  formName: string
): DisabledRuleRecord => {
  const disabledRulesForForm = disabledRules[formName]

  const formExists = !isUndefined(disabledRulesForForm)
  if (!formExists) {
    throw new DisabledRuleError(DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  return disabledRulesForForm
}

export const accessFormDisabledRule = (
  formName: string,
  fieldName: string
): DisabledRuleRecord => {
  const disabledRulesForForm = disabledRules[formName]

  const formExists = !isUndefined(disabledRulesForForm)
  if (!formExists) {
    throw new DisabledRuleError(DisabledRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  const relativeDisabledRulesForForm = pickBy(
    disabledRulesForForm,
    (r) => !isUndefined(r) && includes(r.fieldNames, fieldName)
  )

  return relativeDisabledRulesForForm
}
