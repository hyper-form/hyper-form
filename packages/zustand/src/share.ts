import type { Draft } from 'immer'
import type { State } from '@hyper-form/core'

export type Set = (
  nextStateOrUpdater: State | Partial<State> | ((state: Draft<State>) => void),
  shouldReplace?: boolean | undefined
) => void
