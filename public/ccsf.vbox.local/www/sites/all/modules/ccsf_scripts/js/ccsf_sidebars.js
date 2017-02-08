/*
	Give the sidebar the class '.sidebar'
	supply sidebar() with the ID of the item that, when scrolled off screen
	fires the function.
*/
(function($){
	$(document).ready(function(){
		if($('.page-faq').length>0){
			//sidebar('.panels-flexible-column-template_10-1','.t10-menu-wrap');
		}
		
	});

	function sidebar(splashSection,sidebar){
		//console.log('sidebars');
		$(window).bind('scroll', function(){
			//console.log('sidebar');
			var splashTop = $(splashSection).offset().top;
			var splashHeight = $(splashSection).height();
			var splashBottom = splashTop+splashHeight;
			var scrollTop = $(window).scrollTop();
			var stagger=75;

			if($(window).scrollTop() >= splashBottom){
				//console.log('low');
				//console.log
				$(sidebar).css({
					'position':'fixed',
					'top':stagger,
					'margin-top':'0px',
				});
			}
			else if($(window).scrollTop()< splashBottom){
				//console.log('hige');
				$(sidebar).css({
					'position':'relative',
					'top':'',
					'margin-top':'90px',
				});
			}
		});
	}

})(jQuery);