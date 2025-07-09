// app.js
App({
  onLaunch: function () {
    // 小程序启动时执行的逻辑
    console.log('小程序启动了')
  },
  globalData: {
    // 后端服务器地址
    baseUrl: 'http://127.0.0.1:3000',
    userInfo: null
  }
})
