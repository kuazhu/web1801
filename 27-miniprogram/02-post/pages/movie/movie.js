var { coverStarsToArray } = require('../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var baseUrl = app.G_DATA.baseUrl;
    var inTheatersUrl = baseUrl + 'v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = baseUrl + 'v2/movie/coming_soon?start=0&count=3';
    var top250Url = baseUrl + 'v2/movie/top250?start=0&count=3';
    this.getData(inTheatersUrl, function (data) {
      _this.setData({
        inTheatersData: data,
        inTheatersTag: '正在热映'
      })
    })
    this.getData(comingSoonUrl, function (data) {
      _this.setData({
        comingSoonData: data,
        comingSoonTag: '即将上映'
      })
    }),
      this.getData(top250Url, function (data) {
        _this.setData({
          top250Data: data,
          top250Tag: '豆瓣Top250'
        })
      })    
  },
  getData:function(url,success){
    var _this = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        success(_this.formatData(res.data));
      }
    })
  },
  formatData:function(data){
    var arr = [];
    for(var i = 0;i<data.subjects.length;i++){
      arr.push({
        coverImg: data.subjects[i].images.large,
        title: data.subjects[i].title,
        stars: coverStarsToArray(data.subjects[i].rating.stars),
        score: data.subjects[i].rating.average
      })
    }
    return arr;
  }
})