# NPM Tips & Snippets

## NPM: Ignore SSL

```bash
npm config set strict-ssl false
```

## Install NVM

[Node Version Manager (GitHub)](https://github.com/nvm-sh/nvm) is a helpful tool to manage node versions.

```bash
# install WSL2 or bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# install specific Node
nvm install 10.15.1

# Use that version
nvm use 10.15.1

# List available versions
nvm list
```