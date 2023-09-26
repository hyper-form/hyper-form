import { debounce } from 'lodash-es'

let guarded = false

export const guard = debounce((from: string, to: string): boolean => {
  guarded = false
  return guarded
})
