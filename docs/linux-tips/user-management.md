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
