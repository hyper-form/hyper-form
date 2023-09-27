import { nanoid } from 'nanoid'
import {
  assign,
  map,
  zipObject,
  isUndefined,
  pickBy,
  includes,
  filter,
  size,
  join
} from 'lodash-es'
import {
  VisibilityRuleError,
  VisibilityRuleErrorCode
} from '../errors/visibility-rule-error'

export interface VisibilityRule {
  methodId: string
  fieldNames: string[]
  argumentFieldNames: string[]
}

export type VisibilityRuleRecord = Record<string, VisibilityRule | undefined>
export type VisibilityRuleFormRecord = Record<
string,
VisibilityRuleRecord | undefined
>

let visibilityRules: VisibilityRuleFormRecord = {}

export const addVisibilityRule = (
  formName: string,
  rule: VisibilityRule
): string => {
  const ruleId = nanoid()
  visibilityRules[formName] = assign(visibilityRules[formName] ?? {}, {
    [ruleId]: rule
  })
  return ruleId
}

export const addVisibilityRules = (
  formName: string,
  rules: VisibilityRule[]
): string[] => {
  const ruleIds = map(rules, (_) => nanoid())
  visibilityRules[formName] = assign(
    visibilityRules[formName] ?? {},
    zipObject(ruleIds, rules)
  )
  return ruleIds
}

export const removeVisibilityRule = (
  formName: string,
  ruleId: string,
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(visibilityRules[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new VisibilityRuleError(
        VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
      )
    }
    return
  }

  const ruleExists = !isUndefined(
    (visibilityRules[formName] as VisibilityRuleRecord)[ruleId]
  )
  if (!ruleExists) {
    if (throwOnNotFound) {
      throw new VisibilityRuleError(
        VisibilityRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS
      )
    }
    return
  }

  visibilityRules[formName] = pickBy(
    visibilityRules[formName] as VisibilityRuleRecord,
    (_, k) => k !== ruleId
  )
}

export const removeVisibilityRules = (
  formName: string,
  ruleIds: string[],
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(visibilityRules[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new VisibilityRuleError(
        VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
      )
    }

    return
  }

  const notExistsRuleIds = filter(ruleIds, (ruleId) =>
    isUndefined((visibilityRules[formName] as VisibilityRuleRecord)[ruleId])
  )

  const ruleExists = size(notExistsRuleIds) === 0

  if (!ruleExists) {
    if (throwOnNotFound) {
      throw new VisibilityRuleError(
        VisibilityRuleErrorCode.SPECIFIC_RULE_ID_NOT_EXISTS,
        `Specific rule id not exists, rule id ${join(notExistsRuleIds, ',')}`
      )
    }
  }

  visibilityRules[formName] = pickBy(
    visibilityRules[formName] as VisibilityRuleRecord,
    (_, k) => !includes(ruleIds, k)
  )
}

export const removeAllFormVisibilityRule = (
  formName: string,
  throwOnNotFound = false
): void => {
  const visibilityRulesForForm = visibilityRules[formName]

  const formExists = !isUndefined(visibilityRulesForForm)
  if (!formExists && throwOnNotFound) {
    throw new VisibilityRuleError(
      VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
    )
  }

  visibilityRules = pickBy(visibilityRules, (_, k) => k !== formName)
}

export const removeAllVisibilityRule = (): void => {
  visibilityRules = {}
}

export const accessAllFormVisibilityRule = (
  formName: string
): VisibilityRuleRecord => {
  const visibilityRulesForForm = visibilityRules[formName]

  const formExists = !isUndefined(visibilityRulesForForm)
  if (!formExists) {
    throw new VisibilityRuleError(
      VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
    )
  }

  return visibilityRulesForForm
}

export const accessFormVisibilityRule = (
  formName: string,
  fieldName: string
): VisibilityRuleRecord => {
  const visibilityRulesForForm = visibilityRules[formName]

  const formExists = !isUndefined(visibilityRulesForForm)
  if (!formExists) {
    throw new VisibilityRuleError(
      VisibilityRuleErrorCode.SPECIFIC_FORM_NOT_EXISTS
    )
  }

  const relativeVisibilityRulesForForm = pickBy(
    visibilityRulesForForm,
    (r) => !isUndefined(r) && includes(r.fieldNames, fieldName)
  )

  return relativeVisibilityRulesForForm
}
