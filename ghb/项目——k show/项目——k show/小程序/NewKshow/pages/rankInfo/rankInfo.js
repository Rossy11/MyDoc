var app = getApp();
var intervalNot;//歌曲界面播放音乐定时器
var intervalPlayFoot;//显示界面定时器
var intervalPlay;//播放器控制定时器
Page({
  data: {
    singerName: "",//歌手名
    songName: "",//歌曲名
    songId: "",//歌曲id
    singerUrl: "",//歌曲图片
    playSong: "",//播放器歌曲名
    playSinger: "",//播放器演唱者名
    playUrl: "",//播放器图片
    userUrl: "",//用户头像
    nickName: "",//用户名称
    cutLeft: true,//true为显示排名，false显示我的历史
    songTime: 0,//播放的音乐的时长
    songPercent: 0,//播放的音乐的播放进度
    cut: "rank",//判断播放器播放的是哪个页面的歌曲
    id: -1,//歌曲在页面的id
    myRankId: -2,//我的排名中我的排名的索引
    singName: "",//当前播放歌曲的演唱者名称
    play: false,//当前是否在播放
    songUri: "1",//当前播放音乐地址    
    playImg: "../../image/stop_S.png",//播放器的图片
    playIf: false,//是否加载完数据，否则不可点击播放
    rankId: -1,//排名中正在播放的歌曲
    historyId: -1,//我的历史正在播放的歌曲
    myRank: "none",//我的排名，我唱的歌曲是否显示
    myHistory: "hidden",//我的历史，我唱的歌曲提示是否显示
    myUpload: "none",//我的历史，我唱的歌曲正在上传提示是否显示
    myRankBgr: "#f4f4f4",//在没有数据的时候，排名中我的歌曲卡片背景颜色
    rankList: [],//我的排名歌曲列表
    historyList: [],//我的历史歌曲列表
    historyTime: -1,//我唱过此歌曲的次数
    myHistoryTimes: [],//我的历史我的歌曲的创建时间
    topSong: -1,//我的最高歌曲的索引
    topScore: 0,//我的最高歌曲分数
    topRank: 0,//我的最高歌曲排名
    ifShow: false,//录音正在上传是否显示
    ifTop: false,//我的历史最高纪录是否在前十
    isRecommend: false,//是否是推荐歌曲
  },
  onLoad: function (options) {
    this.setData({
      singerUrl: options.singerUrl,
      songName: options.songName,
      singerName: options.singerName,
      songId: options.songId,
      userUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
      playSong: options.songName,//播放器歌曲名
      playSinger: options.singerName,//播放器演唱者名
      playUrl: options.singerUrl,//播放器图片
    })
  },
  /**
   * 加载数据
   */
  requestData: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + app.globalData.productionUrl,
      data: {
        // totalnum: this.data.requestTime,
        // Type: this.data.Type,
        func: "require_rank",
        songid: that.data.songId,
        openid: app.globalData.unionid
      },
      method: 'GET',
      success: function (res) {
        var other = app.setList(res.data.others, "rank");
        //如果两次进歌曲详情页面是同一个页面，就找出播放歌曲的对应位置
        if (app.globalData.songidApp == that.data.songId && that.data.songId != "") {
          var record = app.globalData.recordIdApp
          var mineSong = res.data.mine;
          // var otherSong = res.data.others;
          var otherSong = other
          if (app.globalData.cutApp == "rank") {//之前播放的歌曲的歌曲列表是否刷新，通过recordid找到对饮的位置
            for (var i = 0; i < otherSong.length; i++) {
              if (otherSong[i].recordid == record) {
                that.setData({ cut: "rank", rankId: app.globalData.idApp, id: app.globalData.idApp, historyId: -1 })
              }
            }
          } else {
            for (var i = 0; i < mineSong.length; i++) {
              if (mineSong[i].recordid == record) {
                that.setData({ cut: "history", historyId: app.globalData.idApp, id: app.globalData.idApp, rankId: -1 })
              }
            }
          }
        }
        if (!app.globalData.isRecommend && other.length > 0) {
          var top = -1;
          var topId = 0;
          var songid = -1;
          var songObj = res.data.mine;
          for (var j = 0; j < songObj.length; j++) {
            songid = parseInt(songObj[j].score)
            if (j == 0) {
              top = songid;
            }
            if (top < songid) {
              top = songid;
              topId = j;
            }
          }
          var topSongs = res.data.mine;
          app.globalData.playIfApp = true;
          that.setData({
            historyList: res.data.mine,
            rankList: other,
            playIf: true,
            myRank: "flex",
            myRankBgr: "#ffffff",
            myHistory: "visible",
            historyTime: res.data.mine.length,
            myHistoryTimes: app.formatTime(res.data.mine),
            topSong: topId,
            topScore: topSongs[topId].score,
            topRank: topSongs[topId].user_rank,
            myRankId: topSongs[topId].user_rank - 1,
            isRecommend: false
          })
        } else {
          app.globalData.playIfApp = true;
          that.setData({
            myRank: "none",
            historyList: [],
            rankList: other,
            playIf: true,
            myRankBgr: "#ffffff",
            myHistory: "visible",
            historyTime: -1,
            isRecommend: true
          })
        }
      },
      fail: function () {
      }
    })
  },
  //播放控制器播放
  controlMusic: function () {
    var that = this;
    // if (that.data.id != -1) {
    if (that.data.playIf && that.data.playIf != "") {
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
        app.globalData.playMusicPlay = true//ASA当前是暂停false还是播放true音乐
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
    // }
  },
  //歌曲界面播放音乐
  playMusic: function (e) {
    var that = this;
    var dataInfo = e.currentTarget.dataset;
    //界面点击了正常的歌曲
    if (that.notNull(dataInfo.voiceuri)) {
      app.globalData.recordIdApp = dataInfo.recordid;
      app.globalData.songidApp = that.data.songId;
      app.globalData.isSongPlay = true;
      //记录当前播放的歌曲是在哪个页面，并且id
      if (that.data.cutLeft) {
        app.globalData.cutApp = "rank"
        that.setData({ cut: "rank", rankId: dataInfo.id, historyId: -1 })
      } else {
        app.globalData.cutApp = "history"
        that.setData({ cut: "history", historyId: dataInfo.id, rankId: -1 })
      }
      //是否是同一首歌，不做任何操作
      if (dataInfo.cut == that.data.cut && dataInfo.id == that.data.id) {
        app.globalData.playMusicPlay = true//当前是暂停false还是播放true音乐
        that.setData({ songTime: 0, songPercent: 0, cut: dataInfo.cut, id: dataInfo.id, playSinger: dataInfo.singname, play: true, songUri: dataInfo.voiceuri, playImg: "../../image/start_S.png" })
      } else {
        //不同歌曲，先初始化控制器信息
        app.globalData.imgPlay = that.data.singerUrl;
        app.globalData.songNamePlay = that.data.songName;
        app.globalData.singerNamePlay = dataInfo.singname;
        app.globalData.playVoice = dataInfo.voiceuri
        app.globalData.playMusicPlay = true;
        app.globalData.idApp = dataInfo.id
        that.setData({
          songTime: 0, songPercent: 0, cut: dataInfo.cut, id: dataInfo.id, playSinger: dataInfo.singname, songUri: dataInfo.voiceuri, playImg: "../../image/start_S.png", playSong: app.globalData.songNamePlay,//播放器歌曲名
          playSinger: app.globalData.singerNamePlay,//播放器演唱者名
          playUrl: app.globalData.imgPlay,//播放器图片
          play: app.globalData.playMusicPlay,//是否正在播放
          songPercent: app.globalData.playPercent,//播放的音乐的播放进度 
        })
        wx.playBackgroundAudio({
          dataUrl: e.currentTarget.dataset.voiceuri
          // dataUrl: "https://k3-mobile.leyecloud.com/xcx/mp3_a/ksm010200_a.mp3"
        })
        // app.globalData.ifBackMusic = true;
        var percent = 0;
        intervalNot = setInterval(function () {
          wx.getBackgroundAudioPlayerState({
            success: function (res) {
              if (res.status == 1) {
                percent = res.currentPosition / res.duration * 100;
                app.globalData.playPercent = percent;
                that.setData({ songTime: res.duration, songPercent: percent })
              } else {//没有播放歌曲
                app.globalData.playMusicPlay = false//当前是暂停false还是播放true音乐
                that.setData({ play: false, playImg: "../../image/stop_S.png" })
                clearInterval(intervalNot);
              }
            },
            fail: function () {

            }
          })
        }, 2000)
      }
    } else {//如果在我的历史界面点击了歌曲有错的歌曲
      if (!that.data.cutLeft) {
        that.setData({ myUpload: "flex" })
      }
      var intervalUpload = setInterval(function () {
        that.setData({ myUpload: "none" })
        clearInterval(intervalUpload);
      }, 3000)
      app.globalData.playMusicPlay = false//当前是暂停false还是播放true音乐
      that.setData({ play: false, playImg: "../../image/stop_S.png", songPercent: 0 })
      that.songUploadData(dataInfo)
    }
  },
  //点击了排名
  ranking: function () {
    if (!this.data.cutLeft) {
      this.setData({ cutLeft: true })
    }
  },
  //点击了我的历史
  historying: function () {
    if (this.data.cutLeft) {
      this.setData({ cutLeft: false })
    }
  },
  //单个歌曲获取
  songUploadData: function (data) {
    var that = this;
    var recordid = data.recordid;
    var raList = [];
    var mineList = [];
    wx.request({
      url: app.globalData.baseUrl + app.globalData.productionUrl,
      data: {
        func: "require_mp3",
        recordid: recordid
      },
      method: 'GET',
      success: function (res) {
        if (that.notNull(res.data.trim())) {
          if (data.cut == "rank") {
            //点击了我的排名的自己的作品,我的作品不在10名之内
            if (data.id == (topRank - 1) && topRank > 10) {
              mineList = that.data.historyList;
              mineList[topSong].mp3 = res.data.trim();
              that.setData({ historyList: mineList })
            } else {
              raList = that.data.rankList
              raList[data.id].mp3 = res.data.trim();
              mineList = that.data.historyList;
              mineList[topSong].mp3 = res.data.trim();
              that.setData({ historyList: mineList, rankList: raList })
            }
          } else {
            mineList = that.data.historyList;
            mineList[data.id].mp3 = res.data.trim();
            that.setData({ historyList: mineList })
            that.setData({ myUpload: "none" })
          }
        }
      },
      fail: function () {
      }
    })
  },
  //判断存在
  notNull: function (res) {
    if (res != undefined && res != null && res != "" && res != "null") {
      return true;
    } else {
      return false;
    }
  },
  onReady: function () {

  },
  onShow: function () {
    app.globalData.rankInfoPage = this;//存储页面
    var that = this;
    if (app.globalData.isSongPlay) {
      that.setData({
        playSong: app.globalData.songNamePlay,//播放器歌曲名
        playSinger: app.globalData.singerNamePlay,//播放器演唱者名
        playUrl: app.globalData.imgPlay,//播放器图片
        play: app.globalData.playMusicPlay,//是否正在播放
        songPercent: app.globalData.playPercent,//播放的音乐的播放进度
      })
    }
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
              clearInterval(intervalPlayFoot);
            }
          },
          fail: function () {

          }
        })
      }, 2000)
    } else {//暂停音乐
      that.setData({ play: false, playImg: "../../image/stop_S.png" })
    }
    this.requestData();
  },
  onHide: function () {
    clearInterval(intervalNot);
    clearInterval(intervalPlayFoot);
    clearInterval(intervalPlay);
  }
})