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

module.exports = {
  formatTime: formatTime,
  fetch: fetch
}

