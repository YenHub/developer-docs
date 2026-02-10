# XMLHttp Response Codes

| Code | Type             | Comment                                                       |
| ---- | ---------------- | ------------------------------------------------------------- |
| 0    | Unsent           | open() has not been called yet.                               |
| 1    | OPENED           | send() has been called.                                       |
| 2    | HEADERS_RECEIVED | send() has been called, and headers and status are available. |
| 3    | LOADING          | Downloading; responseText holds partial data.                 |
| 4    | DONE             | The operation is complete.                                    |