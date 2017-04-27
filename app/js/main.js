require('zepto');

let Clipboard = require('Clipboard');

let Btgame = {
	init: function () {
		this.bindEvent();
		// this.getScoreSum();
	},

	setCookie: function (name, value) {
		document.cookie = name + "="+ escape (value) + ";path=/"
	},
	// bindEvent
	bindEvent: function () {

	},
	// get params
	getQueryString (url, name) {
    const reg = new RegExp('(^|\\?|&)' + name + '=([^&#]*)(\\s|&|#|$)','i');
    if(reg.test(url)) return RegExp.$2.replace(/\+/g, ' ');
  }
};

Btgame.init();
