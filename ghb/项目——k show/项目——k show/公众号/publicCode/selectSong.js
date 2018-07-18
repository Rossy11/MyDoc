/**
 * Created by Administrator on 2017/6/7 0007.
 */
var baseUrl = "https://k3-mobile.leyecloud.com/xcx/wx_gzh_require.php";
var timeOut = 10000;//调用接口超时时间
var playerList;//歌曲集合
var pagecntLoad = 1;
var selectStr = "";
//搜索歌曲每次请求个数
var pagecnt = 20;
//热歌榜每次请求个数
var hotCount = 20;
var simpleLoad = true;//让请求状态和获取歌曲信息实现单个请求
var eventkey;
var nickname;
var codenickname;
var avatarUrl;
var gender;
var province;
var city;
var country;
var openid;
var unionid;
var startCount = 0;
var hotstartCount = 0;
var isSingUp = false;//是否报名了
var inputxt = "";//记录搜索的信息
var chooseSongID = "";
var chooseSongSong = "";
var chooseSongSinger = "";
var statuseSelect = -2;//记录搜索歌曲的状态
var HotHtml = "";
var HotC = -1;
var isHot = true;//是否加载的是热歌榜
var selectH = $("#selectBack").outerHeight(true);
var applyH = $("#applyPop").outerHeight(true);
var matchH = $("#matchSongAll").outerHeight(true);
var height = document.body.scrollHeight;
var width = document.body.scrollWidth;
var scroll = $("#songList");
var htmlList = "";
// $("#all").width(width);
// $("#all").height(height);
$("#songList").height(height - selectH - 150);
$("#songListDiv").height(height - selectH - 100);
var urlData = location.href;
var idStr = urlData.split("id=")[1];
var lastIndex = idStr.indexOf("&");
eventkey = decodeURIComponent(idStr.substring(0, lastIndex));
var dataList = urlData.split("&");
nickname = decodeURIComponent(dataList[1].substring(9));
codenickname = dataList[1].substring(9);
avatarUrl = dataList[2].substring(10);
gender = dataList[3].substring(7);
province = decodeURIComponent(dataList[4].substring(9));
city = decodeURIComponent(dataList[5].substring(5));
country = decodeURIComponent(dataList[6].substring(8));
openid = dataList[7].substring(7);
unionid = dataList[8].substring(8);
$('#songListDiv').html('<div class="songList" id="songList"></div>');
$("#songList").html("");
var hotListSave = "";//保存热歌榜信息
setData();
//加载数据显示页面
function UIKitShowLoadingView() {
    $('#UIKitLoadingView').css('visibility', 'visible').css('opacity', 1);

}
//加载数据隐藏页面
function UIKitHideLoadingView() {
    $('#UIKitLoadingView').css('opacity', 0).css('visibility', 'hidden');
}
function setData() {
    //var urlData = "https://k3-mobile.leyecloud.com/xcx/KShowVote.html?id=KSA1&nickname=%s&avatarUrl=%s&gender=%s&province=%s&city=%s&country=%s&openid=111&unionid=oTPjG09nJu70K54-bT7xoARnsrsQ";
    applyState();
    pushHistory();
    window.addEventListener("popstate", function (e) {
        if (hotListSave != "") {
            setHotList(hotListSave);
            $("#selectSongInput").val("");
            pushHistory();
        } else {
            //HotSongList();
        }
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
}
//点击搜索键
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        seek();
        $('#selectSongInput').blur();
    }
});


function seek() {
    selectStr = document.getElementById("selectSongInput").value.trim();
    if (selectStr != "") {
        inputxt = selectStr;
        getImg(selectStr, 1, pagecnt);
    }
}

