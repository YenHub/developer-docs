# TomCat QuickStart Guide

Need help? This guide has been constructed using the [resources here](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-8-on-ubuntu-16-04).

## Setup Details

### Step 1: Install Java

```bash
# Install JAVA
sudo apt-get update
sudo apt-get install default-jdk -y

# IF already installed, get version
sudo find / -name "version.sh"
# Pipe the resulting .sh and execute it
/usr/share/tomcat8/bin/version.sh
```

### Step 2: Create Tomcat User

```bash
# Create a user group for TomCat
sudo groupadd tomcat

# Next, create a new tomcat user.
# Home directory of /opt/tomcat (where we will install Tomcat)
# Shell of /bin/false (so nobody can log into the account):
sudo useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat
```

### Step 3: Install Tomcat

```bash
# Change to temp directory to store the tomcat install
cd /tmp

# Download TomCat of your choice http://tomcat.apache.org/download-80.cgi
# Check the URL if you get a gzip error, these are definitely gzipped!
curl -O http://mirror.ox.ac.uk/sites/rsync.apache.org/tomcat/tomcat-8/v8.5.43/bin/apache-tomcat-8.5.43.tar.gz

# Now install TomCat
sudo mkdir /opt/tomcat
sudo tar xzvf apache-tomcat-8*tar.gz -C /opt/tomcat --strip-components=1
```

### Step 4: Update Permissions

```bash
# Update permissions
cd /opt/tomcat
sudo chgrp -R tomcat /opt/tomcat

# Give tomcat group read access to the conf directory and all of its contents
# and execute access to the directory itself:
sudo chmod -R g+r conf
sudo chmod g+x conf

# Make the tomcat user the owner of the webapps, work, temp, and logs directories:
sudo chown -R tomcat webapps/ work/ temp/ logs/
```

### Step 5: Create a systemd Service File

```bash
# Find out where Java is installed
sudo update-java-alternatives -l

# Output
# java-1.8.0-openjdk-amd64       1081       /usr/lib/jvm/java-1.8.0-openjdk-amd64
#                                              ^ ^ ^ ^ You Need This ^ ^ ^ ^

# Open a file called tomcat.service in the /etc/systemd/system directory by typing:
sudo nano /etc/systemd/system/tomcat.service
```

```bash
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

Environment=JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre
Environment=CATALINA_PID=/opt/tomcat/temp/tomcat.pid
Environment=CATALINA_HOME=/opt/tomcat
Environment=CATALINA_BASE=/opt/tomcat
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'
Environment='JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom'

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

User=tomcat
Group=tomcat
UMask=0007
RestartSec=10
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Restart the systemd daemon so it sees the change
sudo systemctl daemon-reload

# Start the service you have created
sudo systemctl start tomcat

# Check it's running by polling status
sudo systemctl status tomcat
```

### Step 6: Adjust the Firewall and Test the Tomcat Server

```bash
sudo ufw allow 8080
# Access via browser at http://server_domain_or_IP:8080

# Once you are happy it all works, enable the service
sudo systemctl enable tomcat
```

### Step 7: Configure Tomcat Web Management Interface

```bash
# Edit the users to allow access
sudo nano /opt/tomcat/conf/tomcat-users.xml

# Add the <user username="admin"...> line)
# <tomcat-users . . .>
#     <user username="admin" password="password" roles="manager-gui,admin-gui"/>
# </tomcat-users>

# Now to allow access to TomCat from external IP (e.g. SSH)
sudo nano /opt/tomcat/webapps/manager/META-INF/context.xml
# Comment out this line
# <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->
# Same again here
sudo nano /opt/tomcat/webapps/host-manager/META-INF/context.xml
# <!--<Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" />-->

# Restart TomCat
sudo systemctl restart tomcat

# Error Log
sudo find / -iname *catalina.log*
sudo cat /etc/tomcat8/logs/catalina.out

```

> Now try to access the [manager interface](http://server_domain_or_IP:8080/manager/html)

> Now try to access the [host manager interface](http://server_domain_or_IP:8080/host-manager/html/)
