var { articles } = require('../../data/db.js');

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
    this.setData({
      articles: articles
    })
  },
  /** 
   * 处理点击跳转到详情页面
   */
  tapArticleItem:function(event){
    var articleId = event.currentTarget.dataset.articleId;
    wx.navigateTo({
      url: 'article-detail/article-detail?articleId='+articleId,
    })
  }
})