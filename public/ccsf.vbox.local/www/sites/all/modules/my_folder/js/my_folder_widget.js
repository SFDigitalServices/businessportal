(function($){
	$(document).ready(function(){
		if($('#block-my-folder-my-folder-widget').length>0){
			var pathname = window.location.pathname
			if(pathname.indexOf('admin') >=0 ){
				//do nothing
			}else{
				myFolder.init();
				myFolder.btn();
				myFolder.toggle();
				myFolder.resize();
				myFolder.scaleit();
				myFolder.windowToggle();
				myFolder.hover();
				myFolder.viewClick();
			}	
		}
		

	});

	var myFolder = {
		
		where : '',
		locked:false,
		widgetHeight:596,
		widgetRight:0,
		open:false,

		init : function(){
			var that=this;
			
			var winWidth = $(window).width();

			if(winWidth > 930){//full screen size, no media query
				that.screenSizeHeight();
			}
			/*if(winWidth < 930 && winWidth > 710){//950px media query
				that.tabletSizeHeight();
			}*/
			/*
			if(winWidth < 710){//730px media query
				that.mobileSizeHeight();
			}
			*/
			//line up the widget dot with the bottom of the splash image
			
			$('#my-folder').css('top',that.widgetHeight);
			//that.widgetHeight=$('#my-folder').offset().top - $('#header').height();
			//console.log(that.widgetHeight);


		},
		btn : function(){
			var that=this;
			$('#my-folder-widget-dot').click(function(event){
				
				event.stopPropagation();

				$('#my-folder-names').toggle();
				$('#my-folder-widget-dot').toggle();
				$('#my-folder-close-x').toggle();

				if(that.open==false){
					$('#my-folder-widget-whiteout').fadeIn('fast');
					that.open=true;
					console.log('1');
				}else{
					$('#my-folder-widget-whiteout').fadeOut('fast');
					that.open=false;
					console.log('2');
				}

			});

			$('#my-folder-close-x').click(function(){
				event.stopPropagation();

				
				$('#my-folder-widget-dot').toggle();
				$('#my-folder-close-x').toggle();

				if(that.open==false){
					$('#my-folder-names').toggle();
					$('#my-folder-widget-whiteout').fadeIn('fast');
					that.open=true;
					console.log('3');
				}else{
					if($('#my-folder-first-item').css('display')=='block'){
						$('#my-folder-first-item').toggle();
						$('#my-folder-widget-whiteout').fadeOut('fast');
						console.log('5');
					}
					else{
						$('#my-folder-names').toggle();
						$('#my-folder-widget-whiteout').fadeOut('fast');
						that.open=false;
						console.log('4');
					}
				}
				
					
				
			});
		},
		windowToggle : function(){
			var that=this;
			$('#page').click(function(){
				//var that=this;
				//console.log(that.open);
				
				if(that.open==true){
					if($('#my-folder-names').css('display')=='block'){
						$('#my-folder-names').toggle();
						$('#my-folder-widget-whiteout').fadeOut('fast');
						$('#my-folder-widget-dot').toggle();
						$('#my-folder-close-x').toggle();
					}
					if($('#my-folder-first-item').css('display')=='block'){
						$('#my-folder-first-item').toggle();
						$('#my-folder-widget-whiteout').fadeOut('fast');
						$('#my-folder-widget-dot').toggle();
						$('#my-folder-close-x').toggle();
					}

					that.open=false;
				}	
			});
		},
		toggle : function(){
			var that=this;
			$(window).bind('scroll', function(){
	    		//console.log($(window).width());
	    		var winWidth = $(window).width();
	    		if(winWidth > 930){
	    			if($(window).scrollTop() > that.widgetHeight+83){
		        		that.lock();
		    		}

		    		if( $(window).scrollTop() < that.widgetHeight+83 ){
		    			that.unlock();
		    		}

		    		if($(window).scrollTop() > that.widgetHeight){
		    			//if(winWidth < 1350){
		    				that.lockNarrow();
		    			//}
		    			
		    		}
	    		}
	    		
			});
		},
		
		lock : function(){//fix it in position near the nav
			var that=this;
			
			
			//console.log(widgetOffset);
			
			//if(that.locked==false){
				var winWidth = $(window).width();
				var menuWidth = $('#block-nice-menus-1').width();
				var menuOffset = $('#block-nice-menus-1').offset().left;
				var newPos = menuOffset+menuWidth;
				var widgetOffset = $('#my-folder').offset().left;
				var widgetWidth = $('#my-folder').width();

				var newRight = winWidth-(widgetOffset+widgetWidth);
				//	console.log('newright:'+newRight);
				if(winWidth >= 1350){//wide
					//console.log('five');
					$('#my-folder').css({
						'position':'fixed',
						'top':'22px',
						'right':'',
						'left':newPos,
					});
				}
				if(winWidth < 1350 && winWidth >930){//narrow
					//console.log('three');
					$('#my-folder').css({
						'position':'fixed',
						'top':'69px',
						'right':newRight,
						//'left':widgetOffset,
					});
				}
				/*
				if(winWidth < 930){
					//console.log('four');
					$('#my-folder').css({
						'position':'fixed',
						'top':'56px',
						'right':newRight,
						//'left':widgetOffset,
					});
				}*/
				that.locked=true;
			//}
			
		},
		lockNarrow: function(){
			//console.log('lock narrow');
			var that=this;
			if(that.locked==false){
				var winWidth = $(window).width();
				var menuWidth = $('#block-nice-menus-1').width();
				var menuOffset = $('#block-nice-menus-1').offset().left;
				var newPos = menuOffset+menuWidth;
				var widgetOffset = $('#my-folder').offset().left;	
				var widgetWidth = $('#my-folder').width();

				var newRight = winWidth-(widgetOffset+widgetWidth);
				//console.log('locknarrow');
				//console.log('newright:'+newRight);
				if(winWidth < 1350 && winWidth >930){//narrow
					//console.log('one');
					$('#my-folder').css({
						'position':'fixed',
						'top':'69px',
						'right':newRight,
						//'left':widgetOffset,
					});
				}
				/*
				if(winWidth < 930){
					//console.log('two');
					$('#my-folder').css({
						'position':'fixed',
						'top':'56px',
						'right':newRight,
						//'left':widgetOffset,
					});
				}*/
			}
			that.locked=true;
		},
		unlock : function(){//unfix its position near the nav
			var that=this;
			
			var winWidth = $(window).width();
			/*var menuWidth = $('#block-nice-menus-1').width();
			var menuOffset = $('#block-nice-menus-1').offset().left;
			var newPos = menuOffset+menuWidth;
			var widgetOffset = $('#my-folder').offset().left;*/

			//if(that.locked==true){
				
				if(winWidth >= 1350){//wide
					$('#my-folder').css({
						'position':'absolute',
						'top':that.widgetHeight,
						'left':'',
						'right':'',
					});
				}
				if(winWidth < 1350){//narrow
					$('#my-folder').css({
						'position':'absolute',
						'top':that.widgetHeight,
						'left':'',
						'right':'15px',
					});
				}
				that.locked=false;
			//}
			
		},
		resize : function(){//reposition if window is scaled
			var that=this;

			$( window ).resize(function() {
				var winWidth = $(window).width();
					var menuWidth = $('#block-nice-menus-1').width();
					var menuOffset = $('#block-nice-menus-1').offset().left;
					var newPos = menuOffset+menuWidth;
				if(that.locked==true){//if it is in position over the nav
					//console.log('resize');
					
					
					if(winWidth > 1340){
						//console.log('one');
						$('#my-folder').css({
							'position':'fixed',
							'top':'22px',
							'right':'',
							'left':newPos,
							//'z-index':'10',
						});
						that.screenSizeHeight();
						//console.log('resize happening');
					}
					if(winWidth < 1340 && winWidth > 935){
						//console.log('two');
						$('#my-folder').css({
							'position':'fixed',
							'top':'69px',
							'right':'15px',
							'left':'',
							//'z-index':'10',
						});
						that.screenSizeHeight();
					}
					/*
					if(winWidth <= 935 && winWidth > 710){
						//console.log('three');
						$('#my-folder').css({
							'position':'fixed',
							'top':'56px',
							'right':'15px',
							'left':'',
						});
						that.tabletSizeHeight();
					}*/
				}
				if(that.locked==false){
					
					if(winWidth > 935){
						//console.log('four');
						that.screenSizeHeight();
						$('#my-folder').css('top',that.widgetHeight);
					}
					/*
					if(winWidth <= 935 && winWidth > 710){
						// /console.log('fize');
						that.tabletSizeHeight();
						$('#my-folder').css('top',that.widgetHeight);
					}*/

				}
			});
		},
		scaleit : function(){//the pulse animation
				var that=this;
				$( document ).ajaxStop(function() {
	 				 //console.log('ajax finished');
	 				if ($('#my-folder-widget-dot').hasClass('ajax-changed')) {
	 					//console.log('changed');
	 					//$('#my-folder-widget-dot')
	 					
	 					that.firstItem();

	 					setTimeout(function() {
	 						$('#my-folder-widget-dot').removeClass('ajax-changed');
	 						//console.log($('#my-folder-widget-dot').attr('class'));
	 					},1000);
	 				}
	 				
				});
		
		},
		firstYet:false,
		firstItem : function(){
			var that=this;
			if( that.firstYet==false ){
				var count = parseInt($('#my-folder-count').html());
				console.log('count:'+count);
				if(count>=1){
					//console.log('first item');	
					$('#my-folder-first-item').toggle();
					$('#my-folder-widget-whiteout').fadeIn('fast');
					$('#my-folder-widget-dot').toggle();
					$('#my-folder-close-x').toggle();
					that.open=true;
					that.firstYet=true;
					//console.log('6');
				}
			}
		},
		screenSizeHeight:function(){
			var that=this;
			var pathname = window.location.pathname;
			that.widgetHeight = 486;//init the variable incase none of these conditions are met

			if(pathname.indexOf('start')>=0 || pathname.indexOf('permit-wizard')>=0 || pathname.indexOf('resource-locator')>=0 || pathname.indexOf('assistance')>=0 || pathname.indexOf('node')>=0){
				that.where='heightone';//520
				that.widgetHeight = 486;//did testing to find where it lines up
			}

			if( pathname.indexOf('start/starter-kits')>=0){
				that.where='heighttwo';//420
				that.widgetHeight = 385;//did testing to find where it lines up
			}
			if(pathname.indexOf('manage')>=0){
				if(pathname.indexOf('manage/')>=0){
					that.where='heighttwo';//520
					that.widgetHeight = 385;//did testing to find where it lines up
				}
				else {
					that.where='heightone';//420
					that.widgetHeight = 485;//did testing to find where it lines up
				}
			}
			if(pathname.indexOf('grow')>=0){
				if(pathname.indexOf('grow/')>=0){
					that.where='heighttwo';//520
					that.widgetHeight = 385;//did testing to find where it lines up
				}
				else{
					that.where='heightone';//420
					that.widgetHeight = 485;//did testing to find where it lines up
				}
				
			}
			if( pathname.indexOf('faq')>=0 || pathname.indexOf('contact')>=0 || pathname.indexOf('feedback')>=0 || pathname.indexOf('search')>=0 ){
				that.where='heightthree';//350
				that.widgetHeight = 315;
			}
			//console.log('screen: '+that.widgetHeight);
		},
		tabletSizeHeight:function(){
			//if(winWidth < 930){
					//console.log('two');
			var that=this;
			that.widgetHeight = 56;

			$('#my-folder').css({
				'position':'fixed',
				'top':'56px',
				//'right':newRight,
				//'left':widgetOffset,
			});
				//}
		},
		tabletSizeHeight_OLD:function(){
			var that=this;
			var pathname = window.location.pathname;
			that.widgetHeight = 276;//init the variable incase none of these conditions are met

			if(pathname.indexOf('start')>=0 || pathname.indexOf('permit-wizard')>=0 || pathname.indexOf('resource-locator')>=0 || pathname.indexOf('node')>=0){
				that.where='heightone';//520
				that.widgetHeight = 326;
				
				//that.widgetHeight = 274;//did testing to find where it lines up
			}/****/
			if(pathname.indexOf('assistance')>=0){
				that.where='heightone';//520
				that.widgetHeight = 276;
			}
			if( pathname.indexOf('start/starter-kits')>=0){
				that.where='heighttwo';//420
				that.widgetHeight = 374;//did testing to find where it lines up
			}
			if(pathname.indexOf('manage')>=0){
				if(pathname.indexOf('manage/')>=0){
					that.where='heighttwo';//520
					that.widgetHeight = 276;//did testing to find where it lines up
				}
				else {
					that.where='heightone';//420
					that.widgetHeight = 276;//did testing to find where it lines up
				}/*****/
			}
			if(pathname.indexOf('grow')>=0){
				if(pathname.indexOf('grow/')>=0){
					that.where='heighttwo';//520
					that.widgetHeight = 276;//did testing to find where it lines up
				}
				else{
					that.where='heightone';//420
					that.widgetHeight = 276;//did testing to find where it lines up
				}/*****/
				
			}
			if( pathname.indexOf('faq')>=0 || pathname.indexOf('contact')>=0){
				that.where='heightthree';//350
				that.widgetHeight = 276;
			}
		},
		
		hover:function(){
			$('#my-folder-widget-dot').hover(function(){
				var width = $(this).width(),
					height = $(this).height();
					//top = $(this).offset().top,
					//left = $(this).offset().left;
				$(this).css({
					'width':width+4,
					'height':height+4,
					'margin-top':'-2px',
					'margin-right':'-2px',
				});
			},function(){
				var width = $(this).width(),
					height = $(this).height();
					//top = $(this).offset().top,
					//left = $(this).offset().left;
				$(this).css({
					'width':width-4,
					'height':height-4,
					'margin-top':'0',
					'margin-right':'0',
				});
			});
		},

		viewClick:function(){
			$('.my-folder-view-link').on('click',function(event){
				event.preventDefault();
				var href=$(this).parent().attr('href');
				console.log(href);
				window.location=href;
			});
			$('.my-folder-view-link').on('touchstart',function(event){
				event.preventDefault();
				var href=$(this).parent().attr('href');
				console.log(href);
				window.location=href;
			});
		}
	}


})(jQuery);
