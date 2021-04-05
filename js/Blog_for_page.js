window.onload = function(){
	$('#blog-user-comment').get(0).addEventListener('DOMNodeInserted', function(){//同步内容
		comment_count_operation();
	}, false);
	$('#blog-user-comment').get(0).addEventListener('DOMNodeRemoved', function(){//同步内容
		comment_count_operation();
	}, false);
	
	
	function comment_count_operation(){ //评论数量操作 //更新评论的数量
		setTimeout(function(){
			$('#right_side_bar').find('.comment-btn-count').text($('#blog-user-comment').find('li').not('.reply-to-record li').length);
			$('.comment-number').text($('#blog-user-comment').find('li').not('.reply-to-record li').length);
			if(parseInt($('#right_side_bar').find('.comment-btn-count').text()) == 0){
				$('#right_side_bar').find('.comment-btn-count').hide();
				$('#blog-discuss-wrapper #blog-user-comment').siblings('.Pagination').hide();
			}else{
				$('#right_side_bar').find('.comment-btn-count').show();
				$('#blog-discuss-wrapper #blog-user-comment').siblings('.Pagination').show();
			}
		});
	}
	
	
	
	//移动端滑动页面顶部栏收缩
	touch_vertical_direction($('#bottom-wrapper').get(0),52,function(){//向上滑动
		$('header').css('top','-60px');
	},function(){//向下滑动
		$('header').css('top','0px');
	});
}
//设置上次保存浏览的位置
setTimeout(function(){
	$('#blog-wrapper').scrollTop(localStorage.getItem('last_viewed_location'));
},100);
window.onbeforeunload = function(){//阻止页面直接关闭
	//当页面刷新的时候保存一下上次浏览的位置
	localStorage.setItem("last_viewed_location",$('#blog-wrapper').scrollTop());
}
//举报填写框中 flex布局的bug
$(function(){
	ChangeFlex($('#report-write-wrapper .choose-options li'),'li');
	window.onresize = function(){//屏幕缩放时
		ChangeFlex($('#report-write-wrapper .choose-options li'),'li');
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-1 a'),'a');
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-2 a'),'a');
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-3 a'),'a');
		set_fixed_top_loaciton();
	}
});
//点击博客内容标题展开 声明 和 链接
$(function(){
	$('.blog-content-headline .spread-statement').click(function(){
		$('.blog-content-headline .classify-statement').slideToggle();
		if($(this).text() == '展开'){
			$(this).text('收起');
		}else{
			$(this).text('展开');
		}
	});
});
function set_fixed_top_loaciton(){
	// var fixed_top_loaciton = $('.side-bar').outerHeight(true)- $(document.body).outerHeight(true);
	if($('#blog-wrapper').scrollTop() >= $('.side-bar').outerHeight(true) - $(document.body).outerHeight(true) + 50){//代表侧边栏到达最低部
		if($('.side-bar').outerHeight(true) - $(document.body).outerHeight(true) + 50 >= 0){//缩放最小值默认距离顶部50px
			$('#bottom-wrapper .side-bar').css({"position":"fixed","top":"auto","bottom":"0px"});
		}else{
			$('#bottom-wrapper .side-bar').css({"position":"fixed","top":"50px","bottom":"auto"});
		}
	}
	if($('#blog-wrapper').scrollTop() < $('.side-bar').outerHeight(true) - $(document.body).outerHeight(true) + 50){
		$('#bottom-wrapper .side-bar').css({"position":"absolute","top":"0px","bottom":"auto"});
	}
}
//根据滚动条高度 判断侧边栏的固定定位
$(function(){
	set_fixed_top_loaciton();
	$('#blog-wrapper').scroll(function(){
		set_fixed_top_loaciton();
		//到达指定距离后显示回到顶部按钮
		if($('#blog-wrapper').scrollTop() >= $('#blog-right-Wrapper').outerHeight(true) - $(document.body).outerHeight(true) - 1500){
			$('#right_side_bar .return-header').fadeIn();
			$('#right_side_bar .return-header').css('display','flex');
		}else{
			$('#right_side_bar .return-header').fadeOut();
		}
	});
});
function this_delay_operation(this_obj){//延迟执行
	if(!$(this_obj).data('is_click_this_delay')){
		return false;
	}
	$(this_obj).data('is_click_this_delay',false);
	setTimeout(function(){
		$(this_obj).data('is_click_this_delay',true);
	},500);
	return true;
}
//对博客进行点赞 收藏 转发等操作
$(function(){
	
	$(document).on('click','.click-praise-wrapper',function(){
		var this_obj = $(this);
		if($(this).hasClass('article-content-thumb-up')){//代表点击的是绑定同步的数据  //同时代表的是点赞的是当前博客
			if($(this).parents('#right_side_bar').length == 0){ //如果不是侧边栏需要添加动画
				click_praise($(this),'rgb(107, 107, 107)','rgb(202, 12, 22)',true,null,null);
			}else{
				click_praise($(this),'rgb(107, 107, 107)','rgb(202, 12, 22)',false,function(){
					$(this_obj).find('.text-icon').text('取消点赞');
					$(this_obj).find('.text-count').addClass('hide-icon-text');
				},function(){
					$(this_obj).find('.text-icon').text('点赞');
					$(this_obj).find('.text-count').removeClass('hide-icon-text');
				});
			}
			if($(this).data('is_click')){ //取消点击
				$('.article-content-thumb-up').removeClass('blog-bottom-operation-li-click-after');
				$('.article-content-thumb-up').data('is_click',true);
			}else{//点击之后
				$('.article-content-thumb-up').addClass('blog-bottom-operation-li-click-after');
				$('.article-content-thumb-up').data('is_click',false);
			}
			$('.article-content-thumb-up').find('.click-praise-count').text($(this).find('.click-praise-count').text());
			$('.great-number').text($(this).find('.click-praise-count').text());
		}else{
			click_praise($(this),'rgb(107, 107, 107)','rgb(202, 12, 22)',true,null,null);
		}
	});
	
	$(document).on('click','.collect-wrapper',function(){
		var this_obj = $(this);
		if($(this).hasClass('collection-content')){ //代表点击的是绑定同步的数据
			if($(this).parents('#right_side_bar').length == 0){ //如果不是侧边栏需要添加动画
				collect($(this),'rgb(51, 51, 51)',"rgb(202,12,22)",true,null,null);
			}else{
				collect($(this),'rgb(51, 51, 51)','rgb(202,12,22)',false,function(){
					$(this_obj).find('.text-icon').text('取消收藏');
					$(this_obj).find('.text-count').addClass('hide-icon-text');
				},function(){
					$(this_obj).find('.text-icon').text('收藏');
					$(this_obj).find('.text-count').removeClass('hide-icon-text');
				});
			}
			if($(this).data('is_click')){ //取消点击
				$('.collection-content').removeClass('blog-bottom-operation-li-click-after');
				$('.collection-content').data('is_click',true);
			}else{//点击之后
				$('.collection-content').addClass('blog-bottom-operation-li-click-after');
				$('.collection-content').data('is_click',false);
			}
		}else{
			collect($(this),'rgb(51, 51, 51)',"rgb(202,12,22)",true,null,null);
		}
	});
});
//对博主进行 私信 关注 等操作
$(function(){
	$(document).on('click','.attention-btn',function(){
		$('.attention-btn').toggleClass('click-attention-after');
		if($(this).hasClass('click-attention-after')){
			$('.attention-btn').text('已关注');
			$('.fans-number').text(parseInt($('.fans-number').text()) + 1);
		}else{
			$('.attention-btn').text('关注');
			$('.fans-number').text(parseInt($('.fans-number').text()) - 1);
		}
	});
});

