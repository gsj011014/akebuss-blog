
/**
 * 木马病毒智能检测
 */
$(function(){
	
});

/**
 * 不良言论智能检测
 */
$(function(){
	setTimeout(function(){
		bad_comments();
	},5000);
	
	var bad_comments_arr = [
		'SB','sb','Sb','sB','傻逼','操你妈','草泥马','傻叉','傻x','傻b','s逼','婊子','臭婊子'
	];
	function bad_comments(){
		$('.detection-child-text').text('不良言论智能检测中');
		$('.safety-detection-wrapper .safety-detection-animtion').css('background-image','url(../image/safety_detection/intelligent_detection_bad_speech_detection2.gif)');
		var issue_content = localStorage.getItem('issue_content'),
			issue_blog_title = localStorage.getItem('issue_blog_title');
		var is_exist_bad_comments = false;
			if(issue_content != null || issue_blog_title != null){ //数据匹配分析不良言论
				$.each(bad_comments_arr,function(){
					if(issue_content.indexOf(this.toString()) != -1){
						is_exist_bad_comments = true;
					}
					if(issue_blog_title.indexOf(this.toString()) != -1){
						is_exist_bad_comments = true;
					}
				});
				
				//是否存在
				if(is_exist_bad_comments){ //代表存在不良言论
					setTimeout(function(){
						$('.safety-detection-wrapper').hide();
						$('.detection-successful').hide();
						$('.detection-defeated').show();
						setTimeout(function(){
							location.href = "../plus/WriteBlogs.html?type=false";
						},2000);
					},5000);
				}else{
					setTimeout(function(){ //代表不存在不良言论
						$('.safety-detection-wrapper').hide();
						$('.detection-defeated').hide();
						$('.detection-successful').show();
						setTimeout(function(){
							location.href = "../plus/post_blog_last_operation.html";
						},2000);
					},5000);
				}
				
				//分析完毕后清空，本地存储数据。
				// localStorage.setItem('issue_content','');
				// localStorage.setItem('issue_blog_title','');
			}
	}
});