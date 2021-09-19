'use strict';

const InternshipModel = require('../models/internModel');
const UUID = require('uuid');

var internServices = {
    
    getUserData:async function(filter,select,sort,skip,limit){
        
        var data=[];

        try{

            var data = await InternshipModel.find(filter).select(select).sort(sort).skip(skip).limit(limit).lean();
            
        }catch(e){

            console.log(e);
        
        }

        return data;
    },

    addUser: async function(userData){

        var data;

        try{

            var userId=await UUID.v4();
            var currentTime=parseInt(Date.now()/1000);

            userData.userId=userId.toString();
            userData.userToken=userId.toString();
            userData.createdOn=currentTime;

            var userObject=new InternshipModel(userData);
            var data=await userObject.save();

        }catch(e){
            console.log(e);
        }

        return data;
    },

    updateUserDetails: async function(filter,updateData){

        let data={};

        try{
            data = await InternshipModel.findOneAndUpdate(filter, updateData,{multi:false,new:true});
            //console.log(data);
            return data;

        }catch(err){

            console.log(err)
            return data;
        }
    },

};   

module.exports = internServices;