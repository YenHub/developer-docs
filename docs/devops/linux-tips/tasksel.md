# Automating installs with Tasksel

## Install Tasksel

```bash
sudo apt-get install tasksel -y
sudo tasksel
# Do Magic & Things... ;)
```

## Issues?

```bash
# Getting a: tasksel: apt-get failed (100) ??
sudo apt update && sudo apt upgrade -y && dpkg --configure -a
```
