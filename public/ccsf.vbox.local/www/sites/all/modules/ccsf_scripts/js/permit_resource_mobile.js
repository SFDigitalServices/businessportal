(function($){
	/// here we are switching the order of the two main content divs for the mobile view of the site to match the designs;

	$(document).ready(function(){
		if($('.permit-page-wrap').length>0){
			//scaleWindow();
			//mobileAdjust();
		}
	});

	var small = false;

	function scaleWindow(){
		$(window).resize(function(){
			var winWidth = $(window).width();
			//console.log('fire');
			//console.log(winWidth);
			if(winWidth < 715){
				if(small==false){
					//console.log('mobile adjust');
					$('.permit-full-content-wrap > div').each(function() {
		    			$(this).prependTo(this.parentNode);
					});	
					small=true;
				}
			}
			if(winWidth > 715){
				if(small==true){
					//console.log('mobile adjust');
					$('.permit-full-content-wrap > div').each(function() {
		    			$(this).prependTo(this.parentNode);
					});	
					small=false;
				}
			}
		});
	}

	function mobileAdjust(){

		var winWidth = $(window).width();
		//console.log('fire');
		//console.log(winWidth);
		if(winWidth < 715){
			//console.log('mobile adjust');
			$('.permit-full-content-wrap > div').each(function(i) {
    			if(i==0 || i==1){
    				$(this).prependTo(this.parentNode);	
    			}
    			
			});
			small = true;
		}
	}

})(jQuery);