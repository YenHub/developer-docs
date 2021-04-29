# What is debounce?

This is a vanilla JS version of the infamous Debounce function.

Debounce allows you to delay calls to a function in order to prevent spamming.

A good example of it's application would be an event handler whose event could be fired in multiple time in quick succession.

## Usage

Simply declare the function inside your code (note, when using react, this function can be imported!!)

Declare your own function, passing it through the debounce, and provide a delay in milliseconds as a window to ignore calls to that function.

For example, to log to the console at most once per second whilst the window is resized, the following could be implemented:

```
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var handleResize = debounce(function() {
    console.log(`

        Notice how this will only log to the console at most once a second during your events firing?

    `)
}, 1000);

$(window).on("resize", handleResize);
```