/**
 * Created by Administrator on 2017/6/13 0013.
 */

var app = angular.module('sharkApp', []);
app.controller('sharkCtrl', function ($scope, $compile, $timeout, $http) {
    setHeight("table_all", "x_panel", "nav_menu");//设置表格高度
    //将表格内容导出到Excel中
    $scope.tableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
            ,
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
            , base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            }
            , format = function (s, c) {
                return s.replace(/{(\w+)}/g, function (m, p) {
                    return c[p];
                })
            }
        return function (table, name) {
            if (!table.nodeType) table = document.getElementById("datatable-fixed-header")
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}

            document.getElementById("dlink").href = uri + base64(format(template, ctx));
            document.getElementById("dlink").download = "乐野系统控制台" + '.xls';
            setTimeout('document.getElementById("dlink").click()', 100);

        }
    })()
    var pageSelect = 1;
    var pageCount = 1;
    var resPageList;
    var sysPageList;
    var signPopList;
    var secrectKey;
    var IsSelect = false;//当前是否是单个检索
    var machineSave = [];//保存上次的表格集合
    var regx = /^[A-Za-z0-9]+$/;//输入框只能输入数字和英文字母
    var oldSelect = "";//保存上次输入的内容
    var IsOpen = false;
    var baseUrl = "http://180.97.83.70:30990/shark/";
    var deleteStr = "";//记录要删除的标签
    //点击选中要进行删除的标签操作
    $scope.chooseDelete = function (sign) {
        $scope.deleteSignInfo = sign;
        $scope.showSelectOne = true;
        siList = [];
        siList.push(sign);
        getMachineList(handleParam(1), secrectKey, "all");
    }
    $scope.stateList = ["在线", "不在线", "活跃", "非活跃", "系统升级中", "系统升级失败", "资源升级中", "资源升级失败"];
    $scope.prePage = function () {
        if (pageSelect > 1) {
            pageSelect -= 1;
            getMachineList(handleParam(pageSelect), secrectKey, "all");
        }
    }
    $scope.nextPage = function () {
        if (pageSelect < pageCount) {
            pageSelect += 1;
            getMachineList(handleParam(pageSelect), secrectKey, "all");
        }
    };
    $scope.nickName = localStorage.getItem("nickName");
    secrectKey = localStorage.getItem("secrectKey");
    var jsonDatas = {
        count: 50,
        page: 1
    };
    $scope.showDeletePop = function (typesPop, signPop, $eventPop, midPop) {
        $eventPop.stopPropagation();
        $scope.deleteSure = true;
        deleteStr = signPop;
    }
    //删除标签操作
    $scope.deleteSign = function (types, sign, $event, mid) {
        $event.stopPropagation();
        if (types == 2) {
            //删除标签
            signHandle(2, deleteStr, "");
        } else {
            //删除标签中设备
            signHandle(3, $scope.deleteSignInfo, mid);
        }
    }
    //取消删除标签操作
    $scope.notDelete = function () {
        $scope.deleteSure = false;
    }
    //标签管理刚开始没有设备显示
    //getMachineList(jsonDatas, secrectKey, "all");
    //getSelectList(secrectKey, "address");
    //setListCheck($scope.stateList, "state")
    //getSelectList(secrectKey, "version");
    //getSelectList(secrectKey, "resource");
    getSelectList(secrectKey, "sign");
    //点击上一页下一页，初始化勾选
    function initCheck(list) {
        var midList = [];
        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < $scope.handleList.length; j++) {
                if (list[i].mid == $scope.handleList[j].mid) {
                    midList.push(i);
                }
            }
        }
        for (var m = 0; m < list.length; m++) {
            list[m].box = false;
        }
        for (var n = 0; n < midList.length; n++) {
            list[midList[n]].box = true;
        }
        return list;
    }

    // 初始化全选勾选
    function initAllCheck(list) {
        var count = 0;
        angular.forEach(list, function (v, k) {
            if (v.box) {
                count += 1;
                if (count == list.length) {
                    $scope.checkAllInfo = true;
                } else {
                    $scope.checkAllInfo = false;
                }
            }
        });
        return list;
    }

    // 请求检索条件
    function getSelectList(secrectKey, str) {
        var jsonDatas;
        if (str == "address") {
            jsonDatas = {
                condition: 1
            }
        } else if (str == "version") {
            jsonDatas = {
                condition: 2
            }
        } else if (str == "resource") {
            jsonDatas = {
                condition: 3
            }
        } else if (str == "sign") {
            jsonDatas = {
                condition: 4
            }
        } else if (str == "update") {
            jsonDatas = {
                condition: 5
            }
        }
        log("secrectKey" + secrectKey)
        var req_string = enCodeData(jsonDatas, secrectKey);
        var dataInfo = {
            req: req_string
        };
        log("*********************" + req_string)
        $http({
            method: 'POST',
            url: baseUrl + "reqConditions/",
            data: "req=" + req_string,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            var jsonData = deCodeData(res);
            jumpLogin(jsonData);
            var resData = handleResult(jsonData, "result");
            if (notNull(resData)) {
                var listInfo = setListCheck(jsonData.result, str)
            } else {

            }
            return listInfo;
        }, function errorCallback(res) {
            var de = res.data.split(":")[1];
            var jsonData = deCodeData(res);
            var c = enCodeData(jsonData, secrectKey)
            return null;
        })
    }

    //请求列表
    function getMachineList(jsonDatas, secrectKey, str) {
        log("secrectKey" + secrectKey)
        var req_string = enCodeData(jsonDatas, secrectKey);
        var dataInfo = {
            req: req_string
        };
        log("*********************" + req_string)
        $http({
            method: 'POST',
            url: baseUrl + "reqMachines/",
            data: "req=" + req_string,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            $scope.checkAllInfo = false;
            var jsonData = deCodeData(res);
            if (str == "turnPage" || str == "select") {//当不为翻页时，初始化管理弹框和页面表格

            } else {
                $scope.handleList = [];
                $scope.totalCount = 0;
                countMach = 0;
            }
            jumpLogin(jsonData);
            pageCount = Math.ceil(jsonData.total / 50);
            var resData = handleResult(jsonData, "machines");
            if (notNull(resData)) {
                $scope.pageInfo = pageSelect + " / " + pageCount;
                setCheck(jsonData.machines);
            } else {
                $scope.machineInfo = resData;//当为空时不显示数据
                alert("未搜索到相关数据")
            }
        }, function errorCallback(res) {

            return null;
        })
    }

    function setCheck(list) {
        for (var i = 0; i < list.length; i++) {
            list[i].box = false;
        }
        $scope.machineInfo = initAllCheck(initCheck(list));
        return list;
    }

    function setListCheck(list, str) {
        var listA = [];
        var json = {};
        for (var i = 0; i < list.length; i++) {
            if (notNull(list[i])) {
                json.box = false;
                json.info = list[i];
                listA.push(json)
                json = {};
            }
        }
        if (str == "address") {
            $scope.addressList = listA;
        } else if (str == "version") {
            $scope.versionList = listA;
        } else if (str == "resource") {
            $scope.resourceList = listA;
        } else if (str == "sign") {
            $scope.signList = listA;
        } else if (str == "state") {
            $scope.stateList = listA;
        }
        log(listA)
        return listA;
    }


    $scope.handleList = [];
    $scope.checkAllInfo = false;
    $scope.check = function (id) { // 当所有都选中时
        //            document.getElementById("$index").setAttribute("style", "background:red!important");
        $("#datatable-buttons_filter").css("visibility", "hidden");
        $scope.machineInfo[id].box = !$scope.machineInfo[id].box;
        if ($scope.machineInfo[id].box) {
            $scope.totalCount += 1;
            $scope.handleList.push($scope.machineInfo[id]);
            if (checkCount($scope.machineInfo).length == $scope.machineInfo.length) {
                $scope.checkAllInfo = true;
            }
        } else {
            $scope.totalCount -= 1;
            $scope.handleList = removeListItem($scope.handleList, $scope.machineInfo[id]);
            if (checkCount($scope.machineInfo).length < $scope.machineInfo.length) {
                $scope.checkAllInfo = false;
            }
        }
    };
    // 二级弹框操作
    $scope.handlePopSecond = function (str) {
        var versions;
        if ($scope.titleInfo == "添加标签") {
            if (str == "input") {
                if (checkSign(TimeSheet($scope.signInput), $scope.signList)) {
                    alert("此标签已存在");
                } else {
                    signHandle(1, TimeSheet($scope.signInput), getMids($scope.handleList));
                }
            } else {
                angular.forEach($scope.popList, function (v, k) {
                    if (v.name == $scope.radioVar) {
                        signHandle(4, v.name, getMids($scope.handleList));
                    }
                });
            }
        } else if ($scope.titleInfo == "系统升级") {
            angular.forEach($scope.popList, function (v, k) {
                if (v.name == $scope.radioVar) {
                    versions = v.name;
                    updatePage(1, versions, getMids($scope.handleList));
                }
            });
        } else if ($scope.titleInfo == "资源升级") {
            angular.forEach($scope.popList, function (v, k) {
                if (v.name == $scope.radioVar) {
                    versions = v.name;
                    updatePage(2, versions, getMids($scope.handleList))
                }
            });
        }
    }
    // 如果自定义标签内容为空，就不能点击确认
    $scope.signChange = function () {
        $scope.signInput = $scope.signInput.replace(/\s/g, "");
        if (TimeSheet($scope.signInput) == "") {
            $scope.allowPress = true;
        } else {
            $scope.allowPress = false;
        }
    }
    // 自定义标签弹框
    $scope.addSign = function () {
        $scope.signInput = "";
        $scope.secondPopInput = true;
        $scope.secondPop = true;
        $scope.secondPopAdd = false;
        $scope.allowPress = true;
    }
    // 提取popList的mid
    function getMids(list) {
        var midLists = [];
        angular.forEach(list, function (v, k) {
            midLists.push(v.mid);
        });
        return midLists;
    }

    // 系统资源升级提交
    function updatePage(types, versions, midList) {
        var jsonDatas = {};
        if (types == 1) {
            jsonDatas = {
                type: 1,
                version: versions,
                mids: midList
            }
        } else {
            jsonDatas = {
                type: 2,
                version: versions,
                mids: midList
            }
        }
        var req_string = enCodeData(jsonDatas, secrectKey);
        var dataInfo = {
            req: req_string
        };
        log("*********************" + req_string)
        $http({
            method: 'POST',
            url: baseUrl + "reqMachinesUpload/",
            data: "req=" + req_string,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            var jsonData = deCodeData(res);
            jumpLogin(jsonData);
            var resData = handleResult(jsonData, "code");
            if (resData != null) {
                $scope.secondPop = false;
                $scope.secondPopAdd = false;
                alert($scope.titleInfo + "成功");
            } else {

            }
        }, function errorCallback(res) {


        })
    }

    // 添加标签、资源系统升级
    $scope.secondPopV = function (str) {
        $scope.secondPop = true;
        $scope.secondPopAdd = true;
        $scope.handleDiv = false;
        $scope.secondPopInput = false;
        if (str == "sign") {
            $scope.titleInfo = "添加标签"
            $scope.inputV = true;
            $scope.inputH = false;
            signPopList = $scope.signList;
            $scope.popList = setName(signPopList);
        } else if (str == "server") {
            $scope.titleInfo = "系统升级"
            $scope.inputV = false;
            $scope.inputH = true;
            // 请求系统包列表
            packageList(1);
        } else {
            $scope.titleInfo = "资源升级"
            $scope.inputV = false;
            $scope.inputH = true;
            // 请求资源包列表
            packageList(2);
        }
        if ($scope.handleList.length < 1) {
            // 管理栏没有设备，禁止点击确认
            $scope.allowPress = true;
        } else {
            $scope.allowPress = false;
        }
    }
    // 管理界面，标签操作，添加标签，删除标签
    function signHandle(types, sign, midList) {
        var jsonDatas = {};
        if (types == 1) {
            // 创建标签
            jsonDatas = {
                type: 1,
                tag: sign,
                mids: midList
            }
        } else if (types == 2) {
            // 删除标签
            jsonDatas = {
                type: 2,
                tag: sign
            }
        } else if (types == 3) {
            // 删除标签中设备
            jsonDatas = {
                type: 3,
                tag: sign,
                mids: [midList]
            }
        } else if (types == 4) {
            // 向标签添加设备
            jsonDatas = {
                type: 4,
                tag: sign,
                mids: midList
            }
        }
        log("777777777777777777777777777777")
        log(jsonDatas)
        var req_string = enCodeData(jsonDatas, secrectKey);
        var dataInfo = {
            req: req_string
        };
        log("*********************" + req_string)
        $http({
            method: 'POST',
            url: baseUrl + "reqTagsManagement/",
            data: "req=" + req_string,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            //自定义标签后，重新获取标签列表
            if (types == 1 || types == 2) {
                getSelectList(secrectKey, "sign");
            }
            //删除标签，重新获取列表
            if (types == 2) {
                $scope.machineInfo = [];
                $scope.deleteSignInfo = "我的标签"
            }
            var jsonData = deCodeData(res);
            jumpLogin(jsonData);
            log("77777777777777777777777777777788");
            log(jsonData)
            var resData = handleResult(jsonData, "code");
            if (resData != null) {
                //从stateList中移除删除的标签
                if (types == 2) {
                    $scope.deleteSure = false;
                    angular.forEach($scope.signList, function (v, k) {
                        if (v.info == sign) {
                            $scope.signList = removeListItem($scope.signList, v);
                        }
                    });
                } else if (types == 3) {
                    //从machineInfo中移除删除的设备
                    angular.forEach($scope.machineInfo, function (v, k) {
                        if (v.mid == midList) {
                            $scope.machineInfo = removeListItem($scope.machineInfo, v);
                        }
                    })
                }
                $scope.secondPopInput = false;
                $scope.secondPopAdd = false;
                $scope.secondPop = false;
                alert($scope.titleInfo + "成功");
            } else {

            }
            return jsonData.packages;
        }, function errorCallback(res) {

            return null;
        })
    }

    // 将标签列表字段和升级系统保持统一字段：name
    function setName(list) {
        var listNew = [];
        var json = {};
        angular.forEach(list, function (v, k) {
            json.box = false;
            json.name = v.info;
            listNew.push(json);
            json = {};
        });
        return listNew;
    }

    // 二级弹框隐藏
    $scope.secondPopHidden = function (str) {
        if (str == "back") {
            $scope.secondPop = true;
            $scope.secondPopInput = false;
            $scope.secondPopAdd = true;
            $scope.handleDiv = false;
            if ($scope.handleList.length < 1) {
                $scope.allowPress = true;
            } else {
                $scope.allowPress = false;
            }
        } else {
            $scope.secondPop = false;
            $scope.secondPopInput = false;
            $scope.secondPopAdd = false;
        }
    }
    // 单个搜索
    $scope.selectData = function () {
        if (TimeSheet($scope.search) != "") {
            var jsonDatas = {
                count: 50,
                page: 1,
                condition: {
                    tag: $scope.deleteSignInfo
                },
                search: {
                    type: 1,
                    number: $scope.search
                }
            };
            if (notNull($scope.machineInfo)) {
                machineSave = $scope.machineInfo;//保存原先$scope.machineInfo内容，当搜索框输入信息为空时，显示原先的表格数据
                countMach = checkCount($scope.machineInfo).length;
                IsSelect = true;//当前是当个检索
            }
            getMachineList(jsonDatas, secrectKey, "select");
        }
    }
    // 如果单个搜索框内容为空，不可点击
    $scope.selectChange = function () {
        if (regx.exec($scope.search)) {
            oldSelect = $scope.search;
        } else if ($scope.search == "") {
            if (IsSelect) {
                $scope.machineInfo = machineSave;
            }
            IsSelect = false;
            initCheck($scope.machineInfo);//初始化弹框中存在的数据，并让其显示勾选状态
            initAllCheck($scope.machineInfo);//删除单个搜索框信息之后，初始化表格信息,初始化全选
        } else {
            $scope.search = oldSelect;
        }
    };
    // 点击全选
    $scope.checkAll = function ($event) {
        //$event.stopPropagation();
        $scope.checkAllInfo = !$scope.checkAllInfo;
        angular.forEach($scope.machineInfo, function (v, k) {
            v.box = $scope.checkAllInfo;
            $scope.checkInfo = $scope.checkAllInfo;
            if ($scope.checkAllInfo) {
                $scope.totalCount = $scope.machineInfo.length;
                $scope.handleList = $scope.machineInfo;
            } else {
                $scope.totalCount = 0;
                $scope.handleList = [];
            }
        });
    };
    var addList = [];
    var staList = [];
    var verList = [];
    var siList = [];
    var reList = [];
    // 检索确认
    $scope.submitSelect = function (sub) {
        if (sub == "address") {
            addList = [];
            angular.forEach($scope.addressList, function (v, k) {
                if (v.box) {
                    addList.push(v.info);
                }
            });
            log(addList);
        } else if (sub == "state") {
            staList = [];
            angular.forEach($scope.stateList, function (v, k) {
                if (v.box) {
                    staList.push(v.info);
                }
            });
            log(staList);
        } else if (sub == "version") {
            verList = [];
            angular.forEach($scope.versionList, function (v, k) {
                if (v.box) {
                    verList.push(v.info);
                }
            });
            log(verList);
        } else if (sub == "sign") {
            siList = [];
            angular.forEach($scope.signList, function (v, k) {
                if (v.box) {
                    siList.push(v.info);
                }
            });
            log(siList);
        } else if (sub == "resource") {
            log("1111111111111111111111111111111")
            log($scope.resourceList)

            reList = [];
            angular.forEach($scope.resourceList, function (v, k) {
                if (v.box) {
                    reList.push(v.info);
                }
            });
            log(reList);
        }

        getMachineList(handleParam(1), secrectKey, "all");
    };
    //条件检索，参数处理
    function handleParam(pages) {
        // TODO   选择条件检索，查询数据库
        var jsonDatas = {
            count: 50,
            page: pages
        };
        var josn = {};
        if (addList.length > 0) {
            josn.area = addList;
        }
        if (staList.length > 0) {
            stateParam("在线", "不在线", 1);
            stateParam("活跃", "非活跃", 2);
            stateParam("系统升级中", "系统升级失败", 3);
            stateParam("资源升级中", "资源升级失败", 4);
        }
        function stateParam(str1, str2, id) {
            if (id == 1) {
                if (staList.indexOf(str1) > -1 && staList.indexOf(str2) > -1) {

                } else if (staList.indexOf(str1) > -1) {
                    josn.online = 1;
                } else if (staList.indexOf(str2) > -1) {
                    josn.online = 2;
                }
            } else if (id == 2) {
                if (staList.indexOf(str1) > -1 && staList.indexOf(str2) > -1) {

                } else if (staList.indexOf(str1) > -1) {
                    josn.active = 1;
                } else if (staList.indexOf(str2) > -1) {
                    josn.active = 2;
                }
            } else if (id == 3) {
                if (staList.indexOf(str1) > -1 && staList.indexOf(str2) > -1) {

                } else if (staList.indexOf(str1) > -1) {
                    josn.vod_upload = 1;
                } else if (staList.indexOf(str2) > -1) {
                    josn.vod_upload = 2;
                }
            } else if (id == 4) {
                if (staList.indexOf(str1) > -1 && staList.indexOf(str2) > -1) {

                } else if (staList.indexOf(str1) > -1) {
                    josn.res_upload = 1;
                } else if (staList.indexOf(str2) > -1) {
                    josn.res_upload = 2;
                }
            }

        }

        if (verList.length > 0) {
            josn.vod_version = verList;
        }
        if (siList.length > 0) {
            josn.tag = siList;
        }
        if (reList.length > 0) {
            josn.rec_version = reList;
        }
        if (angular.toJson(josn) !== "{}") {
            jsonDatas.condition = josn;
        }
        return jsonDatas;
    }

    // 管理，一级弹框显示
    // $scope.popSign = function() {
    //   $scope.handleDiv = true;
    // }
    $scope.popSign = function ($event) {
        $event.stopPropagation(); //stopPropagation是目前最常用也是最标准的解决事件冒泡的方法
        $scope.handleDiv = true;
        $('.dropdown-toggle').dropdown();
    };

    function packageList(types) {
        var jsonDatas = {};
        if (types == 1) {
            // 系统
            jsonDatas = {
                type: 1,
                count: 10000,
                status: 1,
                page: 1
            }
        } else {
            // 资源
            jsonDatas = {
                type: 2,
                count: 10000,
                status: 1,
                page: 1
            }
        }
        var req_string = enCodeData(jsonDatas, secrectKey);
        var dataInfo = {
            req: req_string
        };
        log("*********************" + req_string)
        $http({
            method: 'POST',
            url: baseUrl + "reqUploadPackages/",
            data: "req=" + req_string,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            var jsonData = deCodeData(res);
            jumpLogin(jsonData);
            var resData = handleResult(jsonData, "packages");
            if (notNull(resData)) {
                if (types == 1) {
                    resPageList = resData;
                    $scope.popList = resData;
                } else {
                    sysPageList = resData;
                    $scope.popList = resData;
                }
            } else {

            }
            return jsonData.packages;
        }, function errorCallback(res) {

            return null;
        })
    }

    // 管理，一级弹框隐藏
    $scope.hiddenHandle = function () {
        $scope.handleDiv = false;
    }
    // 检索选择
    $scope.selectCheck = function (id, str) {
        if (str == "address") {
            $scope.addressList[id].box = !$scope.addressList[id].box;
        } else if (str == "version") {
            $scope.versionList[id].box = !$scope.versionList[id].box;
        } else if (str == "resource") {
            $scope.resourceList[id].box = !$scope.resourceList[id].box;
        } else if (str == "sign") {
            $scope.signList[id].box = !$scope.signList[id].box;
        } else if (str == "state") {
            $scope.stateList[id].box = !$scope.stateList[id].box;
        }

    };
    // 管理弹框窗口清除元素，对应主页面的元素勾选取消
    $scope.deleteItem = function (id) {
        for (var i = 0; i < $scope.machineInfo.length; i++) {
            if ($scope.machineInfo[i].mid == $scope.handleList[id].mid) {
                $scope.machineInfo[i].box = false;
            }
        }
        $scope.handleList = removeListItem($scope.handleList, $scope.handleList[id]);
        $scope.totalCount -= 1;
        var j = 0;
        angular.forEach($scope.machineInfo, function (v, k) {
            if (!v.box) {
                j += 1
                if (j == $scope.machineInfo.length) {
                    $scope.checkAllInfo = false;
                }
            }
        });
    }
    // body事件监听
    $scope.bodyClick = function () {
        if ($scope.handleDiv) {
            $scope.handleDiv = false;
        }
    }
    // 一级弹框点击事件，阻止事件冒泡
    $scope.popFirstClick = function ($event) {
        $event.stopPropagation(); //stopPropagation是目前最常用也是最标准的解决事件冒泡的方法
        //你自己的代码
    };
    //    退出登录
    $scope.logout = function () {
        $http({
            method: 'POST',
            url: baseUrl + "logout/",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(res) {
            var jsonData = deCodeData(res);
            jumpLogin(jsonData);
            if (jsonData.info_code == "10000") {
                localStorage.removeItem('secrectKey')
                localStorage.removeItem('nickName')
                window.location.href = "login.html";
            }
        }, function errorCallback(res) {

        })
    }
    //    控制log
    function log(str) {
        if (IsOpen) {
            console.log(str)
        }
    }

    //   控制用户，非法用户跳回登录页面
    function jumpLogin(jsonData) {
        if (jsonData.info_code == "10001") {
            window.location.href = "/static/login.html";
            return;
        }
    }
});
