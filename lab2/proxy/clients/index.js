const axios = require('axios');
const config = require('../config');

exports.fetchApiResponse = () => {
    return axios.get(config.get('apiUrl'));
};
