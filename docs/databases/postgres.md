# PostgreSQL Quickstart Tips

> [Digital Ocean PostgreSQL Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)

## Install PostgreSQL

```bash
# Always update before getting
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## Migrating the DB

```bash
# Move from server to server via host
pg_dump -h host1 dbname | psql -h host2 dbname
#
# Alternatively, using pg_dump for backup & restore
# Host Machine
#
pg_dump -U username database_name > filepath\backup.sql
#
# Recipient
#
pg_dump -U username database_name < filepath\backup.sql
```

## Switch to postgres user and access psql

```sh
# sudo -i gives you the root environment, your ~/.bashrc is ignored.
# sudo -s gives you the user's environment, your ~/.bashrc is respected.
sudo -i -u postgres psql

# [Alt1] In some systems, without sudo, you will need
psql -U postgres

# [Alt2] or
psql --username=postgres
```

## Quit Postgres

```sh
\q
```

## Create DB

```sh
createdb sammy
```

## Connection Info

```sh
\conninfo
```

## List all databases

```sh
\l
```

## Select Database

```sh
\c <DATABASE_NAME>
```

## List all tables

```sh
\dt
```

## Activate Wide View

```sh
\x
```

## See table content

```sh
\x
# Where mytable is your table name
SELECT * FROM mytable LIMIT 10;
```

# Backing Up Databases

## Using pg_dumpall to backup the entire cluster

```bash
# First grant access
psql -U myDB
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myDB
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO myDB
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO myDB
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO myDB

ALTER USER myUser WITH SUPERUSER
\q
pg_dumpall -U postgres -W -f /tmp/psql/entire_cluster.sql

# Restore the DB
psql -U postgres -W -f /tmp/psql/entire_cluster.sql

# TIPS
# Finding pg_hba.conf
psql -t -P format=unaligned -c 'show hba_file';
# Edit this file to adjust peer/md5(password requested)
sudo nano /etc/postgresql/9.5/main/pg_hba.conf
service postgresql restart

# What worked...
# Log into psql set a password for the postgres user
# Then go back and run the dumpall restore!

```
