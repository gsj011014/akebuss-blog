var type = location.search.split('?')[1].split('type=')[1];
console.log(type)
var bodyPart=document.querySelector('.body-part');
if(type == hex_md5('评论')){
	document.getElementById('body-tab-1').click();
	bodyPart.style.left='0%'
}
var a=hex_md5('评论');
console.log(hex_md5('评论'))
if(type == hex_md5('关注')){
	document.getElementById('body-tab-2').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('点赞')){
	document.getElementById('body-tab-3').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('收藏')){
	document.getElementById('body-tab-4').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('私信')){
	document.getElementById('body-tab-5').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('回答')){
	document.getElementById('body-tab-6').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('系统通知')){
	document.getElementById('body-tab-7').click();
	bodyPart.style.left='0%'
}
if(type == hex_md5('消息设置')){
	document.getElementById('body-tab-8').click();
	bodyPart.style.left='0%'
}
$(function(){
	//搜索联系人
	$('#messageSearchBox').on('input', function(){
	   var sstxt=$('#messageSearchBox').val();
	        $(".information").parents('li').hide()
	         .filter(":contains('"+sstxt+"')")
	         .show();
	})
});
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
//关注页,再次点击已关注取消关注,再次点击再次关注
var attentionAttention=document.querySelector('.attentionAttention')
	var flag=0
attentionAttention.onclick=function(){
	if(flag==0){
		attentionAttention.innerHTML='关注'
		// this.style.boxShadow='0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1'
		flag=1
	}else{
		attentionAttention.innerHTML='已关注'
		// this.style.boxShadow='0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1'
		flag=0
	}
}
//点击好友聊天
var messageLinkman=document.querySelector('.messageLinkman').querySelectorAll('li')
var messageChat=document.querySelector('.messageChat').querySelectorAll('.chat')
var chatName=document.querySelectorAll('.chatNameTwo')
var chatNameBottom=document.querySelectorAll('.chatName')
var informationName=document.querySelectorAll('.informationName')
var chatIndex=document.querySelector('.chatIndex')
var messageChatMain=document.querySelector('.messageChat')
var getBack=document.querySelectorAll('.getBack')
var chatRoom =document.querySelectorAll('.chatRoom')
for(var i=0;i<getBack.length;i++){
	getBack[i].onclick=function(){
	messageChatMain.style.left='100%'
}
}
for(var i=0;i<messageLinkman.length;i++){
	messageLinkman[i].index=i;
	messageLinkman[i].onclick=function(){
		messageChatMain.style.left='0'
		chatIndex.style.display='none'
		for(var j=0;j<messageLinkman.length;j++){
			messageLinkman[j].style.backgroundColor='#33353a'
		}
		messageLinkman[this.index].style.backgroundColor='#292b2e'
		for(var i=0;i<messageChat.length;i++){
			messageChat[i].style.display='none';
		}
		// for(var k=0;k<chatNameBottom.length;k++){
		// 	chatNameBottom[k].style.borderBottom='0px solid red'
		// }
		messageChat[this.index].style.display='block'
		// chatNameBottom[this.index].style.borderBottom='2px solid #000'
		chatName[this.index].innerHTML=informationName[this.index].innerText;
	}
}
//发送消息
var chatInput=document.querySelectorAll('.chatInputs')
	for(var i=0;i<chatInput.length;i++){
		chatInput[i].onkeydown=function(e){
			var ev=e.keyCode;
			if(ev==13){
				var chatDivs=document.createElement('div')
					var s=this.previousElementSibling
					s.appendChild(chatDivs);
					chatDivs.innerHTML=this.value;
					this.value="";
					chatDivs.style.backgroundColor='#9ACD32'
					chatDivs.style.marginRight='10px'
					chatDivs.style.float='right'
			}
		}
	} 
