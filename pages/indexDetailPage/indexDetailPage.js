// pages/indexDetailPage/indexDetailPage.js
var wxParse = require('../wxParse/wxParse.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    var needText = app.globalData.text.replace(/<p><img src="http/g, 'special seat by huiyanliu');

    needText = needText.replace(/<p>/g,'<p style="font-size:50rpx;font-family:Microsoft YaHei;text-indent:2em;">');

    needText = needText.replace(/special seat by huiyanliu/g, '<p><img src="http');

    let needTitle = app.globalData.title ? app.globalData.title : "养生文摘";
    _this.setData({
      title: needTitle
    });
    wxParse.wxParse('article', 'html', needText ,_this,15);
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