//获取报名状态
function applyState(id, songname, singername) {
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {
            func: "playerinfo",
            eventkey: eventkey,
            unionid: unionid
        },
        async: true,
        timeout: timeOut,
        success: function (resp) {
            var resp = JSON.parse(resp);
            //UIKitHideLoadingView();
            HotSongList();
            if (resp.is_signup == 1) {
                //跳转选择歌曲页面
                isSingUp = true;
                state = 1;
                $("#applyPop").css("display", "block");
                //$("#songList").height(height - applyH - selectH - matchH - 200);
                $("#songList").height(height - selectH - 150 - applyH);
                $("#songListDiv").height(height - selectH - 100 - applyH);
                $("#songNameP").text(resp.song_name);
                $("#singerNameP").text(resp.singer_names);
            } else if (resp.is_signup == -1) {
                //$("#songList").height(height - selectH - matchH - 200);
                //TODO
                $("#chooseSong").css("visibility", "hidden");
                $("#error").text("当前不支持报名");//活动还未开始
                $('#applyOver').css('visibility', 'visible');
            }
            if (resp.is_signup != -1) {
                if (id != undefined && id != "") {
                    signUp(id, songname, singername);
                }
            }
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
//当前不支持报名提示框
function hiddenPopOver() {
    $("#applyOver").css("visibility", "hidden");
}
//阻止事件冒泡，弹框提示语不隐藏弹框
function hiddenPopOverTitle($event) {
    $event.stopPropagation();
}

//不为空
function notNull(key) {
    if (key != undefined && key != "" && key != null && key.length != 0) {
        return true;
    } else {
        return false;
    }
}
//搜索歌曲
function getImg(str, page, pagecnt) {
    isHot = false;
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {func: "searchsong", content: str, page: page, pagecnt: pagecnt},
        async: true,
        timeout: timeOut,
        success: function (resp) {
            $('#songListDiv').html('<div class="songList" id="songList"></div>');
            $("#songList").html("");
            playerList = JSON.parse(resp).result;
            if (notNull(playerList)) {
                startCount = 0;
                startCount = playerList.length;
                var songID = "";
                var html = "";
                var name = "";
                $('#songListDiv').html('<div class="songList" id="songList"></div>');
                $("#songList").html("");
                for (var i = 1; i < playerList.length + 1; i++) {
                    songID = playerList[i - 1].songid;
                    name = playerList[i - 1].song_name + "*" + playerList[i - 1].singernames;
                    html += '<div class="songItem"  onclick="choose(\'' + songID + '*' + name + '\')"><div class="SongCode">' + i + '</div><div class="singerInfo"><div class="songName">' + playerList[i - 1].song_name + '</div><div class="singerName">' + playerList[i - 1].singernames + '</div></div><div class="songImgDiv centerAll"><div class="songImg"></div></div></div><div class="greyLine"></div>';
                }
                htmlList = "";
                htmlList += html;
                $("#songList").html(html);
            }
            UIKitHideLoadingView();
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
// dropload
var dropload = $('#songListDiv').dropload({
    domDown: {
        domClass: 'dropload-down',
        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        domUpdate: '<div class="dropload-update">↓释放加载</div>',
        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
    },
    loadDownFn: function (me) {
        simpleLoad = false;
        // if (isSingUp) {
        //     $("#songList").height(height - selectH - matchH - applyH - 60);
        // } else {
        //     $("#songList").height(height - selectH - matchH - 60);
        // }
        pagecntLoad += 1;
        var url = "";
        var data;
        if (isHot) {
            data = {
                needrecord: 0,
                Type: 1,
                func: "require_hotsonginfo",
                indexend: hotCount * pagecntLoad - 1,
                indexpre: hotCount * (pagecntLoad - 1)
            };
            url = "https://k3-mobile.leyecloud.com/xcx/handle_data_app.php";
        } else {
            url = baseUrl;
            data = {func: "searchsong", content: selectStr, page: pagecntLoad, pagecnt: pagecnt};
        }

        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            async: true,
            timeout: timeOut,
            success: function (resp) {
                statuseSelect = -2;
                // if (isSingUp) {
                //     $("#songList").height(height - selectH - matchH - applyH - 100 - 60);
                // } else {
                //     $("#songList").height(height - selectH - matchH - 100 - 60);
                // }
                if (isHot) {
                    var player = JSON.parse(resp);
                    playerList = [];
                    var len = getJsonObjLength(player);
                    for (var j = 0; j < len; j++) {
                        playerList.push(player[j]);
                    }
                } else {
                    statuseSelect = JSON.parse(resp).status;
                    playerList = JSON.parse(resp).result;
                }
                if (notNull(playerList)) {
                    var html = "";
                    var songID = "";
                    var name = "";
                    for (var i = 1; i < playerList.length + 1; i++) {
                        startCount += 1;
                        songID = playerList[i - 1].songid;
                        if (isHot) {
                            name = playerList[i - 1].songname + "*" + playerList[i - 1].singername;
                            html += '<div class="songItem" id="' + startCount + '" onclick="choose(\'' + songID + '*' + name + '\')"><div class="SongCode">' + startCount + '</div><div class="singerInfo"><div class="songName">' + playerList[i - 1].songname + '</div><div class="singerName">' + playerList[i - 1].singername + '</div></div><div class="songImgDiv centerAll"><div class="songImg"></div></div></div><div class="greyLine"></div>';
                        } else {
                            name = playerList[i - 1].song_name + "*" + playerList[i - 1].singernames;
                            html += '<div class="songItem" onclick="choose(\'' + songID + '*' + name + '\')"><div class="SongCode">' + startCount + '</div><div class="singerInfo"><div class="songName">' + playerList[i - 1].song_name + '</div><div class="singerName">' + playerList[i - 1].singernames + '</div></div><div class="songImgDiv centerAll"><div class="songImg"></div></div></div><div class="greyLine"></div>';
                        }
                    }
                    htmlList += html;
                    // 为了测试，延迟1秒加载
                    setTimeout(function () {
                        $('.songListDiv').append(html);
                        me.resetload();
                        simpleLoad = true;
                    }, 1000);
                } else if (statuseSelect == -1) {
                    // 为了测试，延迟1秒加载
                    setTimeout(function () {
                        $('.songListDiv').append("");
                        me.resetload();
                        simpleLoad = true;
                    }, 1000);
                }
                UIKitHideLoadingView();
            },
            error: function (resp) {
                UIKitHideLoadingView();
                //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
            }
        });
    }
});
//Json对象长度
function getJsonObjLength(jsonObj) {
    var Length = 0;
    for (var item in jsonObj) {
        Length++;
    }
    return Length;
}
//获取热歌榜
function HotSongList() {
    // $('#songListDiv').html('<div class="songList" id="songList"></div>');
    // $("#songList").html("");
    var baseUrl = "https://k3-mobile.leyecloud.com/xcx/handle_data_app.php";
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {
            needrecord: 0,//0，不需要录音，1需要录音
            Type: 1,
            func: "require_hotsonginfo",
            indexend: hotCount - 1,
            indexpre: 0
        },
        async: true,
        timeout: timeOut,
        success: function (resp) {
            setHotList(resp);
            UIKitHideLoadingView();
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
//热歌榜列表信息
function setHotList(resp) {
    $('#songListDiv').html('<div class="songList" id="songList"></div>');
    $("#songList").html("");
    hotListSave = resp;
    $("#matchSongAll").css('display', 'block');
    var player = JSON.parse(resp);
    var playerList = [];
    var len = getJsonObjLength(player);
    for (var j = 0; j < len; j++) {
        playerList.push(player[j]);
    }
    startCount = 0;
    startCount = playerList.length;
    if (notNull(playerList)) {
        var html = "";
        var htmlNew = "";
        var songID = "";
        var name = "";
        $('#songListDiv').html('<div class="songList" id="songList"></div>');
        $("#songList").html("");
        for (var i = 1; i < playerList.length + 1; i++) {
            songID = playerList[i - 1].songid;
            name = playerList[i - 1].songname + "*" + playerList[i - 1].singername;
            html += '<div class="songItem" onclick="choose(\'' + songID + '*' + name + '\')"><div class="SongCode">' + i + '</div><div class="singerInfo"><div class="songName">' + playerList[i - 1].songname + '</div><div class="singerName">' + playerList[i - 1].singername + '</div></div><div class="songImgDiv centerAll"><div class="songImg"></div></div></div><div class="greyLine"></div>';
        }
        htmlList += html;
        HotC = playerList.length;
        $("#songList").html(html);
    }
}
//取消
function cancel() {
    $('#chooseSong').css('visibility', 'hidden');
}

function hiddenPop() {
    $('#apply').css('visibility', 'hidden');
    $('#chooseSong').css('visibility', 'hidden');
}
//确定
function sure() {
    applyState(chooseSongID, chooseSongSong, chooseSongSinger);
    //signUp(chooseSongID, chooseSongSong, chooseSongSinger);
}
//报名参赛
function choose(idStr) {
    if (simpleLoad) {
        var id = idStr.split("*")[0];
        var songname = idStr.split("*")[1];
        var singername = idStr.split("*")[2];
        if (isSingUp) {
            $("#songSure").text("《" + songname + "》将更改为参赛歌曲。");
            $('#chooseSong').css('visibility', 'visible');
            chooseSongID = id;
            chooseSongSinger = singername;
            chooseSongSong = songname;
        } else {
            applyState(id, songname, singername);
            //signUp(id, songname, singername);
        }
    }
}
//报名
function signUp(id, songname, singername) {
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {
            func: "signup",
            nickname: nickname,
            avatarUrl: avatarUrl,
            gender: gender,
            province: province,
            city: city,
            country: country,
            eventkey: eventkey,
            openid: openid,
            unionid: unionid,
            songid: id
        },
        async: true,
        timeout: timeOut,
        success: function (resp) {
            UIKitHideLoadingView();
            if (resp == "0") {
                $("#applyPop").css("display", "block");
                $("#songList").height(height - selectH - 150 - applyH);
                $("#songListDiv").height(height - selectH - 100 - applyH);
                $('#songListDiv').html('<div class="songList" id="songList"></div>');
                $("#songList").html(htmlList);
                isSingUp = true;
                $("#songNameP").text(songname);
                $("#singerNameP").text(singername);
                $('#apply').css('visibility', 'visible');
            } else if (resp == "1") {
                $("#error").text("系统繁忙");//参数有误
                $('#applyOver').css('visibility', 'visible');
            } else if (resp == "2") {
                $("#error").text("当前不支持报名");//活动还未开始
                $('#applyOver').css('visibility', 'visible');
            } else {

            }
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
