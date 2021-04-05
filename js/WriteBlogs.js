var The_editing_zone_obj = $("#The-editing-zone")[0].contentWindow; //获取编辑区的iframe对象
// 页面加载动画的延时关闭
$(function() {
	close_loading_Page_animation();
	$('#blogs-headline').val('欢迎使用阿克布斯-HyperSmartText编辑器');
	if(localStorage.getItem('SaveRichText') == null){//代表没有读取到草稿箱
		setTimeout(function(){
			timing_auto_save();
		},1200);
		return;
	}
	// console.log(localStorage.getItem("SaveRichHtml").length);
	if(localStorage.getItem("SaveRichHtml").length > 11 || localStorage.getItem('blogs_headline') != '欢迎使用阿克布斯-HyperSmartText编辑器'){//代表有上次的草稿
		setTimeout(function(){
			dialogue_prompt_pop_up('草稿','是否载入上次保存的草稿?',null,null,function(){//点击取消执行
				setTimeout(function(){
					timing_auto_save();
				},600);
			},function(){//点击确定执行
				open_loading_Page_animation();//打开加载动画
				setTimeout(function(){//开始载入
					$('#blogs-headline').val(localStorage.getItem('blogs_headline'));
					$('#change-text-count').text(parseInt($('#blogs-headline').val().toString().length));//载入标题文字数量
					The_editing_zone_obj.$('#edit-page').empty();
					The_editing_zone_obj.$('#edit-page').append(localStorage.getItem("SaveRichHtml"));
					$('#words-number').text(parseInt(The_editing_zone_obj.$('#edit-page').text().toString().length));//计算字数
					$('#line-number').text(parseInt(The_editing_zone_obj.$('#edit-page div').length));//计算行数
					$('#current-line').text(0);//刷新当前所在行
					$('#current-column').text(0);//刷新当前所在列
					The_editing_zone_obj.$('#edit-page div').click(function(){//刷新当前所在行
						$('#current-line').text(parseInt(The_editing_zone_obj.getfocusLocationObj().index() + 1));//刷新当前所在行
					});
					$('#save-time').show();
					$('#save-time').find('.time-text').text(localStorage.getItem('last_save_time'));
					close_loading_Page_animation();
				},500);
				setTimeout(function(){
					SuspensionPromptPopUp.create('载入草稿成功');
					setTimeout(function(){
						timing_auto_save();
					},600);
				},1900);
			});
		},1500);
	}else{//当没有保存草稿的时候
		setTimeout(function(){
			timing_auto_save();
		},1200);
	}
});
function timing_auto_save(){//定时自动保存
	dialogue_prompt_pop_up('保存草稿','是否开启自动保存草稿功能?',null,null,null,function(){//点击确定执行
		setTimeout(function(){
			SuspensionPromptPopUp.create('自动保存草稿功能已开启');
		},600);
		setInterval(function(){//一分钟保存一次
			$('#save-time').show();
			$('#save-time').find('.time-text').text(UpdateTime());
			SaveRichText();
		},60000);	
	});
}
function close_loading_Page_animation(){
	setTimeout(function() {
		$('#loader_wrpper').css('opacity', '0');
		setTimeout(function() {
			$('#loader_wrpper').hide();
		}, 500);
	}, 1000);
}
function open_loading_Page_animation(){
	$('#loader_wrpper').show();
	setTimeout(function() {
		$('#loader_wrpper').css('opacity', '1');
	},10);
}
$(function() {
	//进入全屏模式
	// into_full_preview();
	//解决工具栏flex布局bug
	ChangeFlex('#edit-tool-btn-wrapper li', 'li');
	//设置编辑区域 预览区域的高度
	set_edit_tool_preview_height();
	window.onresize = function() {
		ChangeFlex('#edit-tool-btn-wrapper li', 'li');
		//设置编辑区域 预览区域的高度
		set_edit_tool_preview_height();
		//设置颜色选择器的位置
		set_color_picker_locaiton($('#color-picker-font'), $('#color-picker-font-color-picker'));
		set_color_picker_locaiton($('#color-picker-bg'), $('#color-picker-bg-color-picker'));
		//根据屏幕宽度设置帮助的宽度和位置
		var result1 = window.matchMedia('(max-width:1024px)');
		var result2 = window.matchMedia('(min-width:1024px)');
		if(result1.matches){//根据屏幕大小设置帮助的宽度
			$('#help-document').css('right','-'+$('#help-document').outerWidth(true)+'px');
		}else if(result2.matches){
			$('#help-document').css('right','-300px');
		}
	}
});
function getSelectedContentsObj() { //返回选择的对象
	if (window.getSelection) { //chrome,firefox,opera
		return window.getSelection(); //只复制文本
	} else if (document.getSelection) { //其他
		return document.getSelection(); //只复制文本
	} else if (document.selection) { //IE特有的
		// return document.selection.createRange().htmlText;
		return document.selection.createRange().text; //只复制文本
	}
}

