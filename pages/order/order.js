
Page({

  
  data: {
    order: null,
    freight: 0,
    totalAmount: 0, 
    paymentMethod: 'wxpay',
    remark: ''
  },

  
  onLoad(options) {
 
    const order = wx.getStorageSync('tempOrder');
    if (!order) {
      wx.showToast({
        title: '订单数据不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    console.log('订单数据加载：', order);
    console.log('原始 order.totalPrice：', order.totalPrice); 

   
    if (!order.goods || !Array.isArray(order.goods)) {
      wx.showToast({
        title: '订单商品数据格式错误',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
      return;
    }

    
    const freight = this.calculateFreight(order.goods); 
    
    const baseTotalAmount = parseFloat(order.totalPrice) || 0; 
    const totalAmount = baseTotalAmount + freight;

    this.setData({
      order,
      freight,
      totalAmount: totalAmount.toFixed(2)
    });
  },

  
  onReady() {

  },

  
  onShow() {
  },

  
  onHide() {

  },

 
  onUnload() {

  },

 
  onPullDownRefresh() {

  },

  
  onReachBottom() {

  },

  
  onShareAppMessage() {

  },

  
  calculateFreight: function(goodsList) {
    
    const totalPrice = goodsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log('商品总价：', totalPrice);
    return totalPrice >= 100 ? 0 : 10;
  },

  
  selectPayment: function(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({ paymentMethod: method });
    console.log('选择支付方式：', method);
  },

  
  updateRemark: function(e) {
    this.setData({
      remark: e.detail.value
    });
    console.log('更新备注：', e.detail.value);
  },

  
  submitOrder: function() {
    console.log('提交订单...');

    
    const orderData = {
      ...this.data.order,
      freight: this.data.freight,
      totalAmount: this.data.totalAmount,
      paymentMethod: this.data.paymentMethod,
      remark: this.data.remark,
      orderNo: this.generateOrderNo(),
      status: 'pending',
      createTime: new Date().getTime()
    };

    
    const orders = wx.getStorageSync('orders') || [];
    orders.unshift(orderData);
    wx.setStorageSync('orders', orders);
    console.log('订单已保存：', orderData);

    
    wx.removeStorageSync('tempOrder');
    console.log('临时订单已清空');

    
    if (this.data.order && this.data.order.isFromCart) {
      let cart = wx.getStorageSync('cart') || [];
      const orderedGoodsIds = new Set(this.data.order.goods.map(item => item.id));
      const newCart = cart.filter(item => !orderedGoodsIds.has(item.id));
      wx.setStorageSync('cart', newCart);
      console.log('购物车已清空已购买商品');
    }

    
    this.wxPay(orderData);
  },

  
  generateOrderNo: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${year}${month}${day}${random}`;
  },

  
  wxPay: function(orderData) {
    wx.showLoading({
      title: '支付中...'
    });
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      });
      console.log('支付成功，订单号：', orderData.orderNo);

      
      let orders = wx.getStorageSync('orders') || [];
      const orderIndex = orders.findIndex(order => order.orderNo === orderData.orderNo);
      if (orderIndex !== -1) {
        orders[orderIndex].status = 'paid';
        wx.setStorageSync('orders', orders);
      }

      
      wx.redirectTo({
        url: '/pages/order-list/order-list'
      });
    }, 2000);
  }
})