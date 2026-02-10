# PostgreSQL Quickstart

This guide covers essential PostgreSQL operations for developers.

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

After installation, the `postgres` user is created automatically.

### Start/Stop/Status

```bash
# Start the service
sudo systemctl start postgresql

# Stop the service
sudo systemctl stop postgresql

# Check status
sudo systemctl status postgresql

# Enable on boot
sudo systemctl enable postgresql
```

## Authentication & Connection

### Switch to postgres user

```bash
# Get postgres system user shell
# sudo -i gives you the root environment, your ~/.bashrc is ignored.
# sudo -s gives you the user's environment, your ~/.bashrc is respected.
sudo -i -u postgres psql

# Or connect directly (requires password/peer auth)
psql -U postgres
psql --username=postgres
```

### Connection parameters

| Option      | Description                       |
| ----------- | --------------------------------- |
| `-h HOST`   | Host address (default: localhost) |
| `-p PORT`   | Port number (default: 5432)       |
| `-U USER`   | Database user                     |
| `-d DBNAME` | Database name                     |
| `-W`        | Force password prompt             |

### Common connection examples

```bash
# Local connection with user
psql -U postgres -d mydb

# Remote connection
psql -h 192.168.1.100 -U admin -d production

# With password in environment (not recommended for shared systems)
PGPASSWORD="secret" psql -U admin -d mydb
```

## Interactive psql Commands

### Getting started

| Command      | Description                     |
| ------------ | ------------------------------- |
| `\q`         | Quit psql                       |
| `\conninfo`  | Show current connection details |
| `\! command` | Execute shell command           |

### Database operations

| Command     | Description              |
| ----------- | ------------------------ |
| `\l`        | List all databases       |
| `\c DBNAME` | Connect to database      |
| `\cd [DIR]` | Change working directory |
| `\! pwd`    | Show current directory   |

### Schema/tables

| Command    | Description                   |
| ---------- | ----------------------------- |
| `\dt`      | List tables (current schema)  |
| `\dt *`    | List all tables (all schemas) |
| `\d TABLE` | Describe table structure      |
| `\dv`      | List views                    |
| `\di`      | List indexes                  |

### Formatting output

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `\x`                   | Toggle expanded/wide output mode |
| `\pset border 2`       | Set table borders                |
| `\pset format wrapped` | Format output width              |

### Queries with wide view

```sql
\x
SELECT * FROM users WHERE id = 123;
\x
```

## Database Operations

### Create database

```bash
# Via shell command
createdb mydb

# Or via psql
CREATE DATABASE mydb;

# With owner
CREATE DATABASE mydb OWNER myuser;

# With UTF8 encoding (default on most systems)
CREATE DATABASE mydb WITH ENCODING 'UTF8' LC_COLLATE='en_US.UTF-8' LC_CTYPE='en_US.UTF-8';
```

### Drop database

```sql
DROP DATABASE mydb;
DROP DATABASE IF EXISTS mydb;  # Safe drop
```

## Table Operations

### Create table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- With IF NOT EXISTS
CREATE TABLE IF NOT EXISTS logs (
    id BIGSERIAL PRIMARY KEY,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Insert data

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com'), ('bob', 'bob@example.com');

-- Return inserted rows
INSERT INTO users (username) VALUES ('charlie') RETURNING *;
```

### Update data

```sql
UPDATE users SET email = 'new@example.com' WHERE username = 'alice';

-- With RETURNING
UPDATE users SET active = true WHERE created_at < NOW() - INTERVAL '30 days' RETURNING id;
```

### Delete data

```sql
DELETE FROM users WHERE id = 1;

-- Truncate (fast, irreversible)
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
```

## Backups

### pg_dump - Single database

```bash
# Basic backup
pg_dump mydb > backup.sql

# Backup with custom format (for pg_restore)
pg_dump -Fc mydb > backup.dump

# Backup to compressed file
pg_dump mydb | gzip > backup.sql.gz

# Include schema only
pg_dump -s mydb > schema.sql

# Data only (no schema)
pg_dump -a mydb > data.sql

# Exclude table
pg_dump --exclude-table=logs mydb > backup.sql
```

### Restore with pg_restore

```bash
# Create empty database first
createdb mydb

# Restore custom format
pg_restore -d mydb backup.dump

# Drop and recreate schema
pg_restore -d mydb --clean --create backup.dump
```

### pg_dumpall - Entire cluster

```bash
# Backup all databases and roles
pg_dumpall > full_cluster.sql

# Backup with roles only
pg_dumpall --roles-only > roles.sql

# Backup with privileges
pg_dumpall --include-privileges --include-schema > cluster_with_privs.sql

# Compressed backup
pg_dumpall | gzip > full_cluster.sql.gz
```

### Restore

```bash
# Restore cluster from pg_dumpall
psql -U postgres -f full_cluster.sql

# Restore single database
psql -U postgres -d mydb < backup.sql
```

### Automated backup script

```bash
#!/bin/bash
# save as: backup_postgres.sh
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%F)
TIME=$(date +%H-%M)

