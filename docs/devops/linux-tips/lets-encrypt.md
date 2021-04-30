# Let's Encrypt | Ubuntu 16.04

## Let's Encrypt

### Add the repo

```bash
sudo add-apt-repository ppa:certbot/certbot

# Missing add-apt-repository?
sudo apt-get install software-properties-common
```

### Update packages

```bash
sudo apt-get update
```

### Install CertBot

```bash
sudo apt-get install python-certbot-apache
```

### Setup the Certificate

```bash
sudo certbot --apache -d example.com
```

### Pass additional domains as separate calls to CertBot, passing additional subdomains as arguments

```bash
sudo certbot --apache -d example.com -d www.example.com

sudo certbot --apache -d dev.admin.site.com -d staging.admin.site.com -d prod.admin.site.com
```

### Verify the auto-renewal

```bash
sudo certbot renew --dry-run
```

### Revoke a certificate

```bash
sudo certbot certonly --manual --preferred-challenges=http -d dev.admin.site.com -d dev.admin.site.com
```

## Manual Certificate Installation

### Install the certificate files

```bash
/etc/ssl/ssl-tutorials_com.crt /etc/ssl/ssl-tutorials.key /etc/ssl/ssl-tutorials_com.ca-bundle
```

### Locate config files

```bash
apachectl -S
```

### Copy the required config

```bash
cp /etc/apache2/sites-available/your_website.conf /etc/apache2/sites-available/your_website-ssl.conf
```

### Edit your config file in sites-available, adding port 443

```
<VirtualHost *:443>
ServerName example.com
DocumentRoot /var/www/

SSLEngine on
SSLCertificateFile /etc/ssl/example_com.crt
SSLCertificateKeyFile /etc/ssl/private/example_com.key
SSLCertificateChainFile /etc/ssl/example_com.ca-bundle
</VirtualHost>
```

### Enable the site

```bash
sudo a2ensite your_website-ssl.conf
```

### Enable SSL

```bash
sudo a2enmod ssl
```

### Check .conf syntax

```bash
apachectl -t
```

### Check config syntax

```bash
apachectl configtest
```

### Restart Apache

```
sudo service apache2 reload
# sudo apachectl stop
# sudo apachectl start
# sudo apachectl restart
# BEST
sudo apache2ctl restart
```

## Checking Certificate Status

### ssl-cert-check

```bash
sudo apt install ssl-cert-check
# Where cert.pem is the certiicate you're testing
ssl-cert-check -c cert.pem
```
