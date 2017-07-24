import {AsyncStorage} from 'react-native';
import {Keys} from './Utils';

const set = function(key,data,callback){
    AsyncStorage.setItem(key,JSON.stringify(data),callback);
}
const get = function(key,callback){
    AsyncStorage.getItem(key,(err,msg)=>{
        if(err) return callback(err,msg);
        return callback(null,JSON.parse(msg));
    });
}

const getUser = function(callback){
    get(Keys.KEY_USER,callback);
}

const setUser = function(data,callback){
    set(Keys.KEY_USER,data,callback);
}

const getToken = function(callback){
  get(Keys.KEY_TOKEN, callback);
}
const setToken = function(token, callback){
  set(Keys.KEY_TOKEN, token, callback);
}

const getCredential = function(callback){
  get(Keys.KEY_CREDENTIAL, callback);
}
const setCredential = function(data, callback){
  set(Keys.KEY_CREDENTIAL, data, callback);
}

module.exports = {
  get: get,
  set: set,
  getUser: getUser,
  setUser: setUser,
  setToken: setToken,
  getToken: getToken,
  setCredential:setCredential,
  getCredential:getCredential
}