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
var urlData;

//加载数据显示页面
function UIKitShowLoadingView() {
    $('#UIKitLoadingView').css('visibility', 'visible').css('opacity', 1);

}
//加载数据隐藏页面
function UIKitHideLoadingView() {
    $('#UIKitLoadingView').css('opacity', 0).css('visibility', 'hidden');
}
setData();
function setData() {
    //urlData = "https://k3-mobile.leyecloud.com/xcx/chooseSong.html?id=%22KSA5%22&nickname=%E5%86%B0%E5%B0%81%E9%9B%B6%E5%BA%A6&avatarUrl=http://wx.qlogo.cn/mmopen/zT1ewPyg9Ge9fPDp5Ovv8iaunZKAIWlOBlEibCibeLnmoJIYDPs3XYWYZxm0TkOL5wMep63TEzgbhicWhMI9P89qVDyHia7tPLsk0/0&gender=1&province=%E4%B8%8A%E6%B5%B7&city=%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA&country=%E4%B8%AD%E5%9B%BD&openid=oB9De0aQtwpdtAcCS9YXktCftfSU&unionid=oTPjG05BxWa2_3UhzDjtVGuB5R3I&t=1496929357";
    //UIKitShowLoadingView();
    urlData = location.href;
    var idStr = urlData.split("id=")[1];
    var lastIndex = idStr.indexOf("&");
    eventkey = decodeURIComponent(idStr.substring(0, lastIndex));
    var dataList = urlData.split("&");
    nickname =decodeURIComponent(dataList[1].substring(9)) ;
    codenickname=dataList[1].substring(9);
    avatarUrl = dataList[2].substring(10);
    gender = dataList[3].substring(7);
    province =decodeURIComponent(dataList[4].substring(9));
    city = decodeURIComponent(dataList[5].substring(5));
    country = decodeURIComponent(dataList[6].substring(8));
    openid = dataList[7].substring(7);
    unionid = dataList[8].substring(8);
    applyState();
    var width = document.body.scrollWidth;
    var height = document.body.scrollHeight;
    $("#chooseCss").width(width);
    $("#chooseCss").height(height);
    $('#headerImg').css({background: "url("+avatarUrl +") no-repeat center"});
    $('#headerImg').css({backgroundSize: "100% 100%"});
    $("#applyName").text(nickname);
}
//选歌参赛
function chooseSong() {
    window.location.href = urlData.replace("chooseSong.html", "selectSong.html");
}

//获取报名状态
function applyState() {
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
            if (resp.is_signup == 1) {
                //跳转选择歌曲页面
                window.location.href = urlData.replace("chooseSong.html", "selectSong.html");
            } else if (resp.is_signup == -1) {
               $('#pop').css('visibility', 'visible');
            }

        },
        error: function (resp) {
            UIKitHideLoadingView();
            //$("#UIKitLoadingContentC").text("系统繁忙");//参数有误
        }
    });
}