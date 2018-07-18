/**
 * Created by Administrator on 2017/6/13 0013.
 */
var resV, resA, resP, id;
var baseUrl = "http://180.97.83.70:30990/";
var successNum = 0;	//已上传成功的数目
var submitBtn = $("#submit");
var progressNum = $("#progressNum");
var progress = $("#progress");
var reSubmit = $("#reSubmit");
var hint = $("#hint");
var hints = $("#hints");
var IsLog = false;
var id = localStorage.getItem("activity_id");
console.log(id+"====")
var name = "";
var vote_score = "";
var rpP = "", rpA = "", rpV = "";
var resVSave = null, resPSave = null, resASave = null;
//localStorage.removeItem('activity_id');
$.ajax({
    url: baseUrl + "KV3Activity/queryActivityInfo/",
    type: 'POST',
    async: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 1000,
    success: function (resp) {
        Islog(resp)
        var data = JSON.parse(resp).info;
        // console.log(data)
        for (var i = 0; i < data.length; i++) {
            if (data[i].activity_id == id) {
                if (notNull(data[i].phone_ad)) {
                    rpP = data[i].phone_ad;
                } else {
                    rpP = "";
                }
                if (notNull(data[i].start_video)) {
                    rpV = data[i].start_video;
                } else {
                    rpV = "";
                }
                if (notNull(data[i].scene_ad)) {
                    rpA = data[i].scene_ad;
                } else {
                    rpA = "";
                }
                console.log("5555555555555")
                console.log(data)
                console.log(data[i])
                name = data[i].activity_name;
                console.log(id + "------" + name)
                vote_score = data[i].vote_score;
                voteScoreLeft = parseInt(vote_score) / 1000 * widthS - 7;
                $("#scoreVoteS").css("left", voteScoreLeft + "px");
                $("#voteScore").html(vote_score + "分");
                $("#rangeVoteS").width(parseInt(vote_score) / 10 + '%');
                var saveP = localStorage.getItem("resPName");
                var saveA = localStorage.getItem("resAName");
                var saveV = localStorage.getItem("resVName");
                console.log("44444")
                console.log(saveV)
                if (notNull(saveV)) {
                    setName("resV", saveV.name);
                    resV = saveV;
                    resVSave = saveV;
                } else {
                    setName("resV", rpV);
                }
                if (notNull(saveA)) {
                    setName("resA", saveA.name);
                    resA = saveA;
                    resASave = saveA;
                } else {
                    setName("resA", rpA);
                }
                if (notNull(saveP)) {
                    setName("resP", saveP.name);
                    resP = saveP;
                    resPSave = saveP;
                } else {
                    setName("resP", rpP);
                }
            }
            //setName("chooseP", "替换广告图");
            //setName("chooseA", "替换广告图");
            //setName("chooseV", "替换文件");
        }
    },
    error: function (resp) {

    }
});
//选择文件点击了
function press(str) {
    if (str == "a") {
        setName("resA", rpA);
    } else if (str == "p") {
        setName("resP", rpP);
    } else if (str == "v") {
        setName("resV", rpV);
    } else if (str == "aNull") {
        document.getElementById('fileAvn').value = "";
    } else if (str == "pNull") {
        document.getElementById('filePho').value = "";
    } else if (str == "vNull") {
        document.getElementById('fileVideo').value = "";
    }
}
// console.log(id+"------"+name)
//判断图片尺寸是否正确
function IsOKImg(id) {
    var resFile, resId;
    var _URL = window.URL || window.webkitURL;
    var file, img;
    if (id == "P") {
        resFile = resP[0];
        resId = $("#resP");
        if ((file = resFile)) {
            img = new Image();
            img.onload = function () {
                if (this.width == 750 && this.height == 511) {
                    rpP = resFile.name;//保存名字
                    resPSave = resP[0];//保存文件内容
                    resId.text(rpP);
                    return true
                } else {
                    alert("请上传750*511的图片");
                    return false;
                }
            };
            img.src = _URL.createObjectURL(file);
        }
    } else if (id == "A") {
        resFile = resA[0];
        resId = $("#resA");
        if ((file = resFile)) {
            Islog(111111111)
            img = new Image();
            img.onload = function () {
                Islog(2222222)
                if (this.width == 1292 && this.height == 1080) {
                    rpA = resFile.name;//保存名字
                    resASave = resA[0];//保存文件内容
                    resId.text(rpA);
                    return true
                } else {
                    alert("请上传1292*1080的图片")
                    return false;
                }
            };
            img.src = _URL.createObjectURL(file);
        }
        Islog(44444444444444)
    }
}
//判断文件是否符合大小
function IsOKSize(id) {
    if (id == "A") {
        if (getSize(resA[0], "MB") > 10) {
            alert("现场大屏主赞助商图过大，请重新上传");
            return false;
        } else {
            return true;
        }
        // return true;
    } else if (id == "P") {
        if (getSize(resP[0], "MB") > 10) {
            alert("手机端投票广告图过大，请重新上传");
            return false;
        } else {
            return true;
        }
        // return true;
    } else if (id == "V") {
        Islog(resV)
        if (getSize(resV[0], "MB") > 100) {
            alert("开场循环播放视频不能超过100M，请重新上传");
            return false;
        } else {
            rpV = resV[0].name;//保存名字
            resVSave = resV[0];//保存文件内容
            return true;
        }
    }
}
//保存文件
function upload(file, str) {
    if (file.files.length > 0) {
        if (str == "a") {
            resA = file.files;
            if (IsTrueFormat("img", resA[0].name) && IsOKSize("A") && IsOKImg("A")) {
                localStorage.setItem("resAName", resV[0]);
                //setName("resA", resA[0].name);
            } else {
                setName("resA", rpA);
            }
        } else if (str == "p") {
            resP = file.files;
            if (IsTrueFormat("img", resP[0].name) && IsOKSize("P") && IsOKImg("P")) {
                localStorage.setItem("resPName", resP[0]);
                //setName("resP", resP[0].name);
            } else {
                setName("resP", rpP);
            }
        } else if (str == "v") {
            resV = file.files;
            if (IsTrueFormat("video", resV[0].name) && IsOKSize("V")) {
                localStorage.setItem("resVName", resV[0]);
                setName("resV", resV[0].name);
            } else {
                setName("resV", rpV);
            }
        }
    }
}


