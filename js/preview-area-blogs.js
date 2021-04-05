//同步滚动条
var is_sync = true;
var The_editing_zone_obj = parent.$("#The-editing-zone")[0].contentWindow; //获取预览区的iframe对象
window.onscroll = function(){/* 使用滚动条事件的时候不得设置overflow属性 */
	if(!is_sync){
		return;
	}
	The_editing_zone_obj.$('body').scrollTop($('body').scrollTop());//增加内容时 同步滚动条位置
	var scroll_top = document.body.scrollTop || document.documentElement.scrollTop;
	The_editing_zone_obj.scrollTo(0,scroll_top)
}