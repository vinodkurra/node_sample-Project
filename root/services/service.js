// angular.module('myApp.services', [])
angular.module('ChotbotApp').service('ChotService', function ($http) {
    
       
        var port = "http://localhost:7070/";
    
        this.Login = function (data,callback) {
            $http({
                method: "POST",
    
                url: "http://localhost:7070/login",
    
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        }
        this.logout = function (data,callback) {
            console.log("logout");
            $http({
                method: "GET",
    
                url: "http://localhost:7070/logout",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        } 
        this.saverecruit = function (data,callback) {
            $http({
                method: "POST",
    
                url: "http://localhost:7070/saveRecruiters",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        }  
        this.getRecList = function (data,callback) {
            console.log("get list",data);
            $http({
                method: "GET",
    
                url: "http://localhost:7070/getRecruitList",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        } 
        this.removeLIst = function (data,callback) {
            console.log("get list",data);
            $http({
                method: "POST",
    
                url: "http://localhost:7070/removeList",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        }
        this.editLIst = function (data,callback) {
            console.log("get list",data);
            $http({
                method: "POST",
    
                url: "http://localhost:7070/updateList",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        } 
        this.getEditValue = function (id,callback) {
            console.log("xsxsxsx",id);
            
            $http({
                method: "GET",
    
                url: "http://localhost:7070/editdata",
                params: {user_id: id},

                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function mySuccess(response) {
                    callback(response);
                }, function myError(err) {
                    callback(err);
                });
        }
    
    });
    
    angular.module('ChotbotApp').service('Auth', function () {
    
        this.getUserInfo = function () {
            var userInfo = JSON.parse(sessionStorage.getItem("names"));
            return userInfo;
        }
    
    })