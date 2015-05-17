/* global app */
 app.service('$user', function ($http, $rootScope, $q) {    
    return {
        get: function (data) {   
            
            var defer = $q.defer();
                
            // do have our user object cached already?
            if (typeof $rootScope.user === 'undefined') {
                     
                // no, make the api call
                $http.post('http://localhost:8080/api/user/get', data).then(function (response) {
                    
                    var user = response.data;
                    
                    // check if we have an empty wallet
                    user.wallet = (!user.wallet ? [] : user.wallet);
                    
                    // cache user
                    $rootScope.user = user;
                    
                    //return user;
                    defer.resolve(user);
                    
                }, function(err) {
                   alert(err.data.message);
                });
            }
            else {
                defer.resolve($rootScope.user);
            }
       
            return defer.promise;
        },
        
        create: function (data) {
            return $http.post('http://localhost:8080/api/user/create', data).then(function (result) {
                return result.data;
            }, function(err) {
               alert(err.data.message);
            });
        },
        
        update: function (data) {
            return $http.post('http://localhost:8080/api/user/update', data).then(function (result) {
                return result.data;
            }, function(err) {
               alert(err.data.message);
            });
        },
        
        upload: function (data) {
            return $http.post('http://localhost:8080/api/file/upload', data).then(function (result) {
                return result.data;
            }, function(err) {
               alert(err.data.message);
            });
        }
    };
    
 });
 
 app.service('$session', function () {    
    return {
        // get from device local storage
        _id : '4kEjK9b7',
        token : '59fb53e0-f31a-11e4-bfe9-93ef8b83439d'
    };
 });