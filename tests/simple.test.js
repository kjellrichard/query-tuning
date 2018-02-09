
(async () => {
    let client = require('../index')();
    let dateResult = await client.raw('select getdate()');
    console.log(`Got "${dateResult.value()}" in ${dateResult.elapsed} ms`);
})();
