# User Management

## Creating Sudo/Admin Users

```sh
sudo userdel JeffBanks && sudo adduser JeffBanks && sudo adduser JeffBanks sudo && sudo adduser JeffBanks admin
```

## Create a user with a custom home dir | add to admin & sudo | set default bash shell

```sh
sudo useradd -G admin,sudo,sshlogin -m -d /home/JeffBanks -s /bin/bash JeffBanks
```

## Changing Passwords

```sh
sudo passwd [user]
```

## Removing Users

```bash
# Swith to root
sudo su -

# Remove the user
userdel igilkes

# - OR - Remove the user & their home directory
userdel -r igilkes

# WARNING: Only delete a user's home directory if you are CERTAIN you no longer require any of their scripts, files, or emails!
```