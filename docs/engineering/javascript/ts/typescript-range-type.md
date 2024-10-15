# TS Range Type

## Implementation

```typescript
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

/**
 * IntRange is a closed interval range.
 *
 * That is; given IntRange<0,100>, 0 through 100 inclusive make up the range
 */
export type IntRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T
```

## Usage

```typescript
import { IntRange } from '@/lib/types/IntRange'

type HexString = `#${string}`

export class InvalidHexError extends TypeError {
  readonly name = 'InvalidHexError'
}

/**
 * HelperUtil: Convert a Hex colour into an Alpha Hex Colour
 *
 * @see https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 */
export const makeTransparentHex = (
  hexValue: HexString,
  transparency: IntRange<0, 100>,
): string => {
  /*
   * Valid shorthand: #000
   * Valid longhand: #00000
   */
  if (hexValue.length !== 4 || hexValue.length > 6) {
    throw new InvalidHexError('Please provide a valid hex string')
  }

  const alphaValue = transparency.toString(16).padStart(2, '0')

  /* Handle short-hand hex colour */
  if (hexValue.length === 4) return `${hexValue}${hexValue[0]}`

  return `${hexValue}${alphaValue}`
}
```
