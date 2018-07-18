//;(function($){
//	//使用extend方法扩充jq
//	$.fn.extend({
//		AlertVal:function(){
//			$(this).click(function(){
//				alert($(this).val())
//			})
//		}
//	})
//})(jQuery)

;(function($){
	$.fn.changeDiv=function(options){
		var def={
			bg:'red',
			color:'green'
		}
		var opts=$.extend(def, options);
		$(this).click(function(){
			$(this).css({
				background:opts.bg,
				color:opts.color
			})
		})
	}
})(jQuery)
