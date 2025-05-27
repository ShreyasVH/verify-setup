const axios = require('axios');

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

const execute = options => (axios(options));

exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;