//获取input图片宽高和大小
function getImageWidthAndHeight(id, callback) {
    var _URL = window.URL || window.webkitURL;
    $("#" + id).change(function (e) {
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function () {
                callback && callback({"width": this.width, "height": this.height, "filesize": file.size});
            };
            img.src = _URL.createObjectURL(file);
        }
    });
}

//获取文件大小
function getSize(file, str) {
    if (str == "KB") {
        return file.size / 1024;
    } else if (str == "MB") {
        return file.size / (1024 * 1024);
    }
}
//获取判断文件格式是否正确
function IsTrueFormat(format, name) {
    if (format == "video") {
        if (getName("mp4", name) || getName("MP4", name)) {
            return true;
        } else {
            alert("你上传的视频格式不正确，请重新上传！")
            return false;
        }
        //return true;
    } else if (format == "img") {
        if (getName("PNG", name) || getName("png", name) || getName("JPG", name) || getName("jpg", name)) {
            return true;
        } else {
            alert("你上传的图片格式不正确，请重新上传！")
            return false;
        }
    }
}
//获取文件格式
function getName(format, name) {
    if (name.indexOf(format) > -1) {
        return true;
    } else {
        return false;
    }
}
//设置文字
function setName(id, str) {
    $("#" + id).text(str);
}

//通过文件名，返回文件的后缀名
function fileType(name) {
    var nameArr = name.split(".");
    return nameArr[nameArr.length - 1].toLowerCase();
}

