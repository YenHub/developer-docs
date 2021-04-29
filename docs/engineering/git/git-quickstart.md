# Git QuickStart Cheat Guide

## Pushing your local repo to GIT

```batchfile
git init
git remote add origin https://[REPO_URL]

:: IF Changing the origin after being set originally...
:: git remote set-url origin https://[REPO_URL]
:: Add the files
git add .
git add .gitignore

:: [OPTIONAL] DO first commit if new repo
git commit -m "Initial Commit"

:: [OPTIONAL] Push existing repository
git push -u origin master

:: OR
git push --all origin

:: AND
git push --tags origin
```

## Changing the origin

```bash
git remote rm origin
git remote add origin git@github.com:aplikacjainfo/proj1.git
git config master.remote origin
git config master.merge refs/heads/master
```

## Cloning a repo

```batchfile
git clone https://github.com/some-user/some-repo
git fetch --all

:: List all branches
git branch -a

:: Checkout & track the remote branch
:: git checkout RemteBranchName
:: eg git checkout dev/new-env
:: Checkout the branch you need to a local branch
:: git checkout -b localBranchName origin/RemteBranchName
:: BETTER YET...
git checkout --track origin/RemteBranchName
:: Branch RemteBranchName set up to track remote branch RemteBranchName from origin.
:: Switched to a new branch 'RemteBranchName'
```

## Cloning a specific branch

```bash
# git clone -b branch-name git@github.com:org/repository.git .
git clone -b test-analytics git@github.com:YenHub/Analytics.git .
```

## MIGRATING A REPO

-   Check it's up to date

```batchfile
git fetch origin
```

-   Look for existing branches that are not local

```batchfile
git branch -a
```

They will either be remotes/something or something

-   Clone remote branches to local

```batchfile
git checkout -b SOMETHING origin/SOMETHING
git checkout -b SOMETHING/release/0.1 origin/SOMETHING/release/0.1
```

-   Set the new repo url

```batchfile
git remote add new-origin git@github.com:manakor/manascope.git
```

-   Push everthing across

```batchfile
git push --all new-origin
git push --tags new-origin
```

-   Remove the original remote

```batchfile
git remote rm origin
```

-   Rename the new origin back to origin

```batchfile
git remote rename new-origin origin
```

## Configure GIT

NOTE: Is LOCAL if no global switch is used!

```batchfile
git config [--global] user.name "Mona Lisa"
git config [--global] user.email "email@example.com"
git config [--global] credential.helper wincred
git config [--global] credential.username [XXX]
```

Per repo basis you could also edit .git/config manually instead:

```batchfile
[user]
name = Your-Name
email = Your-email
```

### Set a Git username [GLOBAL]

```batchfile
git config --global user.name "Mona Lisa"
```

### Check User Name

```batchfile
git config --global user.name
:: Mona Lisa
```

### Add Remote Origin

```batchfile
git remote add origin https://username@stash/scm/PROJECT/repo.git
```

### Change remote origin

```batchfile
git remote set-url origin "https://..."
```

### See remote origin URL...

```batchfile
git remote show origin
:: OR
git config --get remote.origin.url
```

### Add to GIT example

```batchfile
git remote add origin https://github.com/yenhub/DICE.git
```

### Set NEW URL Origin for repository

```batchfile
git remote set-url origin https://[new url with username replaced]
```

### Get URL Origin for repository

```batchfile
git config --get remote.origin.url
```

### Get Config

```batchfile
git config --list
```

### Setting your Git email address [GLOBAL]

```batchfile
git config --global user.email "email@example.com"
```

#### Checking the email set

```batchfile
git config --global user.email email@example.com
```

### Setting your Git email

#### GLOBAL

```batchfile
git config --global user.email "email@example.com"
:: Confirm it
git config --global user.email
```

> "email@example.com"

#### SINGLE REPOSITORY

This is helpful if you wish to use a different git user on a specific directory.

Change the current working directory to the local repository where you want to configure the name that is associated with your Git commits.

```batchfile
git config user.email "email@example.com"
:: Confirm it
git config user.email
```

> "email@example.com"

### Setting your Git username

[GLOBAL]

```batchfile
git config user.name --global "Mona Lisa"
:: Confirm it
git config user.name
```

> Mona Lisa

### CREDENTIAL HELPER

Windows GIT Bash (WSL)

```batchfile
git config --global credential.helper wincred
```

## Multiple Git Accounts on same server

