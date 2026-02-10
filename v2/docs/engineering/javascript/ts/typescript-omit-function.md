## TS Omit Function

````typescript
/**
 * An object literal with string keys and values of type `T`
 */
interface ObjectLiteral<T = any> {
  [key: string]: T
}

/**
 * Omits a given objects keys returning the resulting object
 *
 * Replacement of `_.omit` which is to be deprecated in version 5 of lodash.
 *
 * This implementation is helpful where you are unable to explicity Pick the properties you wish to
 * keep. For example, you may not know what keys exist but explicitly know some that should be
 * removed. This is particularly useful when you are working with readonly objects and are unable to
 * `delete` the keys
 *
 * https://github.com/lodash/lodash/issues/2930#issuecomment-272298477
 *
 * USAGE:
 *
 * ```typescript
 * omit({ foo: true, bar: false }, ['bar'])
 * // { foo: true }
 * ```
 *
 */
export function omit<T extends ObjectLiteral, K extends keyof T>(
  obj: T,
  keysToOmit: K[],
): Omit<T, K> {
  return Object.keys(obj)
    .filter(key => !keysToOmit.includes(key as K))
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key],
      }
    }, {} as Omit<T, K>)
}
````
