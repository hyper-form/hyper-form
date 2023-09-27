import { debounce, merge, forEach, reduce } from 'lodash-es'
import {
  type VisibilityRuleRecord,
  accessAllFormVisibilityRule
} from '../rules/visibility'
import {
  type ProcessorRecord,
  accessAllFormProcessor
} from '../processor/processor'
import { GuardError, GuardErrorCode } from '../errors/guard-error'
import Graph from 'tarjan-graph'

const status: Record<string, boolean | undefined> = {}

const tidyVisibilityPart = (
  visibilityRules: VisibilityRuleRecord
): Record<string, string[]> => {
  // TODO: 完成可見部分整理
  return {}
}

const tidyProcessorPart = (
  processors: ProcessorRecord
): Record<string, string[]> => {
  // TODO: 完成處理器部分整理
  return {}
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
