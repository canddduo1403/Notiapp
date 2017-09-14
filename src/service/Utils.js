const version = "1.0.0";

const isNumber = function(text){
    return /^\d+$/.test(text);
}

const Keys = {
    KEY_CREDENTIAL:'cdt',
    KEY_TOKEN:'tk',
    KEY_USER:'us',
}

<<<<<<< HEAD
const ServiceUrlNew = 'https://maas.nuqlis.com:9000'; //Web
=======
const ServiceUrlNew = 'https://maas.nuqlis.com:9002'; //Web
>>>>>>> f83191f222794664d65fd98bbedb6a3d7de3223d
const ServiceUrl = 'https://maas.nuqlis.com:9000'; //Web db
const ServiceGetTime = 'https://maas.nuqlis.com:9001/servertime';

const Month = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", 
               "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน ", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const Day = ["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];

module.exports={
    Keys:Keys,
    version:version,
    isNumber:isNumber,
    ServiceUrlNew:ServiceUrlNew,
    ServiceUrl:ServiceUrl,
    ServiceGetTime:ServiceGetTime,
    Month: Month,
    Day: Day
};