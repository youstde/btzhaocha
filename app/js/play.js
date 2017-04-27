require('zepto');
let requestObj = require('./sendAjax.js');
let play = {

  "oBack" : document.getElementById("back"),
  "back" : document.getElementsByClassName("back")[0], //重新开始
  "oSec" : document.getElementById("sec"), //倒计时
  "oLev" : document.getElementById("level"), //关数
  "oSta" : document.getElementById("start"), //开始游戏按钮
  "oUl" : document.getElementById("oul"),
  "oLi" : document.getElementById("li1"), //每个图案
  "level" : 1,
  "time" : 15.00,
  "n" : 1,
  'dataObjArr':[1,1],
  'templateobj': '',
  'rewardList': null,
  'gameStart': false,
  'timer': null,
  'isFirstStart': true,
  // 初始化
  "init" : function(){
  	this.start();
  	this.restart();
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
        This.oLi.remove();
        This.timed();
        if(This.isFirstStart){
          This.add();
          This.rewardList = requestObj.getRewardList();
          $.each(This.rewardList, (index, item)=> {
            if(item == 1){
              requestObj.sendGain((data)=>{
                console.log(data);
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
        let data = {};
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
  	this.oBack.onclick = function(){
  		This.oBack.parentNode.style.display = "none";
  		This.n = 1;
  		This.level = 1;
  		This.time = 30.00;
  		let alli = This.oUl.querySelectorAll("li");
  		for (let i = 0; i < alli.length; i++) {
  			alli[i].remove();
  		}
  		This.timed();
  		This.add();
  	}
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
          let outObj = template( 'outLayerTwoTemplate', {data:123} );
          $('#outLayer').html(outObj);
          $('#outLayer').css('display','block');
          requestObj.swiperConfig();
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
    $.each(this.rewardList, (index, item)=>{
      let gameLevel = _this.level -1;
      console.log(gameLevel)
      if(gameLevel == item){
        //发送请求拿奖品
        requestObj.sendGain((data)=>{
          let personRewardNum = Number($('#goodsIconNum').text().slice(1));
          console.log(data);
          $('#goodsIconNum').text(`+${personRewardNum+1}`);
          $('#topgoodsIcon').addClass('showGoodIcon');
          setTimeout(()=>{
            $('#topgoodsIcon').removeClass('showGoodIcon');
          },1000);
          console.log(personRewardNum === 1);
        });
      }
    });
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
  	oImg.src = "../app/imgs/square2.png";
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
  play.init();
  let dataObj = {
        data: [
          [1,1],
          [1,1]
        ]
      }
  let templateobj = template('gameTemplate', dataObj);
  // play.dataObjArr = [1,1,1];
  play.templateobj = templateobj;
    $('.gameRule').css('display','block');
})
