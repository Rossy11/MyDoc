var inputContent = {}
var app = getApp();
var intervalPlayFoot;
var intervalPlay;
Page({
  data: {
    isShowPlay: false,//是否显示播放器
    imgPlayUrl: "",//播放器的头像
    songNamePlay: "",//播放器的歌曲名
    singerName: "",//播放器的演唱者
    typeShow: "none",//是否存在搜索歌曲
    songShow: false,//是否有歌曲记录从而显示推荐歌曲提示
    value: "",//搜索输入框的内容
    seekValue: "",//搜索输入框内容
    notSeek: false,//是否点击了搜索
    dataList: [],//歌曲列表
    nickName: "",//用户名
    userUrl: "",//用户头像
    createTime: [],//创建时间
    songsList: [],//歌曲列表保存
    mySong: true,//当前界面是否是自己唱的歌曲列表
    playImg: "../../image/stop_S.png",//播放器的图片
    songTime: 0,//播放的音乐的时长
    songPercent: 0,//播放的音乐的播放进度
    play: false,//当前是否在播放音乐
  },//获取搜索歌曲的内容
  inputValue: function (e) {
    var that = this;
    inputContent[e.currentTarget.id] = e.detail.value;
    that.setData({ seekValue: inputContent[e.currentTarget.id] });
  },
  //清空搜索
  seekDelete: function () {
    var that = this;
    //var seekDelete = setInterval(function () {
    //当用户删除搜索字符串，就恢复原来歌曲列表
    that.setData({ value: "", dataList: that.data.songsList, typeShow: "none" })
    //clearInterval(seekDelete);
    //}, 100)
  },
  //搜索操作
  seek: function () {
    var that = this;
    //var seek = setInterval(function () {
    var name;
    var str = that.trimStr(that.data.seekValue, "g")
    var list = that.data.songsList;
    var seekSongList = [];
    for (var i = 0; i < list.length; i++) {
      name = list[i].songname;
      if (name.indexOf(str) != -1) {
        seekSongList.push(list[i])
      }
    }
    if (seekSongList.length > 0) {
      that.setData({ dataList: seekSongList, typeShow: "none" })
    } else {
      that.setData({ dataList: seekSongList, typeShow: "flex" })
    }
    //clearInterval(seek);
    //}, 500)
  },//去掉字符串中所有空格
  trimStr: function (str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
      result = result.replace(/\s/g, "");
    }
    return result;
  },
  /**
   * 加载数据
   */
  requestData: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.globalData.productionUrl,
      data: {
        func: "require_songinfo",
        openid: app.globalData.unionid
      },
      method: 'GET',
      success: function (res) {
        if (res.data.length > 0) {
          var seekList = app.setList(res.data, "seek");
          var songs = seekList;
          var songids = [];
          var song = [];
          for (var i = 0; i < songs.length; i++) {
            if (songids.indexOf(songs[i].songid) == -1) {
              songids.push(songs[i].songid)
              song.push(songs[i])
            }
          }
          that.setData({ mySong: true, songShow: false, dataList: song, nickName: app.globalData.nickName, createTime: app.formatTime(res.data), songsList: song, userUrl: app.globalData.avatarUrl })
        } else {
          //没有歌曲记录，显示推荐歌曲提示
          that.recommendData();
          app.globalData.isRecommend = true;
        }
      },
      fail: function (res) {

      }
    })
  },
  //推荐歌曲单
  recommendData: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.globalData.productionUrl,
      data: {
        totalnum: 1,
        Type: 1,
        func: "require_hotsonginfo",
        // openid:app.globalData.openid  
      },
      method: 'GET',
      success: function (res) {
        var seekL = app.setList(res.data, "recommend");
        var song = seekL;
        that.setData({ mySong: false, songShow: true, dataList: song, nickName: app.globalData.nickName, createTime: app.formatTime(res.data), songsList: song, userUrl: app.globalData.avatarUrl })
      }
    })
  },
  //进入详情页面
  songDetail: function (e) {
    //跳转到歌曲详情页面
    var dataInfo = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../rankInfo/rankInfo?' + "&songName=" + dataInfo.songname + "&songId=" + dataInfo.songid + "&singerUrl=" + dataInfo.singerurl + "&singerName=" + dataInfo.singername,
    });
  },
  onLoad: function (options) {
  
  },
  onReady: function () {

  },
  onShow: function () {
    app.globalData.footprintPage = this;//存储页面
    var that = this;
    app.globalData.firstLoginIS = 2;//进来了footprint页面
    that.setData({ isShowPlay: app.globalData.isSongPlay, imgPlayUrl: app.globalData.imgPlay, songNamePlay: app.globalData.songNamePlay, singerName: app.globalData.singerNamePlay })
    if (app.globalData.isSongPlay) {
      that.setData({ songPercent: app.globalData.playPercent })
      if (app.globalData.playMusicPlay) {//正在播放
        that.setData({ play: app.globalData.playMusicPlay, playImg: "../../image/start_S.png" })
        var percent = 0;
        intervalPlayFoot = setInterval(function () {
          wx.getBackgroundAudioPlayerState({
            success: function (res) {
              if (res.status == 1) {
                percent = res.currentPosition / res.duration * 100;
                app.globalData.playPercent = percent;
                app.globalData.playMusicPlay = true;
                that.setData({ songTime: res.duration, songPercent: percent, play: true, playImg: "../../image/start_S.png" })
              } else {//没有播放歌曲
                app.globalData.playMusicPlay = false;
                that.setData({ play: false, playImg: "../../image/stop_S.png" })
                // if (app.globalData.ifBackMusic) {
                //   app.globalData.playMusicPlay = true//当前是暂停false还是播放true音乐
                //   that.setData({ play: true, playImg: "../../image/start_S.png" })
                // }
                clearInterval(intervalPlayFoot);
              }
            },
            fail: function () {

            }
          })
        }, 2000)
      } else {//暂停音乐
        that.setData({ play: app.globalData.playMusicPlay, playImg: "../../image/stop_S.png" })
      }

    }

    this.requestData();//获取我的歌曲
  },
  //播放控制器播放
  controlMusic: function () {
    var that = this;
    if (that.data.id != -1) {
      if (app.globalData.playIfApp && app.globalData.playIfApp != "") {
        if (that.data.play) {
          wx.pauseBackgroundAudio();
          // app.globalData.ifBackMusic = false
          that.setData({ play: false, playImg: "../../image/stop_S.png" })
          app.globalData.playMusicPlay = false//当前是暂停false还是播放true音乐
        } else {
          wx.playBackgroundAudio({
            dataUrl: app.globalData.playVoice
            // dataUrl: "https://k3-mobile.leyecloud.com/xcx/mp3_a/ksm010200_a.mp3"
          })
          app.globalData.playMusicPlay = true//当前是暂停false还是播放true音乐
          that.setData({ play: true, playImg: "../../image/start_S.png" })
          var percent = 0;
          intervalPlay = setInterval(function () {
            wx.getBackgroundAudioPlayerState({
              success: function (res) {
                if (res.status == 1) {
                  percent = res.currentPosition / res.duration * 100;
                  app.globalData.playPercent = percent;//当前播放歌曲播放的进度，全局变量
                  that.setData({ songTime: res.duration, songPercent: percent })
                } else {//没有播放歌曲
                  that.setData({ play: false, playImg: "../../image/stop_S.png" })
                  app.globalData.playMusicPlay = false//当前是暂停false还是播放true音乐
                  clearInterval(intervalPlay);
                }
              },
              fail: function () {

              }
            })
          }, 2000)

        }
      }
    }
  },
  onHide: function () {
    clearInterval(intervalPlayFoot);
    clearInterval(intervalPlay);
  },
  onUnload: function () {
    
  }
})











































