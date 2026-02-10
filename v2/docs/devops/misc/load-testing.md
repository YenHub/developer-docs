# Load Testing Node JS Instance

Credit: [Load Test NPM](https://www.npmjs.com/package/loadtest)

## Using loadtest

```bash
# Install loadtest
npm install -g loadtest

# Run 10 concurrent connections & 200 requests per second
loadtest -c 10 --rps 200 http://local.express-training.com/catalog/books

# Send 200 requests 1000 concurrent connections
loadtest -n 200 -c 1000 http://local.express-training.com/catalog/books
```