//侧边栏操作
$(function(){
	//点击回到顶部按钮
	$(document).on('click','#right_side_bar .return-header',function(){
	   var interval = setInterval(function(){
		   $('#blog-wrapper').scrollTop($('#blog-wrapper').scrollTop() - 25);
		   if($('#blog-wrapper').scrollTop() <= 0){
			   clearInterval(interval);
		   }
	   },1);
	});
	
	//点击评论按钮
	$(document).on('click','#right_side_bar .comment-btn',function(){
		var this_obj = $(this);
		$(this).toggleClass('blog-bottom-operation-li-click-after');
		var interval = setInterval(function(){
			if($('#blog-wrapper').scrollTop() > $('#blog-content').outerHeight(true)){//大于评论的位置
				$('#blog-wrapper').scrollTop($('#blog-wrapper').scrollTop() - 25);
				if($('#blog-wrapper').scrollTop() <= $('#blog-content').outerHeight(true)){
					$('#blog-wrapper').scrollTop($('#blog-content').outerHeight(true));
					clearInterval(interval);
					$(this_obj).toggleClass('blog-bottom-operation-li-click-after');
				}
			}else if($('#blog-wrapper').scrollTop() < $('#blog-content').outerHeight(true)){//小于评论的位置
				$('#blog-wrapper').scrollTop($('#blog-wrapper').scrollTop() + 25);
				if($('#blog-wrapper').scrollTop() >= $('#blog-content').outerHeight(true)){
					$('#blog-wrapper').scrollTop($('#blog-content').outerHeight(true));
					clearInterval(interval);
					$(this_obj).toggleClass('blog-bottom-operation-li-click-after');
				}
			}else{//在评论位置的时候
				clearInterval(interval);
				$('#blog-wrapper').scrollTop($('#blog-content').outerHeight(true));
				$(this_obj).toggleClass('blog-bottom-operation-li-click-after');
			}
		},1);
		$('#to-writer-saying .saying-area-btn').show();
	});
	
	//点击举报
	$(document).on('click','#right_side_bar .report',function(){
		open_report_write_window();
		report_user_infor = '[{"name":"谷世杰","age":"19"}]';
	});
	
	//点击展开阅读全文
	$('#unfold-read-full-article-btn').click(function(){
		$('#bottom-wrapper .blog-content').height('auto');
		$(this).parent().hide();
	});
});
/**
 * 发表评论 回复评论方法
 * @param {type} this_obj--指向点击发表 回复的对象 bind_data--绑定的数据
 * @return {type}
 */
