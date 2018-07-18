	/*构造函数
	 *封装
	 * 实例化
	 * obj{popId:?,layClass:?,closeClass:?}
	 * */
	function AlertWin(obj){
		/*属性*/
		//弹框
		this.alert=document.getElementById(obj.popId);
		//背景
		this.bg=document.getElementsByClassName(obj.layClass)[0];
		//关闭按钮
		this.close=this.alert.getElementsByClassName(obj.closeClass)[0];
		//浏览器尺寸
		this.winH=window.innerHeight	
		this.winW=window.innerWidth
		//弹框的尺寸
		this.w;
		this.h;	
		//调用初始方法
		this.init()
		//函数绑定方法
		this.bindDom()

	}
	AlertWin.prototype.init=function(){
		/*方法*/
		//显示弹框和背景
		this.alert.style.display='block'
		this.bg.style.display='block'
		
		//调用设置弹框位置的方法
		this.setPos()
	}
	
	AlertWin.prototype.bindDom=function(){
		var that=this
		//绑定窗口改变尺寸事件
		window.addEventListener('resize',function(){
			//调用更改弹框位置的方法
			that.setPos();
		},false)
		
		//关闭按钮的关闭方法
		this.close.addEventListener('click',function(){
			//隐藏弹框和背景
			that.alert.style.display='none'
			that.bg.style.display='none'
		},false)
	}
	
	AlertWin.prototype.setPos=function(){
		//浏览器尺寸
		this.winH=window.innerHeight	
		this.winW=window.innerWidth
		//弹框的尺寸
		this.w=this.alert.offsetWidth;
		this.h=this.alert.offsetHeight;
		//设置弹框位置
		this.alert.style.left=(this.winW-this.w)/2+'px'
//		console.log((winW-w)/2)
		this.alert.style.top=(this.winH-this.h)/2+'px'
//		console.log((winH-h)/2)
	}