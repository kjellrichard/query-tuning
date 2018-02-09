const _ = require('lodash');
const knex = require('knex');

function extendResult(result) {
    result.first = () => {
        return result[0];
    };
    result.value = (row = 0, column = 0) => {
        return result.toTable().rows[row][column];
    }
}
class Client {
    constructor(options) {
        let opts = _.merge({},{}, options);            
        this.knex = this.client = knex(opts);
    }
    
    async queryDate() {
        let result = await this.client.raw('select getdate()');
        return result;
    }

    async raw(query, params) {
        let start = new Date();
        let result = await this.client.raw(query, params);
        extendResult(result);
        result.elapsed = new Date() - start;
        return result;
    }

    async all(queries) {
        let names = [];
        let ps =
            _(_.isString(queries) ? [queries] : queries)
                .map((q, key) => {
                    if (_.isString(key))
                        names.push(key);    
                    if (_.isString(q))
                        return this.raw(q);
                    if (_.isArray(q))
                        return this.raw(...q);
                }).value();
        
        let results = await Promise.all(ps);
        results.forEach(extendResult);
        if (names.length)
            return names.reduce((acc, value, index) => {            
                acc[value] = results[index];
                return acc;
            }, {});
        return results;
    }
}

module.exports = Client;