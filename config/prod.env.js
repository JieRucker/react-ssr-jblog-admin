const api = require('./api');

module.exports = {
    NODE_ENV: '"production"',
    api: JSON.stringify(api.build)
}