/**
 * 非空判断
 */
$(function(){
	$('.operating-button').click(function(){ //点击底部按钮,进行非空判断。
		var exist_null = false;
		if($(this).parents('#pc-terminal-model').length != 0){
			$.each($(this).parents('.pc-login-child').find('input').not('#remember-password'),function(){ //PC端提示的显示/隐藏
				if($(this).val() == ''){
					$(this).parent().siblings('.hint-wrapper').css('visibility','visible');
					exist_null = true;
				}else{
					$(this).parent().siblings('.hint-wrapper').css('visibility','hidden');
				}
			});
		}else{
			$.each($(this).parents('#mobile-terminal-model').find('.input-wrapper-child input').not('#auto-login'),function(){ //移动端提示的显示/隐藏
				if($(this).val() == ''){
					$(this).parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
					exist_null = true;
				}else{
					$(this).parent('.moblie-input').css('border-bottom','1px solid rgb(220,220,220)');
				}
			});
		}
		if($(this).parents('.login-child').find('.before-password').val() != $(this).parents('.login-child').find('.after-password').val()){ //代表两个密码不一致
			exist_null = true;
			$(this).parents('.login-child').find('.before-password').parent().siblings('.hint-wrapper').css('visibility','visible').find('.hint-text').text('两次输入的密码不一致');
			$(this).parents('.login-child').find('.after-password').parent().siblings('.hint-wrapper').css('visibility','visible').find('.hint-text').text('两次输入的密码不一致');
			$(this).parents('.login-child').find('.after-password').parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
			$(this).parents('.login-child').find('.before-password').parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
		}else{
			$(this).parent().siblings('.hint-wrapper').css('visibility','hidden');
		}
		if(!upper_lower_equal){ //代表验证码有误
			$(this).parent().find('.random-verification-code').parent().siblings('.hint-wrapper').find('.hint-text').text('验证码有误').parent().css('visibility','visible');
			$(this).parents('#mobile-terminal-model').find('.input-wrapper-child .random-verification-code-input').parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
			exist_null = true;
		}
		if(!exist_null){//代表文本框没有空
			//判断模块分类，根据模块执行相应的操作。
			if($(this).parents('.login-child').hasClass('login-module')){ //登录模块
				login_interface.call(this); //调用登录接口 //this默认指向的是window,这里让this指向点击的对象。
			}else if($(this).parents('.login-child').hasClass('register-module')){ //注册模块
				registered_interface.call(this); //调用注册接口
			}else if($(this).parents('.login-child').hasClass('forget-password-module')){ //找回密码模块
				Password_recovery_interface.call(this); //调用找回密码接口
			}
		}
	});
	$('input').bind('input propertychange',function(){ //输入文本框的时候
		if($(this).val() == ''){
			$(this).parent().siblings('.hint-wrapper').css('visibility','visible');
			if($(this).hasClass('before-password') || $(this).hasClass('after-password') &&  $(this).val() == ''){
				$(this).parent().siblings('.hint-wrapper').find('.hint-text').text('请输入密码');
			}
			$(this).siblings('.icon-cancel').css('cssText','display:none !important;');
			$(this).siblings('.icon-eye1').css('cssText','display:none !important;');
			$(this).siblings('.icon-eye-slash').css('cssText','display:none !important;');
			$(this).siblings('.icon-eye-slash').siblings('input[type="text"]').attr('type','password');
			$(this).siblings('.icon-eye-slash').removeClass('icon-eye-slash').addClass('icon-eye1');
			$(this).parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
		}else{
			if(($(this).hasClass('before-password') || $(this).hasClass('after-password')) && $(this).parents('.login-child').find('.before-password').val() == $(this).parents('.login-child').find('.after-password').val()){ //两次密码一致
				$(this).parents('.login-child').find('.before-password').parent().siblings('.hint-wrapper').css('visibility','hidden');
				$(this).parents('.login-child').find('.after-password').parent().siblings('.hint-wrapper').css('visibility','hidden');
				$(this).parents('.login-child').find('.after-password').parent('.moblie-input').css('border-bottom','1px solid rgb(220,220,220)');
				$(this).parents('.login-child').find('.before-password').parent('.moblie-input').css('border-bottom','1px solid rgb(220,220,220)');
			}else{
				if(($(this).hasClass('before-password') || $(this).hasClass('after-password')) && $(this).parents('.login-child').find('.before-password').val() != $(this).parents('.login-child').find('.after-password').val()){ //两次密码不一致
					$(this).parents('.login-child').find('.before-password').parent().siblings('.hint-wrapper').css('visibility','visible').find('.hint-text').text('两次输入的密码不一致');
					$(this).parents('.login-child').find('.after-password').parent().siblings('.hint-wrapper').css('visibility','visible').find('.hint-text').text('两次输入的密码不一致');
					$(this).parents('.login-child').find('.after-password').parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
					$(this).parents('.login-child').find('.before-password').parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
					return;
				}
				$(this).parent().siblings('.hint-wrapper').css('visibility','hidden');
				$(this).parent('.moblie-input').css('border-bottom','2px solid rgba(93,116,226,0.9)');
			}
			$(this).siblings('.icon-cancel').css('cssText','display:block !important;');
			$(this).siblings('.icon-eye1').css('cssText','display:block !important;');
			$(this).siblings('.icon-eye-slash').css('cssText','display:block !important;');
		}
	});
});