function make_reply_comment(data){
	this.data = data;//传入的json数据
	this.report_user_data = null;//这个代表被举报用户的信息
	this_reply_count_obj = null;
}

/**
 * 初始化
 * @param {type} FN_PARAMS 
 * @return {type}
 */
make_reply_comment.prototype.init = function(){
	//加载发表回复数据
	this.comment_reply_data();
	//操作
	this.comment_reply_operation();
}

/**
 * 发表回复数据 点赞 删除 举报 回复 等操作
 * @param {type} FN_PARAMS 
 * @return {type}
 */
make_reply_comment.prototype.comment_reply_operation  = function(){
	var this_make_reply_comment = this;
	$(document).on('mousedown','.blog-discuss-wrapper .say-btn',function(e){
		if(e && e.preventDefault){//现代浏览器阻止默认事件
			e.preventDefault(); 
		}else{//IE阻止默认事件
			window.event.returnValue = false; 
			return false; 
		}
	});
	//发表评论
	$('#post-comment').click(function(){
		var post_comment_content = $('#to-writer-saying #to-writer-saying-content').val();
		if(post_comment_content == ''){
			SuspensionPromptPopUp.create('请输入发表内容');
			return;
		}
		var time = time_difference.create();
		var make_comment_data = '{"make_comment_content":[{"make_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","issuer_name": "谷世杰","head_portrait": "../image/gsj.jpg","make_comment_time":"'+time.current_time+'","make_comment_content":"'+$('#to-writer-saying-content').val()+'","thumb_up_count": "0"}]}';//发布人的信息 发布人uuid 发布人姓名 发布人头像地址
		$(this).parents('.to-writer-saying').find('.saying-area textarea').val(null);
		$(this).parent('.saying-area-btn').find('.input-char-count').text(1000);
		$('#to-writer-saying').find('.saying-area textarea').blur();
		this_make_reply_comment.make_comment(JSON.parse(make_comment_data));
		this_make_reply_comment.ajax_update('post-comment',this_make_reply_comment.data);
		$('#right_side_bar').find('.comment-btn-count').text($('#blog-user-comment').find('li').not('.reply-to-record li').length);
		SuspensionPromptPopUp.create('发表成功');
	});	
	
	//点击取消发表
	$('#published-cancel').click(function(){
		$(this).parents('.to-writer-saying').find('.saying-area textarea').val(null);
		$(this).parent('.saying-area-btn').find('.input-char-count').text(1000);
		$('.to-writer-saying').find('.saying-area textarea').blur();
	});
	$(document).on({
		// 发表评论文本域获得焦点
		focus:function(){
			$(this).parents('#to-writer-saying').find('.saying-area-btn').show();
		},
		// 发表评论文本域失去焦点
		blur:function(){
			$(this).parents('#to-writer-saying').find('.saying-area-btn').hide();
		},
		//文本域的输入 实时更新用户可输入字符数量
		input:function(){
			var max_count = 0;
			if($(this).data('max_count') == undefined){
				$(this).data('max_count',parseInt($(this).parents('.to-writer-saying').find('.saying-area-btn .input-char-count').eq(0).text()));
				max_count = $(this).data('max_count');
			}else{
				max_count = $(this).data('max_count');
			}
			$(this).parents('.to-writer-saying').find('.saying-area-btn .input-char-count').text(parseInt(max_count - parseInt($(this).val().toString().length)));
		}
	},'.saying-area textarea');	
	
	//点击点赞
	$(document).on('click','#blog-discuss-wrapper .click-praise-wrapper',function(){
		var this_obj = $(this);
		this_make_reply_comment.give_like_count(parseInt($(this).find('.click-praise-count').text()),$(this).find('.click-praise-count').siblings('.icon-thumbs-up'));
		var Bound_data = $(this).parents('li').first().data('Bound_data');
			this_make_reply_comment.ajax_update('give-like',Bound_data);
	});
	
	//点击删除
	$(document).on('click','#blog-user-comment .del-comment',function(){//给当前 或 未来新增的选择器添加事件 使用 on 将处理事件绑定在document对象上
		var Bound_data = $(this).parents('li').first().data('Bound_data');
			this_make_reply_comment.ajax_update('del',Bound_data);
			if($(this).parents('.reply-to-record').length != 0){//当点击的是回复记录里面的删除时
				this_make_reply_comment.look_reply($(this).parents('.reply-to-record').find('li').length - 1,$(this).parents('.reply-to-record').parents('li').first());
			}
			$(this).parents('li').first().remove();
			SuspensionPromptPopUp.create('删除成功');
	});
	
	//点击举报
	$(document).on('click','#blog-user-comment .inform-comment',function(){
		var Bound_data = $(this).parents('li').first().data('Bound_data');
			this_make_reply_comment.ajax_update('del',Bound_data);
			open_report_write_window();
			report_user_infor = Bound_data;
	});
	
	//当回复文本域失去焦点的时候就删除
	$(document).on('blur','#reply-content',function(){
		$('#reply-comment').remove();
	});
	
	//点击回复
	$(document).on('click','#blog-user-comment .reply-commment',function(){
		if($('#reply-comment').length != 0){
			$('#reply-comment').remove();
		}
		var Bound_data = $(this).parents('li').first().data('Bound_data');
		var replier_person = Bound_data.issuer_name == undefined ? Bound_data.replier : Bound_data.issuer_name;//因为回复中的回复人 发表人参数不同
		$(this).parents('.comment-content-wrapper').parent('li').first().append('<div class="to-writer-saying" id="reply-comment"><div class="saying-area"><p class="oneself-head-portrait"></p><textarea id="reply-content" rows="3" cols="" placeholder="回复：' + replier_person + '" maxlength="1000"></textarea></div><div class="saying-area-btn"><span class="input-saying">还能输入<a class="input-char-count">1000</a>个字符</span><span class="cancel-reply say-btn bg-white-bo-red" id="cancel-the-reply">取消回复</span><span class="publish-comment say-btn bg-red-bo-red" id="sure-reply">确定回复</span></div></div>');
		this_make_reply_comment.ajax_update('reply',Bound_data);
	});
	
	//点击查看回复
	$(document).on('click','.comment-content-wrapper .look-all-reply',function(){
		$(this).parents('li').first().find('.reply-to-record').slideToggle();
		if($(this).text().indexOf('收起回复') != -1){
			if($(this).parents('li').first().find('.reply-to-record li').length == 0){//当下面没有回复的时候
				$(this).hide();
			}else{
				$(this).text('查看回复（'+$(this).parents('li').first().find('.reply-to-record li').length+'）');
			}
		}else{
			$(this).text('收起回复');
		}
	});
	
	//点击确定回复评论
	$(document).on('click','#sure-reply',function(){
		var post_comment_content = $('#reply-content').val();
		if(post_comment_content == ''){
			SuspensionPromptPopUp.create('请输入回复内容');
			return;
		}
		var time = time_difference.create();
		var make_comment_data = '{"reply_comment_content":[{"reply_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","replier":"谷世杰","replier_head_portrait": "../image/gsj.jpg","by_reply":"刘万杰","recovery_time":"'+time.current_time+'","reply_comment_content":"'+post_comment_content+'","thumb_up_count": "0"}]}';//发布人的信息 发布人uuid 发布人姓名 发布人头像地址
		this_make_reply_comment.reply_comment(JSON.parse(make_comment_data),$(this).parents('li').first().find('.reply-to-record'));
		this_make_reply_comment.ajax_update('post-comment',this_make_reply_comment.data);
		$('#reply-comment').hide();
		SuspensionPromptPopUp.create('回复成功');
	});
	
	//光标在回复文本域失去焦点
	$(document).on('blur','#reply-content',function(){
		$(this).remove();
	});
	
	//点击取消回复评论
	$(document).on('click','#cancel-the-reply',function(){
		$(this).parents('#reply-comment').remove();
	});
	
	//光标移上/移出 回复 和 评论
	$(document).on({
		mouseenter:function(){
			$(this).find('.comment-content-operation').first().find('.comment-hide-btn').show();
		},
		mouseleave:function(){
			$(this).find('.comment-content-operation').first().find('.comment-hide-btn').hide();
		}
		
	},'#blog-user-comment li');
}

