var util = require("../../utils/util.js");
var api = require("../../config/api.js")
var message = require("../../config/message.js")


Page({
  data: {
    registBtnTxt: "验证手机验证码",
    registBtnBgBgColor: "#ff9900",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#ff9900",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: '',
    inputPassword: '',
    phoneNum: ''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  formSubmit: function(e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function(param) {
    var flag = this.checkUserName(param.username);
    if (!flag){
      return;
    }
    this.checkSmsCode(param);
    // var flag = this.checkUserName(param.username) && this.checkSmsCode(param)
    // var that = this;
    // if (flag) {
    //   this.setregistData1();
    //   setTimeout(function() {
    //     wx.showToast({
    //       title: '成功',
    //       icon: 'success',
    //       duration: 1500
    //     });
    //     that.setregistData2();
    //     that.redirectTo(param);
    //   }, 2000);
    // }
  },
  getPhoneNum: function(e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });
  },
  setregistData1: function() {
    this.setData({
      registBtnTxt: "注册中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function() {
    this.setData({
      registBtnTxt: "注册",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  checkUserName: function(param) {
    var phone = util.regexConfig().phone;
    var inputUserName = param.trim();
    if (phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  checkPassword: function(param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else {
      return true;
    }
  },
  getSmsCode: function() {
    var phoneNum = this.data.phoneNum;
    var that = this;
    var count = 60;
    if (this.checkUserName(phoneNum)) {

      util.request(api.getSmsCode + phoneNum).then((res) => {
        util.showSuccessToast(message.register_send_smsCode_success);
      }).catch((rs) => {
        util.showErrorToast(message.register_send_smsCode_failed);
      });

      var si = setInterval(function() {
        if (count > 0) {
          count--;
          that.setData({
            getSmsCodeBtnTxt: count + ' s',
            getSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        } else {
          that.setData({
            getSmsCodeBtnTxt: "获取验证码",
            getSmsCodeBtnColor: "#ff9900",
            smsCodeDisabled: false
          });
          count = 60;
          clearInterval(si);
        }
      }, 1000);
    }

  },
  checkSmsCode: function(param) {
    var smsCode = param.smsCode.trim();
    var phoneNum = this.data.phoneNum;
    util.request(api.getSmsCode + phoneNum, {
      code: smsCode,
      phone: phoneNum
    }, "POST").then(function(res) {
      // if (res.status != 200) {
      //   wx.showModal({
      //     title: '提示',
      //     showCancel: false,
      //     content: '请输入正确的短信验证码'
      //   });
      // } else {
      //   var url = '/pages/regist/index?phone=' + phoneNum
      //   util.redirect(url);
      // }

      var url = '/pages/regist/index?phone=' + phoneNum
      util.redirect(url);
    });
  },
  redirectTo: function(param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.redirectTo({
      url: '../main/index?param=' + param //参数只能是字符串形式，不能为json对象
    })
  }

})