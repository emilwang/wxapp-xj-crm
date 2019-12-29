// pages/regist/index.js
var util = require("../../utils/util.js");
var api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registBtnTxt: 'regist',
    registBtnBgBgColor: "#ff9900",
    registDisabled: false,
    phone: ''
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      phone: options.phone
    })
  },

  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },

  mysubmit: function (param) {
    if (this.validate(param)) {
      util.request(api.register, param, "POST").then(function (res) {
        if (res.status != 200) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '注册失败!'
          });
        } else {
          // var url = '/pages/'
          // util.redirect(url);
        }
      });
    }
  },

  validate: function (param) {
    const {
      account,
      address,
      code,
      companyName,
      username,
      phone,
      password,
      confirmPassword
    } = param;
    if (account.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter account'
      });
      return false;
    }

    if (address.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter address'
      });
      return false;
    }

    if (code.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter code'
      });
      return false;
    }


    if (companyName.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter companyName'
      });
      return false;
    }
    if (username.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter username'
      });
      return false;
    }

    if (phone.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter phone'
      });
      return false;
    } else {
      var phoneRegex = util.regexConfig().phone;
      if (!phoneRegex.test(phone)) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: 'please enter right phone'
        });
        return false;
      }
    }

    if (password.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter password'
      });
      return false;
    } else if (password.trim().length < 6 || password.trim().length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码的长度需要为6-20位'
      });
      return false;
    }

    debugger
    if (confirmPassword.trim().length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'please enter confrimPassword'
      });
      return false;
    } else if (confirmPassword.trim().length < 6 || confirmPassword.trim().length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码的长度需要为6-20位'
      });
      return false;
    }

    debugger

    if (password.trim() != confirmPassword.trim()) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: 'passwor not equal confirmPassword'
      });
      return false;
    }
    return true;
  }
})