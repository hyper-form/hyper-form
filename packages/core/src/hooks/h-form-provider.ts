import type { Container } from 'inversify'
import { setContainer } from '../share/container'

export const useHFormProvider = (container: Container): void => {
  setContainer(container)
}
