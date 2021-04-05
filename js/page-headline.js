/* 顶部导航 */
$(function(){
	//移入用户信息,显示信息列表.
	$('.list-wrapper').hover(function(){
		$(this).css('background-color','white');
		$(this).find('.color-change-white').css('color','black');
		$(this).find('ul').show();
	},function(){
		$(this).css('background-color','transparent');
		$(this).find('.color-change-white').css('color','white');
		$(this).find('ul').hide();
	});
	//移入信息列表的选项,改变背景颜色和字体颜色.
	$('.header-wrapper-pc .user-information li').hover(function(){
		$(this).find('span').css('color','white');
	},function(){
		$(this).find('span').css('color','black');
	});
	//点击菜单按钮
	$('.header-wrapper-mobile .icon-menu').click(function(){
		if($('.mobile-list').css('top') != '49.9px'){
			$('.mobile-list').css({"top":"49.9px","opacity":"1"});
			$(this).removeClass('icon-menu');
			$(this).addClass('icon-clear');
		}else{
			$('.mobile-list').css({"top":"-100vh","opacity":"0"});
			$(this).removeClass('icon-clear');
			$(this).addClass('icon-menu');
		}
	});
});