const env = require('getenv');

module.exports = (path) => {
    require('dotenv').config({
        silent: true,
        path: path || undefined
    });
    

    return {
        db: {
            user: env.string('DB_USER'),
            server: env.string('DB_SERVER'),
            password: env.string('DB_PASSWORD'),
            database: env.string('DB_DATABASE'),
            options: {
                appName: 'jalla'
            }
        }
    }    
}