# Atom Editor

## Backup & Restore Atom Packages & Config

1. Backup: Run this in CMD
   ```
   apm list --installed --bare > packages.list
   ```
2. Restore: Run this in CMD
   ```
   apm install `cat packages.list`
   # OR
   apm install --packages-file packages.list
   ```
