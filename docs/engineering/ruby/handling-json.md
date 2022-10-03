# Querying JSONB

## Querying via Ruby ActiveRecord

**1. Select users where their primary email ends with @smith.com**

```ruby
  User.where("metadata->'session'->'Primary'->>'Email' LIKE ?", '%@smith.com')
```

**2. Select user IDs where peru is NOT in their visited countries list (Case insensitive)**

```ruby
  User.where("metadata->'session'->'Primary'->>'Email' LIKE ?", '%@smith.com')
  User
    .active
    .where("metadata->>'countries_visited' NOT ILIKE ?", '%peru%')
    .pluck(:id)
```

### Tip

> The -> operator returns the original JSON type (which might be an object), whereas ->> returns text

Taken from [this article](https://guides.rubyonrails.org/active_record_postgresql.html#:~:text=The%20%2D%3E%20operator%20returns%20the%20original%20JSON)

## Querying via PostgreSQL

**1. Select items by the value of a first level attribute (#1 way)**

You can query with the @> operator on metadata. This operator can compare partial JSON strings against a JSONB column. It’s the containment operator. For this case you may need to add a GIN index on metadata column.

```sql
SELECT * FROM users WHERE metadata @> '{"country": "Peru"}';
```

**2. Select items by the value of a first level attribute (#2 way)**

The ->> operator gets a JSON object field as text. Use it if you want to query a simple field in a JSONB column. You might add a B-tree index on metadata->>'country'.

```sql
SELECT * FROM users WHERE metadata->>'country' = 'Peru';
```

**3. Select item attribute value**

Once again, the ->> operator gets a JSON object field as text. Just use directly it in the SELECT.

```sql
SELECT metadata->>'country' FROM users;
```

**4. Select only items where a particular attribute is present**

You can use the ->> operator with the classic operator you use on text: =, <>, IS NULL, etc. Do not forget to index metadata->>'country' with a B-tree index.

```sql
SELECT * FROM users WHERE metadata->>'country' IS NOT NULL;
```

**5. Select items by the value of a nested attribute**

You can use both @> or ->>, just like for first level attribute. Add an index according to your choice.

```sql
SELECT * FROM users WHERE metadata->'company'->>'name' = "Mozilla";
SELECT *
  FROM users
  WHERE metadata @> '{"company":{"name": "Mozilla"}}';
```

**6. Select items by the value of an attribute in an array**

Remembering @> operator checks containment in a JSONB column, you can query on an array like {"x": ["a", "b", "c"]"} by just passing {"x":["a"]} to the WHERE clause:

```sql
SELECT \* FROM users WHERE metadata @> '{"companies": ["Mozilla"]}';
```

**7. IN operator on attributes**

Sometimes, we may need to select items where the attributes inside a JSONB column matches a bunch of possible values.

```sql
SELECT * FROM users
  WHERE metadata->>'countries' IN ('Chad', 'Japan');
```

**8. Insert a whole object**

Use UPDATE ... SET as usual and pass the whole object as JSON.

```sql
UPDATE users SET metadata = '{"country": "India"}';
```

**9. Update or insert an attribute**

Use the || operator to concatenate the actual data with the new data. It will update or insert the value.

```sql
UPDATE users SET metadata = metadata || '{"country": "Egypt"}';
```

**10. Removing an attribute**

The operator - removes a key from an object.

```sql
UPDATE users SET metadata = metadata - 'country';
```
