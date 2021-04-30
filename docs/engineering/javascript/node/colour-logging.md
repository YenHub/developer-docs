# Console Logging with Colour in Node

Below you can find colors reference of text to command when running node.js application:

```javascript
console.log("\x1b[36m%s\x1b[0m", "I am cyan");          // cyan
console.log("\x1b[33m%s\x1b[0m", stringToMakeYellow);   // yellow
```

Note `%s` is where in the string (the second argument) gets injected.

You only need to set the colour once, all following logs will be the chosen colour.

You can use the arg `\x1b[0m` to reset the terminal colour back to default.

## Colour reference

| Value         | Result     |
| ------------- | ---------- |
| `"\x1b[0m";`  | Reset      |
| `"\x1b[1m";`  | Bright     |
| `"\x1b[2m";`  | Dim        |
| `"\x1b[4m";`  | Underscore |
| `"\x1b[5m";`  | Blink      |
| `"\x1b[7m";`  | Reverse    |
| `"\x1b[8m";`  | Hidden     |
| `"\x1b[30m";` | FgBlack    |
| `"\x1b[31m";` | FgRed      |
| `"\x1b[32m";` | FgGreen    |
| `"\x1b[33m";` | FgYellow   |
| `"\x1b[34m";` | FgBlue     |
| `"\x1b[35m";` | FgMagenta  |
| `"\x1b[36m";` | FgCyan     |
| `"\x1b[37m";` | FgWhite    |
| `"\x1b[40m";` | BgBlack    |
| `"\x1b[41m";` | BgRed      |
| `"\x1b[42m";` | BgGreen    |
| `"\x1b[43m";` | BgYellow   |
| `"\x1b[44m";` | BgBlue     |
| `"\x1b[45m";` | BgMagenta  |
| `"\x1b[46m";` | BgCyan     |
| `"\x1b[47m";` | BgWhite    |
