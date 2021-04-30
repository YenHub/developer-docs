## Ubuntu Welcome Banner

Create the file `/etc/motd.tail` and write there everything you need

e.g. Generate your own using an [Ascii Generator](http://patorjk.com/software/taag/#p=display&f=Small%20Keyboard&t=%20%20DEV%20DOCS)

```pre
_________ _________ ____ ____ ____ _________ ____ ____ ____ ____
||       |||       |||D |||E |||V |||       |||D |||O |||C |||S ||
||_______|||_______|||__|||__|||__|||_______|||__|||__|||__|||__||
|/_______\|/_______\|/__\|/__\|/__\|/_______\|/__\|/__\|/__\|/__\|


              WELCOME TO THE HONEYPOT KINGDOM 😎
```

## Find the banner Line & Uncomment

> \#Banner /some/path  
> Banner /etc/motd

## Show Before Login

> \#Banner /somepath/issue.net

## Show After Login

> \#Banner /somepath/motd.net

## Restart SSH

```bash
sudo service sshd reload
sudo /etc/init.d/ssh restart
sudo service ssh restart
```

## TIPS

Printing MOTD Twice?

```bash
# Check the pam.d config
sudo find / -name pam.d/sshd

# Edit it
sudo nano /etc/pam.d/sshd

# Comment out the Session Lines
:'
#session optional pam_motd.so motd=/run/motd.dynamic
#session optional pam_motd.so noupdate
'

# Edit the sshd Configuration

sudo nano /etc/ssh/sshd_config

:'
# PrintMotd no
# Banner /etc/motd
PrintLastLog no
'
```
