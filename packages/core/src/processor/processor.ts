import {
  assign,
  isUndefined,
  map,
  zipObject,
  pickBy,
  filter,
  size,
  includes
} from 'lodash-es'
import { nanoid } from 'nanoid'
import { ProcessorErrorCode, ProcessorError } from '../errors/processor-error'

export enum ProcessorTriggerReason {
  VisibilityChanged,
  ValueChanged
}

interface ProcessorTriggerVariation {
  fieldName: string
  reason: ProcessorTriggerReason
}

export interface Processor {
  processFieldNames: string[]
  triggerFieldNames: string[]
  trigger: (variations: ProcessorTriggerVariation[]) => boolean
  process: () => Record<string, string>
}

export type ProcessorRecord = Record<string, Processor | undefined>
export type ProcessorFormRecord = Record<string, ProcessorRecord | undefined>

let processors: ProcessorFormRecord = {}

export const addProcessor = (
  formName: string,
  processor: Processor
): string => {
  const processorId = nanoid()
  processors[formName] = assign(processors[formName] ?? {}, {
    [processorId]: processor
  })
  return processorId
}

export const addProcessors = (
  formName: string,
  pProcessors: Processor[]
): string[] => {
  const processorIds = map(pProcessors, (_) => nanoid())
  processors[formName] = assign(
    processors[formName] ?? {},
    zipObject(processorIds, pProcessors)
  )
  return processorIds
}

export const removeProcessor = (
  formName: string,
  processorId: string,
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(processors[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new ProcessorError(ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS)
    }
    return
  }

  const processorExists = !isUndefined(
    (processors[formName] as ProcessorRecord)[processorId]
  )
  if (!processorExists) {
    if (throwOnNotFound) {
      throw new ProcessorError(
        ProcessorErrorCode.SPECIFIC_PROCESSOR_ID_NOT_EXISTS
      )
    }
    return
  }

  processors[formName] = pickBy(
    processors[formName] as ProcessorRecord,
    (_, k) => k !== processorId
  )
}

export const removeProcessors = (
  formName: string,
  processorIds: string[],
  throwOnNotFound = false
): void => {
  const formExists = !isUndefined(processors[formName])
  if (!formExists) {
    if (throwOnNotFound) {
      throw new ProcessorError(ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS)
    }
    return
  }

  const notExistsProcessorIds = filter(processorIds, (processorId) =>
    isUndefined((processors[formName] as ProcessorRecord)[processorId])
  )

  const processorExists = size(notExistsProcessorIds) === 0

  if (!processorExists) {
    if (throwOnNotFound) {
      throw new ProcessorError(
        ProcessorErrorCode.SPECIFIC_PROCESSOR_ID_NOT_EXISTS
      )
    }
    return
  }

  processors[formName] = pickBy(
    processors[formName] as ProcessorRecord,
    (_, k) => !includes(processorIds, k)
  )
}

export const removeAllFormProcessor = (
  formName: string,
  throwOnNotFound = false
): void => {
  const processorsForForm = processors[formName]

  const formExists = !isUndefined(processorsForForm)
  if (!formExists && throwOnNotFound) {
    throw new ProcessorError(ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  processors = pickBy(processors, (_, k) => k !== formName)
}

export const removeAllProcessor = (): void => {
  processors = {}
}

export const accessAllFormProcessor = (formName: string): ProcessorRecord => {
  const processorsForForm = processors[formName]

  const formExists = !isUndefined(processorsForForm)
  if (!formExists) {
    throw new ProcessorError(ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  return processorsForForm
}
