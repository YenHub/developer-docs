# MySQL: Incremental Versioning using GitHub

Using the [bash script](#bash-script) below, the following databases will be versioned twice hourly:-

* db1
* db2
* db3
* db4
* db5

## Pre-requisites

Git-SSH Access: admin-service

Git "Service" user to identify commits under: admin-service

Git Repository: sql-bak-PROD

Linux User: linux-admin

## Deployment Method & Usage

A cronjob has been configured under user linux-admin who is documented in our DR logs and with Andrew Davey

## Crontask being run

```bash
*/30 * * * * /var/lib/sql-bak/backup.sh 'InsertPW_here' > /dev/null 2>&1
```

## Backup Job Being Run:

```bash
mysqldump -u admin-service --password=[$PASSWORD] --databases db1 db2 db3 db4 db5 --single-transaction --quick --lock-tables=false  | gzip > /var/lib/sql-bak/[$FILENAME]
```

In order to backup ALL databases, you would use the following command:-

```bash
mysqldump -u admin-service --password=[$PW] --all-databases --single-transaction --quick --lock-tables=false  | gzip > /var/lib/sql-bak/[$FILENAME]
```

## Backup User

mysql: admin-service

Git: admin-service

Server User: linux-admin

## Restoring the DB

```bash
# !! WARNING: This will overwrite ALL existing data !!
# It may be required that you create a table first, any existing will be overwritten
gunzip /var/lib/sql-bak/[backupfilename.sql.gz] > mysql -u root -p
```

## Error Logs

Errors are being piped into /home/linux-admin/Maildir/new

## Bash Script

This is the script referenced above as `/var/lib/sql-bak/backup.sh` which we would be required to create & run on the server:

```bash
#!/bin/bash
# USAGE: ./backup.sh db_pass
# NOTE: the variables are passed in via the crontab command

# Change to the repo dir
cd /var/lib/sql-bak/

# Declare variables
DB_PASS=$1
HOUR=`date +%H`
MINUTE=`date +%M`
FILENAME='SQL_'$HOUR-$MINUTE'_UTC.sql.gz'
MESSAGE='AUTOMATED_VERSIONING_'`date +%e-%m-%y`
RESETDAY=`date +%a`

# Create the backup (admin-service user)
`mysqldump -u admin-service --password=$1 --databases db1 db2 db3 db4 db5 --single-transaction --quick --lock-tables=false | gzip > /var/lib/sql-bak/$FILENAME`

# Check for external changes and merge them back

git fetch
git pull

if [[ $RESETDAY == "Sun" && $HOUR == 06 && $MINUTE == 00 ]]
then
# It's 6am Sunday Morning; delete the repository history and restart
        rm -rf  /var/lib/sql-bak/.git
        git init
        git add *
        git commit -a -m "Daily Refresh Commit"
        git remote add origin git@github.com:sqnhealth/sql-bak-PROD.git
        git push -u --force origin master
else
# It's any time of day, git push as usual
        git add *
        git commit -a -m "$MESSAGE"
        git push
fi
```