/**
 * Created by Administrator on 2017/6/6 0006.
 */
var baseUrl = "https://k3-mobile.leyecloud.com/xcx/wx_gzh_require.php";
var timeOut = 10000;//调用接口超时时间
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
var titleInfo = $("#titleInfo").outerHeight(true);
var voteHandle = $("#voteHandle").outerHeight(true);
var leyeHint = $("#leyeHint").outerHeight(true);

var height = document.body.scrollHeight;
$("#advertisement").height(height - titleInfo - voteHandle - 10-leyeHint);

window.onload = setData();
//加载数据显示页面
function UIKitShowLoadingView() {
    $('#UIKitLoadingView').css('visibility', 'visible').css('opacity', 1);

}
//加载数据隐藏页面
function UIKitHideLoadingView() {
    $('#UIKitLoadingView').css('opacity', 0).css('visibility', 'hidden');
}
function setData() {
    UIKitShowLoadingView();
    //var urlData = "https://k3-mobile.leyecloud.com/xcx/KShowVote.html?id=KSA6&nickname=%F0%9F%92%8B+%E6%94%B9%E5%8F%98%F0%9F%90%8D+%E8%87%AA%F0%9F%92%84+%E5%B7%B1%F0%9F%8C%B4&avatarUrl=http://wx.qlogo.cn/mmhead/Q3auHgzwzM6IUUI9y1uOeBAWAAMGIC1hicBBzNtvIpXPnaNicxtM0K5g/0&gender=1&province=%E6%B1%9F%E8%8B%8F&city=%E6%B3%B0%E5%B7%9E&country=%E4%B8%AD%E5%9B%BD&openid=oB9De0c6lpNx2Ch4PM0o6TppYZYM&unionid=oTPjG03D-xKlJafngFCm3PBkK3sE&t=1500602308";
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
    voteState();
    getImg();
}
function hiddenPop() {
    $('#UIKitLoadingViewC').css('visibility', 'hidden');
}
//获取投票状态
function voteState() {
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {
            func: "playerinfo",
            eventkey: eventkey,
            unionid: unionid
        },
        dataType: 'json',
        async: true,
        timeout: timeOut,
        success: function (resp) {
            UIKitHideLoadingView();
            if (resp.is_vote > 0) {
                //设置投票界面属性
                setCss(resp.is_vote)
            } else if (resp.is_vote == -1) {
                $('#pop').css('visibility', 'visible');
            }
            if (notNull(resp.players)) {
                var playCount = 0;
                for (var i = 0; i < resp.players.length; i++) {
                    if (notNull(resp.players[i].song_name)) {
                        playCount += 1;
                    }
                }
                setPlayerCount(playCount, resp.players)
            }
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
//根据选手个数设置信息
function setPlayerCount(count, players) {
    if (count == 1) {
        setPlayer(1, players[0]);
        $('#voteItem1').css('visibility', 'visible');
    } else if (count == 2) {
        setPlayer(1, players[0]);
        setPlayer(2, players[1]);
        $('#voteItem1').css('visibility', 'visible');
        $('#voteItem2').css('visibility', 'visible');
    } else if (count == 3) {
        setPlayer(1, players[0]);
        setPlayer(2, players[1]);
        setPlayer(3, players[2]);
        $('#voteItem1').css('visibility', 'visible');
        $('#voteItem2').css('visibility', 'visible');
        $('#voteItem3').css('visibility', 'visible');
    } else if (count == 4) {
        setPlayer(1, players[0]);
        setPlayer(2, players[1]);
        setPlayer(3, players[2]);
        setPlayer(4, players[3]);
        $('#voteItem1').css('visibility', 'visible');
        $('#voteItem2').css('visibility', 'visible');
        $('#voteItem3').css('visibility', 'visible');
        $('#voteItem4').css('visibility', 'visible');
    }
}
//设置参赛选手信息
function setPlayer(id, play) {
    $("#header" + id).attr('src', play.avatar_url);
    $("#song" + id).text(play.song_name);
    $("#name" + id).text(play.name);
}
//不为空
function notNull(key) {
    if (key != undefined && key != "" && key != null && key.length != 0) {
        return true;
    } else {
        return false;
    }
}
//投票
function vote(id) {
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {
            func: "vote",
            machineid: id,
            nickname: nickname,
            avatarUrl: avatarUrl,
            openid: openid,
            unionid: unionid,
            gender: gender,
            city: city,
            province: province,
            country: country,
            eventkey: eventkey
        },
        dataType: 'json',
        async: true,
        timeout: timeOut,
        success: function (resp) {
            UIKitHideLoadingView();
            if (resp == "0") {
                setCss(id)
            } else if (resp == "1") {
                $("#popHint").text("系统繁忙");//参数有误
                $('#pop').css('visibility', 'visible');
            } else if (resp == "2") {
                $("#popHint").text("投票还未开始");//活动还未开始
                $('#pop').css('visibility', 'visible');
            } else {

            }
        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}
//投票成功，设置点击按钮样式
function setCss(id) {
    for (var i = 1; i < 5; i++) {
        if (id == i) {
            $('#vote' + i).css({border: "1px solid #FFC343"});
            $('#vote' + i).css('color', '#FFC343');
            $("#BtnImg" + i).attr("src", "gou.png");
            $('#vote' + i).html('已投票<img id="BtnImg"+i src="gou.png" class="BtnImg">');
        } else {
            $('#vote' + i).css({border: "1px solid #E7E7E7"});
            $('#vote' + i).css('color', '#E7E7E7');
            $("#BtnImg" + i).attr('src', "");
            $('#vote' + i).html("投TA一票");
            $('#vote' + i).css('disa', '#E7E7E7');
        }
        $('#vote' + i).attr('disabled', "true");//添加disabled属性
    }
}
//获取广告图片
function getImg() {
    UIKitShowLoadingView();
    $.ajax({
        url: baseUrl,
        type: 'GET',
        data: {func: "require_adpic", type: 0, eventkey: eventkey},
        async: true,
        timeout: timeOut,
        success: function (resp) {
            UIKitHideLoadingView();
            $("#advertisement").attr('src', resp);

        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}