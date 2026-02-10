# Recursive Delete Directories

Use this command to find & recursively delete directories:

```bash
# Delete any directory named `dist` and `node_modules`
rm -rf `find . -type d -name dist` \
  && rm -rf `find . -type d -name node_modules`
```
