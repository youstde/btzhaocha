require('zepto');
let shl = require('./shl.js');
let requestObj = {
  'server': '',
  'getLotteryUrl': '/api/1.0/h5/lottery/getLottery',
  'gainUrl': '/api/1.0/h5/lottery/gain',
  'locationObj': {},
  'searchStr': '',
  'data': null,
  init () {
    this.getServer();
    this.getLocation();
    // this.sendFirst();
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
    return searchStr;
  },
  sendFirst (callback) {
    let url = this.server + this.getLotteryUrl + this.searchStr,
        _this = this;
    // let url = '/mock/youstde/example_1493185812146/mock',
    //     _this = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success (data) {
        (typeof callback === 'function')?callback(data):'';
        let ticket = data.data.ticket;
        if(data.success === true) _this.data = data.data;
        _this.weixinConfig(ticket);
        _this.setTotleTime(data.data);
        _this.setScore(data.data);
      }
    })
  },
  sendGain (callback) {
    let url = this.server + this.gainUrl + this.searchStr,
        _this = this;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success (data) {
        (typeof callback === 'function')?callback(data):'';
        // console.log(data);
        _this.setScore( data.data );
      }
    })
  },
  weixinConfig (ticket) {
    console.log(ticket);

    let noncestr = 'Wm3WZYTPz0wzccnW',
        timestamp = Date.now(),
        sturl = window.location.href.split('#')[0],
        stringOne = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${sturl}`,
        signaturett = shl.hex_sha1(stringOne);
        console.log(signaturett);
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxfa8b4275880355a7', // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: noncestr, // 必填，生成签名的随机串
      signature: signaturett,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

      wx.ready(function(){
        wx.onMenuShareTimeline({
          title: '幸运大抽奖', // 分享标题
          link: sturl + '&sourceSi=', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://ww1.sinaimg.cn/large/005QDhBjgy1fehsfehwulj303c03c3yd.jpg', // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
        });

        wx.onMenuShareQQ({
          title: '幸运大抽奖', // 分享标题
          desc: '', // 分享描述
          link: sturl + '&sourceSi=', // 分享链接
          imgUrl: 'http://ww1.sinaimg.cn/large/005QDhBjgy1fehsfehwulj303c03c3yd.jpg', // 分享图标
          success: function () {
             // 用户确认分享后执行的回调函数
          },
          cancel: function () {
             // 用户取消分享后执行的回调函数
          }
        });
      });
  },
  swiperConfig () {
    var mySwiper = new Swiper('.swiper-container',{
      effect : 'coverflow',
      slidesPerView: 3,
      watchSlidesProgress : true,
      centeredSlides: true,
      loop : true,
      loopAdditionalSlides : 1,
      pagination : '.swiper-pagination',
      coverflow: {
                  rotate: 27,
                  stretch: 10,
                  depth: 60,
                  modifier: 2,
                  slideShadows : true
              }
      });
  },
  getData () {
    // 获取页面初始化时请求的数据
    if(this.data) {
      return this.data;
    }
  },
  getRewardList () {
    // 有奖品的关卡列表
    if(this.data) {
      return this.data.lottery.stageConfig.stageList;
    }
  },
  setTotleTime (data) {
    let configObj = data.lottery.stageConfig;
    if(configObj.isLimitTime){
      let time = configObj.seconds;
      $('#sec').text(time);
    }else {
      $('#sec').text('不限时');
    }
  },
  setScore (data) {
    let score = data.score;
    $('#floatTitleRightAllCount').text(score);
  }
}

requestObj.init();
module.exports = requestObj;
