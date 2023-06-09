import type { State } from './share'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware/devtools'
import { createForm, removeForm } from './form'
import { setValue, setRemaining, setVisibility } from './field'

interface Actions {
  createForm: ReturnType<typeof createForm>
  removeForm: ReturnType<typeof removeForm>
  setValue: ReturnType<typeof setValue>
  setVisibility: ReturnType<typeof setVisibility>
  setRemaining: ReturnType<typeof setRemaining>
}

export const useForm = create(
  devtools(
    immer<State & Actions>((set) => ({
      forms: {},
      createForm: createForm(set),
      removeForm: removeForm(set),
      setValue: setValue(set),
      setVisibility: setVisibility(set),
      setRemaining: setRemaining(set)
    }))
  )
)
