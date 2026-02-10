# Scroll Top React HOC

This component can be used to automate scrolling to the top of a given component when the component is rendered.

A good example would be scrolling to the top of an accordion when opening the accordion.

```typescript
import React, { useEffect, useRef } from 'react'

/**
 * The purpose of this component is to allow us to consistently scroll to the
 * respective parent <tr> each time we open the containing accordion.
 *
 * In the example below, our target is a table rows parent.
 */
export const ScrollTopWrapper: React.FC = ({ children }) => {
  const { container } = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /**
     * Traverse the dom tree to find the closest previous <tr /> sibling
     *
     * This will be the table row which triggered the <Collapse />
     */
    const targetElement = ref.current?.closest('tr')?.previousElementSibling

    /**
     * To prevent further scrolling when the component unmounts, we store the
     * ID of the timeout we create then clear the timeout in the cleanup.
     */
    const timeOutId = setTimeout(
      () => targetElement?.scrollIntoView({ behavior: 'smooth' }),
      500,
    )

    return () => clearTimeout(timeOutId)
  })

  return <div ref={ref}>{children}</div>
}
```
