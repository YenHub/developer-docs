# MSW: Intercepting unhandled requests

When using MSW it can be helpful to debug unhandled requests.

Use the snippet below when initialising MSW to intercept those unhandled requests.

```typescript
import { setupWorker } from 'msw'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

worker.start({
  onUnhandledRequest: req => {
    console.groupCollapsed('[MSW] Passing through unhandled request')
    console.log(`Request URL: ${req.url}`)
    console.groupEnd()
  },
})
```
