(function($){
	//clean up the url's displayed in the featured items sections
	$(document).ready(function(){
		if($('.t5-featured').length>0){
			cleanUp('.t5-featured');
		}
		if($('.t4-featured').length>0){
			cleanUp('.t4-featured');
		}

	});

	function cleanUp(x){
		var items = $(x).find('.pane-node');

		$.each(items,function(i){
			if( $(items[i]).find('.resource-link-cta').length > 0 ){
				//console.log('yup');
				var html = $(items[i]).find('.resource-link-cta').html();
				
				if( html.indexOf('http://')){
					html = html.replace('http://','');
				}
				$(items[i]).find('.resource-link-cta').html(html);
			}
		});
	}

})(jQuery);