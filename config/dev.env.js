const api = require('./api');

module.exports = {
    NODE_ENV: '"development"',
    api: JSON.stringify(api.dev)
}