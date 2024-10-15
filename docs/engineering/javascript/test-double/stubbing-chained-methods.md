# TestDouble.js: Stubbing Chained Methods

```typescript
td.replace(
  config.getOptionalConfig,
  'getOptionalConfig',
  td.function('config.getOptionalConfig'),
)

td.when(config.getOptionalConfig(configKey)).thenReturn({
  getOptionalString: td.function('getOptionalString'),
})

const configStubs = [
  { key: 'athenaRoleArn', value: 'arn:aws:iam::123456789:role/dummy-role' },
  { key: 'athenaRegion', value: 'dummy-region' },
  { key: 'athenaRoleSessionName', value: 'dummy-session-name' },
  { key: 'athenaCatalogName', value: 'dummy-catalog-name' },
  { key: 'athenaDatabaseName', value: 'dummy-database-name' },
  { key: 'athenaTableName', value: 'dummy-table-name' },
  { key: 'athenaResultOutputLocation', value: 'dummy-output-location' },
]

configStubs.forEach(({ key, value }) =>
  td
    .when(config.getOptionalConfig(configKey).getOptionalString(key))
    .thenReturn(value),
)
```
