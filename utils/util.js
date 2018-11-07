const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function findItemFormListsWithId(lists,id,key){
  if(lists && id && lists.length > 0){
    for(var i = 0;i<lists.length; ++i){
      var item = lists[i];
      if (item[key] == id){
        return item;
      }
    }
  }
  return null;
}

function fetch(url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: '',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("url:" + url);
        console.log("response data:%o", res);
        resolve(res);
      },
      fail: function (e) {
        console.log("url:" + url);
        reject(e);
      }
    })
  });
};

function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
  str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
  str = str.replace(/ /ig, '');//去掉 
  str = str.replace(/\r\n/g, '');//去掉\n 
  str = str.replace(/\n/g, '');//去掉\n
  return str;
};

function strChangeToListWith100length(str){
    let length = 100;
}

module.exports = {
  formatTime: formatTime,
  fetch: fetch,
  findItemFormListsWithId: findItemFormListsWithId,
  removeHTMLTag: removeHTMLTag
}