function get_The_editing_zone_SelectedContentsObj() { //返回编辑区选择的对象
	if (The_editing_zone_obj.window.getSelection) { //chrome,firefox,opera
		return The_editing_zone_obj.window.getSelection(); //只复制文本
	} else if (The_editing_zone_obj.document.getSelection) { //其他
		return The_editing_zone_obj.document.getSelection(); //只复制文本
	} else if (The_editing_zone_obj.document.selection) { //IE特有的
		// return document.selection.createRange().htmlText;
		return The_editing_zone_obj.document.selection.createRange().text; //只复制文本
	}
}

function getfocusLocationObj() {
	if ($(get_The_editing_zone_SelectedContentsObj().focusNode).get(0).nodeName == '#text') {
		return $(get_The_editing_zone_SelectedContentsObj().focusNode.parentNode);
	} else {
		return $(get_The_editing_zone_SelectedContentsObj().focusNode);
	}
}

/* 
 插入链接
 */
$(function() {
	$('#hyper-link').click(function() { //打开添加超链接窗口
		$('#insert-link-bg').show();
		setTimeout(function() {
			$('#insert-link-bg').css('opacity', '1');
			$('.insert-link-wrapper').css('animation',' insert-link-wrapper-top-open 0.5s ease-in-out 0s 1 forwards');
		}, 10);
	});
	$('#close-link-wrapper').click(function() { //关闭添加超链接窗口
		$('#insert-link-bg').css('opacity', '0');
		$('.insert-link-wrapper').css('animation',' insert-link-wrapper-top-close 0.5s ease-in-out 0s 1 forwards');
		setTimeout(function() {
			$('#insert-link-bg').hide();
			$('.insert-link-wrapper').css('top', '0px');
			$('.insert-link-wrapper').css('animation',' none');
		}, 500);
	});
	/* 
	 链接输入内容
	 */
	var isSync = false;
	$('#open-url-input').get(0).oninput = function() {
		if ($('#show-text-input').val() == '') {
			isSync = true;
		}
		var tempText = $('#open-url-input').val(),
			http_judge = tempText.substr(0, 7),
			https_judge = tempText.substr(0, 8);
		if (http_judge != 'http://' && https_judge != 'https://') {
			$('#open-url-input').val('http://' + tempText);
		}
		if (isSync) { //是否同步显示文本和链接地址的内容
			$('#show-text-input').val(this.value);
		}
		Insert_link_Btn_isClick();
	}
	$('#show-text-input').get(0).oninput = function() {
		isSync = false;
		if ($(this) == '') {
			isSync = true;
		}
		Insert_link_Btn_isClick();
	}

	function Insert_link_Btn_isClick() { //插入按钮是否可以点击
		// console.log($('#open-url-input').val().toString().length);
		if ($('#open-url-input').val() != '' && $('#show-text-input').val() != '') {
			$('#insert-link-btn').css({
				"background-color": "rgb(51,122,183)",
				"cursor": "pointer"
			});
		} else {
			$('#insert-link-btn').css({
				"background-color": "rgb(123,169,208)",
				"cursor": "default"
			});
		}
	}
	//点击插入链接按钮
	$('#insert-link-btn').click(function() {
		The_editing_zone_obj.$('#edit-page').focus();
		if ($('#open-url-input').val() != '' && $('#show-text-input').val() != '') {
			if ($('#isNewOpenPage').get(0).checked) { //代表选中在新窗口打开页面-复选框
				The_editing_zone_obj.RichTextExecCommand.insertHTML(
					'&nbsp;&nbsp;<a class="cerate-link" contenteditable="false" title="链接地址:' + $('#open-url-input').val() +
					'" href="' + $('#open-url-input').val() + '" target="_blank">链接:' + $('#show-text-input').val() +
					'</a>&nbsp;&nbsp;');
			} else { //代表没有选中在新窗口打开页面-复选框
				The_editing_zone_obj.RichTextExecCommand.insertHTML(
					'&nbsp;&nbsp;<a class="cerate-link" contenteditable="false" title="链接地址:' + $('#open-url-input').val() +
					'" href="' + $('#open-url-input').val() + '" >链接:' + $('#show-text-input').val() + '</a>&nbsp;&nbsp;');
			}
			$('#open-url-input').val(null);
			$('#show-text-input').val(null);
			$('#isNewOpenPage').get(0).checked = true;
			setTimeout(function() {
				SuspensionPromptPopUp.create('插入链接成功');
				setTimeout(function() {
					$('#close-link-wrapper').click(); //关闭插入链接窗口
				}, 500);
			}, 100);
		}
	});
});

