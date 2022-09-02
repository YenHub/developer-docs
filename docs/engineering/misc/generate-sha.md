# Using CertUtil to generate checksums

CertUtil is a Windows built-in command line installed as part of certificate services.

It offers a switch `-hashfile` that allows you to generate the hash string using a specified algorithm.

Running the following command generates an SHA-512 checksum for the JavaScript file, "someJavaScriptTool.js"

```bash
certutil -hashfile ./someJavaScriptTool.js SHA512
```
