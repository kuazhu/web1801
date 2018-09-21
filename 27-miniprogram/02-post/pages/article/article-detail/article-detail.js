var { articles } = require('../../../data/db.js');
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
    var articleId = options.articleId;
    this.data.articleId = articleId;
    //设置文章的详细内容
    var article = articles[articleId];
    this.setData(article);

    //设置收藏状态
    /*
      {
        "0":false,
        "1":true
      }
    */
    var articlesCollection = wx.getStorageSync('articles_collection');
    var currentIsCollected = false;
    if (articlesCollection){
      currentIsCollected = !!articlesCollection[articleId];
    }else{
      var data = {};
      data[articleId] = false;
      wx.setStorageSync('articles_collection', data);
    }
    this.setData({
      currentIsCollected: currentIsCollected
    })

  },
  /**
   * 处理收藏
   */
  tapCollection:function(){
    var articlesCollection = wx.getStorageSync('articles_collection');
    var currentIsCollected = articlesCollection[this.data.articleId];
    //改变storage里面的值
    articlesCollection[this.data.articleId] = !currentIsCollected;
    wx.setStorageSync('articles_collection', articlesCollection);
    //改变页面总的图片显示
    this.setData({
      currentIsCollected: !currentIsCollected
    })
    wx.showToast({
      title: currentIsCollected ? '取消成功' : '收藏成功'
    })

    /*
    var _this = this;
    wx.showModal({
      title: currentIsCollected ? '取消收藏' : '添加收藏',
      success:function(res){
        if(res.confirm){
          //改变storage里面的值
          articlesCollection[_this.data.articleId] = !currentIsCollected;
          wx.setStorageSync('articles_collection', articlesCollection);
          //改变页面总的图片显示
          _this.setData({
            currentIsCollected: !currentIsCollected
          })
        }
      }
    })
    */
    
  },
  tapShare:function(){
    var itemList = ['分享到微信','分享到微博','分享到QQ'];
    wx.showActionSheet({
      itemList: itemList,
      success:function(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功'
        })
      }
    })
  }
})