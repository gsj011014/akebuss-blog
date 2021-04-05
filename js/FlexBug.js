//Flex布局Bug解决
function ChangeFlex(objChild,addLabel){//第一个参数代表添加的元素 第二个代表添加的标签
	if($(objChild).siblings('.flex-son').length != 0){//当里面存在flex-son就删除
		$(objChild).siblings('.flex-son').remove();
	}
	var screenWidth = $(objChild).parent().width(),
		bolckObj = $(objChild).not('.flex-son'),//获取当前容器的子元素
		WrapperObj = bolckObj.parent(),//获取当前容器，以便添加
		bolckCount = bolckObj.length,//所有元素的个数
		blockWidth = bolckObj.outerWidth(true),
		oddRowCount = parseInt(screenWidth/blockWidth),//单行元素的个数
		all_row = Math.ceil(bolckCount / oddRowCount),//一共多少行
		last_row_count = bolckCount - ((all_row - 1)*oddRowCount),//最后一行的当前个数
		need_add_count = oddRowCount - last_row_count;
		if(bolckCount == 1){//如果是一个元素的话不需要修改bug
			return;
		}
		if(bolckCount % oddRowCount == 0){//是否需要添加元素
			
		}else{
			for(var i = 0; i < need_add_count;i++){
				WrapperObj.append('<'+addLabel+' class="flex-son" style="visibility: hidden;"></'+addLabel+'>');
			}
			WrapperObj.find('.flex-son').css({"width":blockWidth + "px","padding":"0","margin-left":"0","margin-right":"0"});
		}
}