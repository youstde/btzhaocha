require('zepto');
require('sweetalert');
var Clipboard = require('Clipboard');

var Exchange = {
	init: function () {
		this.bindEvent();
		this.getScoreSum();
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
		var _this = this,
				clipboard = new Clipboard('#J_code');

		// 兑换码复制
		clipboard.on('success', function(e) {
	    _this.setSwal('复制成功');
	    e.clearSelection();
		});

		// 积分兑换
		Zepto('#J_confirmBtn').click(function () {
			var scoreNum = Zepto('#J_number').val();
			if (!scoreNum) {
				_this.setSwal('请填写兑换积分数');
				return;
			}
			_this.sendAjax({
				url: '/api/public/lottery/getScoreRedeemCode?data=' + encodeURIComponent('{scoreNum:' + scoreNum + '}'),
				success: function (data) {
					var jsonData = data ? typeof data === 'string' ? JSON.parse(data) : data : null;
					if (jsonData.success && jsonData.data) {
						var result = jsonData.data;
						Zepto('#J_code').html(result.redeemCode)
							.attr('data-clipboard-text', result.redeemCode);
						Zepto('#J_codeImg').attr('src', result.wxUrl);
						Zepto('#J_mask').show();
					} else {
						_this.setSwal(jsonData.msg || '积分兑换失败，请重试');
					}
				}
			});
		});

		// 关闭弹窗
		Zepto('#J_closeBtn').click(function () {
			Zepto('#J_mask').hide()
		});
	},

	// 获取积分
	getScoreSum: function () {
		var _this = this,
				si = this.getQueryString(location.href, 'si'),
				pvi = this.getQueryString(location.href, 'pvi');

		// 手动写入cookie
		if (si && pvi) {
			console.log(si, pvi);
			this.setCookie('si', si);
			this.setCookie('pvi', pvi);
		}

		this.sendAjax({
			url: '/api/public/lottery/getScoreSum',
			success: function (data) {
				var jsonData = data ? typeof data === 'string' ? JSON.parse(data) : data : null;
				if (jsonData.success) {
					Zepto('#J_text').html(jsonData.data);
				} else {
					_this.setSwal(jsonData.msg || '剩余积分查询失败，请重试');
				}
			}
		})
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

Exchange.init();

