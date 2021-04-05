/**
 * 皮肤的flex布局
 */
$(function(){
	ChangeFlex($('#skin-list li'),'li');
	window.onresize = function(){
		ChangeFlex($('#skin-list li'),'li');
	}
});

/**
 * 选择皮肤
 */
$(function(){
	$('#skin-list li').click(function(){
		$('#current_choose_skin-shade').remove();
		$(this).append('<div id="current_choose_skin-shade"><img class="current_choose_skin" src="../image/post_blog_last_operation/ok.png" ></div>');
		
		/**
		 * 获取皮肤地址
		 */
		if($(this).find('.skin-bg').css('background-image') == 'none'){ //代表是纯色皮肤
			var current_blog_bgColor = $(this).find('.skin-bg').css('background-color');
				$('#edit-page').css({
					"background-color":current_blog_bgColor,
					"background-image":"none"
				});
		}else{
			 var current_blog_bgImage = $(this).find('.skin-bg').css('background-image');
				$('#edit-page').css({
					"background-color":"none",
					"background-image":current_blog_bgImage
				});
		}
	});
});

/**
 * 载入内容
 */
// $(function(){
// 	var issue_content = localStorage.getItem('issue_content'),
// 		issue_blog_title = localStorage.getItem('issue_blog_title');
// 		$('#edit-page').empty().append(issue_content);
// 		console.log(issue_content)
// });

/**
 * 点击发表按钮 取消发表按钮
 */
$(function(){
	$('#sure-issue').click(function(){ //点击确定发表
		var issue_json = [
			{
				'issue_content':localStorage.getItem('issue_content'),
				'issue_blog_title': localStorage.getItem('issue_blog_title')
			}
			
		];
		var current_bg = null; //当前选择的背景
		if($('#current_choose_skin-shade').siblings('.skin-bg').css('background-color') != 'rgba(0, 0, 0, 0)'){
			current_bg = $('#current_choose_skin-shade').siblings('.skin-bg').css('background-color');
		}else{
			current_bg = $('#current_choose_skin-shade').siblings('.skin-bg').css('background-image');
		}
		$('#upload-interface').fadeIn();
		setTimeout(function(){
			$('#upload-interface').css('display','flex');
		});
	});
	
	$('#cancel-uploading').click(function(){ //点击取消发表
		$('#upload-interface').fadeOut();
	});
});