```bash
# Create a key
ssh-keygen -t rsa -b 4096 -C "email@address.com" -f "~/.ssh/id_whatever_your_id"

# Add the key to GitHub

# Register the key
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_whatever_your_id

# Create a config file - here you specify which accounts to use basing on the user e.g. git@github.com-YenHub
cd ~/.ssh
nano config
# If you get permission denied here, you must fix your home dir ownership & permissions
`:
# Personal account, - the default config
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa

# Work account-1
Host github.com-YenHub
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_whatever_your_id
`
# Check it
ssh -T git@github.com

# Now you can clone like so
git@github.com-YenHub:someorg/some-repo.git

# Note, we specify the user in the clone URL... ! -YenHub

# List all Identities
ssh-add -l

# Remove all SSH Identities
ssh-add -D

# Check where existing remotes point to
git remote -v
# > git@github.com:username/repo_name.git

# Update if required to include the correct user
git remote set-url origin git@github.com:username/repo_name.git

```

## Rebase or Merge Commit ??

### Neither, opt instead to do the following:-

```bash
git stash
git pull
git stash pop
```

### Why?

Because of this pattern:-

> For example, two people are working on the same branch. The branch starts as:
>     ...->C1
> The first person finishes their work and pushes to the branch:
>     ...->C1->C2
> The second person finishes their work and wants to push, but can't because they need to update. The local repository for the second person looks like:
>     ...->C1->C3
> If the pull is set to merge, the second persons repository will look like.
>     ...->C1->C3->M1
>           \\      /
>            \->C2->
> Where M1 is a merge commit. This new branch history will be pushed to the repo. If instead, the pull is set to rebase the local repo would look like:
>     ...->C1->C2->C3

The former is preferable, otherwise C2 pushes the same code as C1, effectively sacrificing


## You effed up, and need to rename a branch...
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

## Merging Master to Current Branch

```bash
# First we'll grab master & update it
git checkout master
git fetch -p origin

# git checkout your/feature-branch

# Now we will merge changes from origin/master into our local master branch
git merge origin/master

# Now we checkout our feature branch
git checkout <feature-branch>

# Then merge it with the new copy of master
git merge master

# Then we can push our local back to cloud via CLI or Atom
git push origin <feature-branch>
```

## Merging Strategy

```bash
# Checkout your main feature branch and update it
git checkout master
git pull
git checkout feature/cbau-3-internationalisation
git pull origin feature/cbau-3-internationalisation

# Merge master into it
git merge master

# Create a new branch from your feature branch
git checkout -b feature/<story id and name>

# Push upstream to your new feature branch
git add .
git commit -m "[FEATURE][<story id>] <what you have done>"
git push --set-upstream origin <Your local branch> -o ci.skip
```

## Screwing up a merge?

```bash
git merge --abort
```

## Undo Commits

```bash
git reset --hard HEAD~1
```

## Get commits waiting

```bash
git log origin/master..HEAD

# OR
git diff origin/master..HEAD

# OR for some magic
git log --stat origin/master..HEAD

# See all commits on all branches that aren't pushed yet
git log --branches --not --remotes

```

## Code Review

```bash
git merge --no-commit --no-ff origin/feature/branch-number-ref
```


## Deleting Branches

```bash
# Delete a local branch
git branch -d <branch-name>

# Force delete a local branch
git branch -D <branch-name>
```

## Listing Branches

```bash
# List remote & local
git branch -a

# List Local
git branch -l

# List remote
git branch -r
```

## Stashing

```bash
# Stash files
git stash save "my-name-reference-to-stash" [--include-untracked]

# List Stashes
git stash list

# Apply Stash
git stash apply stash@{n}

# Apply & Remove Stash
git stash pop stash@{n}

# Kill Stash
git stash drop

# Stash specific untracked files by file ext regex
git stash push *.linq -m "account-creation-linq"

# Stash only unstaged files [+untracked]
git stash -k [-u]

# Stash; include untracked files
git stash -u

# Stash by hunk
git stash -p

# Interactively Apply Stash
git checkout -p stash@{n}

# Apply stash as merge no commit no ff
git merge --no-commit --no-ff stash@{n}

# Stash only staged files
# Stage all your files that you need to stash.
# This command will create a stash with ALL of your
# changes (staged and unstaged), but will leave the
# staged changes in your working directory (still in state staged).
`git stash --keep-index`  
# Run git stash push -m "good stash"
# Now your "good stash" has ONLY staged files.
```

