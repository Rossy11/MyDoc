var app = getApp();
Page({
    data: {
        width: "",
        height: "",
    },
    onLoad: function (options) {
        if (options.mid != undefined) {
            app.globalData.mid = options.mid;
            app.globalData.ifscanLogin = true;
        }
    },
    onReady: function () {

    },
    onShow: function () {
        app.globalData.popLoginPage = this;//存储页面
        wx.redirectTo({
            url: '../login/login'
        });
    },
    onHide: function () {

    },
    onUnload: function () {

    }
})