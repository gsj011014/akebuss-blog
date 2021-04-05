function open_url(url,type){
	location.href = ""+url+"?type="+hex_md5(type)+"";
}
/* 点赞 收藏 */
$(function(){
	// 点赞
	$('.click-praise-wrapper').click(function(event){
		click_praise($(this),'rgb(107, 107, 107)','rgb(202, 12, 22)',true,() => {
			
		},() => {
			
		});
		event.stopPropagation(); //阻止事件冒泡
	});
	// 收藏
	$('.collect-wrapper').click(function(){
		collect($(this),'rgb(107, 107, 107)',"rgb(202,12,22)");
		event.stopPropagation();
	});
});
/* 博客数据懒加载 */
$(function(){
	$('#bottom-wrapper').scroll(function(){
		if(IsReachTheBottom(this)){//到达底部
			if($(this).find('.blogs-loading').length == 0){
				$('#bottom-wrapper #issue-blogs').append('<div class="blogs-loading"><!-- 加载博客 -->	<div class="loading-Wrapper"><!-- 加载包装 -->		<div class="item-loader-container loading-Wrapper-child">		    <div class="la-ball-triangle-path la-2x">		        <div></div>		        <div></div>		        <div></div>		    </div>		</div>		<span class="loading-the-hours loading-Wrapper-child">数据加载中...</span>	</div><span class="update-text">已为你更新10条内容</span></div>');
				setTimeout(function(){
					var ScrollTopSize =  parseInt($('#bottom-wrapper #issue-blogs').height() - $('#bottom-wrapper').height() + 10);
					var start_scroll_top = $('#bottom-wrapper').scrollTop();
					var end_scroll_top = ScrollTopSize;
					var interval_scroll = setInterval(function(){
						if(start_scroll_top < end_scroll_top){
							start_scroll_top += 3;
							$('#bottom-wrapper').scrollTop(start_scroll_top);
						}else{
							clearInterval(interval_scroll);
						}
					},1);
				},20);
				setTimeout(function(){
					$('#bottom-wrapper #issue-blogs .blogs-loading .loading-Wrapper').hide();
					$('#bottom-wrapper #issue-blogs .blogs-loading .update-text').show();
					setTimeout(function(){
						$('#bottom-wrapper #issue-blogs .blogs-loading').css('height','0px');
						setTimeout(function(){
							$('#bottom-wrapper #issue-blogs .blogs-loading').remove();
							$('#bottom-wrapper #issue-blogs .blogs-loading .loading-Wrapper').show();
							$('#bottom-wrapper #issue-blogs .blogs-loading .update-text').hide();
						},600);
					},2000);
				},2000);
			}
		}
	}); 
	function IsReachTheBottom(obj){//是否到达底部
		var IssueBlogsHeight = $('#bottom-wrapper #issue-blogs').height(),
			BottomWrapperHeight = $('#bottom-wrapper').height();
			if(parseInt($(obj).scrollTop()) >= parseInt(IssueBlogsHeight - BottomWrapperHeight)){
				return true;
			}
	}
});

//悬浮弹窗
SuspensionPromptPopUp.create('登录成功');

// $(function(){
// 	setInterval(() => {
// 		debugger
// 	}, 1000)
// });