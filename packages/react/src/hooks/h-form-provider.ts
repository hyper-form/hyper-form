import type { Container } from 'inversify'
import { useEffect } from 'react'
import { setContainer, resetContainer } from '@hyper-form/core'

export const useHFormProvider = (container: Container): void => {
  useEffect(() => {
    setContainer(container)
    return (): void => {
      resetContainer()
    }
  }, [])
}