## Dealing with locked references

```bash
git remote prune origin
```

### But Why??

> What this will do is remove references to remote branches in the folder .git/refs/remotes/origin. So this will not affect your local branches and it will not change anything remote, but it will update the local references you have to remote branches. It seems in some cases these references can contain data Git cannot handle correctly.


## Finding Strings In Git Log or History


```bash
# Where `password` is the string you're looking for..
git log -Spassword

# To see the diffs
git log -S password -p

# To use Regex
git log -G 'pa.*ord'

# Just the log message itself [case-insensitive]
git log --all --grep='RemoteCloudSyncService' -i

# Advanced regex piping...
git log -G "import.*RemoteCloudSyncService" -p | egrep "(RemoteCloudSyncService|commit)"
```


## Checkout a specific commit

```bash
# Get the readable name for your commit
git describe 5f6ba67e3f8cb59cb9a2f4db22f12e55326a182d
kors-2757-g5f6ba67

# Checkout
git checkout kors-2757-g5f6ba67

# OR merge without committing 🚀
git merge --no-commit --no-ff kors-2757-g5f6ba67
```

## Tricks

```bash
# Checkout a file from a branch or commit ref... 😇
git checkout some-branch -- readme.md

# git log...
# One Line clean log history
git log --oneline --no-merges
# Pretty log
git log --pretty=oneline --graph --decorate --all

# Amend last commit message
git commit -v --amend

# clean all changes, including untracked (-n to preview first!)
git clean -f -d (-n)

# Ask git for a changelog for the last 20 commits
git shortlog HEAD~20..
# Ask git for a changelog between a commit and current head
git shortlog <commit>..HEAD

# Getting git log from tags
oldver='2.70.0'
git log --pretty=format:%s $oldver..origin/release-2.71

git log --pretty=format:%s 2.70.0..origin/release-2.71 | findstr /i /r "^Merge"

# Search git commit messages
git log -S"config.menu_items"

# Checkout branch from another
git checkout -b subbranch_of_branch_b1 branch_b1
```

### Cherry Picking from one branch to another

```bash
# If you have already committed your changes:

# Type git log and remember the SHA of the commit you want to move.
git log

# Check out the branch you want to move the commit to.
git checkout master

# Type git cherry-pick SHA substituting the SHA from above.
git cherry-pick d4d3ee2394e247d947fa57b1331d6462fe03b7f3

# Switch back to your original branch.
git checkout feature/my-other-thing
# Use git reset HEAD~1 to reset back before your wrong-branch commit.
git reset HEAD~1
```

### Seeing all your own branches

```bash
git for-each-ref --format="%(if)%(authorname)%(then)%(authorname)%(end): %(refname)" --sort=authorname | findstr [Your Name]
```

### Seeing all merged local branches

```batchfile
git branch --merged
```

### Amend commit author with git rebase

Ensure your code editor is set to wait, for VS:-

`git config core.editor "code -n --wait"`

Then rebase

`git rebase --committer-date-is-author-date -i -p 021a9bd`

It will open your editor where you can go off to edit the commit message

```
git commit --amend
git rebase --continue
```
OR the author
```
git commit --amend --author="YenHub <example@domain.com>" --no-edit
git rebase --continue
```

### Long Lost Friend?

How to get a git user's email address 😉

#### Opt.1

1.  Navigate to a user's Hub
2.  Go to their repos
3.  Enter a repo, the older the better (newer might have been patched out of this bug)
4.  Go to Commits
5.  Click any commit
6.  The URL will read:

<https://github.com/[User-Name]/[Repository-Name]/commit/8d624b0136a89fec1176c2e57ad11b436c134b99>

7.  Append '.patch' to the end of the URL

8.  Access new URL:

<https://github.com/[User-Name]/[Repository-Name]/commit/8d624b0136a89fec1176c2e57ad11b436c134b99.patch>

9.  You'll get this response header that is written to the page:-


    From 7b875b0136g45fer6576c3e57ad11b436c134b99 Mon Sep 17 00:00:00 2001
    From: Devy-McDevDev <Devy-McDevDev@email.com>
    Date: Wed, 11 May 2016 21:16:25 +0530
    Subject: [PATCH] Readme updated

#### Opt.2

NOTE: This is not as successful if a user hasn't posted public commits

<https://api.github.com/users/xxxxxxx/events/public>

Replace xxxxxxx with the user's ID
