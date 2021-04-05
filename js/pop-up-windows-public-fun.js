function insert_prompt_pop_up_html(){
	if($('#prompt-pop-up-wrapper').length == 0){//当页面中不存在弹窗时 就执行插入操作
		$('body').prepend('<div id="prompt-pop-up-wrapper" unselectable="on"><!-- 提示弹窗 --><div id="prompt-pop-up">	<!-- 提示弹窗 -->	<p class="pop-up-headline"><span class="icon-info" style="position: relative;top: 1.5px;"></span><span class="pop-up-text">插入链接</span></p><!-- 弹窗标题 -->	<p class="pop-up-content">添加成功！</p><!-- 提示内容 -->	<div id="btn-wrapper">		<p class="prompt-pop-up-btn">确定</p><!-- 提示弹窗按钮 -->	</div>	<div id="btn-dialogue-wrapper">		<p class="prompt-pop-up-btn" id="prompt-pop-up-sure-btn">确定</p><!-- 提示弹窗按钮 -->		<p class="prompt-pop-up-btn" id="prompt-pop-up-cancel-btn">取消</p><!-- 提示弹窗按钮 -->	</div></div></div>');
		$('#prompt-pop-up').mousedown(function(e){
			if(e && e.preventDefault){//现代浏览器阻止默认事件
				e.preventDefault(); 
			}else{//IE阻止默认事件
				window.event.returnValue = false; 
				return false; 
			}
		});
	}
}
function prompt_pop_up(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify,click_btn_fun){ //自定义提示弹窗 提示弹窗的标题内容-提示内容-距离顶部位置-提示内容的对齐方式-点击确定后执行的方法
	insert_prompt_pop_up_html();
	$('#btn-wrapper').show();
	$('#btn-dialogue-wrapper').hide();
	public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify);
	if(click_btn_fun == null){
		click_btn_fun = function() {

		}
	}
	$('#prompt-pop-up #btn-wrapper .prompt-pop-up-btn').click(function(){
		public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify);
		click_btn_fun();
		click_btn_fun = function() {
		
		}
	});
}
function dialogue_prompt_pop_up(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify,click_cancel_fun,click_sure_fun){//对话执行框框
	insert_prompt_pop_up_html();
	$('#btn-wrapper').hide();
	$('#btn-dialogue-wrapper').show();
	public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify);
	if(click_cancel_fun == null){
		click_cancel_fun = function(){
			
		}
	}
	if(click_sure_fun == null){
		click_sure_fun = function(){
			
		}
	}
	$('#btn-dialogue-wrapper #prompt-pop-up-cancel-btn').click(function(){//点击取消按钮
		public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify);
		click_cancel_fun();
		click_cancel_fun = function(){
			
		}
		click_sure_fun = function(){
			
		}
	});
	$('#btn-dialogue-wrapper #prompt-pop-up-sure-btn').click(function(){//点击确定按钮
		public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify);
		click_sure_fun();
		click_cancel_fun = function(){
			
		}
		click_sure_fun = function(){
			
		}
	});
}
function public_prompt(prompt_pop_up_headline_content, pop_up_content, top_loaciton, pop_up_content_justify){
	if($('#prompt-pop-up-wrapper').css('display') == 'none'){ //代表打开窗口
		$('#prompt-pop-up-wrapper .pop-up-headline .pop-up-text').text(prompt_pop_up_headline_content);
		$('#prompt-pop-up-wrapper .pop-up-content').text(pop_up_content);
		// var TopSize = top_loaciton == null ? 'calc(50% - 200px)' : top_loaciton;
		if(top_loaciton != null){
			var TopSize = top_loaciton;
			$('#prompt-pop-up').css('top', TopSize);
		}
		var Content_justify = pop_up_content_justify == null ? 'center' : pop_up_content_justify;
		$('#prompt-pop-up .pop-up-content').css('text-align', Content_justify);
		setTimeout(function() {
			$('#prompt-pop-up-wrapper').css('display', 'block');
			setTimeout(function() {
				$('#prompt-pop-up').css({"animation": " PromptPopUpTopLocation 0s ease-in-out 0s 1 forwards, OpenPromptPopUp 0.5s ease-in-out 0s 1 forwards"});
			}, 10);
		}, 100);
	} else { //代表关闭窗口
		$('#prompt-pop-up').css('animation', ' ClosePromptPopUp 0.5s ease-in-out 0s 1 forwards,PromptPopUpTopLocation 0s ease-in-out 0s 1 forwards');
		setTimeout(function() {
			$('#prompt-pop-up-wrapper').css('display', 'none');
			$('#prompt-pop-up').css('animation', 'none');
		}, 500);
	}
}

/**
 * 悬浮提示框
 */
;(function ($,window,document,undefined){
	
	/**
	 * 悬浮窗实例
	 * @param {Object} pop_up_content
	 * @param {Object} click_btn_fun
	 */
	function SuspensionPromptPopUp(pop_up_content){
		this.pop_up_content = pop_up_content;
		
		this.init();
	}
	
	/**
	 * 初始化
	 */
	SuspensionPromptPopUp.prototype.init = function(){
		var this_window = this;
		
		this.create_window(); //创建悬浮窗
		this.window_style(); //设置悬浮窗的样式以及显示
		
		this.this_suspension.on({
			mouseenter: function(){
				this_window.mouseenter = true;
			},
			mouseleave: function(){
				this_window.mouseenter = false;
				this_window.window_delete(); 
			}
		});
	}
	
	/**
	 * 创建悬浮框
	 */
	SuspensionPromptPopUp.prototype.create_window = function(){
		$('.suspension-window').remove();
		$('body').prepend('<div class="suspension-window"><p class="prompt-icon"><span class="icon icon-checkmark"></span></p><p class="prompt-content">登录成功！</p></div>');
		
		//设置当前悬浮框
		this.this_suspension = $('body').find('.suspension-window').eq(0);
		
		//设置内容
		this.this_suspension.find('.prompt-content').text(this.pop_up_content);
		
	}
	
	/**
	 * 设置悬浮窗的样式 出现
	 */
	SuspensionPromptPopUp.prototype.window_style = function(){
		var all_window_heigth = 0;
			$.each($('.suspension-window'),function(){
				all_window_heigth += $(this).outerHeight(true);
			});
			// if($('.suspension-window').length >= 1){
			// 	all_window_heigth += $('.suspension-window').length * 35;
			// }
			this.this_suspension.css({
				"top": all_window_heigth + 35 + 'px',
				"left":"calc(100vw / 2 - " + this.this_suspension.outerWidth(true) / 2 + "px)",
				"opacity":"1"
			});
			
			//光标是否移上
			this.mouseenter = false;
			
			this.window_delete();
	}
	
	/**
	 * 悬浮窗的删除 判断光标的移入移出
	 */
	SuspensionPromptPopUp.prototype.window_delete = function(){
		var this_suspension = this.this_suspension;
		var this_window = this;
		setTimeout(function(){
			if(!this_window.mouseenter){
				this_suspension.css({
					"opacity":"0",
					"top":"-100px"
				});
				setTimeout(function(){
					this_suspension.remove();
				},1000);
			}else{
				
			}
		},3000);
	}
	
	
	window.SuspensionPromptPopUp = SuspensionPromptPopUp;
	SuspensionPromptPopUp.create = function(pop_up_content){
		return new SuspensionPromptPopUp(pop_up_content);
	}
	
})(jQuery, window, document);