//博客标题
$(function() {
	$('#change-text-count').text(parseInt($('#blogs-headline').val().toString().length));//载入标题文字数量
	is_pop_up = true;
	$('#blogs-headline').get(0).oninput = function() {
		document.onkeydown = function(e) {
			if (parseInt($('#blogs-headline').val().toString().length) >= 100 && event.keyCode != 46 && event.keyCode != 8) { //博客标题内容大于等于100的时候并且按下的不是删除键
				event.returnValue = false;
				if (!is_pop_up) {
					return;
				}
				is_pop_up = false;
				setTimeout(function() {
					is_pop_up = true;
				}, 3000);
				SuspensionPromptPopUp.create('文章标题最大长度为100');
			} else {

			}
		}
		$('#change-text-count').text(this.value.toString().length);
	}
});
//更改选中字体颜色
$(function() {
	/* 代码块的列数显示 */
	/* 加载iframe页面需要时间 必须使用window.onload 来获取 */
	window.onload = function() {
		$('#color-picker-font').colpick({ //设置选中字体颜色
			// colorScheme:'dark',
			layout: 'rgbhex',
			color: '000000',
			livePreview: 0,
			id: "color-picker-font-color-picker",
			onSubmit: function(hsb, hex, rgb, el) {
				The_editing_zone_obj.RichTextExecCommand.amend_fontColor(hex);
				$(el).colpickHide();
			}
		});
		$('#color-picker-bg').colpick({ //设置选中背景颜色
			// colorScheme:'dark',
			layout: 'rgbhex',
			color: '000000',
			livePreview: 0,
			id: "color-picker-bg-color-picker",
			onSubmit: function(hsb, hex, rgb, el) {
				The_editing_zone_obj.RichTextExecCommand.amend_backColor(hex);
				$(el).colpickHide();
			}
		});
		The_editing_zone_obj.$('#edit-page').click(function() {
			$('.colpick').hide();
		});
	}
	$('#color-picker-font').click(function() {
		set_color_picker_locaiton($(this), $('#color-picker-font-color-picker'));
	});
	$('#color-picker-bg').click(function() {
		set_color_picker_locaiton($(this), $('#color-picker-bg-color-picker'));
	});
});

