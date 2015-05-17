angular.module('app.values', [])

.value('config', function () {
    
    var root = "http://localhost:8080";

    return {
        version: "0.1"
    };

});