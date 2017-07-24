import Service from './Service';
import LocalStorage from './LocalStorage';

const login = function(credential,callback){
    // Get authen.
    Service.authen(credential,(err,msg)=>{
        console.log(credential);
        //check authen error
        if(err) return callback(err,msg);
        //save token to local storge
        LocalStorage.setToken(msg.token,(err,msg)=>{
            //check token error
            if(err) return callback(err,msg);
            // save username password(credential) to local
            LocalStorage.setCredential(credential,callback);
        });
    });
}

module.exports={
      login: login
}