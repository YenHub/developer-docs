# Spell checking projects from the command line

It can be helpful to spell check files en masse, this tool is super handy to achieve this!

## Installation

```bash
npm install --global spellchecker-cli
```

## Usage

See the [spellchecker-cli repo](https://github.com/tbroadley/spellchecker-cli) for more commands.

```bash
# Scan all MD files in a "docs" folder at the root of your project
spellchecker --files docs/**/*.md

# Scan all JS files in your project
spellchecker --files **/*.js

# Generate a JSON output report
spellchecker --files **/*.ts --reports reports.json
```