/* 点赞效果动画 */
$(function(){
	$(document).on('mousemove','body',function(){
		// if($('.click-praise-wrapper').data('is_click') == undefined){
		// 	$('.click-praise-wrapper').data('is_click',true);//给JQuery对象添加属性
		// 	$('.click-praise-wrapper').data('is_click_delay',true);//给JQuery对象添加延迟对象的属性
		// 	$('.click-praise-wrapper').data('is_click_this_delay',true);//给JQuery对象添加延迟对象的属性
		// }
		// if($('.collect-wrapper').data('is_click') == undefined){
		// 	//收藏
		// 	$('.collect-wrapper').data('is_click',true);
		// 	$('.collect-wrapper').data('is_click_delay',true);//给JQuery对象添加延迟对象的属性
		// 	$('.collect-wrapper').data('is_click_this_delay',true);//给JQuery对象添加延迟对象的属性
		// }
		// $(document).off('mousemove','body');
	});
});
function delay_operation(this_obj){//延迟执行
	if(!$(this_obj).data('is_click_delay')){
		return false;
	}
	$(this_obj).data('is_click_delay',false);
	setTimeout(function(){
		$(this_obj).data('is_click_delay',true);
	},500);
	return true;
}
function click_praise(this_obj,click_before_icon_color,click_after_icon_color,is_animation,click_after,cancel_click){//点击的对象 初始图标颜色
	if($(this_obj).data('is_click') == undefined){
		$(this_obj).data('is_click',true);//给JQuery对象添加属性
		$(this_obj).data('is_click_delay',true);//给JQuery对象添加延迟对象的属性
		$(this_obj).data('is_click_this_delay',true);//给JQuery对象添加延迟对象的属性
	}
	if(cancel_click == null){
		cancel_click = function(){
			
		}
	}
	if(click_after == null){
		click_after = function(){
			
		}
	}

	if(!delay_operation(this_obj)){
		return;
	}
	if($(this_obj).data('is_click')){
		if(is_animation){
			$(this_obj).find('.icon-click-praise').css({"animation":"give-like-animation 0.8s ease 0s 1 forwards"});
			$(this_obj).append('<a class="like-right-line like-line"></a><a class="like-left-line like-line"></a>');
			$(this_obj).find('.like-line').css('animation','give-like-line-animation 1s ease 0s 1 forwards');
			setTimeout(function(){
				$(this_obj).find('.like-line').remove();
				$(this_obj).find('.icon-click-praise').css("animation","none");
			},1000);
		}
		$(this_obj).addClass('blog-bottom-operation-li-click-after');
		//点赞人数加一
		if($(this_obj).find('.click-praise-count').length != 0){
			var isuseNumber = parseInt($(this_obj).find('.click-praise-count').text());
			$(this_obj).find('.click-praise-count').text(isuseNumber + 1);
		}
		$(this_obj).data('is_click',false);
		click_after();
	}else{
		$(this_obj).removeClass('blog-bottom-operation-li-click-after');
		//点赞人数减一
		if($(this_obj).find('.click-praise-count').length != 0){
			var isuseNumber = parseInt($(this_obj).find('.click-praise-count').text());
			$(this_obj).find('.click-praise-count').text(isuseNumber - 1);
		}
		$(this_obj).data('is_click',true);
		cancel_click();
	}
	if(parseInt($(this_obj).find('.click-praise-count').text()) == 0){
		$(this_obj).find('.click-praise-count').hide();
	}else{
		$(this_obj).find('.click-praise-count').show();
	}
}

/* 收藏效果动画 */
$(function(){

});
function collect(this_obj,click_before_icon_color,click_after_icon_color,is_animation,click_after,cancel_click){//点击的对象 初始图标颜色
	if($(this_obj).data('is_click') == undefined){
		//收藏
		$(this_obj).data('is_click',true);
		$(this_obj).data('is_click_delay',true);//给JQuery对象添加延迟对象的属性
		$(this_obj).data('is_click_this_delay',true);//给JQuery对象添加延迟对象的属性
	}
	if(cancel_click == null){
		cancel_click = function(){
			
		}
	}
	if(click_after == null){
		click_after = function(){
			
		}
	}
	if(!delay_operation(this_obj)){
		return;
	}
	if($(this_obj).data('is_click')){
		if(is_animation){
			$(this_obj).find('.icon-collect').css({"animation":"heart-animation 0.5s ease 0s 1 forwards"});
			setTimeout(function(){
				$(this_obj).find('.icon-collect').css("animation","none");
			},500);
		}
		//点赞人数加一
		if($(this_obj).find('.icon-collect-count').length != 0){
			var isuseNumber = parseInt($(this_obj).find('.icon-collect-count').text());
			$(this_obj).find('.icon-collect-count').text(isuseNumber + 1);
		}
		$(this_obj).addClass('blog-bottom-operation-li-click-after');
		$(this_obj).data('is_click',false);
		click_after();
	}else{
		$(this_obj).removeClass('blog-bottom-operation-li-click-after');
		//点赞人数减一
		if($(this_obj).find('.icon-collect-count').length != 0){
			var isuseNumber = parseInt($(this_obj).find('.icon-collect-count').text());
			$(this_obj).find('.icon-collect-count').text(isuseNumber - 1);
		}
		$(this_obj).data('is_click',true);
		cancel_click();
	}
}