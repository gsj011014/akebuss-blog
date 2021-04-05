//移动端展示的顶部导航效果
$(function(){
	// touch_vertical_direction($('#bottom-wrapper').get(0),50,function(){//向上滑动
		//$('header').css('top','-50px');
	// },function(){//向下滑动
	// 	$('header').css('top','0px');
	// });
});
function touch_vertical_direction(listener_obj,limit,up_fun,down_fun){//判断手指向上滑动还是向下滑动
	var moblie_width = window.matchMedia('(max-width:568px)');
	listener_obj.ontouchstart = function(event){
		var TouchStart = event.touches[0],
			startY = TouchStart.clientY;
			var last_moveY = 0;
		listener_obj.ontouchmove = function(event){
			if(!moblie_width.matches){//根据屏幕大小设置帮助的宽度
				return;
			}
			var TouchMove = event.touches[0],
				moveY = TouchMove.clientY;
				if(moveY > last_moveY){//代表下滑
					if(down_fun == null){
						down_fun = function(){
							
						}
						return;
					}
					down_fun();
				}else{//代表上滑
					if(startY - moveY > limit){
						if(up_fun == null){
							up_fun = function(){
								
							}
							return;
						}
						up_fun();
					}					
				}
			last_moveY = moveY;
		}
	}
}