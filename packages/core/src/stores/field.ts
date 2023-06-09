import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Visibility, DefaultRemaining } from '../share/constants'

export interface Field {
  value: string
  visibility: Visibility
  remaining: number
}

interface FieldState {
  field: Field
}

interface FieldActions {
  setValue: (value: string) => void
  setVisibility: (visibility: Visibility) => void
  setRemaining: (remaining: number) => void
}

export const useField = create(
  immer<FieldState & FieldActions>((set) => ({
    field: {
      value: '',
      visibility: Visibility.Visible,
      remaining: DefaultRemaining
    },
    setValue: (value: string) => {
      set((state) => {
        state.field.value = value
      })
    },
    setVisibility: (visibility: Visibility) => {
      set((state) => {
        state.field.visibility = visibility
      })
    },
    setRemaining: (remaining: number) => {
      set((state) => {
        state.field.remaining = remaining
      })
    }
  }))
)
