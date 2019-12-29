var util = require("../../utils/util.js");
var api = require("../../config/api.js")

Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#ff9900",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    const {
      phone,
      password
    } = param;
    var flag = this.checkUserName(phone) && this.checkPassword(password);

    if(flag){
      util.request(api.login, param, "POST").then(function (res) {
        if (res.status != 200) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '登录失败!'
          });
        } else {
          // var url = '/pages/'
          // util.redirect(url);
        }
      });
    }

    // var flag = this.checkUserName(param)&&this.checkPassword(param)
    // if(flag){
    //     this.setLoginData1();
    //     this.checkUserInfo(param);
    // } 
  },
  // setLoginData1:function(){
  //   this.setData({
  //     loginBtnTxt:"登录中",
  //     disabled: !this.data.disabled,
  //     loginBtnBgBgColor:"#999",
  //     btnLoading:!this.data.btnLoading
  //   });
  // },
  // setLoginData2:function(){
  //   this.setData({
  //     loginBtnTxt:"登录",
  //     disabled: !this.data.disabled,
  //     loginBtnBgBgColor:"#ff9900",
  //     btnLoading:!this.data.btnLoading
  //   });
  // },
  checkUserName: function (phoneNum) {
    var phoneRegex = util.regexConfig().phone;
    if (phoneRegex.test(phoneNum)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确手机号码'
      });
      return false;
    }
  },
  checkPassword: function (password) {
    if (password.length < 6) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo: function (param) {
    var username = param.username.trim();
    var password = param.password.trim();

    // var that = this;
    // if((username=='admin@163.com'||username=='18500334462')&&password=='000000'){
    //     setTimeout(function(){
    //       wx.showToast({
    //         title: '成功',
    //         icon: 'success',
    //         duration: 1500
    //       });
    //       that.setLoginData2();
    //       that.redirectTo(param);
    //     },2000);
    // }else{
    //   wx.showModal({
    //     title: '提示',
    //     showCancel:false,
    //     content: '用户名或密码有误，请重新输入'
    //   });
    //   this.setLoginData2();
    // }
  },
  redirectTo: function (param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param=' + param //参数只能是字符串形式，不能为json对象
    })
  }

})