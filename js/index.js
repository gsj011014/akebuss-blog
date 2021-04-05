var eyes = document.getElementsByClassName('eyes'),
	InputIdName = [];
	for(var i = 0;i < eyes.length;i++){
		var inputObj = eyes[i].parentNode.parentNode.getElementsByTagName('input');
			for(var j = 0;j < inputObj.length;j++){
				if(inputObj[j].type == 'password'){
					InputIdName.push(inputObj[j].id);
				}
			}
			(function(j){
				eyes[j].onclick = function(){
					ChangeEyes(this,InputIdName[j]);
				}	
			})(i);
	}
	function ChangeEyes(obj,InputIdName){
		var InputObj = obj.parentNode.parentNode.childNodes;
		for(var i = 0;i < InputObj.length;i++){
			if(InputObj[i].id == InputIdName){
				if(InputObj[i].type == 'password'){
					InputObj[i].type = 'text';
					obj.src = "image/login-page/xianshi.png";
				}else{
					InputObj[i].type = 'password';
					obj.src = "image/login-page/yincang.png";
				}
			}
		}
	}
var logon=document.querySelector('.login-text');
var logoncen=document.querySelector('.logon');
var logins=document.querySelector('.register-text');
var loginscen=document.querySelector('.logins');
var botline = document.getElementById('bottom-line');
var main=document.querySelector('.login-wrapper')
logins.onclick = function(){
	botline.style.left = '50%';
	logoncen.style.opacity = 0;
	logoncen.style.display='none';
	loginscen.style.display = 'block';
	setTimeout(function(){
		loginscen.style.opacity = 1;
	});
}
logon.onclick=function(){
	botline.style.left = '0%';
	loginscen.style.opacity = 0;
	loginscen.style.display = 'none';
	logoncen.style.display='block';
	setTimeout(function(){
		logoncen.style.opacity = 1;
	});
}
var passwordone = document.querySelector('#user');
var passwordtwo=document.querySelector('#password')//第一页密码
var passwordthree=document.querySelector('#user-two')//第二页用户名
var passwordfour=document.querySelector('#password-two')//第二页密码
var passwordfive=document.querySelector('#password-three')//第二页确认密码
var logOne=document.querySelector("#log")
var logTwo=document.querySelector("#log-two")
var nextpassword=document.querySelector('.user-nextpassword-text')
passwordone.onblur = function(){ //第一页用户名
	Hint(this);
}
passwordtwo.onblur = function(){ //第一页密码
	Hint(this);
}
passwordthree.onblur = function(){ //第二页用户名
	Hint(this);
}
passwordfour.onblur = function(){ //第二页密码
	Hint(this);
}
passwordfive.onblur = function(){ //第二页确认密码
	if(passwordfive.value!=passwordfour.value){
      this.parentNode.nextElementSibling.innerHTML = "确认密码输入有误";
	}else if(passwordfive.value==''){
       this.parentNode.nextElementSibling.innerHTML = "不能为空";
	}else{
		this.parentNode.nextElementSibling.innerHTML = " ";
	}
	setInterval(function(){
			passwordfive.parentNode.nextElementSibling.style.animation = 'none';
		},1000)
}
function Hint(obj){
	if(obj.value==''){
		obj.parentNode.nextElementSibling.innerHTML='不能为空'
    }else{
       obj.parentNode.nextElementSibling.innerHTML=''
    }
	setInterval(function(){
		obj.parentNode.nextElementSibling.style.animation = 'none';
	},1000)
} 
logTwo.onclick=function(){  //点击注册之后跳转页面	
		if(passwordthree.value!='' && passwordfour.value!='' && passwordfive.value!='' && nextpassword.innerHTML==" "){
			botline.style.left = '0%';
			loginscen.style.opacity=0;
			logoncen.style.display='block';
	}
}
nextpassword.onclick=function(){
	console.log(nextpassword.innerHTML)
}
logOne.onclick=function(){//点击登陆页面后跳转
		if(passwordone.value!='' && passwordtwo.value!=''){
		location.href='plus/HomePage.html'
	}
}