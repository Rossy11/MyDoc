/**
 * Created by Administrator on 2017/6/13 0013.
 */
angular.module('loginApp', []).controller('loginCtrl', function ($scope, $http) {
    var secrectKey;
    var IsOpen=false;
    var baseUrl = "http://180.97.83.70:30990/shark/";
    $scope.initInfo = function () {
        $scope.errorInfo = false;
    }
    $scope.login = function () {
        loginSys();
    }

    //权限设置
    function setInfo(array, str) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == str) {
                return true;
            }
        }
    }

    //登录请求
    function loginSys() {
        var nickName = $scope.nickName;
        var passWord = $scope.passWord;
        $http({
            method: 'GET',
            url: baseUrl + "key/",
        }).then(function successCallback(res) {
            log(1111111111111)
            log(res)
            secrectKey = deCodeData(res).secrect_key;
            var jsonDatas = {
                user_name: nickName,
                password: passWord
            };
            var req_string = enCodeData(jsonDatas, secrectKey);
            var dataInfo = {
                req: req_string
            };
            log(secrectKey)
            $http({
                method: 'POST',
                url: baseUrl + "login/",
                data: "req=" + req_string,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(res) {
                log(res)
                var jsonData = deCodeData(res);
                log(jsonData)
                localStorage.removeItem("shark");
                localStorage.removeItem("hot");
                if (jsonData.info_code == "10000") {
                    localStorage.setItem("secrectKey", secrectKey);
                    localStorage.setItem("nickName", nickName);
                    log(jsonData)
                    var data = jsonData.permissions;
                    if (setInfo(data, "shark.can_update")) {
                        localStorage.setItem("shark", "OK");
                        log("shark.can_update")
                    }
                    if (setInfo(data, "KV3Activity.can_configure")) {
                        localStorage.setItem("hot", "OK");
                        log("KV3Activity.can_configure")
                    }
                    window.location.href = "/static/chooseJump.html";
                } else {
                    $scope.errorInfo = true;
                    $scope.nickName = "";
                    $scope.passWord = "";
                }
            }, function errorCallback(res) {
            })

        }, function errorCallback(response) {

        });
    }

//点击搜索键
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            loginSys();
        }
    });
    //    控制log
    function log(str) {
        if (IsOpen) {
            console.log(str)
        }
    }
})
