(function($){
	$(document).ready(function(){
		if( $('.t5-wrap').length>0 ){
			if( $('.t5-main').find('.pane-node').length>0 ){
				//console.log('yes content')
			}else{
				//console.log('no content');
				$('.t5-featured-heading').find('.field-name-body').find('h3').css({
					'border-top':'0px',
					'padding-top':'0px',
					'line-height':'1em',
				});
			}
		}
	});
})(jQuery);