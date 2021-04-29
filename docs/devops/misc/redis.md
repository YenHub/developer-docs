# Redis Quickstart TOC

1. [Linux](#redis-on-linux)
2. [Windows](#redis-32-on-windows)

# Redis on Linux

## Start Redis-CLI

```sh
sudo systemctl start redis
```

## Start Redis-CLI

```sh
sudo systemctl restart redis
```

## Stop Redis

```sh
sudo systemctl stop redis
```

## Enable Redis Auto-Start at boot

```sh
sudo systemctl enable redis
```

# Redis on Windows 10 / NodeJS / Linux WSL

CMS utilises Redis Server in order to store data in memory.

Setup guidance below.

## Install WSL

Recommended: Ubuntu WSL

## Launch Bash for Win

Launch the installed distro from your Windows Store and then install redis-server.

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install redis-server
redis-cli -v
```

Restart the Redis server to make sure it is running

```bash
sudo service redis-server restart
```

Execute a simple Redis command to verify your Redis server is running and available:

```bash
redis-cli
127.0.0.1:6379> set user:1 "Jane"
127.0.0.1:6379> get user:1
# Returns "Jane"
```

Stop the server:

```bash
sudo service redis-server stop
```

If you want to connect to Redis with NodeJS you need to start Redis Server as a service, otherwise you will get an error:

```bash
sudo service redis-server start
```

## Using it in a node app

```javascript
// npm install redis && npm install connect-redis
var express = require("express");
var redis = require("redis");
var RedisStore = require("connect-redis")(express.session);
var client = redis.createClient();

app.use(
  express.session({ store: new RedisStore({ client }), secret: "hey you" })
);

/* Then you can initialize your passport session.. */
app.use(passport.initialize());
app.use(passport.session());

/* Logging out can be done like so */

exports.logout = function(req, res) {
  req.session.destroy();
  res.redirect("/");
};
```

# Redis 3.2 on Windows

Download the [package](https://github.com/MicrosoftArchive/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.zip) or go to [GitHub](https://github.com/MicrosoftArchive/redis/releases)

Extract this to a folder, adding the folder path to the Environment Variables in windows

Install the Windows Redis Service & Start It

```Batchfile
redis-server --service-install redis.windows-service.conf --service-name Redis6379 --port 6379
redis-server --service-start --service-name Redis6379
```

## Running Multiple Instances

We have two different options:

> Under the same folder, use different configuration file

1. Duplicate redis.windows-service.conf to redis.windows-service-6380.conf
2. Change port number in redis.windows-service-6380.conf
3. Install Windows Service with redis.windows-service-6380.conf

```Batchfile
redis-server --service-install redis.windows-service-6380.conf --service-name Redis6380 --port 6380
```

> Under different folder.

1. Duplcate Redis folder to Redis6380
2. Open redis.windows-service.conf
3. Change port number in redis.windows-service.conf
4. Install Windows Service with redis.windows-service.conf

```Batchfile
redis-server --service-install redis.windows-service.conf --service-name Redis6380 --port 6380
```
