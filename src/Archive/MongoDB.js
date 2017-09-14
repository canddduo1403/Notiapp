import { ServiceUrl, ServiceLoginUrl } from './Config';
import Token from './Token';

const _getOption = function (method, token) {
    var options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    if (token) options.headers['Authorization'] = 'JWT ' + token;
    return options;
}

const _fetch = function (url, options, callback) {
    fetch(url, options)
        .then(resp => resp.json())
        .then(d => {
            if (!d) return callback(true, 'ไม่สามารถโหลดข้อมูลได้');
            callback(null, d);
        })
        .catch((err) => {
            callback(true, err);
        });
}

const get = function (db, key, callback) {
    Token.getToken((err, msg) => {
        if (err) return callback(err, msg);
        var options = _getOption('GET', msg);
        _fetch(ServiceUrl + '/obec/' + db + '/data/' + key, options, callback);
    });
}

const post = function (db, key, data, callback) {
    Token.getToken((err, msg) => {
        if (err) return callback(err, msg);
        var options = _getOption('POST', msg);
        options.body = JSON.stringify(data);
        _fetch(ServiceUrl + '/obec/' + db + '/data/' + key, options, callback);
    });
}

const query = function (db, query, callback) {
    Token.getToken((err, msg) => {
        if (err) return callback(err, msg);
        var options = _getOption('POST', msg);
        options.body = JSON.stringify(query);
        _fetch(ServiceUrl + '/obec/' + db + '/query', options, callback);
    });
}

module.exports = {
    get: get,
    post: post,
    query: query,
};