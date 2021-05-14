# Keeping a clean history using rebase

This method helps to avoid having merge commits like this in your repo:-

> Merge branch 'master' of github.com:user/repo

Simply use the following strategy instead of squashing or merging:-

## Branch Setup

```bash
# Checkout, fetch & pull the latest master
git checkout master && git fetch -p && git pull

# Create a new "staging" branch from it
git checkout -b staging
```

## Keeping a branch in parity with master

```bash
# Rebase master into the staging branch
git checkout master && git fetch -p && git pull
git checkout staging && git fetch -p && git pull
git rebase master
```

## Keeping master in parity with the feature branch

```bash
git checkout staging && git fetch -p && git pull
git checkout master && git fetch -p && git pull
git merge --ff-only staging
```