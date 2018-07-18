/**
 * Created by Administrator on 2017/7/30 0030.
 */
$(document).ready(function()
{
    //menu_bar
    $(".mid1").hover(function(){
        $(".bar2").show();
    },function(){
        $(".bar2").hide();
    });
    $(".mid2").hover(function(){
        $(".bar4").show();
    },function(){
        $(".bar4").hide();
    });
    $(".mid3").hover(function(){
        $(".bar6").show();
    },function(){
        $(".bar6").hide();
    });


    //section
   //uploading
    $(".midd1").hover(function(){
        $(".barr2").show();
        $(".file1").css("display","block");
        $(".video_name").css("display","none");
    },function(){
        $(".barr2").hide();
        $(".file1").css("display","none");
        $(".video_name").css("display","block");
    });
    $(".midd2").hover(function(){
        $(".barr4").show();
        $(".file2").css("display","block");
        $(".img_name1").css("display","none");
    },function(){
        $(".barr4").hide();
        $(".file2").css("display","none");
        $(".img_name1").css("display","block");
    });
    $(".midd3").hover(function(){
        $(".barr6").show();
        $(".file3").css("display","block");
        $(".img_name2").css("display","none");
    },function(){
        $(".barr6").hide();
        $(".file3").css("display","none");
        $(".img_name2").css("display","block");
    });
});

//    电梯
    $(function(){
    	//获取内容总高度
        var winH=$(window).height()-$(".header").height()-$(".footer").height();

        $('.uploading,.set_vote,.binding').css('height',winH);
        $(document).scroll(function(){
            var st=$(document).scrollTop();
            var i=Math.floor(st/winH);

            $('.mid').removeClass('active')

            $('.mid').eq(i).addClass('active')
        })
        $('.mid').click(function(){

            var n=$(this).index('.menu_bar .mid')
            var st=winH*n
//					$(document).scrollTop(st)
            $('body,html').animate({scrollTop:st+'px'},500)
        })
    })


//拖拽
$(function(){
    $('.jq22').dad();
});






