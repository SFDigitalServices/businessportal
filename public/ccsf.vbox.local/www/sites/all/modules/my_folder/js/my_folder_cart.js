(function($){
	$(document).ready(function(){
		if($('#my-folder-cart-wrap').length>0){
			kitToggle();
			itemHide();
		}
	});

	function kitToggle(){
		
		var titles = $('.my-folder-kit-inner-one').find('.my-folder-kit-item-title');
		$.each(titles,function(i){
			$(titles[i]).click(function(){
				console.log('click');
				
				$(titles[i]).parent().next().find('p').toggle(function(){					
				});
				if( !$(titles[i]).hasClass('kit-active')){
					$(titles[i]).addClass('kit-active');
				}else{
					$(titles[i]).removeClass('kit-active');
				}
			});
		});

		var sections = $('.my-folder-kit-inner-one').find('.my-folder-kit-section-title');
		$.each(sections,function(i){
			$(sections[i]).click(function(){
				console.log('section');
				$(sections[i]).next().toggle(function(){
				});
				if(!$(sections[i]).children().first().hasClass('kit-active')){
					$(sections[i]).children().first().addClass('kit-active');
				}else{
					$(sections[i]).children().first().removeClass('kit-active');
				}
			});
		});

		var kitTitle = $('#my-folder-starter-kits-wrap-inner').find('.my-folder-kit-title');
		$.each(kitTitle,function(i){
			$(kitTitle[i]).click(function(){
				console.log('click');
				
				$(kitTitle[i]).parent().next().toggle();
				
				if(!$(kitTitle[i]).hasClass('kit-active')){
					$(kitTitle[i]).addClass('kit-active');
				}else{
					$(kitTitle[i]).removeClass('kit-active');
				}
				
			});
			
		});
	}

	function itemHide(){//hide items after their css animation finishes
		//single kit item
		$('.my-folder-kit-item-wrapper, .my-folder-kit-item-wrapper-last').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			$(this).css('display','none');
		});

		//permit item, guide item, doc item
		$('.my-folder-single-permit, .my-folder-single-doc, .my-folder-single-guide').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			$(this).css('display','none');
		});

		//permit section
		$('#my-folder-permits-wrap').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			var permitCount = $('.my-folder-permit-heading-num').find('h2').html();
			permitCount = permitCount.replace('(','');
			permitCount = permitCount.replace(')','');
			var count= parseInt(permitCount);
			//console.log(count);
			if(count==0){
				console.log('zero');
				$('#my-folder-permits-wrap').css('display','none');
				
			}
		});

		//doc section
		$('#my-folder-doc-wrap').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			var docCount = $('.my-folder-doc-heading-num').find('h2').html();
			docCount = docCount.replace('(','');
			docCount = docCount.replace(')','');
			var count= parseInt(docCount);
			console.log(count);
			if(count==0){
				//console.log('zero');
				$('#my-folder-doc-wrap').css('display','none');
			}
		});

		//guide section
		$('#my-folder-guide-wrap').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			var guideCount = $('.my-folder-guide-heading-num').find('h2').html();
			guideCount = guideCount.replace('(','');
			guideCount = guideCount.replace(')','');
			var count= parseInt(guideCount);
			//console.log(count);
			if(count==0){
				$('#my-folder-guide-wrap').css('display','none');
			}
		});

		//kit section 
		$('#my-folder-starter-kits-wrap-inner').bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
			var kitCount = $('.my-folder-kit-heading-num').find('h2').html();
			kitCount = kitCount.replace('(','');
			kitCount = kitCount.replace(')','');
			var count= parseInt(kitCount);
			//console.log(count);
			if(count==0){
				$('#my-folder-starter-kits-wrap-inner').css('display','none');
			}
		});
	}

})(jQuery);