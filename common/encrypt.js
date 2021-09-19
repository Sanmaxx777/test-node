const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = '12341234test1234';
const key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32);
const ivToken = '1234testtesttest';

var encryptor={
    encrypt: function(text){
        var cipher = crypto.createCipheriv(algorithm,key,ivToken);
        var crypted = cipher.update(text,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function(cipher){
        try{
            var decipher = crypto.createDecipheriv(algorithm,key,ivToken);
            var dec = decipher.update(cipher,'hex','utf8');
            dec += decipher.final('utf8');
            return dec;
        }catch(e){
            console.log(e);
            return "NA"
        }
        
    }
}

module.exports=encryptor;