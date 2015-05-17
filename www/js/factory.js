/// <reference path="../../typings/angularjs/angular.d.ts"/>

app.factory('UserFactory', function ($http) {    
    
    var User = function(data) {
        
        angular.extend(this, {
            _id: data._id,
            token: data.token,
            email: data.email, 
            firstName: data.firstName,
            lastName : data.lastName,
            dob: data.dob,
            gender: data.gender,
            country: data.country,
            registered: data.registered,
            updated: data.updated,
            device: data.device,
            wallet : data.wallet
        });
        
        angular.extend(this, data);
    };
    
    return User;
});