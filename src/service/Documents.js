import LocalStorage from './LocalStorage';
import Service from './Service';
import { Keys, ServiceUrlNew, ServiceUrl, ServiceGetTime } from './Utils';

const getData = function (data,callback) {
    var filter = {
        "start": [data], "end": [data + "xff"],
        "limit": -1, "include_doc": true
    }
    Service.query('pp5summarynotification','hostid',filter,callback)
}

module.exports={
    getData:getData,
}