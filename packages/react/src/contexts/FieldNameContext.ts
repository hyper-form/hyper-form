import type { Context } from 'react'
import { createContext } from 'react'

export const FieldNameContext: Context<string> = createContext('')
export const FieldNameContextProvider = FieldNameContext.Provider
export const FieldNameContextConsumer = FieldNameContext.Consumer
