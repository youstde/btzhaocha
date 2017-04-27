require('zepto');

let Clipboard = require('Clipboard');

let Btgame = {
	init: function () {
		// this.bindEvent();
		// this.getScoreSum();
	},

	setCookie: function (name, value) {
		document.cookie = name + "="+ escape (value) + ";path=/"
	},
	// get params
	getQueryString (url, name) {
    const reg = new RegExp('(^|\\?|&)' + name + '=([^&#]*)(\\s|&|#|$)','i');
    if(reg.test(url)) return RegExp.$2.replace(/\+/g, ' ');
  },
	isWeiXin () {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	},
	closeGameEndBtn () {
		$('#closeGameEndBtn').on('click', ()=> {
			$('#outLayer').css('display','none');
			window.location.reload();
		});
	}
};

// Btgame.init();
module.exports = Btgame;
