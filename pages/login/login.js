
const app = getApp()

Page({
  data: {
    username: '',
    password: '',
    statusBarHeight: 0
  },

  onLoad: function() {
    
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })
  },

 
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },

 
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  
  login() {
    const { username, password } = this.data
    
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '登录中...'
    })

   
    wx.request({
      url: `${app.globalData.baseUrl}/api/login`,
      method: 'POST',
      data: {
        username,
        password
      },
      success: (res) => {
        if (res.data.code === 0) {
          
          app.globalData.userInfo = res.data.data
          
          
          wx.setStorageSync('userInfo', res.data.data)
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })

          
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1500)
        } else {
          
          wx.showToast({
            title: res.data.message,
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
        wx.hideLoading()
      }
    })
  }
})
