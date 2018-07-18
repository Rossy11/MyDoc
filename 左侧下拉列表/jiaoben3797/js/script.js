$(document).ready( function() {
	var $submenu = $('.submenu');
	var $mainmenu = $('.mainmenu');
	$submenu.hide();
	$submenu.eq(1).delay(400).slideDown(700);
    $submenu.last().delay(400).slideDown(700);
	$submenu.on('click','li', function() {
		$submenu.siblings().find('li').removeClass('chosen');
		$(this).addClass('chosen');
	});
	$mainmenu.on('click', 'li', function() {
		$(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();

        $(this).siblings().removeClass('clickli');
        $(this).parent().siblings('ul').find('li').removeClass('clickli');
		$(this).addClass('clickli');
	});
	$mainmenu.children('li:last-child').on('click', function() {
		$mainmenu.fadeOut().delay(500).fadeIn();
	});
});


