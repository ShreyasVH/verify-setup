const axios = require('axios');
const https = require('https');
const fs = require('fs');

const cert = fs.readFileSync(`${process.env.HOME}/workspace/myProjects/ssl/rootCA.crt`);

const httpsAgent = new https.Agent({
    ca: cert, // Trust this cert
});

const get = async (url, additionalHeaders = {}) => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    return execute({
        method: 'get',
        url,
        headers
    });
};

const post = (url, payload, additionalHeaders = {}) => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

    return execute({
        method: 'post',
        data,
        url,
        headers
    });
};

const put = (url, payload, additionalHeaders = {}) => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    let data = (('application/json' === headers["Content-Type"]) ? JSON.stringify(payload) : payload);

    return execute({
        method: 'put',
        data,
        url,
        headers
    });
};

const del = (url, additionalHeaders = {}) => {
    let defaultHeaders = {
        'X-Requested-With': 'XMLHttpRequest'
    };
    let headers = Object.assign({}, defaultHeaders, additionalHeaders);

    return execute({
        method: 'delete',
        url,
        headers
    });
};

const execute = options => (axios(Object.assign(options, { httpsAgent })));

exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;