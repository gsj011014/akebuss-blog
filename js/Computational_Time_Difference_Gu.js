/**
 * jquery plugin -- jquery.Computational_Time_Difference_Gu.js
 * Description: a slideunlock plugin based on jQuery
 * Version: 1.1
 * Author: Gu Shijie
 * created: February 28, 2020 00:17
 */

;(function ($,window,document,undefined){
	/**
	 * 判断发布日期距离指定日期的时间差
	 * @param {string} date  格式 => 2020-02-28 00:17:12
	 * @return {string}
	 */
	function time_difference(date){
		//指定时间
		this.date = date;
		//当前时间
		this.current_time = null;
		//当前时间的区分
		this.current_time_difference = {
			year:2020,
			month:02,
			day:20,
			hours:18,
			minutes:20,
			seconds:20
		};
		//指定时间的区分
		this.assign_time_difference = {
			year:2020,
			month:02,
			day:20,
			hours:18,
			minutes:20,
			seconds:20
		}
		//时间差
		this.time_difference_text = 0;
		if(date == undefined){//当参数为空时 默认获取当前系统时间
			this.current_time_system();
			return;
		}
		//调用初始化方法
		this.init();
	}
	
	/**
	 * 初始化操作
	 * 
	 */
	time_difference.prototype.init = function(){
		//获取当前系统时间
		this.current_time_system();
		//计算时间差
		this.calculate_distinguish_time()
	};
	
	/**
	 * 计算时间差
	 */
	time_difference.prototype.calculate_distinguish_time = function(){
		//指定时间
		$.extend(this.assign_time_difference,this.distinguish_date(this.date));
		//当前时间
		$.extend(this.current_time_difference,this.distinguish_date(this.current_time));
		//指定时间对象
		var this_assign_time_difference = this.assign_time_difference;
		//当前时间对象
		var this_current_time_difference = this.current_time_difference;
		
		//年差
		if(this_assign_time_difference.year != this_current_time_difference.year){
			this.time_difference_text = parseInt(this_current_time_difference.year - this_assign_time_difference.year) + '年前';
			return;
		}
		//月差
		if(this_assign_time_difference.month != this_current_time_difference.month){
			this.time_difference_text = parseInt(this_current_time_difference.month - this_assign_time_difference.month) + '个月前';
			return;
		}
		//日差
		if(this_assign_time_difference.day != this_current_time_difference.day){
			this.time_difference_text = parseInt(this_current_time_difference.day - this_assign_time_difference.day) + '天前';
			return;
		}
		//时差
		if(this_assign_time_difference.hours != this_current_time_difference.hours){
			this.time_difference_text = parseInt(this_current_time_difference.hours - this_assign_time_difference.hours) + '小时前';
			return;
		}
		//分差
		if(this_assign_time_difference.minutes != this_current_time_difference.minutes){
			 this.time_difference_text = parseInt(this_current_time_difference.minutes - this_assign_time_difference.minutes) + '分种前';
			 return;
		}
		//秒差
		if(this_assign_time_difference.seconds != this_current_time_difference.seconds){
			this.time_difference_text = parseInt(this_current_time_difference.seconds - this_assign_time_difference.seconds) + '秒前';
			return;
		}
		//代表刚刚发布
		if(this_assign_time_difference.seconds == this_current_time_difference.seconds){
			this.time_difference_text = '刚刚';
			return;
		}
	}
	
	/**
	 * 区分时间
	 * 分隔时间
	 * @param {string} date 
	 */
	time_difference.prototype.distinguish_date = function(date){
		console.log();
		
		//年月日
		var y_m_d = date.split(' ')[0];
		
		//时分秒
		var h_m_s = date.split(' ')[1];
		
		//年
		var year = y_m_d.split('-')[0];
		
		//月
		var month = y_m_d.split('-')[1];
		
		//日
		var day = y_m_d.split('-')[2];
		
		//时
		var hours = h_m_s.split(':')[0];
		
		//分
		var minutes = h_m_s.split(':')[1];
		
		//秒
		var seconds = h_m_s.split(':')[2];
		
		var time_key_value = {
			year:year,
			month:month,
			day:day,
			hours:hours,
			minutes:minutes,
			seconds:seconds
		}
		return time_key_value;
	};
	
	/**
	 * 获取系统当前时间
	 * 
	 */
	time_difference.prototype.current_time_system = function(){
		var myDate = new Date(),
			year = myDate.getFullYear(),
			month = myDate.getMonth() + 1,
			date = myDate.getDate(),
			h = myDate.getHours(),
			m = myDate.getMinutes(),
			s = myDate.getSeconds();
		var now = year + '-' +  conver(month) + '-' + conver(date) +' '+ conver(h) + ':' +  conver(m) + ':' + conver(s);
		this.current_time = now;
		//日期时间处理
		function conver(s){
			return (s < 10 ? '0' + s : s).toString();
		}
	}
	window.time_difference = time_difference;
	time_difference.create = function(date){
		return new time_difference(date);
	}
})(jQuery, window, document);