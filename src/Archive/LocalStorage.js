import {
    AsyncStorage
} from 'react-native';

const get = function (key, callback) {
    AsyncStorage.getItem(key, callback);
}

const set = function (key, data, callback) {
    AsyncStorage.setItem(key, data, callback);
}

const remove = function (key, callback) {
    AsyncStorage.removeItem(key, callback);
}

const claer = function (callback) {
    AsyncStorage.clear(callback);
}

module.exports = {
    get: get,
    set: set,
    remove: remove,
    claer: claer
};