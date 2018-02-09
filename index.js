const Client = require('./lib/Client');

module.exports = (options) => {
    return new Client(options || require('./config')());
};