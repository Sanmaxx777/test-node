'use strict';

const rp=require("request-promise");
const otpAuth=require('../models/otpAuth');
//const studentModel = require('../models/studentModel');
//const countersModel=require('../models/counterModel');
const encryptor = require('../../common/encrypt.js');
//const redis=require('../../common/redis');


var authServices = {
    
    generateDashboardToken:async function(userId,email){
        
        var userToken="NA";

        try{

            var currentTime=parseInt(Date.now()/1000);
            var tokenString=currentTime+"||"+userId+"||"+email;
            var userToken=encryptor.encrypt(tokenString);
            
        }catch(e){

            console.log(e);
        
        }

        return userToken;
    },

    verifyDashboardToken: async function(token){

        var userId=0;

        try{

            var tokenString=encryptor.decrypt(token);
            //console.log(tokenString);
            var tokenArray=tokenString.split("||");
            var userId=tokenArray[1];
            
        }catch(e){

            console.log(e);
        
        }

        return userId;
    },

    generateUserLoginToken:async function(userId,deviceId){
        
        let userToken="NA";

        try{

            let accessCode=Math.random().toString(36).substr(2);
            let currentTime=parseInt(Date.now()/1000);

            let tokenData={
                success:1,
                time:currentTime,
                accessCode:accessCode,
                deviceId:deviceId,
                userId:userId
            }

            let tokenString=JSON.stringify(tokenData);
            userToken=encryptor.encrypt(tokenString);
            
        }catch(e){

            console.log(e);
        
        }

        return userToken;
    },

    verifyUserLoginToken:async function(loginToken,deviceId){
        
        var data={
            success:0,
            userId:-1,
            deviceId:"NA",
            message:"something went wrong"
        }

        try{

            var dataString=encryptor.decrypt(loginToken);
            var data=JSON.parse(dataString);

            console.log(data);

            if(data.deviceId != deviceId){
                var data={
                    success:0,
                    userId:"NA",
                    deviceId:"NA",
                    message:"deviceId does not match"
                }
            }

        }catch(e){
            console.log(e);
        }

        return data;
    },

    generateUserSessionToken:async function(userId,loginToken,deviceId){
        
        let userToken="NA";

        try{

            let currentTime=parseInt(Date.now()/1000);

            let tokenData={
                success:1,
                time:currentTime,
                loginToken:loginToken,
                deviceId:deviceId,
                userId:userId
            }

            console.log(tokenData);

            let tokenString=JSON.stringify(tokenData);
            userToken=encryptor.encrypt(tokenString);
            
        }catch(e){

            console.log(e);
        
        }

        return userToken;
    },

    verifyUserSessionToken:async function(sessionId,loginToken,deviceId){
        
        var data={
            success:0,
            userId:-1,
            deviceId:"NA",
            message:"something went wrong"
        }

        try{

            var dataString=encryptor.decrypt(sessionId);
            var data=JSON.parse(dataString);

            //console.log(data);

            if(data.deviceId != deviceId){
                var data={
                    success:0,
                    userId:-1,
                    deviceId:"NA",
                    message:"deviceId does not match"
                }
            }

            if(data.loginToken != loginToken){
                var data={
                    success:0,
                    userId:-1,
                    deviceId:"NA",
                    message:"login-token does not match"
                }
            }

        }catch(e){
            console.log(e);
        }

        return data;
    },

    getOTP: async function(email,deviceId,otpType){
        
        var currentTime=parseInt(Date.now()/1000);
        //var otp = Math.floor((Math.random() * 8000) + 1001);
        var otp=5338;

        var tempToken=deviceId+"||"+email+"||"+currentTime;
        var authToken=encryptor.encrypt(tempToken);

        //await this.sendOTPSMS(otp,mobile);

        var otpData={
            deviceId:deviceId,
            otpType:otpType,
            email:email,
            otpSent:otp,
            authToken:authToken,
            createdTime:currentTime,
        };

        try{
            var otpObject=new otpAuth(otpData);
            await otpObject.save()
        }catch(e){
            console.log(e);
        }

        return authToken;
    },

    verifyOTP: async function(otp,authToken,email,deviceId){
        
        var data=[];

        try{

            var filter={otpSent:Number(otp),email:email,authToken:authToken,deviceId:deviceId};
            console.log(filter);
            var data=await otpAuth.find(filter).sort({_id:-1}).limit(1).lean();

            console.log(data);

        }catch(e){
            console.log(e);
        }

        return data;
    },

    sendOTPSMS: async function(otp,mobileNumber){
        
        let result={};

        try{

            let dataToSend ={
                "sender": "CHETNA",
                "route": "4",
                "country": "91",
                "unicode": "1",
                "sms": [
                  {
                    "message": "OTP FOR CHETNA APP IS "+otp,
                    "to": [
                        mobileNumber
                    ]
                  }
                ]
              }
    
            let reqHeaders = {
                'authkey':"NA",
                'Content-Type': 'application/json'
            };
    
            let reqOptions = {
              
                method: 'POST',
                url: 'https://api.msg91.com/api/v2/sendsms', 
                headers: reqHeaders,
                json: true,
                body: dataToSend
            };

            let result = await rp(reqOptions);
            console.log(result);

        }catch(e){
            console.log(e);
        }

        return result;
    },
};



module.exports = authServices;