require('zepto');
require('sweetalert');
var Clipboard = require('Clipboard');

var Btgame = {
	init: function () {
		this.bindEvent();
		// this.getScoreSum();
	},

	setCookie: function (name, value) {
		document.cookie = name + "="+ escape (value) + ";path=/"
	},

	// 提示信息
	setSwal: function (text) {
		swal({
		  title: '',
		  text: text || '',
		  showConfirmButton: true
		});
	},

	// bindEvent
	bindEvent: function () {

	},
	// sendAjax
	sendAjax: function (options) {
		var _this = this;
		var config = Zepto.extend({
			url: '',
			type: 'GET',
			data: null,
			dataType: 'json',
			error: function (err) {
				console.log(err)
				_this.setSwal('系统错误，请重试');
			}
		}, options);
		Zepto.ajax(config);
	},

	// get params
	getQueryString (url, name) {
    const reg = new RegExp('(^|\\?|&)' + name + '=([^&#]*)(\\s|&|#|$)','i');
    if(reg.test(url)) return RegExp.$2.replace(/\+/g, ' ');
  }
};

Btgame.init();
