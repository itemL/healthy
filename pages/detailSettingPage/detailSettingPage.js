// pages/detailSettingPage/detailSettingPage.js
const app = getApp();

var fontType = [{name:"444"},{name:"2222"}];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    testSize: app.globalData.contextFont,
    fontType: fontType,
    fontPercent:0,
    red: app.globalData.red,
    green: app.globalData.green,
    blue: app.globalData.blue,
    fontName: app.globalData.fontName
  },

  __bindchangeFont: function (event) {
    var _this = this;

    let va = event.detail.value;
    let font = 100 * (va / 100);
   
    _this.setData({ fontPercent: va, testSize: font});
    console.warn(event);
  },

  __bindchangeRed: function (event){
    var _this = this;

    let va = event.detail.value;
    let red = parseInt(255 * (va / 100));

    _this.setData({ fontPercent: va, red:red});
    console.warn(event);
  },

  __bindchangeGreen: function (event) {
    var _this = this;

    let va = event.detail.value;
    let green = parseInt(255 * (va / 100));

    _this.setData({ fontPercent: va, green: green });
    console.warn(event);

  },

  __bindchangeBlue: function (event) {
    var _this = this;

    let va = event.detail.value;
    let blue = parseInt(255 * (va / 100));

    _this.setData({ fontPercent: va, blue: blue });
    console.warn(event);
  },

  __clickResetBtn: function(event){
    var _this = this;
    var needColorStr = "0x222222";
    _this.setData({ testSize: 50});
    _this.setTextColorWithColor(needColorStr);
  },

  __clickCancelBtn: function(event){
    wx.navigateBack();
  },

  __clickSuredBtn: function(){
    var _this = this;
    app.globalData.red = _this.data.red;
    app.globalData.green = _this.data.green;
    app.globalData.blue = _this.data.blue;
    app.globalData.contextFont = _this.data.testSize;
    wx.setStorageSync("globalData_text_font_type", { red: _this.data.red, green: this.data.green, blue: _this.data.blue, contextFont: _this.data.testSize});
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.warn(app);
    _this.setData({
      red: app.globalData.red,
      green: app.globalData.green,
      blue: app.globalData.blue, 
      testSize: app.globalData.contextFont});
  },

  setTextColorWithColor:function(color){
    var _color = color;
    var _this = this;
    let red = parseInt("0x" + _color.slice(2, 4));
    let green = parseInt("0x" + _color.slice(4, 6));
    let blue = parseInt("0x" + _color.slice(6, 8));
    _this.setData({ testColor: _color, red: red, green: green, blue: blue });
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
  
  }
})