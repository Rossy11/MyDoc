/**
 * Created by Administrator on 2017/5/25 0025.
 */
//将活动版submid转化为mid集合
function updataMidS(list, length) {
    var listStr = [];
    var midList = [];
    for (var j = 0; j < list.length; j++) {
        listStr = list[j].submid.split(":");
        midList.push(list[j].mid);
        for (var i = 0; i < listStr.length; i++) {
            midList.push((Array(length).join('0') + listStr[i]).slice(-length));
        }
    }
    return midList;
}

//检索列表中有多少被选中
function checkCount(list) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].box) {
            newList.push(list[i]);
        }
    }
    return newList;
}
//让一级弹框中有的

//重组一级弹框列表
function setHandleList(machineInfo, list) {
    for (var i = 0; i < machineInfo.length; i++) {
        for (var j = 0; j < list.length; j++) {
            if (machineInfo[i].mid = list[j].mid) {
                list.splice(j, 1);
            }
        }
    }
    for (var n = 0; n < machineInfo.length; n++) {
        if (machineInfo[n].box) {
            list.push(machineInfo[n]);
        }
    }
    return list;
}
//移除现有显示的list
function removeNow(MachList, handleList) {
    for (var i = 0; i < MachList.length; i++) {
        for (var j = 0; j < handleList.length; j++) {
            if (MachList[i].mid == handleList[j].mid) {
                handleList.splice(j, 1);
            }
        }
    }
    return handleList;
}
//添加标签过滤
function checkSign(str, list) {
    var sign = false;
    for (var i = 0; i < list.length; i++) {
        if (str == list[i].info) {
            sign = true;
            return sign;
        } else {
            sign = false;
        }
    }
    return sign;
}
//去空格
function TimeSheet(str) {
    return str.replace(/\s/g, "");
}

//加密请求参数
function enCodeData(jsonDatas, secrectKey) {
    // var jsonData = JSON.stringify(jsonDatas);
    // var base = new Base64();
    // var base64 = base.encode(jsonData).replace("=", "-");
    // var sign = CryptoJS.HmacSHA1(base64, secrectKey);
    //
    // console.log(sign)
    // var req_string = base64 + ":" + sign;
    // return req_string;

    return JSON.stringify(jsonDatas);
}
//解密请求数据
function deCodeData(res) {
    // var jsonBase64 = res.data.split(":")[0];
    // var base = new Base64();
    // var data = JSON.parse(base.decode(jsonBase64));
    // return data;
    return res.data;
}
//移除list指定元素
function removeListItem(list, item) {
    var newList = [];
    for (var i = 0; i < list.length; i++) {
        if (item.mid == list[i].mid) {

        } else {
            newList.push(list[i])
        }
    }
    return newList;
}
function setHeight(table_allId, x_panelId, nav_menuId) {
    var height = document.body.scrollHeight;
    var x_panel = $("#" + x_panelId).outerHeight(true);
    var nav_menu = $("#" + nav_menuId).outerHeight(true);
    var setH = height - x_panel - nav_menu - 140;
    if (setH > 640) {
        $("#" + table_allId).height(setH + 1);
    } else {
        $("#" + table_allId).height(640);
    }
}


// 对请求得到的数据进行处理
function handleResult(res, str) {
    if (res.info_code == "10000") {
        if (str == "result") {
            return res.result;
        } else if (str == "machines") {
            return res.machines;
        } else if (str == "code") {
            return "";
        } else if (str == "packages") {
            return res.packages;
        }
    } else if (res.info_code == "10001") {
        // alert("非法身份")
        return null;
    } else if (res.info_code == "10002") {
        // alert("用户名或密码有误")
        return null;
    } else if (res.info_code == "10003") {
        // alert("参数有误")
        return null;
    } else if (res.info_code == "10004") {
        // alert("查询结果为空")
        return null;
    } else if (res.info_code == "10005") {
        // alert("未知错误")
        return null;
    }
}
//判断非空，长度不为0
function notNull(res) {
    if (res != null && res != "" && res != undefined && res != "null" && res.length > 0) {
        return true;
    } else {
        return false;
    }
}


function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

}
