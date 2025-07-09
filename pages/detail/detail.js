// pages/detail/detail.js
Page({
  data: {
    goods: null,
    cartCount: 0
  },

  onLoad: function (options) {
    if (options.id) {
      this.loadGoodsDetail(options.id);
    }
    this.updateCartCount();
  },

  onShow: function () {
    this.updateCartCount();
  },

  // 加载商品详情
  loadGoodsDetail: function (id) {
    // 模拟商品数据
    const goodsList = {
      1: {
        id: 1,
        name: '黑暗之魂3 豪华版',
        game: '黑暗之魂3',
        price: 299.00,
        stock: 100,
        image: '/images/goods/ds3-deluxe.jpg',
        tags: ['限定版', '官方授权'],
        specs: [
          { name: '版本', value: '豪华版' },
          { name: '平台', value: 'PS4/PC' },
          { name: '语言', value: '中文' },
          { name: '发行商', value: 'FromSoftware' }
        ]
      },
      2: {
        id: 2,
        name: '黑暗之魂3 原声带',
        game: '黑暗之魂3',
        price: 199.00,
        stock: 50,
        image: '/images/goods/ds3-soundtrack.png',
        tags: ['原声带', '官方授权'],
        specs: [
          { name: '版本', value: '原声带' },
          { name: '平台', value: 'CD' },
          { name: '发行商', value: 'FromSoftware' }
        ]
      },
      3: {
        id: 3,
        name: '黑暗之魂3 艺术设定集',
        game: '黑暗之魂3',
        price: 399.00,
        stock: 30,
        image: '/images/goods/ds3-artbook.png',
        tags: ['限定版', '艺术设定集'],
        specs: [
          { name: '版本', value: '精装版' },
          { name: '语言', value: '日文/英文' },
          { name: '页数', value: '300页' }
        ]
      },
      4: {
        id: 4,
        name: '黑暗之魂3 太阳骑士索拉尔手办',
        game: '黑暗之魂3',
        price: 599.00,
        stock: 20,
        image: '/images/goods/ds3-figure.png',
        tags: ['限定版', '手办'],
        specs: [
          { name: '材质', value: 'PVC' },
          { name: '尺寸', value: '高约25cm' },
          { name: '重量', value: '约500g' }
        ]
      },
      5: {
        id: 5,
        name: '血源诅咒 年度版',
        game: '血源诅咒',
        price: 299.00,
        stock: 80,
        image: '/images/goods/bloodborne-goty.png',
        tags: ['年度版', '官方授权'],
        specs: [
          { name: '版本', value: '年度版' },
          { name: '平台', value: 'PS4' },
          { name: '语言', value: '中文' }
        ]
      }
    };

    const goods = goodsList[id];
    if (goods) {
      this.setData({ goods });
    } else {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 更新购物车数量
  updateCartCount: function () {
    const cart = wx.getStorageSync('cart') || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    this.setData({ cartCount: count });
  },

  // 添加到购物车
  addToCart: function () {
    const { goods } = this.data;
    if (!goods) return;

    if (goods.stock <= 0) {
      wx.showToast({
        title: '商品库存不足',
        icon: 'none'
      });
      return;
    }

    let cart = wx.getStorageSync('cart') || [];
    const existingItem = cart.find(item => item.id === goods.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: goods.id,
        name: goods.name,
        price: goods.price,
        image: goods.image,
        quantity: 1
      });
    }

    wx.setStorageSync('cart', cart);
    this.updateCartCount();

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  // 立即购买
  buyNow: function () {
    const { goods } = this.data;
    if (!goods) return;

    if (goods.stock <= 0) {
      wx.showToast({
        title: '商品库存不足',
        icon: 'none'
      });
      return;
    }

    // 创建临时订单
    const order = {
      id: Date.now(),
      goods: [{
        id: goods.id,
        name: goods.name,
        price: goods.price,
        image: goods.image,
        quantity: 1
      }],
      totalAmount: goods.price,
      status: 'pending'
    };

    wx.setStorageSync('tempOrder', order);
    wx.navigateTo({
      url: '/pages/order/order'
    });
  },

  // 返回首页
  goToHome: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 去购物车
  goToCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  }
});
