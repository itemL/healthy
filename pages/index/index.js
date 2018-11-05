//index.js
//获取应用实例

const app = getApp()
var util = require('../../utils/util.js');

Page({
  data: {
    healthyList1:[],
    healthyPullList1:[],
    categoryName1:'',
    helathyList2:[],
    helathyPullList2: [],
    categoryName2:'',
    index:0,
    category1Index:1,
    category2Index:1,
    scrollTop1:0,
    scrollTop2: 0
  },
  isPullingData: false,

  //事件处理函数
  itemTap: function(e){
    var _this = this;
    let text = e.currentTarget.dataset.text;
    let title = e.currentTarget.dataset.title;
    if (text){
      let url = "/pages/indexDetailPage/indexDetailPage";
      app.globalData.text = text;
      app.globalData.title = title;
      wx.navigateTo({
        url: url,
      })
    }
  },
  
  onReachSwiperBottom: function () {
    var _this = this;
    if (_this.data.index == 0){
      _this.reloadMoreLifetimesCategoryId_12();
    }else{
      _this.reloadMoreLifetimesCategoryId_11();
    }
  },

  onReachSwiperTop:function(){
    var _this = this;
    if (_this.isPullingData){
      return;
    }
    _this.isPullingData = true;
    _this.setData({
      isPullLoading:true
    });

    if (_this.data.index == 0) {
      Promise.all([_this.reloadPullLifetimesCategoryId_12()]).then(function(res){
        setTimeout(function(res){
          _this.isPullingData = false;
        },2000);
      })
    } else {
      Promise.all([_this.reloadPullLifetimesCategoryId_11()]).then(function (res) {
        setTimeout(function (res) {
          _this.isPullingData = false;
        }, 2000);
      })
    }
  },
  
  clickItemChangesBtn: function(e){
    var _this = this;
    let channel = e.currentTarget.dataset.channel;
    if (channel == "母婴育儿" && _this.data.index != 0){
      _this.setData({index:0});
    } else if (channel == "健康养生" && _this.data.index != 1){
      _this.setData({ index: 1 });
    }
  },

  clickRefreshPullData: function(e){
    var _this = this;
    
    if (_this.data.index == 0) {
      _this.setData({
        scrollTop1:24
      });
    } else {
      _this.setData({
        scrollTop2: 44
      });
    }
  },

  swiperchange: function(e){
    var _this = this;
    let channel = e.currentTarget.dataset.channel;
    if (channel == "母婴育儿") {
      _this.setData({ index: 1 });
    } else if (channel == "健康养生") {
      _this.setData({ index: 0 });
    }
  },

  onLoad: function () {
    var _this = this;    
    let reloadList = [_this.reloadLifetimesCategoryId_11(), _this.reloadLifetimesCategoryId_12()];
    _this.setData({
      showtype:2
      });
    Promise.all(reloadList).then(function(data){
      console.warn("网络数据请求完成");
      _this.setData({
        showtype: 1
      });
    })
  },

  reloadLifetimesCategoryId_11: function () { 
    var _this = this;
    return util.fetch("https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=11&page=1&size=20").then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles){
        var items = res.data.articles;
        _this.setData({
          healthyList1: [items],
          categoryName1: res.data.categoryName,
          category1Index: _this.data.category1Index + 1
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  },

  reloadMoreLifetimesCategoryId_11: function () {
    var _this = this;
    let moreLifetimesUrl = "https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=11&page=" + _this.data.category1Index + "&size=20";
    return util.fetch(moreLifetimesUrl).then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles) {
        var items = res.data.articles;
        let length = _this.data.healthyList1.length;
        _this.setData({
          [`healthyList1[${length}]`]: items,
          category1Index: _this.data.category1Index + 1
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  },

  reloadPullLifetimesCategoryId_11: function () {
    //往下面拉
    var _this = this;
    let moreLifetimesUrl = "https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=11&page=" + _this.data.category1Index + "&size=20";
    return util.fetch(moreLifetimesUrl).then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles) {
        var items = res.data.articles;
        let length = _this.data.healthyPullList1 ? _this.data.healthyPullList1.length : 0;
        _this.setData({
          [`healthyPullList1[${length}]`]: items,
          category1Index: _this.data.category1Index + 1,
          isPullLoading:false
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  },

  reloadLifetimesCategoryId_12: function () {
    var _this = this;
    return util.fetch("https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=12&page=1&size=20").then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles) {
        var items = res.data.articles;
        _this.setData({
          healthyList2: [items],
          categoryName2: res.data.categoryName,
          category2Index: _this.data.category2Index + 1
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  },

  reloadMoreLifetimesCategoryId_12: function () {
    var _this = this;
    let moreLifetimesUrl = "https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=12&page=" + _this.data.category2Index + "&size=20";
    return util.fetch(moreLifetimesUrl).then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles) {
        var items = res.data.articles;
        let length = _this.data.healthyList2.length;
        _this.setData({
          [`healthyList2[${length}]`]: items,
          categoryName2: res.data.categoryName,
          category2Index: _this.data.category2Index + 1
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  },

  reloadPullLifetimesCategoryId_12: function () {
    var _this = this;
    let moreLifetimesUrl = "https://m.lifetimes.cn/api/baidu/inter/list.do?categoryId=12&page=" + _this.data.category2Index + "&size=20";
    return util.fetch(moreLifetimesUrl).then(function (res) {
      console.warn("res = ", res);
      if (res.data && res.data.articles) {
        var items = res.data.articles;
        let length = _this.data.healthyPullList2 ? _this.data.healthyPullList2.length : 0;
        _this.setData({
          [`healthyPullList2[${length}]`]: items,
          category2Index: _this.data.category2Index + 1,
          isPullLoading:false
        });
      }
    }, function (res) {
      console.warn("res = ", res);
    });
  }
})