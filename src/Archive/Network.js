import { NetInfo } from 'react-native';

const getConnectionInfo = function (callback) {
    //ConnectionType none wifi cellular bluetooth ethernet wimax or unknown
    //EffectiveConnectionType 2g 3g 4g or unknown
    //set AndroidManifest.xml to <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        callback(null, connectionInfo);
    });
}

const isConnected = function (callback) {
    NetInfo.isConnected.fetch().then(isConnected => {
        callback(null, isConnected);
    });
}

module.exports = {
    getConnectionInfo: getConnectionInfo,
    isConnected: isConnected,
};