# MSW `SEARCH` Method Implementation

[MSW](https://mswjs.io/docs) is a widely used library which serves as a valuable tool for stubbing API requests during frontend development, specifically for testing and simulating various routes.

One of the pitfalls you might come across using MSW is the lack of the http SEARCH method.

You can however augment the client in order to implement the SEARCH method.

## Setup

1. Define a new SEARCH method
2. Re-export the `rest` object
3. Use the exported `rest` in your code

```typescript
/** rest-override.ts */
import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  rest as defaultRest,
  RestContext,
  RestHandler,
  RestRequest,
} from 'msw'

const search = (
  path: string,
  resolver: ResponseResolver<
    RestRequest<DefaultBodyType, PathParams<string>>,
    RestContext,
    DefaultBodyType
  >,
): RestHandler => {
  return new RestHandler('search', path, resolver)
}

export const rest = {
  ...defaultRest,
  search,
}
```

## Usage

Create a new handler which utilises the new SEARCH method:

```typescript
/** handlers.ts */
import { rest } from './rest-override'

const searchData = [{ text: 'abcd1234' }, { text: 'efgh5678' }]

export const handlers = [
  rest.search('*/some-search-endpoint', (req, res, ctx) => {
    const offset = req.url.searchParams.get('offset')
    const searchTerm = req.url.searchParams.get('search_term')
    if (!searchTerm) {
      return res(
        ctx.delay(1500),
        ctx.status(500),
        ctx.json({ error: 'No search term provided' }),
      )
    }

    if (!offset) {
      return res(
        ctx.delay(1500),
        ctx.status(400),
        ctx.json({
          error: 'No offset parameter provided',
          message: 'Please provide the offset',
        }),
      )
    }

    const searchRegex = new RegExp(searchTerm, 'i')

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        results: searchData.filter(({ text }) => searchRegex.test(text)),
      }),
    )
  }),
]
```

Consume your handlers using MSW:

```typescript
/** index.ts */
import { setupWorker } from 'msw'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```