/**
 * 发表回复数据
 * @param {type} FN_PARAMS 
 * @return {type}
 */
make_reply_comment.prototype.comment_reply_data = function(){
	var this_make_reply_comment = this;
	$.each(this.data,function(){//第一层解析一共有多少条评论信息
		$.each(this,function(){//第二层解析评论内容和回复的内容
			if(this.make_comment_content != undefined){//评论内容
				this_make_reply_comment.make_comment(this);
			}
			if(this.reply_comment_content != undefined){//回复内容
				this_make_reply_comment.reply_comment(this,null);
			}
		})
	});
}

/**
 * 发表评论
 * @param {json} 
 * @return {type}
 */
make_reply_comment.prototype.make_comment = function(data){
	var this_make_reply_comment = this;
	$.each(data,function(){//解析评论内容
		if(this.length != 0){//当存在内容的时候
			$.each(this,function(){//解析评论内容的键
				var time = time_difference.create(this.make_comment_time);
				var make_comment_time_difference = time.time_difference_text; 
				//开始加载评论内容
				$('#blog-user-comment').prepend('<li><div class="comment-content-wrapper"><div class="comment-user-infor"><div class="comment-user-head-portrait-name"><p class="comment-user-head-portrait show_personal_data_ele" style="background-image: url('+this.head_portrait+');"></p><p class="comment-user-name">'+this.issuer_name+'</p><p class="comment-date">'+make_comment_time_difference+'</p></div><nav class="comment-content-operation"><span class="del-comment comment-hide-btn">删除</span><span class="inform-comment comment-hide-btn">举报</span><span class="reply-commment comment-hide-btn">回复</span><span class="look-all-reply">查看回复（2）</span><p class="click-praise-wrapper"><a class="icon icon-click-praise icon-thumbs-up"></a><a class="click-praise-count">'+this.thumb_up_count+'</a></p></nav></div><p class="comment-content">'+this.make_comment_content+'</p><ul class="reply-to-record"></ul></div></li>');
				//代表点赞为0
				this_make_reply_comment.give_like_count(this.thumb_up_count,$('#blog-user-comment li').first().find('.icon-thumbs-up'));
				//绑定评论内容的数据
				$('#blog-user-comment li').first().data("Bound_data",this); //this -> 当前遍历的数据
			});
		}
	});
}

