angular.module('ChotbotApp').controller('loginCtrl', function ($scope,$state,ChotService,toaster) {
    console.log("esdfdfdf");
$scope.user = {};
$scope.handleSubmit = function(data){
    console.log("sdsdsdsd",data);
    console.log("$scope.user",$scope.user);
    // $state.go('dashboard');
    ChotService.Login(data, function (user) {
        console.log("user",user);
        if(user.data.status == "success"){
            toaster.pop("success",user.data.message);
            $state.go('dashboard');
        }else{
            toaster.pop("error",user.data.message);
            
        }
              });
}
    })
   