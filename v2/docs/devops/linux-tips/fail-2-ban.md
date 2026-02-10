# Fail2Ban Quick Start

How to secure an Ubuntu Public Server using Fail2Ban

## Edit your sshd configuration

#### Create a new group for SSH Users

```bash
# Get root access
sudo -i
# Create a ssh user group
groupadd sshlogin

# Add users to the group
usermod -a -G sshlogin someUser

# Accessing the web directories
usermod -a -G www-data  someUser
sudo chgrp www-data /var/www

# This bit is naughty, but achieves the goal for local environments
sudo chown -R $USER:www-data /var/www/*
sudo chmod -R 755 /var/www

```

#### Adjust the SSHD config, adding restrictions

```bash
# Now set the sshd configuration to allow users in this group only on SSH
nano /etc/ssh/sshd_config
# First of all, make sure you're not set to the default ssh port 22
```
#### sshd_config Contents
```apache
Port 2020
UsePrivilegeSeparation yes
SyslogFacility AUTH
LogLevel INFO
IgnoreRhosts yes
RhostsRSAAuthentication no
HostbasedAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
AuthorizedKeysFile %h/.ssh/authorized_keys
PermitRootLogin no
UseDNS no
TCPKeepAlive yes
AllowGroups sshlogin
LoginGraceTime 20
PasswordAuthentication no
PubkeyAuthentication yes
RSAAuthentication yes

Match User ukfastsupport
PasswordAuthentication yes
Match all


? X11Forwarding no
? UsePAM no
```

-   X11Forwarding: For X Client, tunnel to X Server C app GUI
-   UseDNS no: Do not use from=hostname inside authorized_keys files
-   LoginGraceTime: Reduce the pause allowance on SSH connection

#### Restart SSH

```bash
# Restart the ssh server
sudo systemctl reload sshd && /etc/init.d/ssh reload && systemctl reload ssh && /etc/init.d/sshd reload
```

## Configuring UFW

#### Install UFW

```bash
# Install UFW
sudo apt install ufw -y
```

#### Set the default rules

```bash
# Allow IPV6
sudo nano /etc/default/ufw

# look for IPV6= and set to yes

# Set the defaults, deny in & allow out
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

#### Allowing Connections

```bash
# Allow SSH (port 20)
sudo ufw allow ssh

# Allow SSH (custom port)
sudo ufw allow 2222

# Allow apache2 profile
sudo ufw allow "Apache Full"

# Allow internet traffic
sudo ufw allow 80
sudo ufw allow 443

# If required, allow a range of ports
sudo ufw allow 6000:6007/tcp
sudo ufw allow 6000:6007/udp

# Specific IP Addresses, All ports
sudo ufw allow from 62.232.1.93

# Specific IP Addresses, Specific Port
sudo ufw allow from 62.232.1.93 to any port 2020

# Allow Subnets
sudo ufw allow from 62.232.1.0/24
```

#### Denying Connections

```bash
# Deny all http requests
sudo ufw deny http

# Deny specific IP address
sudo ufw deny from 203.0.113.4

# Removing a rule
sudo ufw status numbered

# Identify the rule you want to delete
sudo ufw delete 2

# Or delete the app rule
sudo ufw delete allow http
sudo ufw delete allow 80
```

#### Helpful Commands

```bash
# Checking the rules setup
sudo ufw status verbose

# Disable UFW
sudo ufw disable

# Enable UFW
sudo ufw enable

# Reset & Start Again
sudo ufw reset

# System Startup systemd unit
sudo systemctl start ufw
sudo systemctl enable ufw

# Activate logging (default = low)
sudo ufw logging on && sudo ufw logging low|medium|high
```

## Setting up fail2ban & integrating with UFW

#### Curios about what's going on in Apache? Run this:

```bash
sudo -i
cd /var/log/apache2
# Loop the plain text logs outputting to our aggregated log file
for f in *.log; do
  cat "${f}" >> /tmp/errors.log
done

# Loop the gz logs outputting to our aggregated log file
for f in *.gz; do
  gunzip -c "${f}" >> /tmp/errors.log
done

# OR for a pre-set name which iterates the index too
STEM=$(basename "${f}" .log)
gunzip -c "${f}" > /THERE/"${STEM}"
```

Read through the logs, goodies live here!  

#### Installing fail2ban

```bash
# Install fail2ban
sudo apt install fail2ban -y
```

#### Edit your custom port for SSH

```bash
sudo nano /etc/ufw/applications.d/openssh-server
```

Add the `[OpenSSH-2020]` section, mirroring the port set previously:-  

```apache
[OpenSSH]
title=Secure shell server, an rshd replacement
description=OpenSSH is a free implementation of the Secure Shell protocol.
ports=22/tcp

