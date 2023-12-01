# Helpful Jest Tips

## Debug the DOM

```typescript
import { render, screen } from '@testing-library/react'

describe('debug the dom', () => {
  it('shows the DOM tree', () => {
    // Render something
    render(<div>Hello</div>)

    // Debug the DOM tree in the console
    screen.debug()

    // Test something
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Increase the number of debug lines printed

This is helpful if you can't see the full output for a test failure.

```bash
DEBUG_PRINT_LIMIT=1000000 npx jest
```

## Force tests to run in series

This is handy when you're debugging test logs but they're out of sync.

```bash
npx jest --runInBand
```

## Improve test speeds

Use this flag to run across more available cores.

```bash
# You get a worker per core, so this uses 8 cores:
npx jest --max-workers=8
```
