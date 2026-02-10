# Undoing mistakes with Git

## You messed up and need to rename a branch... 🙃

```bash
# Ensure you are on the branch you wish to rename
git branch -m new-branch-name

# If you're not on the branch;
git branch -m old-branch-name new-branch-name

# IF the renamed branch is not yet pushed to the remote; push it normally
git push -u origin new-branch-name

# IF you are renaming the remote & local; Delete the remote, push the new
git push origin :old-branch-name new-branch-name

# Just delete the remote
```

## Messing up a merge? Abort it...!

```bash
git merge --abort
```

## Undo Commits

This will revert the last commit (and delete it)

```bash
git reset --hard HEAD~1
```

This will revert the last commit (and keep it staged)

```bash
git reset --soft HEAD~1
```