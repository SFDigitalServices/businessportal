(function($){
	$(document).ready(function(){
		if($('.t5-menu-wrap').find('.pane-block').length>0){
			doAction(1);
			collapseSidebar(1);
			openSidebar(1);	
		}
		if($('.t10-menu-wrap').find('.pane-block').length>0){
			doAction(2);
			collapseSidebar(2);
			openSidebar(2);	
		}
		if($('.t4-menu-wrap').find('.pane-block').length>0){
			doAction(3);
			collapseSidebar(3);
			openSidebar(3);	
		}
		
	});

	function collapseSidebar(x){
		//console.log('sidebar here');
		if(x==1){
			$(window).resize(function(){
				doAction(1);
			});
		}if(x==2){
			$(window).resize(function(){
				doAction(2);
			});
		}if(x==3){
			$(window).resize(function(){
				doAction(3);
			});
		}
		
	}

	function doAction(y){
		var winWidth = $(window).width();
		if(y==1){
			if(winWidth <= 635){
				$('.t5-menu-wrap').find('.pane-block').find('.menu').css('display','none');
				$('.t5-menu-wrap').find('.pane-block').addClass('sidebar-collapsible');

			}
			if(winWidth > 635){
				$('.t5-menu-wrap').find('.pane-block').find('.menu').css('display','block');
				$('.t5-menu-wrap').find('.pane-block').removeClass('sidebar-collapsible');
			}
		}
		if(y==2){
			if(winWidth <= 635){
				$('.t10-menu-wrap').find('.pane-block').find('.menu').css('display','none');
				$('.t10-menu-wrap').find('.pane-block').addClass('sidebar-collapsible');

			}
			if(winWidth > 635){
				$('.t10-menu-wrap').find('.pane-block').find('.menu').css('display','block');
				$('.t10-menu-wrap').find('.pane-block').removeClass('sidebar-collapsible');
			}
		}
		if(y==3){
			if(winWidth <= 635){
				$('.t4-menu-wrap').find('.pane-block').find('.menu').css('display','none');
				$('.t4-menu-wrap').find('.pane-block').addClass('sidebar-collapsible');

			}
			if(winWidth > 635){
				$('.t4-menu-wrap').find('.pane-block').find('.menu').css('display','block');
				$('.t4-menu-wrap').find('.pane-block').removeClass('sidebar-collapsible');
			}
		}
	}

	function openSidebar(z){
		if(z==1){
			$('.t5-menu-wrap').find('.pane-block').find('.pane-title').on('click',function(){
				//console.log('sidebar click');
				if($('.t5-menu-wrap').find('.pane-block').hasClass('sidebar-collapsible')){
					$('.t5-menu-wrap').find('.pane-block').find('.menu').slideToggle('fast');
				}
				
			});
		}
		if(z==2){
			$('.t10-menu-wrap').find('.pane-block').find('.pane-title').on('click',function(){
				//console.log('sidebar click');
				if($('.t10-menu-wrap').find('.pane-block').hasClass('sidebar-collapsible')){
					$('.t10-menu-wrap').find('.pane-block').find('.menu').slideToggle('fast');
				}
				
			});
		}
		if(z==3){
			$('.t4-menu-wrap').find('.pane-block').find('.pane-title').on('click',function(){
				//console.log('sidebar click');
				if($('.t4-menu-wrap').find('.pane-block').hasClass('sidebar-collapsible')){
					$('.t4-menu-wrap').find('.pane-block').find('.menu').slideToggle('fast');
				}
				
			});
		}
		
	}

})(jQuery);