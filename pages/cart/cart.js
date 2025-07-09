Page({
  data: {
    cartList: [],
    allSelected: false,
    totalPrice: 0,
    selectedCount: 0
  },

  onLoad: function() {
    this.loadCartData();
  },

  onShow: function() {
    this.loadCartData();
  },

  
  loadCartData: function() {
    let cartList = wx.getStorageSync('cart') || [];
    cartList = cartList.map(item => ({
      ...item,
      selected: false
    }));
    
    this.setData({
      cartList,
      allSelected: false
    });
    this.calculateTotal();
  },

  
  toggleSelect: function(e) {
    const id = e.currentTarget.dataset.id;
    const { cartList } = this.data;
    const index = cartList.findIndex(item => item.id === id);
    
    if (index > -1) {
      cartList[index].selected = !cartList[index].selected;
      const allSelected = cartList.every(item => item.selected);
      
      this.setData({
        cartList,
        allSelected
      });
      this.calculateTotal();
    }
  },

 
  toggleSelectAll: function() {
    const { cartList, allSelected } = this.data;
    const newList = cartList.map(item => ({
      ...item,
      selected: !allSelected
    }));
    
    this.setData({
      cartList: newList,
      allSelected: !allSelected
    });
    this.calculateTotal();
  },

  
  increaseCount: function(e) {
    const id = e.currentTarget.dataset.id;
    const { cartList } = this.data;
    const index = cartList.findIndex(item => item.id === id);
    
    if (index > -1 && cartList[index].quantity < cartList[index].stock) {
      cartList[index].quantity += 1;
      this.setData({ cartList });
      this.updateCart(cartList);
      this.calculateTotal();
    }
  },

  
  decreaseCount: function(e) {
    const id = e.currentTarget.dataset.id;
    const { cartList } = this.data;
    const index = cartList.findIndex(item => item.id === id);
    
    if (index > -1 && cartList[index].quantity > 1) {
      cartList[index].quantity -= 1;
      this.setData({ cartList });
      this.updateCart(cartList);
      this.calculateTotal();
    }
  },

  
  updateCount: function(e) {
    const id = e.currentTarget.dataset.id;
    const value = parseInt(e.detail.value);
    const { cartList } = this.data;
    const index = cartList.findIndex(item => item.id === id);
    
    if (index > -1) {
      if (value < 1) {
        cartList[index].quantity = 1;
      } else if (value > cartList[index].stock) {
        cartList[index].quantity = cartList[index].stock;
        wx.showToast({
          title: '超出库存数量',
          icon: 'none'
        });
      } else {
        cartList[index].quantity = value;
      }
      
      this.setData({ cartList });
      this.updateCart(cartList);
      this.calculateTotal();
    }
  },


  deleteItem: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          const { cartList } = this.data;
          const newList = cartList.filter(item => item.id !== id);
          this.setData({ cartList: newList });
          this.updateCart(newList);
          this.calculateTotal();
        }
      }
    });
  },

  
  updateCart: function(cartList) {
    wx.setStorageSync('cart', cartList);
  },

  
  calculateTotal: function() {
    const { cartList } = this.data;
    let totalPrice = 0;
    let selectedCount = 0;
    
    cartList.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.quantity;
        selectedCount += item.quantity;
      }
    });
    
    this.setData({
      totalPrice: totalPrice.toFixed(2),
      selectedCount
    });
  },

  
  checkout: function() {
    const { cartList } = this.data;
    const selectedItems = cartList.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      });
      return;
    }

    
    const order = {
      goods: selectedItems,
      totalPrice: parseFloat(this.data.totalPrice),
      status: 'pending',
      createTime: new Date().getTime(),
      isFromCart: true
    };
    
    wx.setStorageSync('tempOrder', order);
    wx.navigateTo({
      url: '/pages/order/order?type=cart'
    });
  },

  
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

 
  goToHome: function() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}); 