var type = location.search.split('?')[1].split('type=')[1];
console.log(type)
var bodyPart=document.querySelector('.body-part');
if(type == hex_md5('个人中心')){
	console.log(11)
	document.getElementById('body-tab-1').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('我的博客')){
	console.log(22)
	document.getElementById('body-tab-2').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('我的收藏')){
	document.getElementById('body-tab-3').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('切换账号')){
	document.getElementById('body-tab-4').click();
	bodyPart.style.left='0%'
}
// 展示部分
function TabChange(name,now,num){
	for(var i=1;i<=num;i++){
		var tabLi=document.getElementById(name+'-'+i);
		var tabDiv=document.getElementById(name+'-right'+i);
		tabLi.className=i==now?"tab-left":"";
		tabDiv.style.opacity=i==now?"1":"0";
		tabDiv.style.zIndex=i==now?"1":"-1";
	}
}
//切换账号---登录
var switchUser=document.querySelector('#switch-user')
var switchPassword=document.querySelector('#switch-password')
var switchLogon=document.querySelector('#switch-logon')
switchLogon.onclick=function(){
	if(switchUser.value!=''&&switchPassword.value!=''){
		location.reload();
	}
}
