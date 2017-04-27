require('zepto');
let btgame = require('./main.js');
let requestObj = require('./sendAjax.js');
let bLevel = {
    qq: {forbid: 0, lower: 1, higher: 2},
    uc: {forbid: 0, allow: 1}
};
let UA = navigator.appVersion,
    isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid,
    isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid,
    isWeiXin = btgame.isWeiXin();
let play = {
  "oBack" : document.getElementById("back"),
  "back" : document.getElementsByClassName("back")[0], //重新开始
  "oSec" : document.getElementById("sec"), //倒计时
  "oLev" : document.getElementById("level"), //关数
  "oSta" : document.getElementById("start"), //开始游戏按钮
  "oUl" : document.getElementById("oul"),
  // "oLi" : document.getElementById("li1"), //每个图案
  "level" : 1,
  "time" : 0,
  "n" : 1,
  'dataObjArr':[1,1],
  'templateobj': '',
  'rewardList': null,
  'gameStart': false,
  'timer': null,
  'isFirstStart': true,
  'isAgainStart': false,
  'haveRewardLists': [],
  'allTime': 0,
  'allScore': 0,
  // 初始化
  "init" : function(){
    let _this = this;
    requestObj.sendFirst((data)=> {
      _this.time = data.data.lottery.stageConfig.seconds;
      _this.allTime =  data.data.lottery.stageConfig.seconds;
      _this.start();
    });
  	// this.restart();
  },
  // 开始
  "start" : function(){
  	let This = this;
  	This.oLev.innerHTML = 0;
  	This.oSta.onclick = function(){
  		// This.oSta.remove();
      if(!This.gameStart) {
        This.gameStart = true;
        $('#start').css('display','block');
        $('#start').text('暂停');
        // This.oLi.remove();
        This.timed();
        if(This.isFirstStart){
          This.add();
          This.rewardList = requestObj.getRewardList();
          $.each(This.rewardList, (index, item)=> {
            if(item == 1){
              This.allScore += 1;
              requestObj.sendGain((data)=>{
                if(data.data) {
                  This.haveRewardLists.push(data.data);
                  console.log(This.haveRewardLists);
                }
                $('#topgoodsIcon').addClass('showGoodIcon');
                $('#goodsIconNum').text('+1');
                setTimeout(()=>{
                  $('#topgoodsIcon').removeClass('showGoodIcon');
                },1000);
              });
            }
          });
          This.isFirstStart = false;
        }
      }else {
        // 暂停
        This.gameStart = false;
        $('#start').css('display', 'none');
        let data = {
          data: This.haveRewardLists
        };
        console.log(data);
        let obj = template('outLayerFirstTemplate', data);
        $('#outLayer').html(obj);
        $('#outLayer').css('display', 'block');
        $('#contuineBtn').on('click', ()=>{
          This.gameStart = true;
          $('#start').css('display', 'block');
          $('#start').text('暂停');
          This.timed();
          $('#outLayer').css('display', 'none');
        });
        requestObj.swiperConfig();
        clearInterval(This.timer);
      }
  	}
  },
  // 重新开始
  "restart" : function(){
  	let This = this;
    This.isAgainStart = true;
    This.n = 1;
    This.level = 1;
    This.time = This.allTime;
    let dataObj = {
          data: [
            [1,1],
            [1,1]
          ]
        }
    let templateobj = template('gameTemplate', dataObj);
    // play.dataObjArr = [1,1,1];
    This.templateobj = templateobj;
    This.timed();
    This.add();
  },
  // 游戏倒计时
  "timed" : function(isPause){
  	let This = this;
  	This.timer = setInterval(function(){
  		This.time = (This.time-0.02).toFixed(2);
  		This.oSec.innerHTML = This.time;
  		if(This.time <= 0){
  			clearInterval(This.timer);
  			setTimeout(()=> {
          // alert('结束了');
          let data = {
            data: This.haveRewardLists
          };
          console.log(data);
          let obj = template('outLayerTwoTemplate', data);
          $('#outLayer').html(obj);
          $('#outLayer').css('display', 'block');
          $('#outLayerAllNum').text(This.allScore);
          requestObj.swiperConfig();
          $('#reStart').on('click', ()=> {
            $('#outLayer').css('display','none');
            This.restart();
          });
          btgame.closeGameEndBtn();
          $('#shareBtn').on('click', ()=> {
            if(isqqBrowser || isucBrowser) {
              $('#outLayer').css('display','none');
              $('#nativeShareLayer').css('display','block');
              $('#nativeShareLayer').on('click', ()=> {
              	$('#nativeShareLayer').css('display','none');
                window.location.reload();
              });
            }else if(isWeiXin){
                // 微信原生
                $('#weixinOutLayer').css('display', 'block');
                $('#weixinOutLayer').on('click', ()=> {
                  $('#weixinOutLayer').css('display', 'none');
                });
            }else {
              alert('该浏览器暂不支持分享功能！');
            }
          });
        }, 100);
  			This.oBack.parentNode.style.display = "block";
  		}

  	},20);
  },
  // 添加图片
  "add" : function(){
  	this.level++;
    let _this = this;
    // console.log(this.rewardList);
    if(!this.isAgainStart) {
      $.each(this.rewardList, (index, item)=>{
        let gameLevel = _this.level -1;
        console.log(gameLevel)
        if(gameLevel == item){
          //发送请求拿奖品
          This.allScore += 1;
          requestObj.sendGain((data)=>{
            if(data.data) {
              This.haveRewardLists.push(data.data);
              console.log(This.haveRewardLists);
            }
            let personRewardNum = Number($('#goodsIconNum').text().slice(1));
            console.log(data);
            $('#goodsIconNum').text(`+${personRewardNum+1}`);
            $('#floatHand').css('display','block');
            $('#topgoodsIcon').addClass('showGoodIcon');
            setTimeout(()=>{
              $('#topgoodsIcon').removeClass('showGoodIcon');
            },1000);
            setTimeout(()=>{
              $('#floatHand').css('display','none');
            },2000);
            console.log(personRewardNum === 1);
          });
        }
      });
    }
  	this.oLev.innerHTML = this.n;
    $('#oul').html(this.templateobj);
    let stdataObjArr = this.dataObjArr;
    console.log(this.dataObjArr);
    let count = this.level-1;
    console.log(stdataObjArr);
    let dataObj = {
      data: []
    }
    for(let i=0;i<count;i++){
        stdataObjArr.push(1);
    }
    $.each(stdataObjArr, (j ,item)=> {
      dataObj.data[j] = stdataObjArr;
    });
    console.log(dataObj);
    let templateobj = template('gameTemplate', dataObj);
    this.templateobj = templateobj;
  	let ran = this.randcolor(this.level*this.level);
  	let alli = this.oUl.querySelectorAll("li");
  	let oImg = alli[ran].children[0];
  	oImg.src = "//static.adbaitai.com/game/Zhaoocha/imgs/square2.png";
  	let This = this;
  	alli[ran].ontouchstart = function(){
  		This.n++;
  		for (let i = 0; i < alli.length; i++) {
  			alli[i].remove();
  		}
  		// if(This.level >= 11)
  		// 	This.level = 11;
  		This.add();
  	}
    dataObj = null;
    this.dataObjArr = [1,1];
  },
  // 生成随机数
  "randcolor" : function(num){
  	return Math.floor(Math.random()*num);
  }
}
Zepto(function($){
  // 预加载方格中的数据
  play.init();
  let dataObj = {
        data: [
          [1,1],
          [1,1]
        ]
      }
  let templateobj = template('gameTemplate', dataObj);
  play.templateobj = templateobj;
  $('.gameRule').css('display','block');
  let postData = {
    data: [1,1,1,1]
  }
  let postTemplateObj = template('gamePostTemplate', postData);
  $('#oul').html(postTemplateObj);
  // 点击奖品图标显示弹窗
  $('#topgoodsIcon').on('click', ()=> {
    if(play.gameStart){
      let data = {
        data: play.haveRewardLists
      };
      console.log(data);
      let obj = template('outLayerFirstTemplate', data);
      $('#outLayer').html(obj);
      $('#outLayer').css('display', 'block');
      requestObj.swiperConfig();
      play.gameStart = false;
      clearInterval(play.timer);
    }

    $('#contuineBtn').on('click', ()=> {
      $('#outLayer').css('display', 'none');
      play.timed();
      play.gameStart = true;
    });
  });
});
