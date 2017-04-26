require('zepto');
let shl = require('./shl.js');
let requestObj = {
  'server': '',
  'getLotteryUrl': '/api/1.0/h5/lottery/getLottery',
  'gainUrl': '/api/1.0/h5/lottery/gain',
  'locationObj': {},
  'searchStr': '',
  init () {
    this.getServer();
    this.getLocation();
  },
  getServer () {
    let hostName = window.location.hostname;
    if(hostName == 'game.adbaitai.com') {
      this.server = '//game.adbaitai.com';
    }else if(hostName == 'gamepre.adbaitai.com'){
      this.server = '//gamepre.adbaitai.com';
    }else {
      this.server = '//gamepre.adbaitai.com';
    }
  },
  getLocation () {
    // 分享的也要拿一下sourceSi
    let locationStr = window.location.search.slice(1),
        locationArr = locationStr.split('&'),
        locationObj = {}
    for(let i=0; i< locationArr.length; i++){
      if(locationArr[i].indexOf('ADTAG') > -1){
        locationObj.ADTAG = locationArr[i].split('=')[1];
      }else if(locationArr[i].indexOf('pid') > -1){
        locationObj.pid = locationArr[i].split('=')[1];
      }else if(locationArr[i].indexOf('materialId') > -1){
        locationObj.materialId = locationArr[i].split('=')[1];
      }else if(locationArr[i].indexOf('appKey') > -1){
        locationObj.appKey = locationArr[i].split('=')[1];
      }else if(locationArr[i].indexOf('sourceSi') > -1){
        locationObj.sourceSi = locationArr[i].split('=')[1];
      }
    }
    console.log(locationObj);
    this.locationObj = locationObj;
    this.concatSearch();
  },
  concatSearch () {
    let searchObj = this.locationObj,
        searchStr = '';
    searchStr = `?ADTAG=${searchObj.ADTAG}&data=%7Bpid:${searchObj.pid},materialId:${searchObj.materialId}%7D&appKey=${searchObj.appKey}`;
    if(searchObj.sourceSi) {
      searchStr += `&sourceSi=${searchObj.sourceSi}`;
    }
    console.log(searchStr);
    this.searchStr = searchStr;
    this.sendFirst();
  },
  sendFirst () {
    let url = this.server + this.getLotteryUrl + this.searchStr,
        _this = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success (data) {
        console.log(data.data.ticket);
        let ticket = data.data.ticket;
        _this.weixinConfig(ticket);
      }
    })
  },
  sendGain () {
    let url = this.server + this.gainUrl + this.searchStr;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success (data) {
        console.log(data);
      }
    })
  },
  weixinConfig (ticket) {
    console.log(shl.hex_sha1(ticket));

    let noncestr = 'Wm3WZYTPz0wzccnW',
        jsapi_ticket = ticket,
        timestamp = Date.now(),
        stringOne = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${this.url}`,
        signaturett = shl.hex_sha1(stringOne);
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxfa8b4275880355a7', // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: signaturett,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

  }
}

requestObj.init();