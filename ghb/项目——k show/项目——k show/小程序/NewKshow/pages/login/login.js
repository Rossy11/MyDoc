var app = getApp();
var intervalPayOpenId;//支付openid是否获取到
Page({
  data: {
    mid: -1,//登录页面获得mid
    display: "none",
    loginIf: false,//是否登录了包厢
    headImg: "../../image/notAllow.png"
  },
  //我要支付
  payLogin: function () {
    var that = this;
    if (app.noNull(app.globalData.avatarUrl)) {
      intervalPayOpenId = setInterval(function () {
        //每次进主页请求一次是否登录，并及时刷新状态
        if (app.noNull(app.globalData.openid)) {
          that.iFLogin("loginPay");
          clearInterval(intervalPayOpenId);
        }
      }, 10)
    } else {
      wx.navigateTo({
        url: '../hint/hint'
      });
    }
  },
  //主页面的支付按钮的是否登录请求调用完成，所做的操作
  payLoginInterval: function () {
    var that = this;
    that.setData({ loginIf: app.globalData.iflogin })
    if (that.data.loginIf) {
      wx.navigateTo({
        url: '../pay/pay'
      });
    } else {
      that.setData({ display: "flex" })
    }
  },
  //我的歌曲
  songLogin: function () {
    if (app.noNull(app.globalData.avatarUrl)) {
      wx.navigateTo({
        url: '../footprint/footprint'
      });
    } else {
      wx.navigateTo({
        url: '../hint/hint'
      });
    }
  },
  //点击弹框，让弹框消失
  hiddenPop: function () {
    this.setData({ display: "none" })
  },
  //扫码登录
  scanCode: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        var path = res.path.split("?mid=")
        var mid = path[path.length - 1];
        app.globalData.mid = parseInt(mid);
        that.iFLogin("scanCode");
      }
    })
  },
  //退出客户端
  exitServer: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.globalData.usualUrl,
      data: {
        openid: app.globalData.unionid,
        func: "quit",
      },
      method: 'GET',
      success: function (res) {
        if (res.data) {
          app.globalData.iflogin = false;
          app.globalData.saveMid = app.globalData.mid;
          app.globalData.mid = -1;
          that.setData({ loginIf: false })
        }
      },
      fail: function (res) {

      }
    })
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
    app.globalData.loginPage = this;//存储页面
    var that = this;
    that.getUser("login");
    that.iFLogin("login");//TODO加的代码
  },
  onHide: function () {
    app.globalData.ifscanLogin = false;//初始化是否是扫码登录
    clearInterval(intervalPayOpenId); //支付openid是否获取到
  },
  onUnload: function () {
    
  },
  getOpenid: function () {
    var that = app;
    wx.login({
      success: function (res) {
        that.globalData.code = res.code;
        wx.request({
          url: that.globalData.baseUrl + that.globalData.usualUrl,
          data: {
            code: that.globalData.code,
            func: "require_openid",
          },
          method: 'GET',
          success: function (res) {
            var dataInfo = res.data.trim().split("###");
            that.globalData.session_key = dataInfo[1];
            that.globalData.openid = dataInfo[0];
          },
          fail: function (res) {

          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {

      }
    })
  },
  //是否登录
  iFLogin: function (re) {
    var loginThat = this;
    var that = app;
    wx.request({
      url: that.globalData.baseUrl + that.globalData.usualUrl,
      data: {
        func: "require_islogin",
        openid: that.globalData.openid
      },
      method: 'GET',
      success: function (res) {
        if (res.data.trim() != "fail") {
          var dataInfo = res.data.trim().split("###");
          var mid = dataInfo[0];
          that.globalData.unionid = dataInfo[1];
          //不同机器登录，重新请求登录
          if (mid != that.globalData.mid && that.globalData.mid != -1) {
            loginThat.loginServer(re);
            that.globalData.iflogin = false;
            loginThat.setData({ loginIf: app.globalData.iflogin })//TODO加的代码
          } else {
            //同一台机器登录
            that.globalData.mid = mid;
            that.globalData.iflogin = true;
            loginThat.setData({ loginIf: app.globalData.iflogin })//TODO加的代码
            if (re == "login") {
             
            } else if (re == "scanCode") {
          
            } else if (re == "loginPay") {
            
              loginThat.payLoginInterval();//主页面的支付按钮的是否登录请求调用完成，做的操作
            }
          }
        } else {
          if (re == "loginPay") {
     
            loginThat.payLoginInterval();//主页面的支付按钮的是否登录请求调用完成，做的操作
          
          } else if (re == "login" && !that.globalData.ifscanLogin) {
            if (that.globalData.firstLogin) {
              loginThat.loginServer(re);
              that.globalData.firstLogin = false;
            }
           
          } else {
            loginThat.loginServer(re);
          }
          that.globalData.iflogin = false;
          loginThat.setData({ loginIf: app.globalData.iflogin })//TODO加的代码
        }
      },
      fail: function (res) {

      },
      complete: function () {

      }
    })

  },
  //请求登录服务器
  loginServer: function (re) {
    var loginThat = this;
    var that = app;
    wx.request({
      url: that.globalData.baseUrl + that.globalData.usualUrl,
      data: {
        func: "login",
        openid: that.globalData.openid,
        avatarUrl: that.globalData.avatarUrl,
        city: that.globalData.city,
        country: that.globalData.country,
        gender: that.globalData.gender,
        language: that.globalData.language,
        nickName: that.globalData.nickName,
        province: that.globalData.province,
        mid: that.globalData.mid,
        session_key: that.globalData.session_key,
        encryptedData: that.globalData.encryptedData,
        iv: that.globalData.iv
      },
      method: 'GET',
      success: function (res) {
        var result = JSON.parse(res.data.trim());
        if (result.ret != "fail" && result.ret != "parse_fail") {
          that.globalData.iflogin = true;
          loginThat.setData({ loginIf: app.globalData.iflogin })//TODO加的代码
          if (re == "login" && that.globalData.ifscanLogin) {
          
          } else if (re == "scanCode") {
    
          }
        } else if (result.ret == "parse_fail") {//后台解析失败，重新获取用户信息
          that.globalData.getUserSign = true;
          loginThat.getUser(re);
        }
        that.globalData.unionid = result.unionid;
      },
      fail: function (res) {

      }
    })
  },
  //获取用户信息
  getUser: function (re) {
    var loginThat = this;
    var that = app;
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        if (res.userInfo != undefined) {
          var userinfo = res.userInfo;
          that.globalData.avatarUrl = userinfo.avatarUrl;
          that.globalData.city = userinfo.city;
          that.globalData.country = userinfo.country;
          that.globalData.gender = userinfo.gender;
          that.globalData.language = userinfo.language;
          that.globalData.nickName = userinfo.nickName;
          that.globalData.province = userinfo.province;
          that.globalData.encryptedData = res.encryptedData;
          that.globalData.iv = res.iv;
          loginThat.setData({ headImg: app.globalData.avatarUrl })//TODO 特殊处理
        }
        that.globalData.Info = res;
        
      },
      fail: function () {

      },
      complete: function () {
        if (that.globalData.getUserSign) {//后台解析失败，重新请求登录
          if (that.globalData.firstLoginIS != 2) {//不是第一次进入login页面（从footprint界面进来），就不去请求登录
            loginThat.loginServer(re);
            that.globalData.getUserSign = false;
          }
        } else {//避免多次无谓调用getOpenid接口
          loginThat.getOpenid();
        }
      }
    })
  },
})