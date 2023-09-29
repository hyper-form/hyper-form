import { isUndefined } from 'lodash-es'
import { CacheError, CacheErrorCode } from '../errors/cache-error'
import NodeCache from 'node-cache'

const cache = new NodeCache()

export const getOrCreate = <T>(
  key: string,
  expensiveFunc: () => { ttl: number, value: T }
): T => {
  const cacheValue = cache.get<T>(key)
  if (isUndefined(cacheValue)) {
    const { value, ttl } = expensiveFunc()
    cache.set(key, value, ttl)
    return value
  }

  return cacheValue
}

export const removeCache = (key: string, throwOnNotFound = false): void => {
  const number = cache.del(key)
  const isNotFound = number <= 0
  if (isNotFound && throwOnNotFound) {
    throw new CacheError(CacheErrorCode.SPECIFIC_CACHE_KEY_NOT_FOUND)
  }
}

export const clear = (): void => {
  cache.flushAll()
}
