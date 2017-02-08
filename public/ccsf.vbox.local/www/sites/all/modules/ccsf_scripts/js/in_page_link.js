(function($){
	$(document).ready(function(){
		var pathname = $(location).attr('href');

		//console.log(pathname);
		if(pathname.indexOf("#scroll") >= 0){
			//console.log('content top here');
			var target = $("#content-top").offset().top - 250;

			$('html,body').animate({
            	scrollTop: target
          	}, 1000);
		}
	});
})(jQuery);