mkdir -p "$BACKUP_DIR"

# Backup each database
databases=$(psql -U postgres -t -c "SELECT datname FROM pg_database WHERE datistemplate = false;")
for db in $databases; do
    pg_dump "$db" | gzip > "$BACKUP_DIR/${db}_${DATE}_${TIME}.sql.gz"
done

# Clean backups older than 30 days
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
```

## User & Permission Management

### Create user

```sql
-- With password
CREATE USER myuser WITH PASSWORD 'secret';

-- With login and database creation rights
CREATE USER myuser WITH LOGIN CREATEDB SUPERUSER;
```

### Grant privileges

```sql
-- Database level
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- Schema level
GRANT USAGE ON SCHEMA public TO myuser;
GRANT CREATE ON SCHEMA public TO myuser;

-- Table level
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;

-- Sequence level (for SERIAL columns)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO myuser;

-- Default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO myuser;
```

### Revoke privileges

```sql
REVOKE ALL PRIVILEGES ON DATABASE mydb FROM myuser;
REVOKE ALL ON SCHEMA public FROM myuser;
```

## Configuration

### Find configuration files

```bash
# Get pg_hba.conf location
psql -U postgres -t -P format=unaligned -c 'SHOW hba_file;'

# Get postgresql.conf location
psql -U postgres -t -P format=unaligned -c 'SHOW config_file;'

# View current settings
psql -U postgres -c 'SELECT name, setting FROM pg_settings;'
```

### Common configuration changes

Edit `postgresql.conf`:

```conf
# Connection settings
listen_addresses = '*'          # Listen on all interfaces
port = 5432                     # Default port
max_connections = 100           # Maximum connections

# Memory settings
shared_buffers = 256MB          # Typically 25% of RAM
work_mem = 16MB                 # Per-operation memory
maintenance_work_mem = 128MB

# WAL settings (for replication)
wal_level = replica
max_wal_senders = 3
```

### Reload configuration

```bash
# As postgres user
pg_ctl reload -D /var/lib/postgresql/data

# Or via SQL
SELECT pg_reload_conf();

# Or systemctl
sudo systemctl reload postgresql
```

## Useful Queries

### View active connections

```sql
SELECT pid, usename, datname, client_addr, state, query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start DESC;
```

### View database sizes

```sql
SELECT datname, pg_size_pretty(pg_database_size(datname)) as size
FROM pg_database
ORDER BY pg_database_size(datname) DESC;
```

### View table sizes

```sql
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Find long-running queries

```sql
SELECT pid, now() - pg_stat_activity.query_start AS duration, query, state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes'
AND state != 'idle';
```

### List indexes

```sql
SELECT
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexname::text)) as size
FROM pg_indexes
JOIN pg_class ON pg_class.relname = pg_indexes.indexname
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexname::text) DESC;
```

## Troubleshooting

### Common error messages

| Error                                   | Solution                                          |
| --------------------------------------- | ------------------------------------------------- |
| `psql: FATAL: no pg_hba.conf entry`     | Add entry to `pg_hba.conf`                        |
| `FATAL: password authentication failed` | Set password with `\password` or ALTER USER       |
| `permission denied for schema`          | Run `GRANT USAGE ON SCHEMA public TO user;`       |
| `relation does not exist`               | Check schema name: `SELECT * FROM public.table;`  |
| `could not connect to server`           | Check service: `sudo systemctl status postgresql` |

### Kill problematic queries

```sql
-- Find PID from pg_stat_activity, then:
SELECT pg_terminate_backend(PID);
SELECT pg_cancel_backend(PID);  -- Graceful cancellation
```

### Check disk space usage

```sql
SELECT pg_size_pretty(pg_database_size(current_database()));
SELECT pg_size_pretty(pg_total_relation_size('table_name'));
```

### View locks

```sql
SELECT
    l.mode,
    l.locktype,
    l.page,
    v.relname,
    l.pid,
    a.query
FROM pg_locks l
JOIN pg_class v ON l.relation = v.oid
LEFT JOIN pg_stat_activity a ON l.pid = a.pid;
```

## Additional Resources

- [Official PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [`psql` meta-command reference](https://www.postgresql.org/docs/current/app-psql.html)
- [PostgreSQL Cheat Sheet](https://postgrescheatsheet.com/)
- [Digital Ocean PostgreSQL Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
