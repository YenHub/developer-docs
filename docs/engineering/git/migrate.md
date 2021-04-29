## Migrating a Git Repository

- Check it's up to date

```batchfile
git fetch origin
```

- Look for existing branches that are not local

```batchfile
git branch -a
```

They will either be remotes/something or something

- Clone remote branches to local

```batchfile
git checkout -b SOMETHING origin/SOMETHING
git checkout -b SOMETHING/release/0.1 origin/SOMETHING/release/0.1
```

- Set the new repo url

```batchfile
git remote add new-origin git@github.com:manakor/manascope.git
```

- Push everthing across

```batchfile
git push --all new-origin
git push --tags new-origin
```

- Remove the original remote

```batchfile
git remote rm origin
```

- Rename the new origin back to origin

```batchfile
git remote rename new-origin origin
```
