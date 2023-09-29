import { CustomError } from 'ts-custom-error'
import { isUndefined } from 'lodash-es'

export enum CacheErrorCode {
  SPECIFIC_CACHE_KEY_NOT_FOUND
}

const CacheErrorMessage: Record<CacheErrorCode, string> = {
  [CacheErrorCode.SPECIFIC_CACHE_KEY_NOT_FOUND]:
    'Specific cache key not found'
}

export class CacheError extends CustomError {
  public constructor (
    public code: CacheErrorCode,
    customMessage?: string
  ) {
    super(
      isUndefined(customMessage)
        ? CacheErrorMessage[code]
        : `Cache error with custom error message: "${customMessage}"`
    )
  }
}
