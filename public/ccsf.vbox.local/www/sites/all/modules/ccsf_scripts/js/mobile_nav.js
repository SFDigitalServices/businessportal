(function($){
	
	$(document).ready(function(){
		init();
		subNavs();
		slideDrawer();
		adjustHeight();
		resetHeight();
		resetOnScale.init();
		resetOnScale.watchIt();
		menuExpand();
	});

	function init(){
		$('#name-and-slogan').append('<div id="hamburger-one" class="hamburger"><span><p>Nav Toggle</p></span></div>');
		$('.region-header').prepend('<div id="hamburger-two" class="hamburger"><span><p>Nav Toggle</p></span></div>');//hamburger in drawer
	}
	function subNavs(){
		var items = $('#block-nice-menus-1').find('li');

		$.each(items,function(i){
			$(items[i]).hover(function(event){
				//var width = $(window).width();
				if($('#hamburger-one').css('display')=='block'){//if the mobile nav is active
					//console.log('hover vis');
					if($(items[i]).find('ul').length>0){
						$(items[i]).find('ul').css({//disable the hover drop downs on mobile size
							'display':'none',
							'visibility':'hidden',
							'opacity':'0',
						});
					}
				}
			});
		});

		
	}

	function slideDrawer(){
		

		$('#hamburger-one').click(function(event){
			//event = event || window.event;
			//event.stopPropagation();
			
			if (event && event.stopPropagation) { event.stopPropagation(); } else if (window.event) { window.event.cancelBubble = true; }

			$('.region-header').css({
				WebkitTransition : 'all 0.3s ease-in-out',
   				MozTransition    : 'all 0.3s ease-in-out',
			    MsTransition     : 'all 0.3s ease-in-out',
			    OTransition      : 'all 0.3s ease-in-out',
			    transition       : 'all 0.3s ease-in-out',
//			    'overflow-x':'scroll',
			});

			//add a buffer div to the bottom so that the mobile nav is tall enough
			$('.region-header').append('<div id="mob-nav-buffer"></div>');
			
			var hamburger = $('#hamburger-two').innerHeight(); 
			var menuTwo = $('#block-nice-menu-2').innerHeight();
			var menuOne = $('#block-search-by-page-1').innerHeight();
			//console.log('top:'+ menuTop);
			var newHeight = hamburger + menuTwo + menuOne + 160;
			console.log('bottom:'+newHeight); 

			$('#mob-nav-buffer').css({
				'width':'10px',
				'height':'10px',
				'position':'relative',
				'top':newHeight,
			});
			$('.region-header').addClass('drawer-active');
			$('#block-search-by-page-1').css('display','none');
		});

		$('#hamburger-two').click(function(event){
			
			//event.stopPropagation();
			
			if (event && event.stopPropagation) { event.stopPropagation(); } else if (window.event) { window.event.cancelBubble = true; }
			
			$('.region-header').removeClass('drawer-active');
			$('.region-header').css({
				'overflow-x':'visible',
			});

			$('#mob-nav-buffer').remove();
			setTimeout(function(){
				$('#block-search-by-page-1').css('display','block');
			},270);

			
		});
		$('#page').click(function(event){
			if( !$(event.target).hasClass('region-header') && !$(event.target).parents().hasClass('region-header') && !$(event.target).hasClass('goog-te-menu-frame')  ){
				$('.region-header').removeClass('drawer-active');
				$('.region-header').css({
					'overflow-x':'visible',
				});
				$('#mob-nav-buffer').remove();
				setTimeout(function(){
					$('#block-search-by-page-1').css('display','block');
				},270);
			}
			
		});
	}

	function adjustHeight(){//some items are positioned absolutely, need height adjusted because of subnavs
		if($('#hamburger-one').css('display')=='block'){
			//var menuTop=$('#block-nice-menus-1').offset().top;
			var menuHeight=$('#block-nice-menus-1').height();
			//var menuBottom=menuTop+menuHeight;
			$('#block-nice-menus-2').css('top',menuHeight+70);
			$('#block-google-translate-my-google-translate').css('top',menuHeight+119);
		}
	}
	
	function resetHeight(){//reset the nav item's height it the window is draged from mobile to desktop size
		$(window).resize(function(){
			//console.log('test');
			if($('#hamburger-one').css('display')=='block'){
				adjustHeight();

			}else if($('#hamburger-one').css('display')=='none'){
				
				$('#block-nice-menus-2').css('top','0');
				$('#block-google-translate-my-google-translate').css('top','2px');
				$('#block-search-by-page-1').css({'display':'block'});
				$('.region-header').removeClass('drawer-active');
				$('.region-header').css({
					WebkitTransition : 'none',
	   				MozTransition    : 'none',
				    MsTransition     : 'none',
				    OTransition      : 'none',
				    transition       : 'none'
				});
			}

		});
	}

	function adjustSearch(){
		$(window).bind('scroll', function(){
			var oldsearchpos = -5;//original top css of search field

			var scrolled = $(window).scrollTop();
			//console.log(scrolled);
			
			
			var newTop = oldsearchpos-scrolled;
			//console.log('newTop:'+newTop);
			
			$('#block-custom-search-blocks-1').css('top',newTop);
		});
	}

	function navClick(){
		var navItems = $('.region-header').find('a');
		$.each(navItems,function(i){
			$(navItems[i]).on('click touchend',function(event){
				//console.log('link click');
				var el = $(this);
		    	var link = el.attr('href');
		    	window.location = link;
			});
		});
	}

	var resoureOnMobile = false;
	var resetOnScale = {
		init:function(){
			if( $('#hamburger-one').css('display')!='block' ){
				resourceOnMobile=false;
			}else{
				resourceOnMobile=true;
			}
		},
		watchIt:function(){//watch window resize to tell when switching from mobile to full size
			var that=this;
			$(window).resize(function(){
				if(resourceOnMobile==false){					
					if( $('#hamburger-one').css('display')=='block'){//went to mobile size from full size
						//console.log('full to mob');
						resourceOnMobile=true;
						that.fullToMobile();
					}
				}
				if(resourceOnMobile==true){
					if(  $('#hamburger-one').css('display')=='none'){//went to full size from mobile size
						//console.log('mob to full');
						resourceOnMobile=false;
						that.mobileToFull();
					}
				}
			});
		},
		fullToMobile:function(){
			//do nothing
		},
		mobileToFull:function(){
			//console.log('mobile to full');
			$('.region-header').removeClass('drawer-active');
			$('.region-header').css({
				'overflow-x':'visible',
			});

			$('#mob-nav-buffer').remove();
			setTimeout(function(){
				$('#block-search-by-page-1').css('display','block');
			},270);
		},
	}

	function menuExpand(){
		var startOpen = false;
		var manageOpen = false;
		var growOpen=false;
		var resourceOpen = false;

		var start = $('.menu-path-start');
		
		if(start.hasClass('active-trail')){
			startOpen = true;
		}
		
		start.on('click touchstart',function(event){
			var clicked = event.target;
			if($('#hamburger-one').css('display')!='none'){
			event.preventDefault();
				if(startOpen == true){
          tagname = $(clicked).prop("tagName");
          if(tagname!=='li') {
            clicked = $(clicked).parents('li');
          }
          var href = $('a', clicked).attr('href');
//          if(href==='undefined') {
//            href = $('a', clicked).attr('href');
//          }
//					console.log(href);
					window.location=href;
				}
				if(startOpen == false){
					console.log('open');
					startOpen=true;
					start.addClass('active-trail');
					manageOpen=false;
					manage.removeClass('active-trail');
					growOpen=false;
					grow.removeClass('active-trail');
					resourceOpen=false;
					resource.removeClass('active-trail');

					adjustHeight();
				}	
			}
		});

		var manage = $('.menu-path-manage');
		
		if( manage.hasClass('active-trail') ){
			manageOpen = true;
		}
		
		manage.on('click touchstart',function(event){
			var clicked = event.target;
			if($('#hamburger-one').css('display')!='none'){
			event.preventDefault();
				if(manageOpen == true){
					tagname = $(clicked).prop("tagName");
          if(tagname!=='li') {
            clicked = $(clicked).parents('li');
          }
          var href = $('a', clicked).attr('href');
          window.location=href;
				}
				if(manageOpen == false){
					
					startOpen=false;
					start.removeClass('active-trail');
					manageOpen=true;
					manage.addClass('active-trail');
					growOpen=false;
					grow.removeClass('active-trail');
					resourceOpen=false;
					resource.removeClass('active-trail');

					adjustHeight();
				}	
			}
		});

		var grow = $('.menu-path-grow');
		
		if( grow.hasClass('active-trail') ){
			growOpen = true;
		}
		
		grow.on('click touchstart',function(event){
			var clicked = event.target;
			if($('#hamburger-one').css('display')!='none'){
			event.preventDefault();
				if(growOpen == true){
					tagname = $(clicked).prop("tagName");
          if(tagname!=='li') {
            clicked = $(clicked).parents('li');
          }
          var href = $('a', clicked).attr('href');
          window.location=href;
				}
				if(growOpen == false){
					
					startOpen=false;
					start.removeClass('active-trail');
					manageOpen=false;
					manage.removeClass('active-trail');
					growOpen=true;
					grow.addClass('active-trail');
					resourceOpen=false;
					resource.removeClass('active-trail');

					adjustHeight();
				}	
			}
		});

		var resource = $('.menu-path-resource-locator');
		
		if( resource.hasClass('active-trail') ){
			resourceOpen=true;
		}
		resource.on('click touchstart',function(event){
			var clicked = event.target;
			if($('#hamburger-one').css('display')!='none'){
			event.preventDefault();
				if(resourceOpen == true){
					tagname = $(clicked).prop("tagName");
          if(tagname!=='li') {
            clicked = $(clicked).parents('li');
          }
          var href = $('a', clicked).attr('href');
          window.location=href;
				}
				if(resourceOpen == false){
					
					startOpen=false;
					start.removeClass('active-trail');
					manageOpen=false;
					manage.removeClass('active-trail');
					growOpen=false;
					grow.removeClass('active-trail');
					resourceOpen=true;
					resource.addClass('active-trail');

					adjustHeight();
				}	
			}
		});
	}



	
})(jQuery);