//不为空
function notNull(key) {
    if (key != undefined && key != "" && key != null && key.length != 0) {
        return true;
    } else {
        return false;
    }
}
//判断文件是否上传过
function Ischange(id, data) {
    if (id == "V") {
        // if ($("#res" + id).text() == data && (!notNull(resV) || (resV.length < 1))) {
        //     return false;
        // } else {
        //     return true;
        // }
        if ((!notNull(resVSave) || (resVSave.length < 1))) {
            return false;
        } else {
            return true;
        }
    } else if (id == "A") {
        // if ($("#res" + id).text() == data && (!notNull(resA) || (resA.length < 1))) {
        //     return false;
        // } else {
        //     return true;
        // }
        if ((!notNull(resASave) || (resASave.length < 1))) {
            return false;
        } else {
            return true;
        }
    } else if (id == "P") {
        if ((!notNull(resPSave) || (resPSave.length < 1))) {
            return false;
        } else {
            return true;
        }
    }

}
//提交文件
function submit() {
    var formData = new FormData();
    if (!Ischange("V", rpV) && !Ischange("A", rpA) && !Ischange("P", rpP)) {
        alert("请上传文件");
        return;
    }

    // if ((!notNull(resVSave) || (resVSave.length < 1))) {
    //     alert("请上传开场循环播放视频");
    //     return;
    // }
    // if ((!notNull(resASave) || (resASave.length < 1))) {
    //     alert("请上传现场大屏主赞助商图");
    //     return;
    // }
    // if ((!notNull(resPSave) || (resPSave.length < 1))) {
    //     alert("请上传手机端投票广告图");
    //     return;
    // }
    if (!notNull(rpV)) {
        alert("请上传开场循环播放视频");
        return false;
    }
    if (!notNull(rpA)) {
        alert("请上传现场大屏主赞助商图");
        return false;
    }
    if (!notNull(rpP)) {
        alert("请上传手机端投票广告图");
        return false;
    }

    if (notNull(resPSave) && resPSave.length > 0) {
        formData.append("phone_ad", resPSave);
    }
    if (notNull(resA) && resA.length > 0) {
        formData.append("scene_ad", resASave);
    }
    if (notNull(resV) && resV.length > 0) {
        formData.append("start_video", resVSave);
    }
    formData.append("activity_id", id);
    formData.append("activity_name", name);
    $('#pop').css('visibility', 'visible');
    var request = $.ajax({
        type: "POST",
        url: "http://180.97.83.70:30990/KV3Activity/upload/",
        data: formData,			//这里上传的数据使用了formData 对象
        processData: false, 	//必须false才会自动加上正确的Content-Type
        contentType: false,
        //这里我们先拿到jQuery产生的XMLHttpRequest对象，为其增加 progress 事件绑定，然后再返回交给ajax使用
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            if (onprogress && xhr.upload) {
                xhr.upload.addEventListener("progress", onprogress, false);
                return xhr;
            }
        },

        //上传成功后回调
        success: function (re) {
            //$('#pop').css('visibility', 'visible');
            //oOperation.text("成功");
            successNum++;
            hint.text("成功");
            hints.text("提交成功！");
            Islog("成功");
            Islog(re);
            Islog(successNum);
            //if (successNum == tr.length) {
            //open("http://www.baidu.com","_self");	//如果全部传成功了，跳转
            // }
        },

        //上传失败后回调
        error: function () {
            hint.text("失败");
            hints.text("提交失败！");
            request.abort();
            //reSubmit.on("click", function () {
            //   request.abort();		//终止本次
            // submit();
            //});
        }
    });
    //侦查附件上传情况 ,这个方法大概0.05-0.1秒执行一次
    function onprogress(evt) {
        var loaded = evt.loaded;	//已经上传大小情况
        var tot = evt.total;		//附件总大小
        var per = Math.floor(100 * loaded / tot);  //已经上传的百分比
        progressNum.html(per + "%");
        progress.css("width", per + "%");
    }
}
//控制打印
function Islog(str) {
    if (IsLog) {
        console.log(str);
    }
}
$("#submitScore").mousedown(function () {
    $("#submitScore").css("background", "#c8ddff");
});
$("#submitScore").mouseup(function () {
    $("#submitScore").css("background", "#3C84FC");
});
$("#submit").mousedown(function () {
    $("#submit").css("background", "#c8ddff");
});
$("#submit").mouseup(function () {
    $("#submit").css("background", "#3C84FC");
});
//提交比赛难度比分信息
function submitScore() {
    console.log(id + "------" + name)
    $.ajax({
        type: "POST",
        url: "http://180.97.83.70:30990/KV3Activity/uploadScoreAndVoteRate/",
        data: {
            activity_id: id,
            activity_name: name,
            song_rate: songScore,
            vote_score: voteScore
        },
        dataType: 'json',
        success: function (resp) {
            if (resp.info_code == 10000) {
                $("#hintScore").html("提交成功！");
                $('#hintScore').css('color', '#3C84FC');
            } else {
                $("#hintScore").html("提交失败！");
                $('#hintScore').css('color', '#FF0000');
            }
        },
        error: function (resp) {

        }
    });
}
var songScore = 0;//歌曲评分占比
var voteScore = 0;//每票所占分数
var songScoreLeft = -4;//歌曲左边距离
var voteScoreLeft = -4;//每票左边距离
var songLeft = 4;//初始时歌曲占比距离左边距离
var voteLeft = 4;//初始时每票占比距离左边距离
//自定义滑动条
var widthF = $("#rangeWidthF").width();//第一个滑动条的长度
var widthS = $("#rangeWidth").width();//第二个滑动条的长度
var scoreVote = document.getElementById("scoreVoteS");//第二个滑动条
scoreVote.onmousedown = function (en) {
    setRange(en, "scoreVoteS", 1000);
    return false;//阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
}
// var scoreVote = document.getElementById("scoreSongF");//第一个滑动条
// scoreVote.onmousedown = function (en) {
//     setRange(en, "scoreSongF", 100);
//     return false;//阻止默认行为（如果页面中有文字，则会默认拖动文字），ie8及一下不行
// }
//自定义滑动条设置
function setRange(en, id, percentS) {

    var oDiv = document.getElementById(id);
    var ev = ev || event;
    var disX = en.clientX - oDiv.offsetLeft;
    //var disY = en.clientY - oDiv.offsetTop;
    if (oDiv.setCapture) {
        oDiv.setCapture();
    }

    document.onmousemove = function (en) {
        var ev = ev || event;
        var left = en.clientX - disX;
        if (left < 0) {
            left = 0;
        } else if (left > widthS) {
            left = widthS;
        }
        oDiv.style.left = left + 'px';

        if (percentS == 100) {
            songScore = parseInt((left + songLeft) * 100 / widthF);
            songScoreLeft = left;
            $("#rangeSong").html(songScore + "%");
            $("#rangeVote").html(100 - parseInt((left + songLeft) * 100 / widthF) + "%");
            $("#rangeSongF").width((left + songLeft) * 100 / widthF + '%');
        } else if (percentS == 1000) {
            voteScore = parseInt((left ) * 1000 / widthS);
            voteScoreLeft = left;
            $("#voteScore").html(voteScore + "分");
            $("#rangeVoteS").width((left) * 100 / widthS + '%');
        }
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        if (oDiv.releaseCapture) {
            oDiv.releaseCapture()
        }
    }
}
//歌曲占比左右键监听
function songKeyDown(event) {
    var numPer = parseInt($("#rangeSong").text().replace("%", ""));
    if (event.keyCode == 37 && songScoreLeft >= (widthF / 100 - songLeft)) {//左
        if (songScoreLeft >= (widthF / 100 - songLeft)) {
            songScoreLeft = (numPer - 1) * widthF / 100 - songLeft;
            songScore = numPer - 1;
        }
        $("#rangeSong").html(songScore + "%");
        $("#rangeVote").html(100 - songScore + "%");
        $("#rangeSongF").width(songScore + '%');
        $("#scoreSongF").css("left", songScoreLeft + "px");
    } else if (event.keyCode == 39 && songScoreLeft <= widthF - songLeft) {//右
        if (songScoreLeft <= widthF - widthF / 100 - songLeft) {
            songScoreLeft = (numPer + 1) * widthF / 100 - songLeft;
            songScore = numPer + 1;
        }
        $("#rangeSong").html(songScore + "%");
        $("#rangeVote").html(100 - songScore + "%");
        $("#rangeSongF").width(songScore + '%');
        $("#scoreSongF").css("left", songScoreLeft + "px");
    }
}
//每票占比左右键监听
function voteKeyDown(event) {
    var numPer = parseInt($("#voteScore").text().replace("分", ""));
    if (event.keyCode == 37 && voteScoreLeft >= (widthS / 1000 )) {//左
        if (voteScoreLeft >= (widthS / 1000 - songLeft)) {
            voteScoreLeft = (numPer - 1) * widthS / 1000;
            voteScore = numPer - 1;
            $("#voteScore").html(voteScore + "分");
            $("#rangeVoteS").width(voteScore / 10 + '%');
            $("#scoreVoteS").css("left", voteScoreLeft + "px");
        }
    } else if (event.keyCode == 39 && voteScoreLeft <= widthS) {//右
        if (voteScoreLeft <= (widthS - widthS / 1000)) {
            voteScoreLeft = (numPer + 1) * widthS / 1000;
            voteScore = numPer + 1;
            $("#voteScore").html(voteScore + "分");
            $("#rangeVoteS").width(voteScore / 10 + '%');
            $("#scoreVoteS").css("left", voteScoreLeft + "px");
        }
    }
}


