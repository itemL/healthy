// pages/indexDetailPage/indexDetailPage.js
var wxParse = require('../wxParse/wxParse.js');
var util = require('../../utils/util.js');
const plugin = requirePlugin("WechatSI");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    contextFont: app.globalData.contextFont,
    red: app.globalData.red,
    green: app.globalData.green,
    blue: app.globalData.blue,
    fontName: app.globalData.fontName,
    playing:false
  },
  innerAudioContext : wx.createInnerAudioContext(),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.options = options;
    if(options.text && options.title){
      app.globalData.text = options.text;
      app.globalData.title = options.title;
    }
    this.innerAudioContext.onError((res) => {
      console.warn("语音播放失败 : ",res);
    })
  },
  
  __clickPlaying: function(){
    var _this = this;
    if (_this.data.playing){
      _this.innerAudioContext.stop();
      _this.setData({ playing: false });
    }else{
      var readText = util.removeHTMLTag(app.globalData.text);
      readText = readText.substring(0, 200);
      plugin.textToSpeech({
        lang: "zh_CN",
        tts: true,
        content: readText,
        success: function (res) {
          console.warn(res);
          _this.innerAudioContext.src = res.filename;
          _this.innerAudioContext.play();
          _this.setData({ playing: true });
        },
        fail: function (res) {
          console.warn(res);
        }
      })
    }
  },

  __refreshTextFont:function(){
    var _this = this;
    _this.data.red = app.globalData.red;
    _this.data.green = app.globalData.green;
    _this.data.blue = app.globalData.blue;
    _this.data.contextFont = app.globalData.contextFont;

    var needText = app.globalData.text.replace(/<p><img src="http/g, 'special seat by huiyanliu');
    var hex = "#" + (((1 << 24)) + ((app.globalData.red << 16)) + ((app.globalData.green << 8)) + app.globalData.blue).toString(16).slice(1);
    var repStr = "<p style=\"font-size:" + app.globalData.contextFont + "rpx;font-family:" + app.globalData.fontName + ";" + "color:" + hex + ";" + "text-indent:2em;\">";

    needText = needText.replace(/<p>/g, repStr);

    needText = needText.replace(/special seat by huiyanliu/g, '<p><img src="http');

    let needTitle = app.globalData.title ? app.globalData.title : "养生文摘";
    _this.setData({
      title: needTitle,
      contextFont: app.globalData.contextFont
    });
    wxParse.wxParse('article', 'html', needText, _this, 15);

  },

  __clickSetting:function(res){
    var _this = this;

    wx.navigateTo({
      url: '/pages/detailSettingPage/detailSettingPage',
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    _this.__refreshTextFont();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    var pathUrl = "/pages/indexDetailPage/indexDetailPage?text=" + app.globalData.text + "&title=" + app.globalData.title;
    return {
      title: app.globalData.title,
      path: pathUrl,
      success:(res) => {
        console.warn(res);
      },
      fail:(res) => {
        console.warn(res);
      }
    }
  }
})