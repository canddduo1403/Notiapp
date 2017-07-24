import LocalStorage from './LocalStorage';
import {Keys,ServiceUrlNew,ServiceUrl,ServiceGetTime} from './Utils';

const _getOption = function(method,token,credential){
    var options = {
        method: method,
        headers: {'Content-Type':'application/json'},
        body:null
    };
    if(token) options.headers['Authorization'] = 'JWT' + token;
    if(credential){
        options.headers['user'] = credential.user;
        options.headers['pass'] = credential.pass;
    }
    return options;
}

const authen = function(credential,callback)
{
    var options = _getOption('POST',null,credential);
    var result = {};
    fetch(ServiceUrl + '/login',options)
        .then(resp=>{
            result['token']=resp.headers.get('Authorization');
            console.log(result);
            return resp.json()
        })
        .then(data=>{
            if(!data.status)return callback(true,'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            result['key'] = data.key;
            callback(null,result);
        })
        .catch((err)=>{
            callback(true,err);
        });
}

module.exports={
    authen: authen
}