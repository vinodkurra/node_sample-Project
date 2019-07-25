angular.module('ChotbotApp', ['ui.router','toaster'

])
.run(["$rootScope", "$location", 'Auth', '$window', '$state', function ($rootScope, $location, Auth, $window, $state) {
var data = Auth.getUserInfo();

// if (data == null || data == undefined) {
//     // $window.location.href = '#/login';
//     $location.path("/login");
// }
// $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

//     var data = Auth.getUserInfo();

//     if (data == null || data == undefined) {
//         // $state.transitionTo("login");
//         $location.path("/login");
//     }
// })
$rootScope.spinner = {
    active: false,
    on: function () {
        this.active = true;
    },
    off: function () {
        this.active = false;
    }
};

$rootScope.$on("$stateChangeStart", function (event, current, previous, x) {
    $rootScope.spinner.on();

});

$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {


    $rootScope.spinner.active = false;
});
}])
.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
$locationProvider.html5Mode(true);

$urlRouterProvider.otherwise('/login');

$stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
   
    

    .state('login', {
        url: '/login',
        templateUrl: 'root/views/Login.html',
        controller: 'loginCtrl'
    })
    .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'root/views/Dashboard.html',
        controller: 'adminCtrl'
    }) 
    .state('dashboard.createRecruit', {
        url: '/createRecruit',
        templateUrl: 'root/views/createRecruit.html',
        controller: 'adminCtrl'
    })
  
    .state('dashboard.editList', {
        url: '/edit/:id',
        templateUrl: 'root/views/editRecruit.html',
        controller: 'adminCtrl'
           
    })
   

})

.factory('httpInterceptor', function ($q, $rootScope, $log) {

var numLoadings = 0;

return {
    request: function (config) {

        numLoadings++;

        // Show loader
        $rootScope.$broadcast("loader_show");
        return config || $q.when(config)

    },
    response: function (response) {

        if ((--numLoadings) === 0) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return response || $q.when(response);

    },
    responseError: function (response) {

        if (!(--numLoadings)) {
            // Hide loader
            $rootScope.$broadcast("loader_hide");
        }

        return $q.reject(response);
    }
};
})
.config(function ($httpProvider) {
$httpProvider.interceptors.push('httpInterceptor');

}).config(function ($httpProvider) {
$httpProvider.interceptors.push(function ($rootScope, $q) {
    return {
        request: function (config) {
            $rootScope.spinner.on();
            return config
        },
        response: function (response) {
            $rootScope.spinner.off();
            return response
        },
        responseError: function (response) {
            $rootScope.spinner.off();
            return response
        },
        requestError: function (response) {
            $rootScope.spinner.off();
            return response
        }
    }
})
})

