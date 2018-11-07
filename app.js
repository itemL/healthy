//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var _this = this;
    var textType = wx.getStorageSync("globalData_text_font_type");
    if (textType){
      _this.globalData.red = textType.red;
      _this.globalData.green = textType.green;
      _this.globalData.blue = textType.blue;
      _this.globalData.contextFont = textType.contextFont;
      _this.globalData.fontName = textType.fontName;
    }else{
      _this.globalData.red = 17;
      _this.globalData.green = 17;
      _this.globalData.blue = 17;
      _this.globalData.contextFont = 50;
      _this.globalData.fontName = "Microsoft YaHei";
    }
    wx.setInnerAudioOption({
      "obeyMuteSwitch":false
    });
  },
  globalData: {
    userInfo: null,
    text:''
  }
})