function set_color_picker_locaiton(this_obj, this_picker) { //修改颜色修改器的位置
	var window_width = $(document.body).outerWidth(true),
		color_picker_width = $(this_picker).outerWidth(),
		color_picker_font_left = $(this_obj).offset().left,
		max_width = color_picker_width + color_picker_font_left,
		color_picker_font_top = $(this_obj).offset().top;
	$(this_picker).css("top", color_picker_font_top + $(this_obj).outerHeight(true) + "px");
	var initial_left = window_width - (window_width - color_picker_font_left);
	if (parseInt(window_width - max_width) <= 10) { //当右边填充不开颜色选择器的时候 在点击元素左边显示
		var el_left = window_width - (window_width - color_picker_font_left) - color_picker_width + $(this_obj).outerWidth();
		$(this_picker).css("left", el_left + "px");
		var set_left = el_left;
		if (el_left < 10) { //如果点击元素左边也显示不了的时候 就居中显示
			set_left = window_width / 2 - color_picker_width / 2;
			$(this_picker).css('left', set_left + 'px');
		}
	} else { //默认在元素右边显示
		var el_right = window_width - (window_width - color_picker_font_left);
		$(this_picker).css("left", el_right + "px");
	}
}
//点击帮助按钮,弹出帮助文档.
$(function() {
	$('#help-document-btn').click(function() { //点击帮助按钮
		$('#help-document').css('transition','all 0.5s ease-in-out 0s');
		if ($('#help-document').css('right') == -$('#help-document').outerWidth(true)+'px') {
			$('#help-document').css('right', '0px');
		} else {
			$('#help-document').css('right', -$('#help-document').outerWidth(true)+'px');
			setTimeout(function(){
				$('#help-document').css('transition','none');
			},500);
		}
	});
	$('#help-document .icon-close').click(function() { //点击帮助文档中的关闭按钮
		$('#help-document').css('right', -$('#help-document').outerWidth(true)+'px');
		setTimeout(function(){
			$('#help-document').css('transition','none');
		},500);
	});
});
//打开上传文件弹窗
$(function() {
	//输入文件url
	$('#insert-file-area .insert-file-flex #file-url').get(0).oninput = function() {
		var tempText = $(this).val(),
			http_judge = tempText.substr(0, 7),
			https_judge = tempText.substr(0, 8);
		if (http_judge != 'http://' && https_judge != 'https://') {
			$(this).val('http://' + tempText);
		}
	}
	//关闭弹窗
	$('#insert-file-area .insert-file-headline .icon-close').click(function() { //点击关闭按钮
		close_insert_file();
	});
	$('#insert-file-area .insert-file-bottom-btn .cancel-insert-file').click(function() { //点击取消按钮
		close_insert_file();
	});
	$('#insert-file-area .insert-file-bottom-btn .insert-sure').click(function() { //点击插入
		click_insert_sure($(this));
	});
	$('#insert-file-area .choose-tab span').click(function() { //点击上传图片tab
		$(this).parents('.insert-url-wrapper').hide();
		$(this).parents('.insert-url-wrapper').siblings('.insert-locality-file').show();
	});
	$('#insert-file-area .uploading-file-state span').click(function() {
		$(this).parents('.insert-locality-file').hide();
		$(this).parents('.insert-locality-file').siblings('.insert-url-wrapper').show();
	});
});

function click_insert_sure(this_obj) {
	The_editing_zone_obj.$('#edit-page').focus();
	var insert_file_name_text = $(this_obj).parents('.insert-url-wrapper').find('.insert-file-name').eq(0).text();
	var file_url = this_obj.parents('.insert-url-wrapper').find('#file-url').val();
	if ($('#insert-file-area .insert-file-flex #file-url').val() == '') {
		if (insert_file_name_text.indexOf('图片') != -1) {
			SuspensionPromptPopUp.create('图片链接不能为空');
		} else if (insert_file_name_text.indexOf('视频') != -1) {
			SuspensionPromptPopUp.create('视频链接不能为空');
		} else if (insert_file_name_text.indexOf('音频') != -1) {
			SuspensionPromptPopUp.create('音频链接不能为空');
		}
		return;
	}
	if (insert_file_name_text.indexOf('图片') != -1) { //插入的文件是图片
		The_editing_zone_obj.uploading_image(file_url);
	} else if (insert_file_name_text.indexOf('视频') != -1) { //插入的文件是视频
		The_editing_zone_obj.uploading_video(file_url);
	} else if (insert_file_name_text.indexOf('音频') != -1) { //插入的文件是音频
		The_editing_zone_obj.uploading_audio(file_url);
	}
}

function InsertFile(file_type) { //文件类型 根据传入的文件类型修改内容
	// 打开弹窗
	open_insert_file();
	set_attr(file_type);
}