/**
 * 发表回复
 * @param {json} 
 * @return {type}
 */
make_reply_comment.prototype.reply_comment = function(data,click_this_obj){
	var this_make_reply_comment = this;
	$.each(data,function(){//解析回复内容
		if(this.length != 0){//当存在内容的时候
			$.each(this,function(){//解析回复内容的键
				var time = time_difference.create(this.recovery_time);
				var recovery_time_difference = time.time_difference_text; 
				//开始加载评论内容下面的回复内容
				$(click_this_obj == null ? $('#blog-user-comment li').first().find('.reply-to-record') : $(click_this_obj)).prepend('<li><div class="reply-to-record-infor"><div class="reply-to-record-infor-text"><div class="reply-user-name-portrait show_personal_data_ele"><p class="reply-user-portrait"></p><p class="reply-user-name">'+this.replier+'</p></div><span class="reply-text">回复</span><div class="by-reply-user-name-portrait"><!-- <p class="by-reply-user-portrait"></p> --><p class="by-reply-user-name">'+this.by_reply+'</p></div><span class="reply-time">'+recovery_time_difference+'</span></div><nav class="comment-content-operation reply-to-record-infor-operation"><span class="del-comment comment-hide-btn">删除</span><span class="inform-comment comment-hide-btn">举报</span><span class="reply-commment comment-hide-btn">回复</span><p class="click-praise-wrapper"><a class="icon icon-click-praise icon-thumbs-up"></a><a class="click-praise-count">'+this.thumb_up_count+'</a></p></nav></div><p class="reply-to-record-content">'+this.reply_comment_content+'</p></li>');
				//代表点赞为0
				this_make_reply_comment.give_like_count(this.thumb_up_count,$(click_this_obj == null ? $('#blog-user-comment li').first().find('.reply-to-record') : $(click_this_obj)).find('li').first().find('.icon-thumbs-up'));
				//绑定评论下回复内容的数据
				$(click_this_obj == null ? $('#blog-user-comment li').first().find('.reply-to-record li').first() : $(click_this_obj).find('li').first()).data("Bound_data",this)
				this_make_reply_comment.look_reply($(click_this_obj == null ? $('#blog-user-comment li').first().find('.reply-to-record') : $(click_this_obj)).find('li').length,$(click_this_obj == null ? $('#blog-user-comment li').first().find('.reply-to-record') : $(click_this_obj)).parents('li').first())
			});
		}
	});
}

