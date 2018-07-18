jQuery.fn.pubu=function(options){
	var newopt=jQuery.extend({
					main:'#box',//瀑布流父容器的id
					list:'.pbl' //瀑布流列的class
				},options)
	$(this).scroll(function(){
		//获取bottom 
		var bottom=$(document).height()-$(document).scrollTop()-$(window).height()
		//判断当前状态是否需要追加内容
		if(bottom<500){
			//需要
			addImg()
			addImg()
			addImg()					
			addImg()
		}
		function addImg(){
			var num=0;//当前最小的列的下标
			//获取当前高度最小的列
			$(newopt.main+' '+newopt.list).each(function(i){
				if($(this).height()<=$(newopt.main+' '+newopt.list).eq(num).height()){
					num=i
				}
//						$('#box .pbl')		×
//						$('#box .pbl').eq(i)√
//						console.log($(this))
			})

			var imgNum=Math.ceil(Math.random()*45)+1//1-46
			//追加内容
			$(newopt.main+' '+newopt.list).eq(num).append('<img src="images/pinpai/pubuliu/'+imgNum+'.jpg"/>')
		}
		
	})
}
