// pages/likeListPage/likeListPage.js
const app = getApp();
var wxNotificationCenter = require("../../utils/3d/WxNotificationCenter.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeList:[]
  },

  //事件处理函数
  itemTap: function (e) {
    var _this = this;
    let text = e.currentTarget.dataset.text;
    let title = e.currentTarget.dataset.title;
    if (text) {
      let url = "/pages/indexDetailPage/indexDetailPage";
      app.globalData.text = text;
      app.globalData.title = title;
      wx.navigateTo({
        url: url,
      })
    }
  },

  __shoucangDelClick: function(event){
    var _this = this;
    let newId = event.currentTarget.dataset.newsid;
    var likeList = wx.getStorageSync("globalData_like_list");
    var item = null;
    if (!likeList) {
      return;
    }
    for (var i = 0; i < likeList.length; ++i){
      var item = likeList[i];
      if (item.newsId == newId){
        likeList.splice(i,1);
        wxNotificationCenter.postNotificationName(wxNotificationCenter.constant.EVENT_SHOUCANG_DELETE_THING, { newsId: newId,status:false});
        break;
      }
    }
    _this.setData({ likeList: likeList});
   
    wx.setStorageSync("globalData_like_list", likeList);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    
    _this.upListModel();

    wxNotificationCenter.addNotification(wxNotificationCenter.constant.EVENT_SHOUCANG_THING,(data) => {
      _this.upListModel();
    },this)
  },

  upListModel:function(){
    var _this = this;
    var likeList = wx.getStorageSync("globalData_like_list");
    _this.setData({
      likeList: likeList
    });
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
    wxNotificationCenter.removeNotification(wxNotificationCenter.constant.EVENT_SHOUCANG_THING,this);
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