/**
 * 查看回复显示
 * @param {int object} 
 * @return {type}
 */
make_reply_comment.prototype.give_like_count = function(give_lick_count,give_lick_obj){
	if(give_lick_count == 0){
		$(give_lick_obj).siblings('.click-praise-count').hide();
	}else{
		$(give_lick_obj).siblings('.click-praise-count').show();
	}
}

/**
 * 点赞数量显示
 * @param {int object} 
 * @return {type}
 */
make_reply_comment.prototype.look_reply = function(reply_count,look_reply_obj){
	if(reply_count == 0){
		$(look_reply_obj).find('.look-all-reply').hide();
	}else{
		if($(look_reply_obj).find('.look-all-reply').text() != '收起回复'){
			$(look_reply_obj).find('.look-all-reply').text('查看回复（'+reply_count+'）');
			$(look_reply_obj).find('.look-all-reply').show();
		}
	}
}
/**
 * ajax修改数据
 * @param {String json} 
 * @return {type}
 */
make_reply_comment.prototype.ajax_update = function(type,data){
	console.log(data);
	/* $.ajax(localhostIP + 'AkebussStudentManagementSystem.php',{
		data:{
			type:type,
			data:data
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		success:function(data){
			if(data.length == 0){//如果没有数据
				return;
			}
		},
		error:function(xhr,type,errorThrown){
			if(xhr.readyState == 4 && xhr.status != 200){
				
			}
			if(xhr.readyState == 0){
				alert('请检查您的网络!');
			}
		}
	}); */
}
//加载评论数据 发表评论
$(function(){
	var make_comment_data = '[[{"make_comment_content":[{"make_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","issuer_name": "谷世杰","head_portrait": "../image/gsj.jpg","make_comment_time":"2020-02-25 10:08:39","make_comment_content":"你好，谷世杰！","thumb_up_count": "0"}]},{"reply_comment_content":[{"reply_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","replier":"谷世杰","replier_head_portrait": "../image/gsj.jpg","by_reply":"刘万杰","recovery_time":"2020-02-27 10:10:54","reply_comment_content":"你好,刘万杰！","thumb_up_count": "0"}]}],[{"make_comment_content":[{"make_comment_information_uuid": "0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","issuer_name": "谷世杰","head_portrait": "../image/gsj.jpg","make_comment_time":"2020-02-27 10:08:39","make_comment_content":"你好，谷世杰！","thumb_up_count": "0"}]},{"reply_comment_content":[{"reply_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","replier":"谷世杰","replier_head_portrait": "../image/gsj.jpg","by_reply":"刘万杰","recovery_time":"2020-02-27 10:10:54","reply_comment_content":"你好,刘万杰！","thumb_up_count": "0"},{"reply_comment_information_uuid":"0579d1b0-58a1-11ea-bb81-73ccfa93a1e7","issuer_uuid": "79e26300-58a1-11ea-bb81-73ccfa93a1e7","replier":"谷世杰","replier_head_portrait": "../image/gsj.jpg","by_reply":"刘万杰","recovery_time":"2020-02-27 10:10:54","reply_comment_content":"你好,刘万杰！","thumb_up_count": "0"}]}]]';//发布人的信息 发布人uuid 发布人姓名 发布人头像地址
	var	make_comment = new make_reply_comment(JSON.parse(make_comment_data));
		make_comment.init();
});


