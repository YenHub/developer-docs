# What is debounce?

This is a vanilla JS version of the infamous Debounce function.

Debounce allows you to delay calls to a function in order to prevent spamming.

A good example of it's application would be an event handler whose event could be fired in multiple time in quick succession.

## Usage

Simply declare the function inside your code (note, when using react, this function can be imported!!)

Declare your own function, passing it through the debounce, and provide a delay in milliseconds as a window to ignore calls to that function.

For example, to log to the console at most once per second whilst the window is resized, the following could be implemented:

```typescript
export const debounce = <T extends Function>(
  callBack: T,
  wait: number,
  immediate: boolean,
) => {
  let timeout: any

  return (...params: any) => {
    const context = this,
      args = params
    const later = function () {
      timeout = null
      if (!immediate) callBack.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) callBack.apply(context, args)
  }
}

var handleResize = debounce(function () {
  console.log(`

        Notice how this will only log to the console at most once a second during your events firing?

    `)
}, 1000)

$(window).on('resize', handleResize)
```
