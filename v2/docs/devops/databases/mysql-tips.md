# MySQL Snippets

## Find a table by column name

```sql
SELECT
    table_name,
    column_name,
    data_type,
    ordinal_position

FROM  INFORMATION_SCHEMA.COLUMNS

WHERE table_schema = 'sqn'
  AND column_name = 'language_id'
```

## Get size of all tables

```sql
SELECT
     table_schema as `Database`,
     table_name AS `Table`,
     round(((data_length + index_length) / 1024 / 1024), 2) `Size in MB`
FROM information_schema.TABLES
ORDER BY (data_length + index_length) DESC;
```

## Get size of all databases

```sql
SELECT table_schema "DB Name",
Round(Sum(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB"
FROM   information_schema.tables
GROUP  BY table_schema;
```

## Get
```sql
SELECT DISTINCT(choice_text) FROM `question_choices`
```

## Update and replace

```sql
UPDATE `wp_posts` SET guid = REPLACE(guid, 'http://some.oldsite.co.uk/', 'https://some.newsite.co.uk/') WHERE `guid` LIKE 'http://some.oldsite.co.uk/%'

# URL
UPDATE `wp_options` SET option_value = REPLACE(option_value, 'http://some.oldsite.com', 'https://some.newsite.com') WHERE `option_value` LIKE '%http://some.oldsite.com%'

# Home Folder
UPDATE `wp_options` SET option_value = REPLACE(option_value, 'home/user/some.oldsite', 'public_html') WHERE `option_value` LIKE '%home/user/some.oldsite%'

# guid
UPDATE `wp_posts` SET guid = REPLACE(guid, 'home/user/some.oldsite', 'public_html') WHERE `guid` LIKE '%home/user/some.oldsite%'

UPDATE `wp_posts` SET guid = REPLACE(guid, 'http://some.oldsite.com', 'https://some.newsite.com') WHERE `guid` LIKE '%http://some.oldsite.com%'

```
