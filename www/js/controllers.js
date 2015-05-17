var module = angular.module('starter.controllers', []);

module.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

module.controller('SplashCtrl', function($scope, $session, $user, $location) {
  	
    // is this user new?
    if ($session._id === null) {
      // register or something
    }
    else {
      // initialise by getting the user, then redirect to mywallet
      $user.get($session).then(function (response) {
        $location.path('/app/wallet');
      });
    }
});


module.controller('WalletCtrl', function($scope, $session, $user, $ionicLoading) {
   
    $ionicLoading.show();
      
    // get the user
    $user.get($session).then(function (response) {
      $scope.user = response; 
//      $scope.user.wallet = response.wallet.filter(function (obj) {
//          return !obj.deleted;
//      });
      
      // update the model
      $scope.$apply();
    
      $ionicLoading.hide();
    });
});

module.controller("UploadCtrl", function($scope, $rootScope, $location, $http, $user, $session, $ionicLoading) {
  
    $scope.receipt = {};
    
    // add receipt
    $scope.doUpload = function() {
      
      $ionicLoading.show();
      
      // get user session
      $user.get($session).then(function (response) {
        
        // upload the file
        $user.upload($session).then(function (response) {
          
          // get the new id and assign to our receipt
          $scope.receipt._id = response._id;
          
          // push receipt into the users wallet
          $rootScope.user.wallet.push($scope.receipt);
  
          // user service update
          $user.update($rootScope.user).then(function (response) {
            $ionicLoading.hide();
            if (response === 1) {
              $location.path('/app/receipt/' + $scope.receipt._id);
            }
          });
        }); 
      });
    };    
});

module.controller('ReceiptCtrl', function($scope, $rootScope, $stateParams, $http, $user, $session, $location, $ionicLoading) {
    
    // get the id   
    var id = $stateParams.id;
    $ionicLoading.show();
    
    // get the user
    $user.get($session).then(function (response) {
      $ionicLoading.hide();
      $scope.user = response; 
      $scope.receipt = $scope.user.wallet.filter(function (obj) {
          return obj._id === id;
      })[0]; 
    });
    
    // delete receipt from wallet
    $scope.delete = function() {
      
      if (confirm('Are you sure you want to delete this receipt?')) {
        
        $ionicLoading.show();
        
        // set deleted flag
        for (var i in $rootScope.user.wallet) {
          if ($rootScope.user.wallet[i]._id === id) {
            $rootScope.user.wallet[i].deleted = true;
          }
        }
     
        // update the user 
        $user.update($rootScope.user).then(function (response) {
          $ionicLoading.hide();
          $location.path('/app/wallet');
        });
      }
    };
});
