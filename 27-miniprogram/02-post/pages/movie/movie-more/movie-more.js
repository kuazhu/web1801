var {
  getMovieListData
} = require('../../../utils/utils.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: '',
    totalCount: 0,
    totalMovies:[],
    isEnd:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var baseUrl = app.G_DATA.baseUrl;
    var requestUrl = '';
    var title = '';
    switch (options.tagType) {
      case 'inTheaters':
        requestUrl = baseUrl + 'v2/movie/in_theaters';
        title = '正在热映';
        break;
      case 'comingSoon':
        requestUrl = baseUrl + 'v2/movie/coming_soon';
        title = '即将上映';
        break;
      case 'top250':
        requestUrl = baseUrl + 'v2/movie/top250';
        title = '豆瓣Top250';
        break;
    }
    wx.setNavigationBarTitle({
      title: title
    })
    this.data.requestUrl = requestUrl;
    wx.showNavigationBarLoading();
    getMovieListData(requestUrl, this.handleMovieList)
  },
  handleMovieList:function(data){
    wx.hideNavigationBarLoading(); 
    if(data.length == 0){
      this.data.isEnd = true;
      wx.showToast({
        title: '已经没有数据了',
      })
      return;
    }
    this.data.totalCount += data.length;
    this.data.totalMovies = this.data.totalMovies.concat(data);
    this.setData({
      movies: this.data.totalMovies
    })  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 刷新页面
   */
  onPullDownRefresh: function() {
    var _this = this;
    wx.showNavigationBarLoading();
    getMovieListData(this.data.requestUrl,function(data){
      _this.setData({
        movies:data
      })
      wx.hideNavigationBarLoading();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   * 加载更多
   */
  onReachBottom: function() {
    if(this.data.isEnd){
      wx.showToast({
        title: '已经没有数据了',
      })
      return;      
    }
    var _this = this;
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    wx.showNavigationBarLoading();
    getMovieListData(nextUrl, this.handleMovieList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})