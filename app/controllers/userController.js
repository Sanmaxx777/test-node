'use strict';

const InternServices = require('../services/internServices');
const AuthServices = require('../services/authServices');

var controllers = {

    account: async function (req, res) {
        try {
            
            let loginToken = req.headers['login-token'];
            
            if (loginToken === null || loginToken === undefined || !loginToken)
                throw new Error("loginToken Not Found");
            
            var userData = await AuthServices.verifyUserLoginToken(loginToken, "NA");
            console.log(userData);

            if (userData.success == 1 && userData.userId != "NA") {

                var userId = userData.userId;
                var filter = { userId: userId };
                var select = {};
                var sort = { _id: -1 };

                //console.log(filter);

                var userDetails = await InternServices.getUserData(filter, select, sort, 0, 1);

                //console.log(userDetails);

                if (userDetails.length > 0) {

                    let user = userDetails[0];

                    delete user.password;
                    delete user.passwordHash;

                    var response = {
                        success: 1,
                        data: user
                    }

                    return res.send(response);

                } else {

                    var response = {
                        "success": 0,
                        "message": "something went wrong"
                    }

                    return res.send(response);
                }


            } else {
                var response = {
                    "success": 0,
                    "message": "Something went wrong"
                }

                return res.send(response);
            }

        } catch (e) {

            var response = {
                "success": 0,
                "message": "Something went wrong",
                "error": e.message
            }

            return res.send(response);
        }
    }

};

module.exports = controllers;