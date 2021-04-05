//图片预览
$(function(){
	
});
function selectText(element_obj){//选中内容
    var text = element_obj;
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        /*if(selection.setBaseAndExtent){
            selection.setBaseAndExtent(text, 0, text, 1);
        }*/
    } else {
        // alert("none");
    }
}
//代码块显示复制 全选 删除
$(function(){
	//点击复制代码按钮
	$(document).on('click','#edit-page .code-block .copy-code',function(){
		selectText($(this).parents('.code-block').find('.code-block-wrapper').get(0));
		RichTextExecCommand.Copy();
		parent.SuspensionPromptPopUp.create('复制代码成功');
	});
	//点击删除代码块按钮
	$(document).on('click','#edit-page .code-block .clear-code',function(){
		var obj = $(this);
		obj.parents('.code-block').remove();
		parent.SuspensionPromptPopUp.create('删除代码块成功');
	});
	//点击全选按钮
	$(document).on('click','#edit-page .code-block .all-choose-code',function(){
		selectText($(this).parents('.code-block').find('.code-block-wrapper').get(0));
	});
	var code_block_dispose_btn_settimeout = null;
	//如果移出代码块,处理按钮的显示与隐藏
	$(document).on({
		mouseenter: function(){
			var this_obj = $(this);
			clearTimeout(code_block_dispose_btn_settimeout);
			$(this_obj).find('.code_block_dispose_btn').css('display','flex');
			setTimeout(function(){
				$(this_obj).find('.code_block_dispose_btn').css('opacity','1');
			},10);
		},
		mouseleave: function(){
			var this_obj = $(this);
			code_block_dispose_btn_settimeout = setTimeout(function(){
				$(this_obj).find('.code_block_dispose_btn').css('opacity','0');
				setTimeout(function(){
					$(this_obj).find('.code_block_dispose_btn').hide();
				},300);
			},1000);
		}
	},'#edit-page .code-block');
});
