
const app = getApp()

Page({
  data: {
    
    banners: [
      { id: 1, image: '/images/banners/ds3-banner.jpg', link: '/pages/detail/detail?id=1' },
      { id: 2, image: '/images/banners/bb-banner.jpg', link: '/pages/detail/detail?id=5' },
      { id: 3, image: '/images/banners/sekiro-banner.jpg', link: '/pages/detail/detail?id=9' },
      { id: 4, image: '/images/banners/er-banner.jpg', link: '/pages/detail/detail?id=13' }
    ],
    categories: [
      { id: 1, name: '黑暗之魂3', icon: '/images/categories/darksouls.png' },
      { id: 2, name: '血源诅咒', icon: '/images/categories/bloodborne.png' },
      { id: 3, name: '只狼', icon: '/images/categories/sekiro.png' },
      { id: 4, name: '艾尔登法环', icon: '/images/categories/elden-ring.png' }
    ],
    currentCategory: 1,
    goods: [],
    filteredGoods: [],
    cartCount: 0,
    loading: false
  },

  onLoad: function() {
    this.loadData()
  },

  onShow: function() {
    this.updateCartCount()
  },

  
  loadData: function() {
    this.setData({ loading: true })
    
    
    wx.request({
      url: `${app.globalData.baseUrl}/api/goods`,
      method: 'GET',
      data: {
        category: this.data.currentCategory
      },
      success: (res) => {
        if (res.data.code === 0) {
          this.setData({
            goods: res.data.data.list,
            filteredGoods: res.data.data.list
          })
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  },

  
  switchCategory: function(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({
      currentCategory: categoryId
    });
    this.loadData();
  },

  
  updateCartCount: function() {
    const cart = wx.getStorageSync('cart') || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    this.setData({
      cartCount: count
    });
  },

  
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

 
  goToCart: function() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

 
  navigateToDetail: function(e) {
    const link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    });
  },

  
  onPullDownRefresh: function() {
    
    this.loadData()
    
    wx.stopPullDownRefresh()
  },

  
  onReachBottom: function() {
   
    wx.showToast({
      title: '没有更多商品了',
      icon: 'none',
      duration: 2000
    })
  }
})