function set_attr(file_type) { //根据上传文件类型,设置不同的属性.
	if (file_type == '图片') {
		$('#insert-file-area .insert-file-headline-text').text('插入图片');
		$('#insert-file-area .insert-file-name').text('图片URL：');
		$('#insert-file-area .file-url').attr("id", "file-image-url");
		$('#insert-file-area .choose-tab span').text('上传图片');
		$('#insert-file-area .insert-file-name').text('图片URL：');
		$('#insert-file-area .uploading-file span').text('上传图片');
		$('#insert-file-area .uploading-file-state span').text('图片链接');
		$('#insert-file-area .des-uploading-file').text('支持.jpg .gif .png .jpeg .bmp .webp,大小不超过5M');
		$('#ChooseImageFile').css('display', 'block');
		$('#ChooseImageFile').siblings('input').css('display', 'none');
	} else if (file_type == '视频') {
		$('#insert-file-area .insert-file-headline-text').text('插入视频');
		$('#insert-file-area .insert-file-name').text('视频URL：');
		$('#insert-file-area .file-url').attr("id", "file-video-url");
		$('#insert-file-area .choose-tab span').text('上传视频');
		$('#insert-file-area .insert-file-name').text('视频URL：');
		$('#insert-file-area .uploading-file span').text('上传视频');
		$('#insert-file-area .uploading-file-state span').text('视频链接');
		$('#insert-file-area .des-uploading-file').text('支持.mp4 .3gpp .png .mpeg,大小不超过10M');
		$('#ChooseVideoFile').css('display', 'block');
		$('#ChooseVideoFile').siblings('input').css('display', 'none');
	} else if (file_type == '音频') {
		$('#insert-file-area .insert-file-headline-text').text('插入音频');
		$('#insert-file-area .insert-file-name').text('音频URL：');
		$('#insert-file-area .file-url').attr("id", "file-audio-url");
		$('#insert-file-area .choose-tab span').text('上传音频');
		$('#insert-file-area .insert-file-name').text('音频URL：');
		$('#insert-file-area .uploading-file span').text('上传音频');
		$('#insert-file-area .uploading-file-state span').text('音频链接');
		$('#insert-file-area .des-uploading-file').text('支持.mp3 .3gpp .ac3 .basic .mpeg .ogg,大小不超过5M')
		$('#ChooseAudioFile').css('display', 'block');
		$('#ChooseAudioFile').siblings('input').css('display', 'none');
	}
}

function open_insert_file() {
	$('#insert-file-area').show();
	setTimeout(function() {
		$('#insert-file-area').css('opacity', '1');
		$('#insert-file-area .insert-file').css('animation', ' insert-file-open 0.5s ease-in-out 0s 1 forwards');
	}, 10);
}

