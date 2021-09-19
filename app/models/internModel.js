'use strict';

var mongoose = require('mongoose');

var internSchema = mongoose.Schema({
    "userId": {
        type: "String",
        required:true,
        unique:true
    },
    "status": {
        type: "String",
        required:true
    },
    "createdAt": {
        type: "Number",
        required:true
    },
    "userDetails": {
        "name": {
            type: "String",
            required:true
        },
        "email": {
            type: "String",
            required:true
        },
        "mobile": {
            type: "String",
            required:true
        },
        "gender": {
            type: "String",
            required:true
        },
        "birthDate": {
            type: "Date",
            required:true
        },
        "city": {
            type: "String",
            required:true
        }
    },
    "internshipSpecificDetails": {
        "collageName": {
            type: "String",
            required:true
        },
        "course": {
            type: "String",
            required:true
        },
        "placementCoordinatior": {
            type: "String",
            required:true
        },
        "purpose": {
            type: "String",
            required:true
        },
        "internshipProfile": {
            "profileId": {
                type: "String",
                required:true
            },
            "profileName": {
                type: "String",
                required:true
            },
            "profileArea": {
                type: "String",
                required:true
            }
        },
        "relaventSkills": {
            type: "String",
            required:true
        },
        "duration": {
            type: "String",
            required:true
        },
        "startTime": {
            type: "Number",
            required:true
        },
        "endtime": {
            type: "Number",
            required:true
        },
        "resumeUrl": {
            type: "String",
            required:true
        },
        "referredBy": {
            type: "String",
            required:true
        }
    },
    "passwordHash": {
        type: "String",
        required:true
    }
});

var connection = mongoose.createConnection('mongodb://admin:test1234@localhost:27017/internship?authSource=admin', { useCreateIndex: true,useNewUrlParser: true });
module.exports = connection.model('intern', internSchema, 'intern');