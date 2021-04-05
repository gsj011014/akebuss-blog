/**
 * jquery plugin -- jquery.Pagination.js
 * Description: a slideunlock plugin based on jQuery
 * Version: 1.1
 * Author: Gu Shijie
 * created: February 29, 2020 01:09
 */

;
(function($,window,document,undefined){
	
	/**
	* 分页插件
	* @param {int int {key : value} function function}  all_data_count  each_page_data_count style data_branches click_too_fast
	* @return {type}
	* 
	*/
	function Pagination(append_obj,all_data_count,each_page_data_count,style,get_data_branches,click_too_fast){
		
		//拼接对象 如果不存在这个元素给他一个默认拼接元素
		this.append_obj = this.checkElm(append_obj) ? append_obj : $('body');
		
		//获取返回的数据条数
		this.get_data_branches = this.checkFn(get_data_branches) ? get_data_branches : function(){};
		
		//用户点击过快执行的方法
		this.click_too_fast = this.checkFn(click_too_fast) ? click_too_fast : function(){};
		
		//共多少数据
		this.all_data_count = all_data_count;
		
		//每页显示的数据个数
		this.each_page_data_count = each_page_data_count;
		
		//随机数字
		this.random = parseInt(Math.random() * (10000 - 1000 + 1) + 1000);
		
		//默认的样式
		var style_default = {
			Pagination_position : "relative",
			Pagination_top : "0px",
			Pagination_left : "0px",
			Pagination_right : "0px",
			Pagination_bottom : "0px",
			Pagination_width : '100%',
			Pagination_padding : '5px 0px',
			Pagination_margin : '0px auto',
			Pagination_backgroundColor : 'white',
			Pagination_child_btn_fontSize : "12px",
			Pagination_child_btn_width : "32px",
			Pagination_child_btn_height : "30px",
			Pagination_child_btn_lineHeight : "32px",
			Pagination_child_btn_margin : "0px 4px",
			Pagination_child_btn_color : "#4F4F4F",
			Pagination_child_btn_border : "1px solid white",
			Pagination_child_btn_borderRadius : "2px",
			Pagination_child_btn_hover_border : "1px solid rgb(217,46,46)",
			Pagination_child_btn_hover_color : "rgb(217,46,46)",
			Pagination_child_btn_prePage_padding : "0px 10px",
			Pagination_child_btn_nextPage_padding : "0px 10px",
			current_page_backgroundColor : "rgb(238,238,238)",
			current_page_border : "1px solid rgb(238,238,238)",
			not_select_color : "rgb(234,234,234)",
			current_page_backgroundColor : "rgb(238,238,238)",
			current_page_border : "1px solid rgb(238,238,238)",
			Pagination_child_btn_not_select_color : "rgb(234,234,234)"
			
		};
		this.style = $.extend(style_default,style || {});//更新对象
		
		//分页插件的选项
		var pagination_option = {
			id : 'Pagination-'+this.random
		}
		
		//生成的分页插件的ID
		this.id = pagination_option.id;
		
		//分页查询的对象
		this.this_obj = null;
		
		//最大页面页码
		this.max_page = parseInt(Math.ceil(all_data_count / each_page_data_count));
		
		//当前页面页码
		this.current_page = 1;
		
		//防止用户点击过快
		this.speed = true;
		
		//初始化操作
		this.init();
		
	}
	
	/**
	 * 分页插件
	 * 初始化
	 */
	Pagination.prototype.init = function(){
		var this_pagination = this;
		
		//创建分页对象
		this.create_pagination();
		
		//更新
		this.next_page(1);
		
		//点击上一页
		$(document).on('click','#'+this.id + ' .pre_page',function(){
			if($(this).data('is_up_down_cut')){
				return;
			}
			if(!this_pagination.speed){
				this_pagination.click_too_fast();
				return;
			}
			this_pagination.speed = false;
			setTimeout(function(){
				this_pagination.speed = true;
			},1000);
			this_pagination.click_pre_page();
			if(!$(this).data('is_up_down_cut')){
				$(this).css('color',this_pagination.style.Pagination_child_btn_hover_color);
			}
			this_pagination.convert_data_branches();
			this_pagination.get_data_branches();
		});
		
		//点击下一页
		$(document).on('click','#'+this.id + ' .next_page',function(){
			if($(this).data('is_up_down_cut')){
				return;
			}
			if(!this_pagination.speed){
				this_pagination.click_too_fast();
				return;
			}
			this_pagination.speed = false;
			setTimeout(function(){
				this_pagination.speed = true;
			},1000);
			this_pagination.click_next_page();
			if(!$(this).data('is_up_down_cut')){
				$(this).css('color',this_pagination.style.Pagination_child_btn_hover_color);
			}
			this_pagination.convert_data_branches();
			this_pagination.get_data_branches();
		});
		
		//点击里面的索引
		$(document).on('click','#'+this.id + ' li:not(.next_page,.pre_page,.ellipsis_dot)',function(){
			if(!this_pagination.speed){
				this_pagination.click_too_fast();
				return;
			}
			this_pagination.speed = false;
			setTimeout(function(){
				this_pagination.speed = true;
			},1000);
			this_pagination.click_btn(parseInt($(this).text()),$(this));
			$(this).css('color',this_pagination.style.Pagination_child_btn_color);
			this_pagination.convert_data_branches();
			this_pagination.get_data_branches();
		});
	}
	
	/**
	 * 	将页数转换为数据条数
	 */
	Pagination.prototype.convert_data_branches = function(){
		var start_data_index = (this.current_page - 1) * this.each_page_data_count;
		var end_data_index = start_data_index + this.each_page_data_count;
		if(this.current_page == this.max_page){//防止最后一页数据 比每页数据要少
			end_data_index = start_data_index + this.all_data_count - ((this.max_page - 1) * this.each_page_data_count);
		}
		// console.log(start_data_index);
		// console.log(end_data_index);
		return '[{"start_data_index":"'+start_data_index+'","end_data_index":"'+end_data_index+'"}]';
		
	} 
	
	/**
	 * 点击索引切换
	 */
	Pagination.prototype.click_btn = function(page_index){
		if(page_index >= 3 && page_index <= this.max_page - 2){
			this.this_obj.find('.next').show();
			this.this_obj.find('.pre').show();
			this.this_obj.find('.pre').text(page_index - 1);
			this.this_obj.find('.middle').text(page_index);
			this.this_obj.find('.next').text(page_index + 1);
		}else{
			this.this_obj.find('.pre').hide();
		}
		if(page_index > this.max_page - 2){
			this.this_obj.find('.next').show();
			this.this_obj.find('.middle').text(this.max_page - 2);
			this.this_obj.find('.next').text(this.max_page - 1);
			this.this_obj.find('.end_ellipsis_dot').hide();
		}
		if(page_index <= this.max_page - 3){
			this.this_obj.find('.end_ellipsis_dot').show();
		}
		if(page_index >= 4){
			this.this_obj.find('.start_ellipsis_dot').show();
		}else{
			this.this_obj.find('.start_ellipsis_dot').hide();
		}
		if(page_index < 3){
			this.this_obj.find('.pre').show();
			this.this_obj.find('.pre').text(2);
			this.this_obj.find('.middle').text(3);
			this.this_obj.find('.next').hide();
		}
		this.current_page = page_index;
		this.cut_page(page_index);
	}
	
	
	/**
	 * 点击上一页
	 */
	Pagination.prototype.click_pre_page = function(){
		
		this.current_page -= 1;
		
		//代表当前页面下标为-1
		if(this.current_page == 0){
			this.current_page  = 1;
			return;
		}
		this.pre_page(this.current_page);
	}
	
	/**
	 * 点击下一页
	 */
	Pagination.prototype.click_next_page = function(){
		
		this.current_page += 1;
		
		//代表当前页面下标大于最大页面数
		if(this.current_page > this.max_page){
			this.current_page = this.max_page;
			return;
		}
		this.next_page(this.current_page);
	}
	
	/**
	 * 上一页
	 * 更改索引的数字
	 */
	Pagination.prototype.pre_page = function(page_index){
		if(page_index == 3){
			this.this_obj.find('.pre').text(2);
			this.this_obj.find('.middle').text(3);
			this.this_obj.find('.next').text(4);
			this.this_obj.find('.start_ellipsis_dot').hide();
		}else{
			if(page_index >= this.max_page - 2){
				this.this_obj.find('.pre').show();
			}else{
				this.this_obj.find('.end_ellipsis_dot').show();
				if(page_index == 2){
					this.this_obj.find('.next').hide();
				}
				if(page_index > 3){
					this.this_obj.find('.pre').text(page_index - 1);
					this.this_obj.find('.middle').text(page_index);
					this.this_obj.find('.next').text(page_index + 1);
				}
			}
		}
		this.cut_page(page_index);
	}
	
	/**
	 * 下一页
	 * 更改索引的数字
	 */
	Pagination.prototype.next_page = function(page_index){
		if(page_index < 3){
			this.this_obj.find('.pre').text(2);
			this.this_obj.find('.middle').text(3);
			this.this_obj.find('.next').text(4);
			this.this_obj.find('.next').hide();
		}else{
			if(page_index < this.max_page - 2){
				if(page_index >= 3){
					this.this_obj.find('.next').show();
				}
				if(page_index >= 4){
					this.this_obj.find('.pre').text(page_index - 1);
					this.this_obj.find('.middle').text(page_index);
					this.this_obj.find('.next').text(page_index + 1);
					this.this_obj.find('.start_ellipsis_dot').show();
				}
			}else{
				this.this_obj.find('.end_ellipsis_dot').hide();
				this.this_obj.find('.pre').text(this.max_page - 3);
				this.this_obj.find('.middle').text(this.max_page - 2);
				this.this_obj.find('.next').text(this.max_page - 1);
				if(page_index >= this.max_page - 1){
					this.this_obj.find('.pre').hide();
				}
			}
		}
		this.cut_page(page_index);
	}
	
	
	
	
	/**
	 * 上下换页修改索引当前页码的颜色
	 * @param {int} page_index 
	 */
	Pagination.prototype.cut_page = function(page_index){
		var this_pagination = this;
		//获取下标对象 除上一页 下一页 点 然后根据下标修改颜色
		var page_index_obj = this.this_obj.find('li').not('.ellipsis_dot').not('.pre_page').not('.next_page');
		//切换为选择的索引
		$.each(page_index_obj,function(){
			
			//当页码为1 改变颜色
			if(page_index == 1){
				this_pagination.this_obj.find('.pre_page').addClass('not_select');
				this_pagination.this_obj.find('.pre_page').css('color',this_pagination.style.not_select_color);
				this_pagination.this_obj.find('.pre_page').data('is_up_down_cut',true);
				this_pagination.this_obj.find('.pre_page').css('border-color',this_pagination.style.Pagination_backgroundColor);
			}else{
				this_pagination.this_obj.find('.pre_page').removeClass('not_select');
				this_pagination.this_obj.find('.pre_page').css('color',this_pagination.style.Pagination_child_btn_color);
				this_pagination.this_obj.find('.pre_page').data('is_up_down_cut',false);
			}
			
			//当页码是最后一页改变颜色
			if(page_index == this_pagination.max_page){
				this_pagination.this_obj.find('.next_page').addClass('not_select');
				this_pagination.this_obj.find('.next_page').css('color',this_pagination.style.not_select_color);
				this_pagination.this_obj.find('.next_page').data('is_up_down_cut',true);
				this_pagination.this_obj.find('.next_page').css('border-color',this_pagination.style.Pagination_backgroundColor);
			}else{
				this_pagination.this_obj.find('.next_page').removeClass('not_select');
				this_pagination.this_obj.find('.next_page').css('color',this_pagination.style.Pagination_child_btn_color);
				this_pagination.this_obj.find('.next_page').data('is_up_down_cut',false);
			}
			if(parseInt($(this).text()) == page_index){
				$(this).css({
					"background-color" : this_pagination.style.current_page_backgroundColor,
					"border" : this_pagination.style.current_page_border,
					"border-color" : this_pagination.style.current_page_backgroundColor
				});
				$(this).data('is_current_page',true);
			}else{
				$(this).css({
					"background-color" : "transparent",
					"border" : this_pagination.style.current_page_border,
					"border-color" : "white"
				});
				$(this).data('is_current_page',false);
			}
		});
	}
	
	/**
	 * 分页对象
	 */
	Pagination.prototype.create_pagination = function(){
		this.append_obj.append('<ul id="'+this.id+'" class="Pagination"><li class="pre_page">上一页</li><li class="current_page">1</li><li class="ellipsis_dot start_ellipsis_dot" style="display:none;">...</li><li class="pre">2</li><li class="middle">3</li><li class="next" style="display:none;">4</li><li class="ellipsis_dot end_ellipsis_dot">...</li><li>'+this.max_page+'</li><li class="next_page">下一页</li></ul>');
		this.this_obj = $('#' + this.id);
		
		//设置用户自定义样式
		this.user_defined_style(this.style);
		
		//设置用户不能自定义的样式
		this.not_defined_style();
	}
	
	/**
	 * 用户自定义样式
	 * @param {{key:value}} style 
	 */
	Pagination.prototype.user_defined_style = function(style){
		var this_pagination = this;
		
		//分页对象
		this.this_obj.css({
			"width" : style.Pagination_width,
			"padding" : style.Pagination_padding,
			"margin" : style.Pagination_margin,
			"background-color" : style.Pagination_backgroundColor,
			"position" : style.Pagination_position,
			"top" : style.Pagination_top,
			"left" : style.Pagination_left,
			"rigth" : style.Pagination_right,
			"bottom" : style.Pagination_bottom
		});
		
		//分页对象下面的按钮
		this.this_obj.find('li').css({
			"font-size" : style.Pagination_child_btn_fontSize,
			"height" : style.Pagination_child_btn_height,
			"line-height" : style.Pagination_child_btn_lineHeight,
			"margin" : style.Pagination_child_btn_margin,
			"color" : style.Pagination_child_btn_color,
			"border" : style.Pagination_child_btn_border,
			"border-color" : style.Pagination_backgroundColor,
			"border-radius" : style.Pagination_child_btn_borderRadius
		});
		this.this_obj.find('li').not('.pre_page').not('.next_page').css('width',style.Pagination_child_btn_width);
		
		//光标移上分页对象下面的按钮
		this.this_obj.find('li').not('.ellipsis_dot').hover(function(){
			if($(this).data('is_current_page')){
				return;
			}
			if($(this).data('is_up_down_cut')){
				return;
			}
			$(this).css({
				"border" : style.Pagination_child_btn_hover_border,
				"color" : style.Pagination_child_btn_hover_color
			});
		},function(){
			if($(this).data('is_current_page')){
				return;
			}
			if($(this).data('is_up_down_cut')){
				return;
			}
			$(this).css({
				"border" : style.Pagination_child_btn_border,
				"color" : style.Pagination_child_btn_color,
				"border-color" : style.Pagination_backgroundColor
			});
		});
		
		//当前索引的颜色
		this.this_obj.find('.current_page').css({
			"background-color" : style.current_page_backgroundColor,
			"border" : style.current_page_border,
			"border-color" : style.current_page_backgroundColor
		});
		
		//上一页
		this.this_obj.find('.pre_page').css('padding',style.Pagination_child_btn_prePage_padding);
		
		//下一页
		this.this_obj.find('.next_page').css('padding',style.Pagination_child_btn_nextPage_padding);
	}
	
	/**
	 * 用户不能自定义的样式
	 * 
	 */
	Pagination.prototype.not_defined_style = function(){
		
		//分页对象
		this.this_obj.css({
			"display" : "flex",
			"justify-content" : "center",
			"align-items" : "center",
			"user-select":"none",
			"-ms-user-select":"none",
			"-moz-user-select":"none",
			"-webkit-user-select":"none"
		});
		
		//分页对象下面的按钮
		this.this_obj.find('li').css({
			"cursor":"default",
			"text-align":"center",
			"white-space":"nowrap"
		});
		this.this_obj.find('.ellipsis_dot').css({
			"font-weight":"bold"
		});
	
		//光标显示cursor
		this.this_obj.find('li').not('.ellipsis_dot').css('cursor','pointer');
	}
	
	/**
	 * 检测元素是否存在
	 * @param elm
	 * @returns {boolean}
	 */
	Pagination.prototype.checkElm = function (elm) {
	    if($(elm).length > 0){
	        return true;
	    }else{
	        // throw "this element does not exist.";
			return false;
	    }
	};
	
	/**
	 * 检测传入参数是否是function
	 * @param fn
	 * @returns {boolean}
	 */
	Pagination.prototype.checkFn = function (fn) {
	    if(typeof fn === "function"){
	        return true;
	    }else{
	        // throw "the param is not a function.";
			return false;
	    }
	};
	
	window.Pagination = Pagination;
	
	Pagination.create = function(append_obj,all_data_count,each_page_data_count,style,get_data_branches,click_too_fast){
		return new Pagination(append_obj,all_data_count,each_page_data_count,style,get_data_branches,click_too_fast);
	};
})(jQuery,window,document);