function close_insert_file() {
	$('.insert-file-flex input').val(null);
	$('#insert-file-area').css('opacity', '0');
	$('#insert-file-area .insert-file').css('animation', ' insert-file-close 0.5s ease-in-out 0s 1 forwards');
	setTimeout(function() {
		$('#insert-file-area').hide();
		$('#insert-file-area .uploading-file-state span').click();
		$('#insert-file-area .insert-file').css('animation', ' none');
	}, 500);
}
$(function(){//底部图标颜色变换
	setInterval(function(){
		var color = spectrum(150,255);	
		$('#Hyper_Smart_Text').css({"text-shadow":"inset 0px 0px 10px "+color+"","color":color})
	},1500);
	function spectrum(min,max){
		var color = 'rgb(' + (Math.floor(Math.random() * (max - min + 1) + min)) + ',' + (Math.floor(Math.random() * (max - min + 1) + min)) + ',' + (Math.floor(Math.random() * (max - min + 1) + min)) + ')';
		return color;
	}
});
//点击发布文章
$(function(){
	$('#publish-article').click(function(){
		if($('#blogs-headline').val() == '欢迎使用阿克布斯-HyperSmartText编辑器'){
			// prompt_pop_up('发布文章', '请不要使用默认标题!', null, null,null);
			SuspensionPromptPopUp.create('请不要使用默认标题');
			return;
		}
		if($('#blogs-headline').val() == ''){
			SuspensionPromptPopUp.create('标题不能为空');
			return;
		}
		if(The_editing_zone_obj.$('#edit-page').text().length == 0){
			SuspensionPromptPopUp.create('发布文章不能为空');
			return;
		}
		dialogue_prompt_pop_up('发布文章', '是否发布此文章?', null, null,function(){//取消发布
			
		},function(){//确定发布
			// prompt_pop_up('发布文章', '发布文章成功!', null, null,null);
			//将发布的内容保存到本地存储中
				localStorage.setItem('issue_content',The_editing_zone_obj.$('#edit-page').html());
				localStorage.setItem('issue_blog_title',$('#blogs-headline').val());
				location.href = '../plus/safety_detection.html';
		});
	});
});
//点击工具箱按钮
$(function(){
	$('#tool-kit li').click(function(){//选中的未选中之间的状态切换
		if($(this).css('opacity') == '0.5'){//代表全屏模式下不能被选中
			return;
		}
		$(this).toggleClass('top-kit-child-click-true');
	});
});
function set_edit_tool_preview_height(){//设置博客编辑 工具 预览的高度
	var EditAreaWrapperHeight = 0;
	if($('#edit-tool').css('display') == 'block'){
		EditAreaWrapperHeight += $('#edit-tool').outerHeight(true);
	}
	if($('header').css('display') == 'block'){
		EditAreaWrapperHeight += $('header').outerHeight(true);
	}
	if($('#bottom-information').css('display') == 'flex'){
		EditAreaWrapperHeight += $('#bottom-information').outerHeight(true);
	}
	$('#write-blogs-edit-tool-preview').css('height', 'calc(100vh - ' + EditAreaWrapperHeight + 'px)');
	return EditAreaWrapperHeight;
}
function set_edit_tool_preview_height_slide(name){//设置博客编辑 工具 预览的高度 动画 为提高用户体验需要同步进行
	var EditAreaWrapperHeight = set_edit_tool_preview_height();
	if(name == '#edit-tool'){
		EditAreaWrapperHeight -= $('#edit-tool').outerHeight(true);
	}else if(name == 'header'){
		EditAreaWrapperHeight -= $('header').outerHeight(true);
	}else if(name == '#bottom-information'){
		EditAreaWrapperHeight -= $('#bottom-information').outerHeight(true);
	}
	$('#write-blogs-edit-tool-preview').css('height', 'calc(100vh - ' + EditAreaWrapperHeight + 'px)');
}
function close_primp_bar(value){//关闭/打开工具栏
	if($('.screen-full-close-btn').css('opacity') == '0.5'){//代表全屏模式下 不可以使用此功能
		if(value == '#edit-tool'){
			SuspensionPromptPopUp.create('全屏模式不支持此功能');
		}else{
			SuspensionPromptPopUp.create('全屏模式不支持此功能');
		}
		return;
	}
	//解决工具栏flex布局bug
	if($(value).css('display') != 'none'){
		$(value).slideToggle(500);
		set_edit_tool_preview_height_slide(value);
	}else{
		$(value).slideToggle(500,function(){
			set_edit_tool_preview_height();
		});
	}
	setTimeout(function(){
		ChangeFlex('#edit-tool-btn-wrapper li', 'li');
	},100);
}
function screen_full_edit(){//全屏编辑
	if($('#write-blogs-edit-tool-preview').height() == $(document.body).outerHeight(true)){
		$('#bottom-information').slideDown(500);
		$('#edit-tool').slideDown(500);
		$('header').slideDown(500);
		$('.screen-full-close-btn').css('opacity','1');
		setTimeout(function(){
			set_edit_tool_preview_height();
		},500);
		setTimeout(function(){
			ChangeFlex('#edit-tool-btn-wrapper li', 'li');
		},100);
	}else{
		$('.screen-full-close-btn').removeClass('top-kit-child-click-true');
		$('.screen-full-close-btn').css('opacity','0.5');
		$('#bottom-information').slideUp(500);
		$('#edit-tool').slideUp(500);
		$('header').slideUp(500);
		$('#write-blogs-edit-tool-preview').height($(document.body).outerHeight(true) + 'px');
	}
}
function into_full_preview(){//进入全屏模式
	var el = document.documentElement;
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
	    if(typeof rfs != "undefined" && rfs) {
	        rfs.call(el);
	    };
	 return;
}
function exit_full_preview(){//退出全屏模式
   if (document.exitFullscreen) {  
	   document.exitFullscreen();  
   }  
   else if (document.mozCancelFullScreen) {  
	   document.mozCancelFullScreen();  
   }  
   else if (document.webkitCancelFullScreen) {  
	   document.webkitCancelFullScreen();  
   }  
   else if (document.msExitFullscreen) {  
	   document.msExitFullscreen();  
   } 
   if(typeof cfs != "undefined" && cfs) {
	  cfs.call(el);
   }
}
function close_open_right_preview(){//关闭或打开右侧预览
	if($('.show_hide_preview span').css('color') != 'rgb(153, 154, 162)'){//代表恢复预览区域默认状态
		$('#edit-area-wrapper').show();
		$('.show_hide_preview').removeClass('top-kit-child-click-true');
		// $('#preview-area-wrapper').css('width','calc(50% - 15.5px)');
		// preview_area_blogs_obj.$('#preview-area').css("cssText", "max-width:740px !important;width:calc(100% - 30px)");//使用!important的写法
	}
	if($('#preview-area-wrapper').css('display') == 'none'){
		The_editing_zone_obj.Sync_content();//加载内容同步
		$('#edit-area-wrapper').css('width','calc(50% - 15.5px)');
		The_editing_zone_obj.$('#edit-page').css("cssText", "max-width:740px;width:calc(100% - 31px)");//使用!important的写法
		$('#preview-area-wrapper').toggle();
		$('#preview-area-wrapper').css('width','calc(50% - 15.5px)');
	}else{
		$('#edit-area-wrapper').css('width','calc(100% - 31px)');
		The_editing_zone_obj.$('#edit-page').css("cssText", "max-width:none;width:calc(100% - 31px)");
		$('#preview-area-wrapper').width('0px');
		setTimeout(function(){
			$('#preview-area-wrapper').toggle();
		},500);
	}
}
var preview_area_blogs_obj = $("#preview-area-blogs")[0].contentWindow;
function close_open_preview_page(){//关闭或打开预览页面
	if($('.show_hide_preview span').css('color') != 'rgb(153, 154, 162)'){//代表恢复编辑区域默认状态
		$('#preview-area-wrapper').show();
		$('.show_hide_right').removeClass('top-kit-child-click-true');
		// $('#edit-area-wrapper').css('width','calc(50% - 15.5px)');
		// The_editing_zone_obj.$('#edit-page').css("cssText", "max-width:740px !important;width:calc(100% - 30px)");//使用!important的写法
	}
	if($('#edit-area-wrapper').css('display') == 'none'){
		$('#preview-area-wrapper').css('width','calc(50% - 15.5px)');
		preview_area_blogs_obj.$('#preview-area').css("cssText", "max-width:740px;width:calc(100% - 31px)");//使用!important的写法
		$('#edit-area-wrapper').toggle();
		$('#edit-area-wrapper').css('width','calc(50% - 15.5px)');
	}else{
		The_editing_zone_obj.Sync_content();//加载内容同步
		$('#preview-area-wrapper').css('width','calc(100% - 31px)');
		preview_area_blogs_obj.$('#preview-area').css("cssText", "max-width:none;width:calc(100% - 31px)");//使用!important的写法
		$('#edit-area-wrapper').css("cssText","width:0px !important");
		setTimeout(function(){
			$('#edit-area-wrapper').toggle();
		},500);
	}
}
function open_sync_scroll(){
	if(The_editing_zone_obj.is_sync){
		The_editing_zone_obj.is_sync = false;//禁止在编辑区滚动时 双向同步滚动
		preview_area_blogs_obj.is_sync = false;//禁止在浏览区滚动时 双向同步滚动
		SuspensionPromptPopUp.create('已关闭双向同步滚动');
	}else{
		The_editing_zone_obj.is_sync = true;//禁止在编辑区滚动时 双向同步滚动
		preview_area_blogs_obj.is_sync = true;//禁止在浏览区滚动时 双向同步滚动
		SuspensionPromptPopUp.create('已打开双向同步滚动');
	}
}

/**
 * 代表发表的内容中存在安全问题
 */
$(function(){
	if(location.search != ''){
		if(location.search.indexOf('type') != -1){
			if(location.search.indexOf('false') != -1){ //代表存在安全问题,载入记录.
				var issue_content = localStorage.getItem('issue_content'),
					issue_blog_title = localStorage.getItem('issue_blog_title');
					open_loading_Page_animation();//打开加载动画
					setTimeout(function(){//开始载入
						$('#blogs-headline').val(issue_blog_title);
						$('#change-text-count').text(parseInt($('#blogs-headline').val().toString().length));//载入标题文字数量
						The_editing_zone_obj.$('#edit-page').empty().append(issue_content);
						$('#words-number').text(parseInt(The_editing_zone_obj.$('#edit-page').text().toString().length));//计算字数
						$('#line-number').text(parseInt(The_editing_zone_obj.$('#edit-page div').length));//计算行数
						close_loading_Page_animation();
						
						//载入完毕后清空，本地存储数据。
						// localStorage.setItem('issue_content','');
						// localStorage.setItem('issue_blog_title','');
					},500);
			}
		}
	}
});
window.onbeforeunload = function(){//阻止页面直接关闭
	// return false;
}