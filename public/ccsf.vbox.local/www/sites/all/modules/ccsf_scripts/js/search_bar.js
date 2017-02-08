(function($){
	$(document).ready(function(){
		searchInit();
		searchScroll();//fix for iOS auto scrolling on focus
		searchFocus();//fix for iOS auto scrolling on focus
	});

	var search_vis = false;

	function searchInit(){
		
		if($('.page-search-pages').length>0){
			$('#block-search-by-page-1').css('visibility','hidden');
		}

		var search_button = $('#block-search-by-page-1').find('#edit-submit');
		var search_field = $('#block-search-by-page-1').find('#edit-keys');
		var google_translate = $('#block-google-translate-my-google-translate');
		var menu = $('#block-nice-menus-2');

		search_field.attr('placeholder','Search');
		
		search_field.click(function(event){
			
			if (event && event.stopPropagation) { event.stopPropagation(); } else if (window.event) { window.event.cancelBubble = true; }
		});
		search_button.on('click',function(event){
			
			if (event && event.stopPropagation) { event.stopPropagation(); } else if (window.event) { window.event.cancelBubble = true; }
			event.preventDefault();

			if($('#hamburger-one').css('display')=='none'){
				if(search_vis==true){
					var value = search_field.val();
					
					console.log('value:'+value);
					if(!value==''){
						$('#block-search-by-page-1').find('form').submit();
					}
					
				}//goog-te-menu-frame
				if(search_vis==false){
					search_vis=true;
					search_field.addClass('search-vis');
					
					search_button.addClass('search-open');
					
					google_translate.animate({
						right:'+=200'
					},200);
					menu.animate({
						right:'+=200'
					},200);
					setTimeout(function() { 
						search_field.focus();
					}, 500);
					
				}	
			}else{
				if(search_vis==true){
					var value = search_field.val();
					
					if(!value==''){
						$('#block-search-by-page-1').find('form').submit();
					}
				}
				if(search_vis==false){
					search_vis=true;
					search_field.addClass('search-vis');

				}
			}	
			
		});

		$('#page').click(function(){
			
			if(search_vis==true){
				search_field.removeClass('search-vis');
				google_translate.animate({
					right:'-=200'
				},200);
				menu.animate({
					right:'-=200'
				},200);
				search_vis=false;
				search_field.removeAttr('value');
				search_button.removeClass('search-open');
				$('.goog-te-menu-frame').css('display','none');
				search_field.blur();
			}	
		});
		$('#page').on('touchstart',function(event){
			console.log(event.target.id);
			if(search_vis==true && event.target.id != 'edit-keys'){
				console.log('inside');	
				search_field.removeClass('search-vis');
				google_translate.animate({
					right:'-=200'
				},200);
				menu.animate({
					right:'-=200'
				},200);
				search_vis=false;
				search_field.removeAttr('value');
				search_button.removeClass('search-open');
				$('.goog-te-menu-frame').css('display','none');
				search_field.blur();
			}
		})
	}

	var currentScrollPosition = 0;

	function searchScroll(){
		//$('#block-search-by-page-1').find('.form-item').find('input').attr('onfocus','this.style.webkitTransform = "translate3d(0px,-10000px,0)"; webkitRequestAnimationFrame(function() { this.style.webkitTransform = ""; }.bind(this))');
		$(document).scroll(function(){
    		currentScrollPosition = $(this).scrollTop();
		});
	}

	function searchFocus(){
		$('#block-search-by-page-1').find('#edit-keys').on('focus',function(){
    		console.log(currentScrollPosition);
    		setTimeout(function(){
    			window.scrollTo(0,currentScrollPosition);
    			//$('document').scrollTop(currentScrollPosition);
    		},0);
    		setTimeout(function(){
    			//window.scrollTo(0,currentScrollPosition);
    			$('document').scrollTop(currentScrollPosition);
    		},200);
		});

		$('#block-search-by-page-1').find('#edit-keys').on('click',function(){
    		console.log(currentScrollPosition);
    		setTimeout(function(){
    			window.scrollTo(0,currentScrollPosition);
    			//$('document').scrollTop(currentScrollPosition);
    		},100);
    		setTimeout(function(){
    			//window.scrollTo(0,currentScrollPosition);
    			$('document').scrollTop(currentScrollPosition);
    		},400);
		});
	}

})(jQuery);
