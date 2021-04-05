function SaveRichText() { //保存编辑区内容
	if(parent.$('#blogs-headline').val() == '欢迎使用阿克布斯-HyperSmartText编辑器'){
		parent.SuspensionPromptPopUp.create('请不要使用默认标题');
		return;
	}
	if(parent.$('#blogs-headline').val() == ''){
		parent.SuspensionPromptPopUp.create('标题不能为空');
		return;
	}
	var editPageHTML = $('#edit-page').html();
	parent.$('#save-time').show();
	parent.$('#save-time').find('.time-text').text(parent.UpdateTime());
	localStorage.setItem('blogs_headline', parent.$('#blogs-headline').val());
	localStorage.setItem("SaveRichHtml",editPageHTML);
	localStorage.setItem("last_save_time",parent.$('#save-time').find('.time-text').text());
	parent.SuspensionPromptPopUp.create('保存草稿成功');
}
localStorage.setItem('fontSize', 3); //本地存储默认字体大小
var RichTextExecCommand = { //富文本编辑对象
	add_bold: function() { //加粗属性
		window.document.execCommand("bold", true, null);
	},
	add_italic: function() { //斜体属性
		window.document.execCommand("italic", true, null);
	},
	add_underline: function() { //下划线属性
		window.document.execCommand("underline", true, null);
	},
	set_fontSize: function() { //设置字体大小属性
		window.document.execCommand("fontSize", true, 1);
	},
	increase_fontSize: function() { //增加字体大小属性
		if (getSelectedContentsObj().anchorNode == null) {
			return;
		}
		var fontSize = parseInt(localStorage.getItem('fontSize')) + 1;
		if (fontSize == 8) {
			return;
		}
		window.document.execCommand("fontSize", true, fontSize);
		localStorage.setItem('fontSize', fontSize);
	},
	decrease_fontSize: function() { //减小字体大小属性
		if (getSelectedContentsObj().anchorNode == null) {
			return;
		}
		var fontSize = parseInt(localStorage.getItem('fontSize')) - 1;
		if (fontSize == 0) {
			return;
		}
		window.document.execCommand("fontSize", true, fontSize);
		localStorage.setItem('fontSize', fontSize);
	},
	insert_ul: function() { //插入无序列表
		window.document.execCommand("insertUnorderedList", true, null);
	},
	insert_ol: function() { //插入有序列表
		window.document.execCommand("insertOrderedList", true, null);
	},
	text_leftAlign: function() { //文本左对齐
		window.document.execCommand("justifyLeft", true, null);
	},
	text_rightAlign: function() { //文本右对齐
		window.document.execCommand("justifyRight", true, null);
	},
	text_centerAlign: function() { //文本居中对齐
		window.document.execCommand("justifyCenter", true, null);
	},
	text_justifyFull: function() { //文本对齐
		window.document.execCommand("justifyFull", true, null);
	},
	add_strikeThrough: function() { //中划线
		window.document.execCommand("strikeThrough", true, null);
	},
	insert_horizontalLine: function() { //插入水平线
		window.document.execCommand("insertHorizontalRule", true, null);
	},
	amend_fontColor: function(color) {
		window.document.execCommand("foreColor", true, color);
	},
	amend_backColor: function(color) {
		window.document.execCommand("hiliteColor", true, color);
		window.document.execCommand("backColor", true, color);
	},
	text_removeFormat: function() { //格式化去除所有样式
		window.document.execCommand("removeFormat", true, null);
	},
	set_headline: function() {
		window.document.execCommand("bold", true, null);
		window.document.execCommand("fontSize", true, 7);
		localStorage.setItem('fontSize', 7);
	},
	createLink: function(show_text, open_url) {
		window.document.execCommand("createLink", true, show_text, open_url);
		$('#edit-page a').eq($('#edit-page a').length - 1).attr("contenteditable", "false"); //禁止修改
	},
	insertHTML: function(insert_html) {
		window.document.execCommand("insertHTML", true, insert_html);
	},
	selectAll: function(){
		window.document.execCommand("selectAll",true,null);
	},
	Copy: function(){
		window.document.execCommand("Copy",true,null);
	},
	redo:function(){//重做
		window.document.execCommand("redo",true,null);
	},
	undo:function(){//撤销
		window.document.execCommand("undo",true,null);
	},
	subscript:function(){//下角标
		window.document.execCommand("subscript",true,null);
	},
	superscript:function(){//上角标
		window.document.execCommand("superscript",true,null);
	}
}
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
function A_key_to_empty(){//一键清空
	$('#edit-page').empty();
	$('#edit-page').append('<div></div>');
	parent.$('.default-value').text(0);
	parent.SuspensionPromptPopUp.create('清空内容成功');
}
function insert_headline(){//插入标题
	RichTextExecCommand.insertHTML('<br><br><h2 class="headline-child" contenteditable="true">请输入标题</h2>');
}
function insert_cite(){//插入引用
	RichTextExecCommand.insertHTML('<br><br><div class="cite-wrapper"><p class="delete-cite" contenteditable="false">删除引用</p><div class="cite"><p>引用</p></div></div><br><br>');
	var del_cite_btn_settimeout = null;
	$('#edit-page .cite-wrapper').hover(function(){
		var this_obj = $(this);
		clearTimeout(del_cite_btn_settimeout);
		$(this_obj).find('.delete-cite').show();
		setTimeout(function(){
			$(this_obj).find('.delete-cite').css('opacity','1');
		},10);
	},function(){
		var this_obj = $(this);
		del_cite_btn_settimeout = setTimeout(function(){
			$(this_obj).find('.delete-cite').css('opacity','0');
			setTimeout(function(){
				$(this_obj).find('.delete-cite').hide();
			},300);
		},1000);
	});
	$('#edit-page .cite-wrapper .delete-cite').click(function(){//删除引用
		$(this).parents('.cite-wrapper').remove();
		parent.SuspensionPromptPopUp.create('删除引用成功');
	});
}
//添加图片
$(function() {
	parent.$('#ChooseImageFile').change(function(){
		$('#edit-page').focus();
		if(getfocusLocationObj()[0].className == 'code-block-content'){
			parent.SuspensionPromptPopUp.create('代码块中不能添加图片');
			return;
		}
		var files = $(this).prop('files')[0];
		if (files == undefined) {
			return;
		}
		var src = window.URL.createObjectURL(files);
		uploading_image(src);
	});
});
function uploading_image(src){
	var click_image_count = 2;
		RichTextExecCommand.insertHTML('<br><br><img class="file-image-img" src="'+src+'" title="点击查看图片" ><br><br>');
		$('#edit-page .file-image-img').eq($('#edit-page .file-image-img').length - 1).data('fileImageSrc',src); //将图片地址保存到JQuery对象上面
		parent.close_insert_file();
		preview_image();
}
function preview_image(){//预览图片
	//双击查看图片  暂且不需要双击
	$('#edit-page .file-image-img').click(function(){
		preview_image_click($(this));
	});
	//预览区预览图片
	var preview_area_obj = parent.$("#preview-area-blogs")[0].contentWindow; //获取预览区的iframe对象
	preview_area_obj.$('.file-image-img').click(function(){
		preview_image_click($(this));
	});
	function preview_image_click(this_obj){
		var this_obj = this_obj,
			src = this_obj.attr('src'); 
			parent.$('#image-viewer-bg').show();
			setTimeout(function(){
				parent.$('#image-viewer-bg').css('opacity','1');
				parent.$('#image-viewer-bg #image-viewer').css('background-image','url('+src+')');
				parent.$('#image-viewer-bg #image-viewer').click(function(){
					parent.$('#image-viewer-bg').css('opacity','0');
					setTimeout(function(){
						parent.$('#image-viewer-bg').hide();
					},400);
				});
			},10);
	}
}
//添加视频
$(function() {
	parent.$('#ChooseVideoFile').change(function() {
		$('#edit-page').focus();
		if(getfocusLocationObj()[0].className == 'code-block-content'){
			parent.SuspensionPromptPopUp.create('代码块中不能添加视频');
			return;
		}
		var files = $(this).prop('files')[0];
		if (files == undefined) {
			return;
		}
		var src = window.URL.createObjectURL(files);
		uploading_video(src);
	});
});
function uploading_video(src){
	RichTextExecCommand.insertHTML('<br><br>&nbsp;&nbsp;<div class="file-video"><video controls="controls" src="' + src +'"></video></div>&nbsp;&nbsp;<br><br>');
	$('#edit-page .file-video').eq($('#edit-page .file-video').length - 1).data('fileVideoSrc',src); //将图片地址保存到JQuery对象上面
	parent.close_insert_file();
	$('#edit-page .file-video').click(function() {
		console.log($(this).data('fileVideoSrc')); //获取保存的地址
	});
}
//添加音频
$(function() {
	parent.$('#ChooseAudioFile').change(function(){
		$('#edit-page').focus();
		if(getfocusLocationObj()[0].className == 'code-block-content'){
			parent.SuspensionPromptPopUp.create('代码块中不能添加音频');
			return;
		}
		var files = $(this).prop('files')[0];
		if (files == undefined) {
			return;
		}
		var src = window.URL.createObjectURL(files);
		uploading_audio(src);
	});
});
function uploading_audio(src){
	RichTextExecCommand.insertHTML('<br><br>&nbsp;&nbsp;<div class="file-audio"><audio controls="controls" src="' + src +'"></audio></div>&nbsp;&nbsp;<br><br>');
	$('#edit-page .file-audio').eq($('#edit-page .file-audio').length - 1).data('fileAudioSrc',src); //将图片地址保存到JQuery对象上面
	parent.close_insert_file();
	$('#edit-page .file-audio').click(function() {
		// console.log($(this).parent('.file-audio').data('fileAudioSrc')); //获取保存的地址
	});
}
/* 代码块的列数显示 */
$(function(){
	var preview_area_obj = parent.$("#preview-area-blogs")[0].contentWindow; //获取预览区的iframe对象
	var initial_text_size_len = 1;
	$('#edit-page').click(function(){//刷新当前所在列
		var StartOffset = getSelectedContentsObj().anchorOffset;
		parent.$('#current-column').text(StartOffset);
	});
	document.onkeydown = function(e){
		if(e.keyCode == 8 || e.keyCode == 46){
			var this_cite = $(getSelectedContentsObj().focusNode).parents('.cite');
			if(this_cite.length != 0 && this_cite.text().toString().length == 0){//引用代码块的删除
				this_cite.parents('.cite-wrapper').remove();
			}
		}
		setTimeout(function(){
			parent.$('#words-number').text(parseInt($('#edit-page').text().toString().length));//计算字数
			parent.$('#line-number').text(parseInt($('#edit-page div').length));//计算行数
			$('#edit-page div').click(function(){//刷新当前所在行
				parent.$('#current-line').text(parseInt(getfocusLocationObj().index() + 1));//刷新当前所在行
			});
			parent.$('#current-line').text(parseInt(getfocusLocationObj().index() + 1));//刷新当前所在行
			var StartOffset = getSelectedContentsObj().anchorOffset;
			parent.$('#current-column').text(StartOffset);//刷新当前所在列
		},10);
		var this_Code_block = $(getSelectedContentsObj().focusNode).parents('.code-block');
		if (this_Code_block.length > 0){ //如果是在代码块选区内
			if(e.keyCode == 8 || e.keyCode == 13 || e.keyCode == 46 || e.ctrlKey && e.keyCode == 86 || e.ctrlKey && e.keyCode == 89 || e.ctrlKey && e.keyCode == 90){//如果按下的是更改行的按键就需要延时刷新
				setTimeout(function(){
					delete_code_block_row_count(this_Code_block);
					refresh_code_block_row_size(this_Code_block);
					refresh_code_block_row_width(this_Code_block);
				},0);
			}else{
				refresh_code_block_row_size(this_Code_block);
				refresh_code_block_row_width(this_Code_block);
			}
			setTimeout(function(){
				refresh_code_block_height(this_Code_block);
			},0);
		}
	}
	function delete_code_block_row_count(this_obj){//删除代码块显示列数的数字
		for(var i = 0;i < this_obj.find('div').length;i++){//如果里面存在row-count
			if(this_obj.find('div').eq(i).find('.row-count').length > 0){
				this_obj.find('div').eq(i).find('.row-count').remove();
			}
			if(this_obj.find('div').eq(i).find('.row-count').length >= 2){
				console.log(this_obj.find('.code-block-content').eq(i));
			}
		}
	}
	function refresh_code_block_height(this_obj){//刷新代码块高度
		var alone_width = this_obj.find('.code-block-content').eq(0).height();//获取代码块单行的高度
		var this_Code_block_div_len = this_obj.find('.code-block-content').length;//获取代码块中总共几列
		this_obj.height(alone_width * this_Code_block_div_len + 13 +'px');//计算代码块的高度
	}
	function refresh_code_block_row_size(this_obj){//刷新代码块列数
		if(this_obj.find('.code-block-content').length == 0 || this_obj.find('.row-count-wrapper').length == 0){//如果代码块中没有内容了 就删除代码块
			this_obj.remove();
		}
		if(this_obj.find('.copy-code').length == 0){//如果复制按钮被用户删除掉 再添加上
			this_obj.append('<a class="copy-code" contenteditable="false">复制</a>');
		}
		this_obj.find('.row-count-wrapper').empty();
		for(var j = 0;j < this_obj.find('.code-block-content').length;j++){
			this_obj.find('.row-count-wrapper').append('<p>'+parseInt(j + 1)+'</p>');
		}
	}
	function refresh_code_block_row_width(this_obj){//刷新代码块列数宽度
		var this_Code_block_text_size = this_obj.find('.row-count-wrapper p').length;
		var text_size_len = this_Code_block_text_size.toString().length;
		if(initial_text_size_len == text_size_len){//如果不需要改变宽度就不需要刷新了 节省资源
			return;
		}else{
			initial_text_size_len = text_size_len;
		}
		switch(true){
			case this_Code_block_text_size >= 0 && this_Code_block_text_size < 10: set_this_Code_block_width('16',this_obj);
			 break;
			case this_Code_block_text_size >= 10 && this_Code_block_text_size < 100: set_this_Code_block_width('25',this_obj);
			 break;
			case this_Code_block_text_size >= 100 && this_Code_block_text_size < 1000: set_this_Code_block_width('31',this_obj);
			 break;
			case this_Code_block_text_size >= 1000 && this_Code_block_text_size < 10000: set_this_Code_block_width('37',this_obj);
			 break;
			case this_Code_block_text_size >= 10000: set_this_Code_block_width('43px',this_obj);
			 break;
		}
	}
	function set_this_Code_block_width(width_size,this_obj){//设置代码列数宽度
		this_obj.find('.row-count-wrapper').width(width_size + 'px');
		this_obj.find('.code-block-wrapper').css('width','calc(100% - '+width_size+'px - 10px - 12px)')
	}
});
/* 添加代码块 */
$(function(){
	parent.$('#add-code-block').click(function(){
		$('#edit-page').focus();
		if(getfocusLocationObj()[0].className == 'code-block-content'){
			parent.SuspensionPromptPopUp.create('代码块中不能再次添加代码块');
			return;
		}
		RichTextExecCommand.insertHTML('<br><br><div class="code-block code-block-select-style"><div class="code_block_dispose_btn"><a class="all-choose-code" contenteditable="false">全选</a><a class="copy-code" contenteditable="false">复制</a><a class="clear-code" contenteditable="false">删除代码块</a></div><ul class="row-count-wrapper" contenteditable="false"><p>1</p></ul><div class="code-block-wrapper">	<div class="code-block-content">欢迎使用阿克布斯富文本编译器！</div></div></div><br><br>');
	});
	//如果点击edit-page 恢复默认样式
	// $('#edit-page').click(function(){
	// 	$(this).find('.code-block').removeClass('code-block-select-not-style').addClass('code-block-select-style');
	// });
});
function Bubblesort(arr){ //冒泡排序
	for (i = 0; i < arr.length - 1; i++){ //排序趟数 注意是小于
		for (j = 0; j < arr.length - i - 1; j++) {
			//一趟确认一个数，数组长度减当前趟数就是剩下未确认的数需要比较的次数
			//因为j从0开始，所以还要再减1，或者理解为arr.length-(i+1)
			if (arr[j] > arr[j + 1]){
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
		return arr[arr.length - 1];
	}
}
function getfocusLocationObj(){
	if ($(getSelectedContentsObj().focusNode).get(0).nodeName == '#text') {
		return $(getSelectedContentsObj().focusNode.parentNode);
	} else {
		return $(getSelectedContentsObj().focusNode);
	}
}
var is_sync = true;
//监听DOM节点是否有变化
$(function(){
	$('#edit-page').get(0).addEventListener('DOMSubtreeModified', function () {//同步内容
		if(parent.$("#preview-area-wrapper").css('display') == 'block'){
			if(parent.$('#preview-area-wrapper').css('display') == 'none'){//当右侧预览区关闭时,禁止同步节省资源.
				return;
			}
			setTimeout(function(){
				Sync_content();
			});
		}
	}, false);
	//同步滚动条
	window.onscroll = function(){/* 使用滚动条事件的时候不得设置overflow属性 */
		if(!is_sync){
			return;
		}
		preview_area_obj.$('body').scrollTop($('body').scrollTop());//增加内容时 同步滚动条位置
		var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;
		preview_area_obj.scrollTo(0,scroll_top)
	}
	parent.$('#edit-tool-btn-wrapper').click(function(){
		if(parent.$('#preview-area-wrapper').css('display') == 'none'){//当右侧预览区关闭时,禁止同步节省资源.
			return;
		}
		Sync_content();
	});
});
var preview_area_obj = parent.$("#preview-area-blogs")[0].contentWindow; //获取预览区的iframe对象
function Sync_content(){//同步内容
	preview_area_obj.$('#preview-area').empty();
	preview_area_obj.$('#preview-area').append($('#edit-page').html());
	preview_area_obj.$('body').scrollTop($('body').scrollTop());//增加内容时 同步滚动条位置
	preview_image();
}