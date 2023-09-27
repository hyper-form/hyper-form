import { assign, isUndefined } from 'lodash-es'
import { nanoid } from 'nanoid'
import { ProcessorErrorCode, ProcessorError } from '../errors/processor-error'

export enum ProcessorTriggerReason {
  VisibilityChanged,
  ValueChanged
}

export interface Processor {
  processFieldNames: string[]
  triggerFieldNames: string[]
  trigger: (reason: ProcessorTriggerReason, fieldNames: string[]) => boolean
  process: () => Record<string, string>
}

export type ProcessorRecord = Record<string, Processor | undefined>
export type ProcessorFormRecord = Record<string, ProcessorRecord | undefined>

const processors: ProcessorFormRecord = {}

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

export const accessAllFormProcessor = (formName: string): ProcessorRecord => {
  const processorsForForm = processors[formName]

  const formExists = !isUndefined(processorsForForm)
  if (!formExists) {
    throw new ProcessorError(ProcessorErrorCode.SPECIFIC_FORM_NOT_EXISTS)
  }

  return processorsForForm
}
