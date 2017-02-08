(function($){
	$(document).ready(function(){
		if($('.guide-wrap').length > 0){
			guidetoggle();
		}
		
	});
	var open=false;
	
	function guidetoggle(){
		$('.guide-wrap').find('h3').click(function(){
			//console.log($(this).next().children().first());
			var that = $(this);

			if( !that.hasClass('guide-toggle-on') ){
				that.addClass('guide-toggle-on');
				//that.css('border-bottom','none');
				open=true;
			}else{
				that.removeClass('guide-toggle-on');
				/*setTimeout(function(){
					that.css('border-bottom','1px solid #DDDDDD');
				},500);*/
				
				open=false;
			}
			

			if(that.next().children().first().is('h4')){
				//console.log('here');
				that.next().css('margin-top','-30px');
			}
			that.next().slideToggle('slow',function(){
				if(that.next().css('display')=='none'){
					//console.log('hidden');
					//that.css('border-bottom','1px solid #DDDDDD');
				}else{
					//that.css('border-bottom','none');
				}

			});

		});
	}

})(jQuery);