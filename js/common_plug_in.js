//获取系统时间
function UpdateTime(){
	var myDate = new Date(),
		year = myDate.getFullYear(),
		month = myDate.getMonth() + 1,
		date = myDate.getDate(),
		h = myDate.getHours(),
		m = myDate.getMinutes(),
		s = myDate.getSeconds();
	//获取当前时间
	var now = year + '-' +  conver(month) + '-' + conver(date) +' '+ conver(h) + ':' +  conver(m) + ':' + conver(s);
	return now;
}
//日期时间处理
function conver(s){
	return (s < 10 ? '0' + s : s).toString();
}