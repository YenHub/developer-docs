# How to set up a new Production Server running Node on Ubuntu

## START
Always start with an Update:
```bash
$ sudo apt-get update
```
Create folder for project:
```bash
$ mkdir production
$ cd production/
```
Install Node and GIT
```bash
$ sudo apt-get install git-all
$ sudo apt-get install python-software-properties
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install nodejs
$ node -v
# Should be v6.9.1 or higher.
$ npm -v
# Should be 3.10.8 or higher.
```
## GIT
New git environment:
```bash
$ git init
$ git remote add origin https://github.com/riodw/BloomBus-Server.git
$ git pull origin master
# see if all the files from GitHub have been downloaded
$ ls
```
## Install all the Project dependencies
```bash
$ npm install
$ ls
# See if the folder "node_modules" has been created
$ npm ls | grep express
# Make sure Express is installed
```
## MONGO DATABASE
Give the Bash Script file "mongod" execution permissions.
```bash
$ chmod a+x mongod
```
Install mongodb (not with npm because npm is weird about mongodb).
```bash
$ sudo apt-get install -y mongodb
```
Check to see if proccess "mongodb" is running - (press "q" to quit).
```bash
$ top
```
If it is, KILL it with the following command:
```bash
$ sudo killall mongod
# OR
sudo pkill mongod
```
Make sure proccess "mongodb" is NO LONGER running - (press "q" to quit).
```bash
$ top
```
Create required folder for MongoDB - (where the database is stored).
```bash
$ sudo mkdir -p /data/db/
```
## START MONGODB
```bash
$ sudo mongod
# WAIT FOR MONGODB TO PRINT 'waiting for connections on port 27017'
```
NOW STOP MONGODB - "Ctrl-C"
## PM2 - (link: [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2))
```bash
$ sudo npm install pm2 -g
```
Make PM2 Persistent
```bash
$ pm2 startup ubuntu
# This next line will be provided by PM2: LOOKFOR IT (should be printed after executing the previous command)
$ sudo su -c "env PATH=$PATH:/opt/node/bin pm2 startup ubuntu -u bloombus --hp /home/bloombus"
$ pm2 save
```
Let PM2 run MongoDB:
Need to make a Shell Script that starts 'mongod' - (a bash file that PM2 can run).
```bash
$ touch mongod.sh
$ nano mongod.sh
```
Paste these lines in the nano IDE - (All 2 lines, THE WHOLE THING):
```bash
#!/bin/bash
mongod
```
* Hit "Ctrl-X"
* Hit "y"
* Hit "Enter"
Make sure the 2 lines are saved in the file
```bash
cat mongod.sh
```
Port forwarding
```bash
$ sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```
## START THE SERVER
FIRST START THE DATABASE...
```bash
pm2 start mongod.sh
```
THEN....
Start the server - remember to pass the command line arg "real". P.S. Command line args go after the "--" if there are no args then leave out the "--"
```bash
pm2 start server.js -- real
```

## SHUT DOWN THE SERVER

```bash
# Access CLI
mongo
use admin
db.shutdownServer()
```