[OpenSSH-2020]  
title=Secure shell server, an rshd replacement  
description=OpenSSH is a free implementation of the Secure Shell protocol.  
ports=2020/tcp
```

#### Create fail2ban local overrides

```bash
# Copy the default configuration
cd /etc/fail2ban/
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit the copy
sudo nano jail.local
```

#### jail.local content:

```apache
# Locate the default banaction and change from iptables-multiport to:-
banaction = ufw  
banaction_allports = ufw

# This will only work if in /etc/fail2ban/action.d you have a file called ufw.conf
# NOTE: There is now a default ufw.conf available in action.d

# "bantime" is the number of seconds that a host is banned.
bantime  = 21600

# A host is banned if it has generated "maxretry" during the last "findtime" seconds.
findtime  = 1800
# "maxretry" is the number of failures before a host get banned.
maxretry = 3

# Ignore our IP!
ignoreip = 62.232.1.93  

# Locate and enable the jails by adding enabled = true

# Add some default ban actions

# Block all failed SSH attempts
[ssh]
enabled = true
banaction = ufw-ssh
port = 2020
filter = sshd
logpath = /var/log/auth.log
ignoreip = 62.232.1.93
maxretry = 3
bantime = 21600


# To block failed login attempts use the below jail:
[apache]
enabled = true
port = http,https
banaction = ufw
filter = apache-auth
logpath = /var/log/apache*/error*.log
ignoreip = 62.232.1.93
maxretry = 3
bantime = 21600


[apache-filenotfound]
enabled = true
port = http,https
banaction = ufw
filter = apache-nohome
logpath = /var/log/apache*/error*.log
maxretry = 3

# To block the remote host that is trying to search for scripts on the website to execute:
[apache-noscript]
enabled = true
port = http,https
banaction = ufw
filter = apache-noscript
logpath = /var/log/apache*/error*.log
ignoreip = 62.232.1.93
maxretry = 3
bantime = 21600

# To block the remote host that is trying to request suspicious URLs:
[apache-overflows]
enabled = true
port = http,https
banaction = ufw
filter = apache-overflows
logpath = /var/log/apache*/error*.log
ignoreip = 62.232.1.93
maxretry = 3
bantime = 21600

# To block the remote host that is trying to request malicious bot:
[apache-badbots]
enabled = true
port = http,https
filter = apache-badbots
logpath = /var/log/apache2/*error.log
ignoreip = 62.232.1.93
maxretry = 3
bantime = 21600

# To stop DOS attack from remote host. [http-get-dos] (Requires new filter - http-get-dos.conf):
[http-get-dos]
enabled = true
port = http,https
filter = http-get-dos
logpath = /var/log/apache*/access.log
maxretry = 400
findtime = 400
bantime = 200
ignoreip = 192.168.15.189
action = iptables[name=HTTP, port=http, protocol=tcp]

# To block the failed login attempts on the SSH server:
[ssh]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 600
ignoreip = 192.168.15.189
```

All the filters are simply a regular expression to pattern match some error condition in the logfile

Take note of the filter names as each of those corresponds to a file within the `filter.d` directory.

All the filters are simply a regular expression to pattern match some error condition in the logfile, once matched fail2ban will execute the `banaction`.

#### You must now configure any custom filters defined in the .conf

```bash
# Above we implemented a http-dos filter, let's create it
sudo nano /etc/fail2ban/filter.d/http-get-dos.conf
```

#### http-get-dos.conf Contents

```apache
# Fail2Ban configuration file
[Definition]

# Option: failregex
# Note: This regex will match any GET entry in your logs, so basically all valid and not valid entries are a match.
# You should set up in the jail.conf file, the maxretry and findtime carefully in order to avoid false positives.
failregex = ^<HOST> -.*"(GET|POST).*
# Option: ignoreregex
ignoreregex =
```

#### If you have no ufw.conf in action.d

You must now create your `banaction` files specified above

##### e.g. IF banaction=ufw-ssh

```bash
sudo nano /etc/fail2ban/action.d/ufw-ssh.conf
```

```apache
[Definition]
actionstart =
actionstop =
actioncheck =
actionban = ufw insert 1 deny from <ip> to any app OpenSSH
actionunban = ufw delete deny from <ip> to any app OpenSSH
```

##### e.g. IF banaction = ufw-apache

```bash
sudo nano /etc/fail2ban/action.d/ufw-apache.conf
```

```apache
[Definition]
actionstart =
actionstop =
actioncheck =
actionban = ufw insert 2 deny from <ip> to any app "Apache Full"
actionunban = ufw delete deny from <ip> to any app "Apache Full"
```

## Helpful Commands

```bash
# Restart fail2ban now you've got the config set

sudo fail2ban-client reload

# Verify it's setup correctly & enables
sudo fail2ban-client status

# Test any configurations against their log files
fail2ban-regex /var/log/apache2/error.log /etc/fail2ban/filter.d/wp-login.conf

# See logs for specific filter
sudo fail2ban-client status nginx-noscript

# Manually unban an IP
sudo fail2ban-client set nginx-noscript unbanip 62.232.1.93

# See the logs
cat /var/log/fail2ban.log
```
