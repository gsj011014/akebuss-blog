/**
 * 光标移上头像,显示个人资料
 */
$(function(){
	var is_hover = false;
	var view_area_height = $(document.body).outerHeight(true),
		view_area_width = $(document.body).outerWidth(true);
	var moblie_terminal = window.matchMedia('(max-width:1400px)');
	$(document).on({
		mouseenter : function(event){
			event.stopPropagation();
			if(moblie_terminal.matches){
				return;
			}
			if($(this).find('#personal_data').length == 0){
				$(this).append('<div id="personal_data"><p id="triangle-top"></p><p id="triangle-bottom"></p><div class="personal_information_wrapper"><p class="personal_head_portrait"></p><div class="personal_information"><p class="personal-name">谷世杰</p><p class="personal-medal">勋章：</p><p class="personal-signature">个性签名：世界在我们脚下，因为我们正青春！</p></div></div><div class="personal_information_bottom"><div class="attention_wrapper"><span id="other-user-fans" class="bg-red-bo-red personal-attention-btn">关注</span><span class="personal-fans-count"><span>粉丝 </span><span class="personal-fans-count-text">119</span></span></div><div class="visit_homepage"><span class="private_letter">私信</span><span class="visit_homepage-btn">访问主页</span></div></div></div>');
				if($('#personal_data').css('display') == 'none'){
					$(this).find('#personal_data').remove();
				}
				/* 根据可视区域 计算出个人资料显示的位置 */
				if(view_area_height - $(this).find('#personal_data').offset().top < $(this).find('#personal_data').outerHeight(true) + 10){//代表需要显示在移入对象的上方 下面区域已经放不下了
					$(this).find('#personal_data').css({
						"top" : "auto",
						"bottom" : $(this).outerHeight(true) + 15 + "px"
					});
					$(this).find('#personal_data #triangle-top').hide();
					$(this).find('#personal_data #triangle-bottom').show();
				}else{
					$(this).find('#personal_data').css({
						"top" : $(this).outerHeight(true) + 15 + "px",
						"bottom" : "auto"
					});
					$(this).find('#personal_data #triangle-top').show();
					$(this).find('#personal_data #triangle-bottom').hide();
				}
			}
			is_hover = true;
		},
		mouseleave : function(){
			if(moblie_terminal.matches){
				return;
			}
			var this_ele = $(this);
			if($(this_ele).find('#personal_data').length != 0){
				setTimeout(function(){
					if(is_hover){
						is_hover = true;
					}else{
						$(this_ele).find('#personal_data').remove();
					}
				},80);
			}
			is_hover = false;
		}
	},'.show_personal_data_ele');
	$(document).on('click','#other-user-fans',function(){
		$(this).toggleClass('click-attention-after');
		if($(this).hasClass('click-attention-after')){
			$('.attention-btn-personal').text('已关注');
			$(this).siblings('.personal-fans-count').find('.personal-fans-count-text').text(parseInt($(this).siblings('.personal-fans-count').find('.personal-fans-count-text').text()) + 1);
		}else{
			$('.attention-btn-personal').text('关注');
			$(this).siblings('.personal-fans-count').find('.personal-fans-count-text').text(parseInt($(this).siblings('.personal-fans-count').find('.personal-fans-count-text').text()) - 1);
		}
	});
});

/**
 * 加载点
 */
$(function(){
	if($('.dot-loading').length != 0){ //代表存在
		var type = 0;
		var interval = setInterval(function(){
			if(type == 0){
				$('.dot-loading').find('span').eq(0).css('opacity',1);
				$('.dot-loading').find('span').eq(1).css('opacity',0);
				$('.dot-loading').find('span').eq(2).css('opacity',0);
				type = 1;
			}else if(type == 1){
				$('.dot-loading').find('span').eq(0).css('opacity',1);
				$('.dot-loading').find('span').eq(1).css('opacity',1);
				$('.dot-loading').find('span').eq(2).css('opacity',0);
				type = 2;
			}else if(type == 2){
				$('.dot-loading').find('span').eq(0).css('opacity',1);
				$('.dot-loading').find('span').eq(1).css('opacity',1);
				$('.dot-loading').find('span').eq(2).css('opacity',1);
				type = 3;
			}else if(type == 3){
				$('.dot-loading').find('span').eq(0).css('opacity',0);
				$('.dot-loading').find('span').eq(1).css('opacity',0);
				$('.dot-loading').find('span').eq(2).css('opacity',0);
				type = 0;
			}
		},500);
	}
});