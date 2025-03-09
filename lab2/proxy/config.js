const convict = require('convict');

const config = convict({
    proxyPort: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3001,
        env: 'PROXY_PORT'
    },
    apiUrl: {
        doc: 'The API URL to proxy requests to.',
        format: 'String',
        default: 'http://localhost:3000',
        env: 'API_URL'
    }
});

config.validate({ allowed: 'strict' });

module.exports = config;
