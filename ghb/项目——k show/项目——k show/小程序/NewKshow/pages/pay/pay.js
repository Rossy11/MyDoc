var app = getApp();
var md5 = require("../../utils/md5.js")
Page({
    data: {
        dataList: []
    },
    requestData: function (a) {
        var that = this;
        wx.request({
            url: app.globalData.baseUrl + app.globalData.usualUrl,
            data: {
                func: "require_packid",
                mid: app.globalData.mid
            },
            method: 'GET',
            success: function (res) {
                var info=JSON.parse(res.data.trim());
                that.setData({ dataList: info })
            },
            fail: function (res) {

            },
            complete: function (res) {

            }
        })
    },
    WXPay: function (e) {
        var that = this;
        that.WXPayChoose(e);//是登录状态，可以支付
    },
    WXPayChoose: function (e) {
        var data = e.currentTarget.dataset;
        var money = parseFloat(data.money);
        var count = data.count + "";
        // var packedid = data.packedid + "";
        var packedid = data.package_no + "";
        app.loading("正在支付", 50000);
        // TODO  支付代码
        wx.request({
            url: app.globalData.baseUrl + app.globalData.payUrl,
            data: {
                openid: app.globalData.openid,
                unionid:app.globalData.unionid,
                mid: app.globalData.mid,
                money: money,
                wx_body: "KShow套餐",
                packedid: packedid,
                count: count
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                var data = res.data;
                if (data.prepay_id != "" && data.prepay_id != undefined) {
                    wx.hideToast();//退出弹框
                    // success
                    var prepay_id = data.prepay_id;
                    var nonceStr = data.nonce_str + "";
                    var timeStamp = data.time + "";
                    var key = data.key;
                    var signA = "appId=wxed413afa9181899d&nonceStr=" + nonceStr + "&package=prepay_id=" + prepay_id + "&signType=MD5&timeStamp=" + timeStamp;
                    var signB = signA + "&key=" + key;
                    var sign = md5.hex_md5(signB).toUpperCase();
                    wx.requestPayment({
                        timeStamp: timeStamp,
                        nonceStr: nonceStr,
                        package: 'prepay_id=' + prepay_id,
                        signType: 'MD5',
                        paySign: sign,
                        success: function (res) {
                            // success
                        },
                        fail: function () {
                            app.toastShow("微信支付失败");
                        }
                    })
                } else {
                    //未登录，支付失败
                    app.toastShow(res.data);
                }
            },
            fail: function () {
                app.toastShow("微信订单支付失败");
            }
        })
    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {
        app.globalData.payPage=this;//存储页面
        app.globalData.firstLoginIS=2;//进来了footprint页面
        this.requestData();//获取套餐列表
    },
    onHide: function () {

    },
    onUnload: function () {

    }
})