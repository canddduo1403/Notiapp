import LocalStorage from './LocalStorage';
import { Keys, ServiceUrlNew, ServiceUrl, ServiceGetTime } from './Utils';

const _getOption = function (method, token, credential) {
    var options = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: null
    };
    if (token) options.headers['Authorization'] = 'JWT ' + token;
    if (credential) {
        options.headers['user'] = credential.user;
        options.headers['pass'] = credential.pass;
    }
    return options;
}

const authen = function (credential, callback) {
    var options = _getOption('POST', null, credential);
    var result = {};
    fetch(ServiceUrl + '/login', options)
        .then(resp => {
            result['token'] = resp.headers.get('Authorization');
            return resp.json()
        })
        .then(data => {
            if (!data.status) return callback(true, 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            result['key'] = data.key;
            callback(null, result);
        })
        .catch((err) => {
            callback(true, err);
        });
}

const query = function (db, view, filter, callback) {
    var url = db.indexOf('pp5summary') === -1 ? ServiceUrl : ServiceUrlNew;
    LocalStorage.get(Keys.KEY_TOKEN, (err, msg) => {
        if (err) return callback(err, msg);
        var options = _getOption('POST', msg);
        options.body = JSON.stringify(filter);
        fetch(url + '/api/query/' + db + '/' + view, options)
            .then(resp => resp.json())
            .then(data => {
                callback(null, data);
            })
            .catch((err) => {
                callback(true, err);
            });
    });
}

const getUserInfo = function (key, callback) {
    LocalStorage.getToken((err, msg) => {

        if (err) return callback(err, msg);

        var options = _getOption('POST', msg);

        var filter = {
            "start": ["edu", key], "end": ["edu", key + "xff"],
            "limit": 1, "include_doc": true
        }

        options.body = JSON.stringify(filter);


        fetch(ServiceUrl + '/api/query/role_db/app_user', options)
            .then(resp => resp.json())
            .then(data => {
                if (data.ok) return callback(true, 'ไม่พบข้อมูลผู้ใช้งาน');

                callback(null, data);
            })
            .catch((err) => {
                callback(true, err);
            });
    });
}

module.exports = {
    authen: authen,
    query: query,
    getUserInfo: getUserInfo
}