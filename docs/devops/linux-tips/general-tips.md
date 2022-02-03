# General Linux Tips

## Output Redirection Using sudo tee

A great use case for this, is combining Apache Config files

```bash
# Appends target.conf with the contents of some-apache.conf
cat some-apache.conf | sudo tee -a /etc/apache2/sites-available/target.conf
# -OR-
cat some-apache.conf | sudo tee --append /etc/apache2/sites-available/target.conf
# -OR-
sudo sh -c "echo $sshPubKey >> /home/$newuser/.ssh/authorized_keys"
```

## Output redirection using tee

Helpful when not working with sudo, think outputting mocha output to a file

```bash
yarn test:js 2>&1 | tee test-diff.txt
```

## Get Folder/Directory Size

```bash
du -h directory-to-test/
```

## Add an alias & re-source bash

```bash
echo "alias aliasname='command'" >> ~/.bash_aliases && source ~/.bash_aliases
```

This won't persist a reboot, however, you can pipe this into `~/.bashrc`, to make permanent 😃

## gzip / tar a folder

```bash
# Archive & Compress
tar -zcvf output_file_name directory_to_compress

# To unzip it: make sure you've got xz-utils
sudo apt install xz-utils

# Unzip / Decompress
tar -xf output_file_name.tar.xz

# Loop & Unzip multiple tar balls
for f in *.gz; do tar -zxvf "$f"; done

# z – tells tar that it is dealing with gzip file
# c – tells tar to create the archive file
# v – verbose mode showing what files are being processed
# f – output is a file
# x - extract


# IF Using Gunzip...

gunzip -k file.gz
# k - Keep original file

gunzip -c file.gz > some.file
# c - Standard Out (Also keeps original)

for f in *.gz; do gunzip -c "$f" > .; done

# If not worried about keeping original:-
gunzip *.gz

# Struggling with file compression type? Use 'file'
file somefile.gz # Empty... :)

```

## Linux Date Modified for Files

```bash
cd /var/www && tree -D api* | grep 2019

# FIND everything print it, format date, filter 2019-10 entries
find /var/www/main-api -type f -print0 | xargs -0 ls -l --time-style="+%F %T" | grep 2019-10
find /var/www/ -type f -print0 | xargs -0 ls -l --time-style="+%F %T" | egrep -e "2019-1(0|1)"
find /var/www/api* -type f -print0 | xargs -0 ls -l --time-style="+%F %T" | egrep -e "2019-1(0|1)"
# Tree list, with date, filter 2019
cd /var/www && tree -D main-api | egrep -e "2019"
cd /var/www && tree -D | egrep "(Oct|Nov).*2019"
```

## Linux Find text in files

```bash
grep -rnw '/etc/apache2/sites-available' -e 'api'
# Or with grouping regex...
sudo egrep -rnw '/etc/apache2/sites-available' -e "(synecode|code)"
# Don't forget, sudo will allow search of ALL files... :)

# Digging network issues in apache logs
sudo grep "212.36.19" /var/log/apache2/access.log
```

## Tar / gZip

```bash
# Ensure you have xz-utils
sudo apt install xz-utils

tar -zcvf output_file_name.tar.xz directory_to_compress
# z – tells tar that it is dealing with gzip file
# c – tells tar to create the archive file
# v – verbose mode showing what files are being processed
# f – output is a file

# Extract an archive
tar -xf file.tar.xz
# -x means extract the archived file
# -f means following is the archived file name
# OR
tar -C /some-dir/ -xf file.tar.xz
```

## Find

```bash
# Search by file name
# OPTS: -iname (Case insensitive) | -not (not) | -type f (files)
# -type d (directory) | 'pattern' (exact string) | *pattern* (regex)
# . is current directory & subs
# / Is root
find . -iname "someFileOrFolder"
find / -type d -iname "someFileOrFolder"

# Search for string contents
grep -iRl "your-text-to-find" ./

# Delete all things you find :)
sudo find /mnt/e/CDrive/ -type d -name "node_modules" -delete

# OR Find em
sudo find /mnt/e/CDrive/ -type d -name "node_modules"

# Then get em
sudo find /mnt/e/CDrive/ -type d -name "node_modules" -prune -exec rm -rf {} \;
```

## Copying Folders Recursively

```bash
cp -avr /home/some-folder /usb/backup

# Where,
# -a : Preserve the specified attributes such as directory an file mode, ownership, timestamps, if possible additional attributes: context, links, xattr, all.
# -v : Verbose output.
# -r : Copy directories recursively.
```

## Search for string in files

```bash
grep -rnw '/path/to/somewhere/' -e 'pattern'
# Alternative
# grep -Ril "text-to-find-here" /
# i stands for ignore case (optional in your case).
# R stands for recursive.
# l stands for "show the file name, not the result itself".
# / stands for starting at the root of your machine.
```

## Calculate Digital Ocean Snapshot Costs

```bash
df -k -h / | tail -1 | awk '{print $3*0.05}'
```

## List all open ports

```bash
sudo netstat -tunlp
# -t Show TCP ports.
# -u Show UDP ports.
# -n Show numerical addresses instead of resolving hosts.
# -l Show only listening ports.
# -p Show the PID and name of the listener’s process.

# Or you can use lsof
sudo lsof -nP -iTCP -sTCP:LISTEN
```

## Windows Linux Sub-System Apache Tips

```bash
# Install Apache
sudo apt install apache2
# Start apache2
sudo service apache2 start
# Create a symbolic link to a root directory (for LAMP)
sudo ln -s '/mnt/c/Web/Some Project Hub' '/var/www/html/dice'
# Restart apache2
sudo service apache2 restart
# Access via 127.0.0.1/dice
```

## Add SSH Keys to Server

```sh
# Paste your public key into this file, save & exit
sudo nano ~/.ssh/authorized_keys
# Change file permissions so that the file does not allow group writable permissions.
sudo chmod 600 ~/.ssh/authorized_keys
# See log if errors
sudo nano /var/log/auth.log
```

## See all files & permissions

```sh
ls -n
```

## Zip A Folder

```bash
# Get ZIP
sudo apt install zip unzip

# Recursively zip file & folders & subs (Below adds file1 and recursively adds folder1)
zip -r output_file.zip file1 folder1
```

## htop: Colourful Top

> [HTOP on Linux Man](https://linux.die.net/man/1/htop)

```bash
sudo apt install htop -y
htop
```

## vnstat: Network Usage Monitor

> [HTOP on Linux Man](https://linux.die.net/man/1/vnstat)

```bash
sudo apt install vnstat -y
```

## Package Install / Get Issues?

```bash
sudo apt update && sudo apt upgrade -y && dpkg --configure -a
```

## Removing apt packages

```bash
sudo apt-get remove --purge package-name
sudo apt-get autoremove -y
sudo apt-get autoclean
```

## Renaming files replacing character(s) (Perl)

```bash
# Replace "#U00a9" with "safe"
rename 's/#U00a9/safe/g' *
# Test it first!!
rename -n 's/#U00a9/safe/g' *
```
