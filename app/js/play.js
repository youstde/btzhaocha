require('zepto');

let play = {

  "oBack" : document.getElementById("back"),
  "back" : document.getElementsByClassName("back")[0], //重新开始
  "oSec" : document.getElementById("sec"), //倒计时
  "oLev" : document.getElementById("level"), //关数
  "oSta" : document.getElementById("start"), //开始游戏按钮
  "oUl" : document.getElementById("oul"),
  "oLi" : document.getElementById("li1"), //每个图案
  "level" : 1,
  "time" : 30.00,
  "n" : 1,
  'dataObjArr':[1,1],
  'templateobj': '',
  // 初始化
  "init" : function(){
  	this.start();
  	this.restart();
  },
  // 开始
  "start" : function(){
  	var This = this;
  	This.oLev.innerHTML = This.n;
  	This.oSta.onclick = function(){
  		This.oSta.remove();
  		This.oLi.remove();
  		This.timed();
  		This.add();
  	}
  },
  // 重新开始
  "restart" : function(){
  	var This = this;
  	this.oBack.onclick = function(){
  		This.oBack.parentNode.style.display = "none";
  		This.n = 1;
  		This.level = 1;
  		This.time = 30.00;
  		var alli = This.oUl.querySelectorAll("li");
  		for (var i = 0; i < alli.length; i++) {
  			alli[i].remove();
  		}
  		This.timed();
  		This.add();
  	}
  },
  // 游戏倒计时
  "timed" : function(){
  	var This = this;
  	var timer = setInterval(function(){
  		This.time = (This.time-0.02).toFixed(2);
  		This.oSec.innerHTML = This.time;
  		if(This.time <= 0){
  			clearInterval(timer);
  			if(This.n < 8){
  				alert("睁眼瞎");
  			}else if(This.n >= 20){
  				alert("找不到词语形容你非人类的眼睛");
  			}else if(This.n >= 12){
  				alert("火眼金睛");
  			}else{
  				alert("高度近视");
  			}
  			This.oBack.parentNode.style.display = "block";
  		}

  	},20);
  },
  // 添加图片
  "add" : function(){
  	this.level++;
  	this.oLev.innerHTML = this.n;
    $('#oul').html(this.templateobj);
    let stdataObjArr = this.dataObjArr;
    console.log(this.dataObjArr);
    let count = this.level-1;
    console.log(stdataObjArr);
    let dataObj = {
      data: []
    }
    for(var i=0;i<count;i++){
        stdataObjArr.push(1);
    }
    for(var j =0;j<stdataObjArr.length;j++){
      dataObj.data[j] = stdataObjArr;
    }
    console.log(dataObj);
    var templateobj = template('gameTemplate', dataObj);
    this.templateobj = templateobj;
  	var ran = this.randcolor(this.level*this.level);
  	var alli = this.oUl.querySelectorAll("li");
  	var oImg = alli[ran].children[0];
  	oImg.src = "../app/imgs/square2.png";
  	var This = this;
  	alli[ran].onclick = function(){
  		This.n++;
  		for (var i = 0; i < alli.length; i++) {
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
  var dataObj = {
        data: [
          [1,1],
          [1,1]
        ]
      }
  var templateobj = template('gameTemplate', dataObj);
  // play.dataObjArr = [1,1,1];
  play.templateobj = templateobj;
    $('.gameRule').css('display','block');
})
