# 301 SOS: Recovering from 301s Gone Wrong

This could help every single developer one day in their future (or sadly past 😛)

## Cached a 301 redirect in your browser? Want to undo it?

You've got three real options....

1. **Redirect back from the redirect to undo it**
    - You might not have access to the place you accidentally redirected, so this might not be a choice
2. **Manipulate the URL**
    - Sometimes, simply appending a query string to the URL can save your bacon!
    - `https://www.the-correct-address.com?v=1`
3. **The Golden Bullet: Use Chrome's fetch API to clear it!!**
    - Simply run a fetch from a non CORS restricted site, like google.com
    - `fetch('https://www.the-correct-address.com', {method: 'post'}).then(() => {})`

If you have put it out to the wild already, and users on the web have cached it... you're on your own there I'm afraid!

Don't forget when making 301 changes to properly test them, or in the very least, wildly reduce the cache-control in advance.

Be careful with 301s people...