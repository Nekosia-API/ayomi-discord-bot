const axios = require('axios');
const { version } = require('../package.json');

axios.defaults.timeout = 7000;
axios.defaults.headers.common['User-Agent'] = `Mozilla/5.0 (compatible; AyomiBot/${version}; +https://nekosia.cat)`;

module.exports = axios;