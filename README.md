# query-tuning
query tuner and optimization

# usage
```javascript
let client = require('query-tuning')({
    client: 'mssql',
    connection: {
        server: '...',
        password: '...',
        database: '...'
    }
});
```
## do a raw query
```javascript
let dateResult = await client.raw('select getdate()');
console.log(`Got "${dateResult.value()}" in ${dateResult.elapsed} ms`);
```
## do queries in paralell and return result as an array

```javascript
let resultAsArray = await client.all([
    'select getdate()',
    ['select top 1 * from sys.all_objects where type = :type', { 'type': 'U' }]
]);
console.log(resultAsArray[0].value());

```

## do queries in paralell and return result as object

```javascript
results = await client.all({
    'date': 'select top 1 * from kpadmin.users',
    'table': ['select top 1 * from sys.all_objects where type = :type', { 'type': 'U' }]
})
console.log(results.date.value());
console.log(results.table.value());
```

## full example
```javascript
(async () => {
    try {
        let client = require('query-tuning')();
        let dateResult = await client.raw('select getdate()');
        console.log(`Got "${dateResult.value()}" in ${dateResult.elapsed} ms`);
        let resultAsArray = await client.all([
            'select getdate()',
            ['select top 1 * from sys.all_objects where type = :type', { 'type': 'U' }]
        ]);
        console.log(resultAsArray[0].value());
        results = await client.all({
            'date': 'select top 1 * from kpadmin.users',
            'table': ['select top 1 * from sys.all_objects where type = :type', { 'type': 'U' }]
        })
        console.log(results.date.value());
        console.log(results.table.value());
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }    
    
})();
```
