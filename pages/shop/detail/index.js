const App = getApp();

Page({


  /**
   * 页面的初始数据
   */
  data: {

    // 门店详情
    detail: {},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    // 获取门店详情
    _this.getShopDetail(options.shop_id);
  },

  /**
   * 获取门店详情
   */
  getShopDetail(shop_id) {
    let _this = this;
    App._get('shop/detail', {
      shop_id
    }, function(result) {
      _this.setData(result.data);
    });
  },

  /**
   * 分享当前页面
   */
  onShareAppMessage() {
    let _this = this;
    // 构建页面参数
    let params = App.urlEncode({
      'shop_id': _this.data.detail.shop_id,
      'referee_id': App.getUserId()
    });
    return {
      title: _this.data.detail.article_title,
      path: "/pages/article/detail/index?" + params
    };
  },

  /**
   * 拨打电话
   */
  onMakePhoneCall() {
    let _this = this;
    wx.makePhoneCall({
      phoneNumber: _this.data.detail.phone
    });
  },

  /**
   * 查看位置
   */
  onOpenLocation() {
    let _this = this;
    console.log(
      String(_this.data.detail.latitude)
    );
    wx.openLocation({
      latitude: Number(_this.data.detail.latitude),
      longitude: Number(_this.data.detail.longitude),
      scale: 15
    });
  },

})