//绑定设备
var mid1 = $("#mid_mashine1");
var mid2 = $("#mid_mashine2");
var mid3 = $("#mid_mashine3");
var mid4 = $("#mid_mashine4");
var mid5 = "";
var arr = [];
$.ajax({
    type: "POST",
    url: "http://180.97.83.70:30990/KV3Activity/queryActivityInfo/",
    dataType: "json",
    success: function (resp) {
        // console.log(resp.info[1].submid);
        mid5 = resp.info[1].submid;
        arr = mid5.split(":");
        console.log(arr);
        $("#mid_mashine1").html("MID" + arr[0]);
        $("#mid_mashine2").html("MID" + arr[1]);
        $("#mid_mashine3").html("MID" + arr[2]);
        $("#mid_mashine4").html("MID" + arr[3]);
    },
    error: function (resp) {
    }
});
//拖拽效果
function submitMid() {
    var midA = $('#mid_mashine1').offset().top;
    var midB = $('#mid_mashine2').offset().top;
    var midC = $('#mid_mashine3').offset().top;
    var midD = $('#mid_mashine4').offset().top;
    var midList = [];
    midList.push(midA);
    midList.push(midB);
    midList.push(midC);
    midList.push(midD);
    midList.sort();
    var idA = midList.indexOf(midA);
    var idB = midList.indexOf(midB);
    var idC = midList.indexOf(midC);
    var idD = midList.indexOf(midD);
    var strA = $('#mid_mashine1').text().substring(3) + ":";
    var strB = $('#mid_mashine2').text().substring(3) + ":";
    var strC = $('#mid_mashine3').text().substring(3) + ":";
    var strD = $('#mid_mashine4').text().substring(3) + ":";
    // console.log(strA + "------" + $('#mid_mashine1').val())
    var strMid = [-1, -1, -1, -1];
    strMid[idA] = strA;
    strMid[idB] = strB;
    strMid[idC] = strC;
    strMid[idD] = strD;
    var submid = "";
    for (var i = 0; i < strMid.length; i++) {
        // console.log(strMid)
        submid += strMid[i];
    }
    submid = submid.substring(0, submid.length - 1);
    $.ajax({
        type: "POST",
        url: "http://180.97.83.70:30990/KV3Activity/uploadMachinesSorting/",
        dataType: "json",
        data: {
            activity_id: id,
            submid:submid
        },
        success: function (resp) {
            // console.log(resp);
            $("#jdt7").html("提交成功！");
            $('#jdt7').css('color', '#3C84FC');

        },
        error: function (resp) {
            $("#jdt7").html("请重新提交！");
            $('#jdt7').css('color', '#FF0000');
        }
    });
}






