angular.module('ChotbotApp').controller('adminCtrl', function ($stateParams, ChotService, $scope, $state, toaster, $window, $stateParams) {
    console.log("dashboard");
    console.log("xszsdsdsd", $stateParams.ID);
    $scope.user = {};
    var val = {};
    $scope.recruitList = [];
    $scope.editUser = {};
    $scope.id = $stateParams.id;
    if ($scope.id) {
        console.log("ddddd");
        ChotService.getEditValue($scope.id, function (list) {
            console.log("edit list list user>>>", list);
            $scope.recruitList = list.data;
            $scope.editUser = list.data[0];
            console.log("$scope.user", $scope.user);


        });
    }
    console.log("$scope.id", $scope.id);
    ChotService.getRecList(val, function (list) {
        console.log("list user>>>", list);
        $scope.recruitList = list.data;

        var transactionlList =list.data;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 0;
        $scope.transactionlLists = transactionlList;
        $scope.range = function () {
            var rangeSize = transactionlList.length >= 30 ? 4 : 1;
            if (transactionlList.length > 30)
                rangeSize = 4;
            else if (transactionlList.length <= 10)
                rangeSize = 1;
            else
                rangeSize = Math.ceil(transactionlList.length / 10);

            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                ps.push(i);
            }
            return ps;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {

            return Math.ceil($scope.transactionlLists.length / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };


    });
    $scope.logoutfunction = function () {
        var data = {}
        ChotService.logout(data, function (user) {
            console.log("logout", user);

            if (user.status == 200) {
                $state.go('login')
            }
        });
    }

    $scope.createRecruitform = function (valid, data) {
        console.log("create reacuit", valid)
        if (valid) {
            ChotService.saverecruit(data, function (user) {
                console.log("saved user>>>", user);
                if (user.status == 200) {
                    toaster.pop("success", user.data.message)
                    $state.go('dashboard');
                }
            });
        } else {
            $scope.newform.$submitted = true;
        }

    }
    // Editing form
    $scope.editRecruitForm = function (valid, data) {
    console.log("data",data);
        data.id = $scope.id;
        if (valid) {
            ChotService.editLIst(data, function (user) {
                console.log("saved user>>>", user);
                if (user.status == 200) {
                    toaster.pop("success", "Detail Updated Successfully");
                    $window.location.reload();
                    $state.go('dashboard');
                }
            });
        } else {
            $scope.newform.$submitted = true;
        }

    }

    $scope.deleteList = function (id) {
        var info = {
            id: id
        }
        ChotService.removeLIst(info, function (user) {
            console.log("saved user>>>", user);
            if (user.status == 200) {
                $state.go('dashboard');
                toaster.pop("success", "Deleted successfully");
                $window.location.reload();
            }
        });

    }




})
angular.module('ChotbotApp').filter('pagination', function () {
    return function (input, start) {
      start = parseInt(start, 10);
      return input.slice(start);
    };
  });