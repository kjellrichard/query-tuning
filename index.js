const config = require('./config')();
const Client = require('./src/MsSqlClient');

(async () => {
    try {
        let client = new Client(config.db);
        let date = (await client.queryDate()).toTable().rows[0][0];
        console.log(`According to db the time is ${date}`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }    
    
})();