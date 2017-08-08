import Service from './Service';
import LocalStorage from './LocalStorage';
import Documents from './Documents';
import Testuser from './Testuser';

const login = function (credential, callback) {
    // Get authen.
    Service.authen(credential, (err, msg) => {
        /*         console.log(credential);
         */        //check authen error
        if (err) return callback(err, msg);
        //save token to local storge
        LocalStorage.setToken(msg.token, (err, msg) => {
            //check token error
            if (err) return callback(err, msg);
            // save username password(credential) to local
            LocalStorage.setCredential(credential, callback);
        });
    });
}

const loadUserInfo = function (credential, callback) {
    // 1. get user information
    Service.getUserInfo(credential.user, (err, msg) => {
        if (err) return callback(err, msg);
        // 2. save user information to local
/*         console.log(msg[0].value.doc)
 */        LocalStorage.setUser(msg[0].value.doc, (err, msg) => {
            if (err) return callback(err, msg);
             LocalStorage.getUser((err, msg) => {
                if (err) {
                    return API.alert('ผิดพลาด', msg);
                } else {
                    callback(null,msg);
                }
            }); 
        });
    });
}


const alert = function (title, text) {
    Alert.alert(title, text, [{ text: 'ตกลง' }]);
}

module.exports = {
    getUser: LocalStorage.getUser,

    login: login,
    loadUserInfo: loadUserInfo,

    getCredential: LocalStorage.getCredential,
    setCredential: LocalStorage.setCredential,

    testUser: Testuser.mappingqcoachvshost

}