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
    },function(){
        $(".barr2").hide();
        $(".file1").css("display","none");
    });
    $(".midd2").hover(function(){
        $(".barr4").show();
        $(".file2").css("display","block");
    },function(){
        $(".barr4").hide();
        $(".file2").css("display","none");
    });
    $(".midd3").hover(function(){
        $(".barr6").show();
        $(".file3").css("display","block");
    },function(){
        $(".barr6").hide();
        $(".file3").css("display","none");
    });
});

//    电梯
    $(function(){
        var winH=$(window).height()-244.281

//      $('.uploading').css('height',winH);
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