//移动端发送消息
var chatGo=document.querySelectorAll('.chatGo')
for(var i=0;i<chatGo.length;i++){
	
	chatGo[i].onclick=function(){
		var chatDivs=document.createElement('div')
			var s=this.previousElementSibling
			s.previousElementSibling.appendChild(chatDivs);
			chatDivs.innerHTML=s.value;
			console.log(s)
			s.value=''
			chatDivs.style.backgroundColor='#9ACD32'
			chatDivs.style.marginRight='10px'
			chatDivs.style.float='right'
	}
	chatRoom.scrollTop=chatRoom.scrollHeight
}
//测试聊天
var ceshi=document.querySelectorAll('.ceshi')
for(var i=0;i<ceshi.length;i++){
	ceshi[i].onclick=function(){
		var chatDivs=document.createElement('div')
			var s=this.previousElementSibling
			var d=s.previousElementSibling
			d.previousElementSibling.appendChild(chatDivs);
			chatDivs.innerHTML=this.value;
	}
}
//点击开关按钮
var setInput=document.querySelectorAll('.setInput')
var setBtn=document.querySelectorAll('.setBtn')
var setBtns=document.querySelectorAll('.setBtns')
// var flage=0
for(var i=0;i<setBtn.length;i++){
	setBtn[i].index=i;
	setBtn[i].onclick=function(){
		if(setInput[this.index].checked==false){
			setInput[this.index].checked=true
			setBtns[this.index].style.left='30px'
			// console.log(setInput[this.index].checked)	//测试是否开启和关闭按钮
		}else{
			setInput[this.index].checked=false
			setBtns[this.index].style.left='7px'
			// console.log(setInput[this.index].checked)
		}
	}
}
for(var i=0;i<setBtns.length;i++){
	setBtns[i].index=i;
	setBtns[i].onclick=function(){
		if(setInput[this.index].checked==false){
			setInput[this.index].checked=true
			setBtns[this.index].style.left='30px'
			// console.log(setInput[this.index].checked)
		}else{
			setInput[this.index].checked=false
			setBtns[this.index].style.left='7px'
			// console.log(setInput[this.index].checked)
		}
	}
}
//点赞页中清除消息功能
var oclockClear=document.querySelector('.oclock'). querySelectorAll('.icon-bin')
var oclockLi=document.querySelector('.oclock').querySelectorAll('li')
for(var i=0;i<oclockClear.length;i++){
	oclockClear[i].index=i;
	oclockClear[i].onclick=function(){
		oclockLi[this.index].remove()
	}
}
//点赞页中清除全部消息功能
var oclockUnreadClearAll=document.querySelector('.oclockUnreadClearAll')
var oclickHeadImg=document.querySelector('.oclockHeadImg')
var oclock=document.querySelector('.oclock')
oclockUnreadClearAll.onclick=function(){
	for(var i=0;i<oclockLi.length;i++){
		oclockLi[i].remove()
		oclickHeadImg.style.display='none'
		oclock.innerHTML='您还没有点赞信息'
		oclock.style.fontSize='22px'
		oclock.style.textAlign='center'
		oclock.style.lineHeight='520px'
		oclock.style.color='#A3A7AE'
	}
}
//点赞页红点显示
// var oclockRedDot=document.querySelector('.oclock').querySelectorAll('.oclockRedDot')
var oclockRedDot=document.querySelectorAll('.oclockRedDot')
var oclockUnreadNum=document.querySelector('.oclockUnreadNum')
var oclockRedLength=oclockRedDot.length
oclockUnreadNum.innerText=oclockRedLength
for(var i=0;i<oclockLi.length;i++){
	oclockLi[i].onclick=function(){
		var oclockLione=this.childNodes[1]
		var oclockLitwo=oclockLione.childNodes[1]
		var oclockLithree=oclockLitwo.childNodes[1]
		if(oclockLithree.className=='oclockRedDot'){
			// oclockLithree.remove();
			oclockLithree.className=''
			oclockRedLength--
			console.log(oclockRedLength)
			oclockUnreadNum.innerText=oclockRedLength
		}
	}
}
//系统通知页中清除消息功能
var informClear=document.querySelector('.inform'). querySelectorAll('.icon-bin')
var informLi=document.querySelector('.inform').querySelectorAll('li')
for(var i=0;i<informClear.length;i++){
	informClear[i].index=i;
	informClear[i].onclick=function(){
		informLi[this.index].remove()
	}
}
//系统通知页清除全部消息功能
var informUnreadClearAll=document.querySelector('.informUnreadClearAll')
var informHeadImg=document.querySelector('.informHeadImg')
var inform=document.querySelector('.inform')
informUnreadClearAll.onclick=function(){
	for(var i=0;i<informLi.length;i++){
		informLi[i].remove()
		oclickHeadImg.style.display='none'
		inform.innerHTML='您没有通知信息'
		inform.style.fontSize='22px'
		inform.style.textAlign='center'
		inform.style.lineHeight='520px'
		inform.style.color='#A3A7AE'
	}
}
//系统通知页红点显示
// var oclockRedDot=document.querySelector('.oclock').querySelectorAll('.oclockRedDot')
var informRedDot=document.querySelectorAll('.informRedDot')
var informUnreadNum=document.querySelector('.informUnreadNum')
var informRedLength=informRedDot.length
informUnreadNum.innerText=informRedLength
for(var i=0;i<informLi.length;i++){
	informLi[i].onclick=function(){
		var informLione=this.childNodes[1]
		var informLitwo=informLione.childNodes[1]
		var informLithree=informLitwo.childNodes[1]
		if(informLithree.className=='informRedDot'){
			// informLithree.remove();
			informLithree.className=''
			informRedLength--
			console.log(informRedLength)
			informUnreadNum.innerText=informRedLength
		}
	}
}