var report_user_infor = null;
//举报填写框弹窗
$('#report-write-wrapper #sure-report').click(function(){//获取举报内容格式
	console.log(JSON.parse(report_inforamiton(report_user_infor)));
});
var last_this_index = -1;
function report_inforamiton(report_user_infor_detail){//返回举报的信息
	var report_title = null,//举报标题
		specific_reason = null,//具体原因
		post_json = null;
	$.each($('#report-write-wrapper .choose-options li'),function(){
		if($(this).data('is_choose')){
			report_title = $(this).text();
			$.each($($('#report-write-wrapper .choose-options-content li').eq($(this).index())),function(){
				if($(this).find('.choose-specific-reason-option').length != 0){//当下面存在必选项的时候
					$.each($(this).find('.choose-specific-reason-option a'),function(k){
						if($(this).data('is_choose')){
							specific_reason = $(this).text();
						}
					});
					if(specific_reason == null){//如果没有选择选项的时候
						SuspensionPromptPopUp.create('请选择具体原因');
					}else{
						if($(this).find('.option-content-supplementary-instruction').length != 0){//代表下面还有补充说明 选填
							post_json = '[{"report_title":"'+report_title+'","specific_reason ":"'+specific_reason+'","supplementary_instruction":"'+$(this).find('.option-content-supplementary-instruction .option-content-supplementary-instruction-headline').siblings('textarea').val()+'"}]';
						}else{
							post_json = '[{"report_title":"'+report_title+'","specific_reason ":"'+specific_reason+'"}]';
						}
					}
				}else{//当不是必填的描述内容的时候
					if($(this).find('.original-link').length != 0){//代表下面有必填项
						if($(this).find('#original-link-url').val() == ''){//代表没有填入链接
							SuspensionPromptPopUp.create('请输入原文链接');
						}else{
							post_json = '{"report_title":"'+report_title+'","supplementary_instruction":"'+$(this).find('.option-content-supplementary-instruction .option-content-supplementary-instruction-headline').siblings('textarea').val()+'","original_link":"'+$(this).find('#original-link-url').val()+'"}';
						}
					}else{//代表下面都是选填项
						post_json = '{"report_title":"'+report_title+'","supplementary_instruction":"'+$(this).find('.option-content-supplementary-instruction .option-content-supplementary-instruction-headline').siblings('textarea').val()+'"}';
					}
				}
			});
		}else{
			if($(this).data('is_choose') == undefined){//代表什么也没选择
				SuspensionPromptPopUp.create('请选择你想要举报的内容');
			}
		}
	});
	if(post_json != null){
		close_report_write_window();
		setTimeout(function(){
			SuspensionPromptPopUp.create('举报成功');
			report_window_restore_default();
		},600);
		return '[{"post_json":'+post_json+'},{"report_user_data":'+JSON.stringify(report_user_infor_detail)+'}]';
	}
}
$('#original-link-url').get(0).oninput = function() {//输入原文链接
	var tempText = $('#original-link-url').val(),
		http_judge = tempText.substr(0, 7),
		https_judge = tempText.substr(0, 8);
	if (http_judge != 'http://' && https_judge != 'https://') {
		$('#original-link-url').val('http://' + tempText);
	}
}
$('#report-write-wrapper .choose-options li').click(function(){//点击选取举报内容
	var this_index = $(this).index();
	report_window_change_color($('#report-write-wrapper .choose-options li'),this_index);
	$.each($('#report-write-wrapper .choose-options-content li'), function(i){
		if(i == this_index){
			$(this).show();
		}else{
			$(this).hide();
		}
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-1 a'),'a');//因为 a 默认是隐藏的 所以宽度默认是0只有点击后才能获取宽度
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-2 a'),'a');
		ChangeFlex($('#report-write-wrapper .choose-specific-reason-option-3 a'),'a');
	});
	if(this_index != last_this_index && last_this_index != -1){//当点击的不是当前的选项时 将必选项的颜色改为默认
		$('#report-write-wrapper .choose-options-content a').css('color','rgb(61,61,61)');
		$('#report-write-wrapper .choose-options-content li a').data('is_choose',false);
	}
	last_this_index = this_index;
});
for(var i = 0;i < $('#report-write-wrapper .choose-options-content a').length;i++){
	(function(j){
		$('#report-write-wrapper .choose-options-content a').eq(j).click(function(){
			for(var i = 0;i < $('#report-write-wrapper .choose-options-content a').length;i++){
				if(i == j){
					report_window_change_color($('#report-write-wrapper .choose-options-content a'),j);
				}
			}
		});
	})(i);
}
function report_window_change_color(this_obj,this_index){//举报框中的选中 true代表选中 false代表未选中
	$.each($(this_obj),function(i){
		if(this_index == i){
			$(this).css('color','rgb(202,12,22)');
			$(this).data('is_choose',true);
		}else{
			$(this).css('color','rgb(61,61,61)');
			$(this).data('is_choose',false);
		}
	});
}
//点击取消
$('#report-write-wrapper #cancel-report').click(function(){
	close_report_write_window();
	setTimeout(function(){
		report_window_restore_default();
	},600);
});
//点击关闭按钮
$('#report-write-wrapper .report-write-headline .icon-close-btn').click(function(){
	close_report_write_window();
	setTimeout(function(){
		report_window_restore_default();
	},600);
});
function report_window_restore_default(){//举报框恢复默认
	$('#report-write-wrapper .choose-options li').css('color','rgb(61,61,61)');
	$('#report-write-wrapper .choose-options li').data('is_choose',false);
	$('#report-write-wrapper .choose-options-content li a').css('color','rgb(61,61,61)');
	$('#report-write-wrapper .choose-options-content li a').data('is_choose',false);
	$('#report-write-wrapper .choose-options-content li').hide();
	$('#report-write-wrapper .choose-options-content li input').val(null);
	$('#report-write-wrapper .choose-options-content li textarea').val(null);
}
function open_report_write_window(){//打开举报框
	$('#report-write-wrapper').show();
	setTimeout(function(){
		$('#report-write-wrapper').css('opacity','1');
		$('#report-write-wrapper .report-write').css('animation','open_report_write 0.6s ease-in-out 0s 1 forwards');
	},10);
}
function close_report_write_window(){//关闭举报框
	$('#report-write-wrapper').css('opacity','0');
	$('#report-write-wrapper .report-write').css('animation','close_report_write 0.6s ease-in-out 0s 1 forwards');
	setTimeout(function(){
		$('#report-write-wrapper').hide();
	},600);
}

