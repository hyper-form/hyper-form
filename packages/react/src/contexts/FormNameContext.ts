import type { Context } from 'react'
import { createContext } from 'react'

export const FormNameContext: Context<string> = createContext('')
export const FormNameContextProvider = FormNameContext.Provider
export const FormNameContextConsumer = FormNameContext.Consumer
