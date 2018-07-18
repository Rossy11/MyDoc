var md5 = require('utils/md5.js')
App({
  onHide: function () {

  },
  onLaunch: function (e) {

  },
  onShow: function (e) {
    if (this.globalData.footprintPage != null) {//footprint页面销毁
      this.globalData.footprintPage.onUnload();
    }
    if (this.globalData.loginPage != null) {//login页面销毁
      this.globalData.loginPage.onUnload();
    }
    if (this.globalData.popLoginPage != null) {//popLogin页面销毁
      this.globalData.popLoginPage.onUnload();
    }
    if (this.globalData.rankInfoPage != null) {//rankInfo页面销毁
      this.globalData.rankInfoPage.onUnload();
    }
    if (this.globalData.hintPage != null) {//hint页面销毁
      this.globalData.hintPage.onUnload();
    }
    if (this.globalData.payPage != null) {//pay页面销毁
      this.globalData.payPage.onUnload();
    }
  },
  //给空数据设置默认数据
  setList: function (list, key) {
    var that = this;
    var dataList = list;
    for (var i = 0; i < dataList.length; i++) {
      if (key == "rank") {
        if (!that.noNull(dataList[i].avatar_url)) {
          dataList[i].avatar_url = "../../image/noImg.jpg"
        }
      } else {
        if (!that.noNull(dataList[i].imageurl)) {
          dataList[i].imageurl = "../../image/noImg.jpg"
        }
      }
    }
    return dataList;
  },
  //格式化时间
  formatTime: function (list) {
    var timeList = [];
    if (list.length > 0) {
      var times;
      var dates;
      var year;
      var month;
      var date;
      var time;
      for (var i = 0; i < list.length; i++) {
        times = list[i].time;
        // dates = new Date(0, 0, 0, 0, 0, times, 0);  //转换为Date对象
        dates = new Date(parseInt(times) * 1000)
        year = dates.getFullYear();
        month = dates.getMonth() + 1;
        date = dates.getDate();
        time = year + "-" + month + "-" + date;
        timeList.push(time);
      }
      return timeList;
    }
  },
  //非空判断
  noNull: function (res) {
    if (res != undefined && res != null && res != "" && res != "null") {
      return true;
    } else {
      return false;
    }
  },
  globalData: {
    rankInfoPage: null,//rankInfo页面存储
    payPage: null,//pay页面存储
    hintPage: null,//hint页面存储
    popLoginPage: null,//popLogin页面存储
    loginPage: null,//login页面存储
    footprintPage: null,//footprint页面存储
    firstLoginIS: -1,//判断是否是第一次登录，为1则为只在login页面，为2则代表进过其他页面
    firstLoginSign: true,//歌曲详情页面，第一次点击播放音乐
    firstLogin: true,//第一次进入主页都会去请求登录，不管是扫码进来还是搜索进来
    getUserSign: false,//后台解析失败，重新获取用户信息标识
    unionid: "",//登录之后的接口用到openid的接口参数实际值都是unionid
    encryptedData: "",//获取个人信息获得
    iv: "",//获取个人信息获得
    session_key: "",//获取UID
    // ifBackMusic: false,//背景音乐有播放
    songidApp: "",//当前播放音乐的songid
    recordIdApp: "",//当前播放的歌曲的唯一标识
    cutApp: "rank",//判断播放器播放的是哪个页面的歌曲
    idApp: -1,//歌曲在页面的id
    playIfApp: false,//要播放的歌曲是否加载完
    playVoice: "",//当前播放歌曲的uri
    playMusicPlay: false,//当前是暂停false还是播放true音乐
    playPercent: 0,//当前播放歌曲的百分比
    imgPlay: "",//当前播放歌曲的图片
    songNamePlay: "",//当前播放歌曲的歌名
    singerNamePlay: "",//当前播放歌曲的演唱者
    isSongPlay: false,//播放器是否播放过播放音乐
    ifscanLogin: false,//TODO是否是扫码登录
    isRecommend: false,//TODO是否请求的是推荐歌曲
    //isScanLogin: false,//TODO待删判断主页面的请求登录接口调用完成
    //isPayLogin: false,//TODO待删判断我要支付页面的请求是否登录接口调用完成
    //isLoginSign: false,//TODO 判断登录页面是否登录请求，是否请求完成
    signExit: false,//标志在小程序上有没有操作过退出登录
    saveMid: -1,//扫码退出小程序之前保存mid
    timeShow: -1,//第一次进来周边不执行登录
    baseUrl: "https://k3-mobile.leyecloud.com/xcx/",//基地址
    payUrl: "app_pay.php",//支付地址
    productionUrl: "handle_data_app.php",//作品地址
    usualUrl: "userinfo_push.php",//其余地址
    iflogin: false,//是否是登录状态
    signLog: true,//是否打印
    signToast: true,//是否弹框
    avatarUrl: "",//用户头像
    city: "",//用户所处城市
    country: "",//用户所处国家
    gender: "",//用户等级
    language: "",//用户语言
    nickName: "",//用户昵称
    province: "",//用户所处省份
    signRequest: false,//获取openid成功
    signLogin: false,//登录成功
    signUserInfo: false,//获取用户信息成功
    signMachine: false,//判断是否是第一次进入小程序
    mid: -1,//机器号
    openid: "",//openid
    session_key: "",//session_key
    code: "",//wx.login获得的code
    Info: "",//获取的用户所有信息
    userInfo: "",//用户信息
    pageSign: "-1",//11为周边，21为榜单，22为全部
    itemId: -1,//界面播放的id
    playMusic: false,//false为歌曲详情页面没有点击播放音乐
    mineMusic: false,//false为我的作品页面没有点击播放音乐
    allHide: false//退出小程序
  },
  log: function (res) {
    if (this.globalData.signLog) {
      console.log(res);
    }
  },
  toast: function (res) {
    if (this.globalData.signToast) {
      wx.showToast({
        title: res
      })
    }
  },
  toastShow: function (res) {
    wx.showToast({
      title: res
    })
  },
  loading: function (res, time) {
    wx.showToast({
      title: res,
      icon: 'loading',
      duration: time
    })
  }
})



