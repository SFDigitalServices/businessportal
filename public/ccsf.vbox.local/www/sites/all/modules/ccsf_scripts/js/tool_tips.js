(function($){
	$(document).ready(function(){
		console.log('Tipsy');
		if($('.tool-tip').length>0 ){
			var tips = $('.tool-tip');
			$.each(tips,function(i){
					$(tips[i]).tipsy({fade: true, gravity: 's'});
			});
		}
	});
})(jQuery);