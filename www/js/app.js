// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers']);

app.run(function($ionicPlatform, $rootScope) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
 
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
  // core routes
  .state('login', { url: "/login", templateUrl: "templates/login.html" })
  .state('logout', { url: "/logout", controller: "LogoutCtrl" })
  .state('splash', { url: "/splash", templateUrl: "templates/splash.html", controller: 'SplashCtrl' })
//  .state('register', { url: "/register", templateUrl: "templates/register.html" })
//  .state('waiting', { url: "/waiting", templateUrl: "templates/waiting.html" })
 // .state('loading', { url: "/", templateUrl: "templates/loading.html" })
  
  // app routes
  .state('app', {url: "/app", abstract: true, templateUrl: "templates/menu.html", controller: 'AppCtrl'})
  .state('app.wallet', {url: "/wallet", views: {'menuContent': {templateUrl: "templates/wallet.html", controller: 'WalletCtrl'}}})
  .state('app.receipt', {url: "/receipt/:id", views: {'menuContent': { templateUrl: "templates/receipt.html", controller: "ReceiptCtrl"}}}) 
  .state('app.upload', {url: "/upload", views: {'menuContent': { templateUrl: "templates/upload.html", controller: "UploadCtrl"}}});
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});
