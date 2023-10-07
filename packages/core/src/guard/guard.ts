import {
  debounce,
  merge,
  forEach,
  reduce,
  chain,
  includes,
  isUndefined
} from 'lodash-es'
import {
  type VisibilityRuleRecord,
  accessAllFormVisibilityRule,
  type VisibilityRule
} from '../rules/visibility'
import {
  type ProcessorRecord,
  accessAllFormProcessor,
  type Processor
} from '../processor/processor'
import { GuardError, GuardErrorCode } from '../errors/guard-error'
import Graph from 'tarjan-graph'

const status: Record<string, boolean | undefined> = {}

const tidyVisibilityPart = (
  visibilityRules: VisibilityRuleRecord
): Record<string, string[]> => {
  return chain(visibilityRules)
    .flatMap('argumentFieldNames')
    .uniq()
    .keyBy()
    .mapValues((t) =>
      chain(visibilityRules)
        .pickBy((r) => !isUndefined(r) && includes(r.argumentFieldNames, t))
        .values()
        .flatMap((r) => (r as VisibilityRule).fieldNames)
        .uniq()
        .value()
    )
    .value()
}

const tidyProcessorPart = (
  processors: ProcessorRecord
): Record<string, string[]> => {
  return chain(processors)
    .flatMap('triggerFieldNames')
    .uniq()
    .keyBy()
    .mapValues((t) =>
      chain(processors)
        .pickBy((p) => !isUndefined(p) && includes(p.triggerFieldNames, t))
        .values()
        .flatMap((p) => (p as Processor).processFieldNames)
        .uniq()
        .value()
    )
    .value()
}

const emulate = (...parts: Array<Record<string, string[]>>): boolean => {
  const map = reduce(parts, (r, p) => merge(r, p))
  const graph = new Graph()

  forEach(map, (cn, n) => {
    graph.add(n, cn)
  })

  const safe = graph.hasCycle()

  return safe
}

export const guard = debounce((formName: string): void => {
  status[formName] = false

  const visibilityRules = accessAllFormVisibilityRule(formName)
  const processors = accessAllFormProcessor(formName)

  const tidiedVisibilityPart = tidyVisibilityPart(visibilityRules)
  const tidiedProcessorPart = tidyProcessorPart(processors)

  const safe = emulate(tidiedVisibilityPart, tidiedProcessorPart)

  if (!safe) {
    throw new GuardError(GuardErrorCode.FOUND_INFINITY_LOOP)
  }

  status[formName] = true
})