//加载换页插件
$(function(){
	Pagination.create($('#blog-discuss-wrapper'),229,10,{
		Pagination_margin : '20px auto 0px auto'
	},function(){
		console.log(this.convert_data_branches());
	},function(){
		// SuspensionPromptPopUp.create('您点击的太快了，数据跟不上了。');
		prompt_pop_up('查看评论','您点击的太快了，数据跟不上了。',null,null,null,null)
	});
});
//防止用户缩放页面的时候 滚动条仍然可以继续滑动
var is_key_down = false;
document.onkeydown = function(){
	is_key_down = true;
}
document.onkeyup = function(){
	is_key_down = false;
}
//解决侧边栏变为固定定位时 无法操控滚动条
$(function(){
	var distance = 0;
	for(var i = 0;i < $('.fixed-scroll-bug').length;i++){
		addMouseWheel($('.fixed-scroll-bug').get(i),function(d){
			var max_scroll_top = $('.blog-right-Wrapper').outerHeight(true) - $(document.body).outerHeight(true) + 50;
				current_scroll_top = $('#blog-wrapper').scrollTop();
			//向上滚动
			if(d){
				distance -= 90;
				if(distance <= -500){
					distance = -300;
				}
				var interval = setInterval(function(){
					$('#blog-wrapper').scrollTop($('#blog-wrapper').scrollTop() - 6);
					if($('#blog-wrapper').scrollTop() >= max_scroll_top || $('#blog-wrapper').scrollTop() <= 0 || $('#blog-wrapper').scrollTop() <= current_scroll_top + distance){
						clearInterval(interval);
						distance = 0;
					}
				},10);
			}else{//向下滚动
				distance += 90;
				if(distance >= 500){
					distance = 300;
				}
				var interval = setInterval(function(){
					$('#blog-wrapper').scrollTop($('#blog-wrapper').scrollTop() + 6);
					if(parseInt(max_scroll_top - $('#blog-wrapper').scrollTop()) <= 2 || $('#blog-wrapper').scrollTop() <= 0 || $('#blog-wrapper').scrollTop() >= current_scroll_top + distance){
						clearInterval(interval);
						distance = 0;
					}
				},10);
			}
		});
	}
});
function addMouseWheel(obj,fn){//判断鼠标滚轮向上滑动还是向下滑动
	obj.onmousewheel = fnWheel;
	if(obj.addEventListener)obj.addEventListener('DOMMouseScroll',fnWheel,false);
	function fnWheel(e){
		if(is_key_down){
			return;
		}
		var oEvent = e||event;
		var d = oEvent.wheelDelta?oEvent.wheelDelta>0:oEvent.detail<0;
		fn(d);
		if(oEvent.preventDefault)oEvent.preventDefault();
		return false;
	}
}
//图片的查看
$(function(){
	//双击查看图片  暂且不需要双击
	$(document).on('click','#edit-page .file-image-img',function(){
		preview_image_click($(this));
	});
	function preview_image_click(this_obj){
		var this_obj = this_obj,
			src = this_obj.attr('src'); 
			$('#image-viewer-bg').show();
			setTimeout(function(){
				$('#image-viewer-bg').css('opacity','1');
				$('#image-viewer-bg #image-viewer').css('background-image','url('+src+')');
				$('#image-viewer-bg #image-viewer').click(function(){
					$('#image-viewer-bg').css('opacity','0');
					setTimeout(function(){
						$('#image-viewer-bg').hide();
					},400);
				});
			},10);
	}
});