/**
 * 切换密码可视 清空文本框
 */
$(function(){
	$('.icon-eye1').click(function(){ //点击密码可视按钮
		if($(this).hasClass('icon-eye1')){
			$(this).removeClass('icon-eye1').addClass('icon-eye-slash');
			$(this).siblings('input[type="password"]').attr('type','text');
		}else{
			$(this).removeClass('icon-eye-slash').addClass('icon-eye1');
			$(this).siblings('input[type="text"]').attr('type','password');
		}
	});
	$('.icon-cancel').click(function(){ //点击清空文本框按钮
		$(this).siblings('input[type="text"]').val(null);
		$(this).css('cssText','display:none !important;');
	});
});

/**
 * 输入验证码 更新验证码
 */
var upper_lower_equal = true;
$(function(){
	$('.random-verification-code-input').bind('input propertychange blur',function(){ //输入验证码
		if($(this).val().toUpperCase() == $(this).siblings('.random-verification-code').text()){
			upper_lower_equal = true;
			$(this).parent('.moblie-input').css('border-bottom','1px solid rgb(220,220,220)');
		}else{
			upper_lower_equal = false;
			if($(this).val() == ''){
				$(this).parent().siblings('.hint-wrapper').find('.hint-text').text('请输入验证码').parent().css('visibility','visible');
			}else{
				$(this).parent().siblings('.hint-wrapper').find('.hint-text').text('验证码有误').parent().css('visibility','visible');
			}
			$(this).parent('.moblie-input').css('border-bottom','2px solid rgb(226,32,24)');
		}
	});
	$('.random-verification-code').click(function(){ //点击更新验证码
		$(this).text(random_majuscule(4));
	});
	
	/**
	 * 随机生成大写字母
	 */
	function random_majuscule(char_count){
		var Unicode_arr = [];
		var Unicode_str = '';
		for(var i = 0;i < char_count;i++){
			var Unicode_num = parseInt(Math.random() * (91 - 65 - 1) + 65);
			Unicode_arr.push(String.fromCharCode(Unicode_num));
		}
		for(var i = 0;i < char_count;i++){
			Unicode_str += Unicode_arr[i];
		}
		return Unicode_str;
	}
});

/**
 * 移动端文本框输事件
 */
$(function(){
	$('#mobile-terminal-model input').not('#auto-login').bind({
		focus: function(){
			if($(this).parent('.moblie-input').css('border-bottom-color') == 'rgb(226, 32, 24)'){
				return;
			}
			$(this).parent('.moblie-input').css('border-bottom','2px solid rgba(93,116,226,0.9)');
		},
		blur: function(){
			if($(this).parent('.moblie-input').css('border-bottom-color') == 'rgb(226, 32, 24)'){
				return;
			}
			$(this).parent('.moblie-input').css('border-bottom','1px solid rgb(220,220,220)');
		}
	});
});
/**
 * 登录接口
 */
function login_interface(){
	var roomname_text = $(this).parents('.login-child').find('.roomname-text').val(), //用户名
		password_text = $(this).parents('.login-child').find('.password-text').val(), //密码
		auto_login = $(this).parents('.login-child').find('#auto-login').get(0).checked; //是否自动登录
}

/**
 * 注册接口
 */
function registered_interface(){
	var roomname_text = $(this).parents('.login-child').find('.roomname-text').val(), //用户名
		password_text = $(this).parents('.login-child').find('.password-text').val(), //密码
		phone_text = $(this).parents('.login-child').find('.phone-text').val(); //手机号
}

/**
 * 找回密码接口
 */
function Password_recovery_interface(){
	var roomname_text = $(this).parents('.login-child').find('.roomname-text').val(), //用户名
		new_password_text = $(this).parents('.login-child').find('.new-password-text').val(), //密码
		number_bound_text = $(this).parents('.login-child').find('.number-bound').val(); //手机号
}

/**
 * 移动端
 */