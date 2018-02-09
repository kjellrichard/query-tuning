const _ = require('lodash');
const knex = require('knex');

class MsSqlClient {
    constructor(options) {
        let opts = _.merge({},{
            requestTimeout: 15000,            
            options: {                                             
                connectionIsolationLevel: require('mssql').ISOLATION_LEVEL.READ_UNCOMMITTED,             
            }
        }, options);            
        this.client = knex({
            client: 'mssql',
            connection: options
        });
    }

    async queryDate() {
        let result = await this.client.raw('select getdate()');
        return result;
    }
}

module.exports = MsSqlClient;