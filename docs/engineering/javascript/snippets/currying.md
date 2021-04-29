# Currying in JavaScript

Pretty neat function generator pattern (currying):-

```javascript
// Declare our generator
var newLogger = (logPrefix) => {
    return (msg) => {
        console.log(`${logPrefix} ${msg}`);
    };
};
// Generate our new function, passing the required prefix
apiLogger = newLogger('[TestAPI]');
// We can now call our new function, passing simply the `msg` parameter
apiLogger(`IT'S ALIVE!!`);
>> [TestAPI] IT'S ALIVE!!
```

```javascript
// It's most commonly seen written in short hand (just for giggles I presume!) using the IIFE pattern:-
var newLogger = (logPrefix) => (msg) => console.log(`${logPrefix} ${msg}`) ;
// Generate our new function, and invoke it immediately with a message
newLogger('[TestAPI]')(`IT'S ALIVE!!`);
```

Both these snippets of code are identical, so if you ever spot that IIFE, that's what is going on :wink:

It makes more sense when you see this sort of thing though:-

```javascript
var newLogger = logPrefix => msg => console.log(`${logPrefix} ${msg}`);
// Generate our new functions
exports.apiLogger = newLogger("[TestAPI]");
exports.syncLogger = newLogger("[Sync Service]");
exports.lockLogger = newLogger("[Locking Service]");
// Elsewhere, we can now simply import and call our new methods and only pass the required `msg` argument:
lockLogger("Lock Failed");
// >> [TestAPI] Lock Failed
apiLogger(`Response from GET: ${response.status}`); //
// >> [Sync Service] Response from GET: Totally still online 😋
syncLogger("Sync Received");
// >> [Sync Service] Sync Received
```

This of course is a super basic example of currying, but the sky is the limit - just try to avoid obfuscating things too much....!!
