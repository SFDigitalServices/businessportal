(function($){
	
	$(document).ready(function(){
		newNewStretch();
		//resizeFix();
		tilesStretch();
	});
	
	function newNewStretch(){
		//
		if($('.t2-splash').length>0){
			var source = $('.splash').find('.node-splash-image').find('img').attr('src');
			//console.log(source);
			$('.splash').backstretch(source);
			setTimeout(function(){
				$('.splash').backstretch(source);
				console.log('stretch it');
			},500);
			$('.splash').find('.node-splash-image').find('img').css('display','none');
		}
		
		//Front Page
		if($('.view-front-page-carousel').length>0){
			var images = $('.views_slideshow_slide');
			//this is not the solution i want to use but it does the trick.
			//without this the backstretch plugin incorrectly positions the slides 
			//that are not visible, when the carousel loops back to them they look wrong
			$.each(images,function(j){
				$(images[j]).data('stretched','false');
				var winWidth = $(window).width();
				$(images[j]).find('img').css('width',winWidth);//we have to do this to aviod an overflow issue on iOS
			});


			setInterval(function(){
				
				$.each(images,function(i){
					if($(images[i]).css('opacity')>0){
						
						if( $(images[i]).data('stretched')== 'false'){
							
							var source = $(images[i]).find('img').attr('src');
							
							$(images[i]).find('.views-field-field-splash-image').backstretch(source,{centeredY:false});
							$(images[i]).find('.views-field-field-splash-image').find('.field-content').find('img').css('display','none');
							$(images[i]).data('stretched','true');
						}	
					}
					if( $(images[i]).css('opacity')==0 ){
						if( $(images[i]).data('stretched')=='true' ){
							 $(images[i]).data('stretched','false');
							 
						}
					}
				});

			},100);

			//setInterval(function(){ 
				var secondSource = $('.home-section-6').find('img').attr('src');
				//console.log(source);
				$('.home-section-6').find('.field-name-field-splash-image').find('img').css('display','none');
				$('.home-section-6-wrap').backstretch(secondSource);
				
			//},100);
		}

		if( $('.t4-banner').length>0 ){
			var src = $('.t4-banner').find('.node-single-with-image').find('.field-name-field-img').find('img').attr('src');
			$('.t4-banner').find('.node-single-with-image').find('.field-name-field-img').find('.field-items').backstretch(src,{centeredY:false});
			$('.t4-banner').find('.node-single-with-image').find('.field-name-field-img').find('.field-item').find('img').css('display','none');
		}

		if( $('.t6-splash').length>0 ){
			var source = $('.t6-splash').find('.node-splash-image').find('img').attr('src');
			//console.log(source);
			$('.t6-splash').backstretch(source,{centeredY:false});
			setTimeout(function(){
				$('.t6-splash').backstretch(source,{centeredY:false});
				console.log('stretch it');
			},500);
			$('.t6-splash').find('.node-splash-image').find('img').css('display','none');
		}
		if( $('.t6-2-splash').length>0 ){
			var source = $('.t6-2-splash').find('.node-splash-image').find('img').attr('src');
			//console.log(source);
			$('.t6-2-splash').backstretch(source,{centeredY:false});
			setTimeout(function(){
				$('.t6-2-splash').backstretch(source,{centeredY:false});
				console.log('stretch it');
			},500);
			$('.t6-2-splash').find('.node-splash-image').find('img').css('display','none');
		}
	}
	function resizeFix(){
		$(window).resize(function(){
			//console.log('test');
			var images = $('.views_slideshow_slide');
			$.each(images,function(i){
				//if($(images[i]).css('opacity')>0){
					$(images[i]).find('.backstretch').remove();
					var source = $(images[i]).find('.views-field-field-splash-image').find('.field-content').find('img').attr('src');
					//console.log(source);
					//$(images[i]).find('.views-field-field-splash-image').find('.field-content').find('img').css('display','none');
					$(images[i]).backstretch(source);
				//}
			});
		});
	}
	function tilesStretch(){//does backstretch on all images in the starter kit page.
		if( $('.t3-items').length>0 ){
			var panes = $('.t3-items').find('.pane-node');
			$.each(panes,function(i){
				var src = $(panes[i]).find('.field-name-field-img').find('img').attr('src');
				$(panes[i]).find('.field-name-field-img').find('img').css('display','none');
				$(panes[i]).find('.field-name-field-img').backstretch(src);
			});
		}
	}



})(jQuery);