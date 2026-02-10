# Setting up LAMP with WSL2

There are way cooler methods to do this now, for example, docker provides loads of cools ways to do this!

If you're curious, you can inspect the [setup in this repo](https://github.com/YenHub/list.quickdash.co.uk/blob/master/docker-compose.yml) which is effectively just this!

## Prerequisites

- Ubuntu on WSL2

## Configure Ubuntu

```bash

# Update update...
sudo apt-get update && sudo apt-get upgrade

# Install LAMP
sudo apt-get install lamp-server^

# Edit Apache Config
sudo nano /etc/apache2/apache2.conf

# Adding:-
# Servername localhost
# AcceptFilter http none

# Set a custom port if required here:-
sudo nano /etc/apache2/ports.conf
# For Debian based distros (inc Ubuntu) also edit the port here
/etc/apache2/sites-enabled/000-default.conf

sudo service apache2 start

# Test now @ localhost

# Install PHP MyAdmin

sudo service mysql start
sudo mysql
SELECT user, authentication_string, plugin, host FROM mysql.user;
ALTER user 'root'@'localhost' identified with mysql_native_password by '6061';
FLUSH PRIVILEGES;
sudo apt-get install php-mbstring php-gettext phpmyadmin

# Setup your site hosts file

sudo nano /etc/apache2/sites-available/cwo.local.conf

:'
<VirtualHost *:80>
        ServerAdmin webmaster@localhost
        ServerName cwo.local
        ServerAlias *.cwo.local

        DocumentRoot /mnt/e/example1.local

        <Directory />
                Options FollowSymLinks
                AllowOverride None
        </Directory>

        <Directory /mnt/e/example1.local>
                Options Indexes FollowSymlinks MultiViews
                AllowOverride All
#               Order allow,deny
#               Allow from all
                Require all granted
        </Directory>
</VirtualHost>
':
sudo a2ensite cwo.local.conf
sudo service apache2 reload

```
