(function($){
  var T = [
    {lng: "Chinese", code: "zh-CN"},
    {lng: "English", code: "en"},
    {lng: "Spanish", code: "es"}
  ];
  $(document).ready(function(){
    var $lngs = $("#goog-menu2a");
    var tl = getParameterByName('tl');
    var u = getParameterByName('u');
    if (tl || u) {
      $("#google_translate_element1").hide();
      return;
    }
    var sel_lng = tl ? tl : 'en';
    var href = u ? u : location.href;
    for (var i=0; i< T.length; i++){
      if (sel_lng != T[i].code)
        $lngs.append("<a target='_top' href='http://translate.google.com/translate?hl="+sel_lng+"&sl=auto&tl="+T[i].code+"&u="+href+"'>"+T[i].lng+"</a><br>");
    }
    $("#goog-toggle").click(function(){
      $(".goog-menu2").toggle();
    });
  });
  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  return;


	$(document).ready(function(){
		//console.log('google translate');
		setup();
		ajaxProgress.start();
		ajaxProgress.end();
		openMenu();
		//hideIt();
		whatwasclicked();
	});

	function setup(){
		//var vis = false;
		//console.log(content);
		//if(vis==false){
			

			var check = setInterval(function(){
				//console.log('test');
				if($('.goog-te-menu-value').length>0){
					
					var content = $('.goog-te-menu-value').children().first().html();
					var shortened = content.replace('Select','');
					$('.goog-te-menu-value').children().first().html(shortened);
					if($('.goog-te-menu-frame').css('display')=='none'){
						$('.goog-te-menu-value').removeClass('translate-active');
					}

					var children = $('.goog-te-menu-value').children();
					$.each(children,function(i){
						if(!i==0){
							//if($(children[i]).is('span')){
								$(children[i]).remove();
							//}
						}
					});

					//var translateLeft = $('#block-google-translate-my-google-translate').offset().left;
					if( $('#hamburger-one').css('display')=='none' ){
						if( !$('#block-search-by-page-1').find('#edit-keys').hasClass('search-vis') ){
							var translateWidth = $('#block-google-translate-my-google-translate').width();
							var searchWidth = $('#block-search-by-page-1').width();
							var rights = translateWidth+searchWidth+53;
							//console.log('newright:'+rights);
							$('#block-nice-menus-2').css('right',rights);
						}else{
							var searchBarWidth = $('#block-search-by-page-1').find('#edit-keys');
							var translateWidth = $('#block-google-translate-my-google-translate').width();
							var rights = searchBarWidth + translateWidth + 53;
							$('#block-nice-menus-2').css('right',rights);
						}
					}else{
						$('#block-nice-menus-2').css('right','0');
					}
					//console.log(content);
					//clearInterval(check);
				}

			}, 500);
		//}
		
	}
	//var smallCleaned = false;
	//var largeCleaned = false;
	function openMenu(){
		
		$('#google_translate_element').live('click', function (event) {
			var winWidth = $(window).width();
			//console.log(winWidth);
			//if( $('#block-google-translate-my-google-translate').css('right')>200 ){
				if(winWidth>935){//full size menu visible
					//console.log('full menu');
					largeCleanup();
				}
				if(winWidth<935){//mobil menu visible
					//console.log('mobile menu');
					smallCleanup();
				}
			//}else{
				//event.preventDefault();
			//	return false;
			//}
			
		});
		
	}
	function whatwasclicked(){
		$(window).click(function(e){
			//console.log(e.target);
		});
	}
	function hideIt(){
		$(".region-header").scroll(function(){
			$('.goog-te-menu-frame').css('display','none');
		});
		$(window).scroll(function(){
			$('.goog-te-menu-frame').css('display','none');
		});
	}
	function smallCleanup(){
			//var sectionColor = '#333333';
			var sectionColor = getSection();

			//console.log('test click');
			
			//change the color of the 'language' button
			$('.goog-te-menu-value').children().first().css({
				//'color':'#888888',
			});

			//hide the box shadow and adjust size
			
			var one = $('#block-nice-menus-1').innerHeight();//hamburger-two
			var two = $('#block-nice-menus-2').innerHeight();
			var three = $('#hamburger-two').innerHeight();
			var scrolled = $('.region-header').scrollTop();
			//var tall = $('#block-nice-menus-2').height();
			var newPos = one+two+three-scrolled+70+'px';
			//console.log('translate bottom:'+newPos);
			//var height =  
			$('.goog-te-menu-frame').css({
				'box-shadow':'none',
				'margin-left':'-26px',
				'width':'140px',
				'height':'200px',
				'top':newPos,
				//'position':'absolute',
				//'position':'relative',
				//'position':'fixed',
				//'z-index':'999999',
			});

			//adjust body size
			$('.goog-te-menu-frame').contents().find('body').css({
				'width':'140px',
				'height':'85px',
			});

			//remove google border
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2').css({
				'background':'#333333',
				'border':'none',
				'font-family':'"Helvetica", Helvetica, Arial, sans-serif',
				'width':'117px',
				'height':'85px',

			});

			//move the listed items over 
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2').find('table').css('margin-left','18px');

			//hide the 'select language' text
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item-selected').css({
				'display':'none',
			});
			
			//space out the items
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').css({
				'margin-left':'15px',
				'display':'block',
			});


			//change the font color and background color of the items
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').find('div').css({
				
				'background':'#333333',
			});

			//change the font size
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').find('div').find('.text').css({
				'font-family':'"Helvetica", Helvetica, Arial, sans-serif',
				'font-size':'16px',
				'font-weight':'100',
				'color':sectionColor,
			});


			//remove 'simplified' from the chinese option
			var options = $('.goog-te-menu-frame').contents().find('.goog-te-menu2-item');
			
			$.each(options,function(i){
				var text= $(options[i]).find('div').find('.text').html();
				if (text.indexOf("(Traditional)") >= 0){
					var shortened = text.replace('(Traditional)','');
					$(options[i]).find('div').find('.text').html(shortened);
				}
				//console.log(text);
			});
	}
	function largeCleanup(){
		

			var sectionColor = '#333333';
			//var sectionColor = getSection();

			//console.log('test click');
			
			$('.goog-te-menu-value').addClass('translate-active');

			//hide the box shadow and adjust size
			$('.goog-te-menu-frame').css({
				'box-shadow':'none',
				'margin-left':'-26px',
				'width':'140px',
				'height':'auto',
			});

			//adjust body size
			$('.goog-te-menu-frame').contents().find('body').css({
				'width':'140px',
				'height':'85px',
			});

			//remove google border
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2').css({
				'background':'#eeeeee',
				'border':'none',
				'font-family':'"Helvetica", Helvetica, Arial, sans-serif',
				'width':'117px',
				'height':'85px',

			});

			//move the listed items over 
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2').find('table').css('margin-left','18px');

			//hide the 'select language' text
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item-selected').css({
				'display':'none',
			});
			
			//space out the items
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').css({
				'margin-top':'10px',
				'margin-left':'0px',
				'display':'block',
			});


			//change the font color and background color of the items
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').find('div').css({
				
				'background':'#eeeeee',
			});

			//change the font size
			$('.goog-te-menu-frame').contents().find('.goog-te-menu2-item').find('div').find('.text').css({
				'font-family':'"Helvetica", Helvetica, Arial, sans-serif',
				'font-size':'14px',
				'color':sectionColor,
			});


			//remove 'simplified' from the chinese option
			var options = $('.goog-te-menu-frame').contents().find('.goog-te-menu2-item');
			
			$.each(options,function(i){
				var text= $(options[i]).find('div').find('.text').html();
				if (text.indexOf("(Traditional)") >= 0){
					var shortened = text.replace('(Traditional)','');
					$(options[i]).find('div').find('.text').html(shortened);
				}
				//console.log(text);
			});

			//console.log(options);
		//});
	}
	function hide(){
		$('.goog-te-menu-frame').css({
			'display':'none',
		});
		//console.log('hide');
	}

	function getSection(){
		var pathname = window.location.pathname;
		var color='';

		if(pathname.indexOf("start") >= 0){
			color='#00bed5';
		}
		else if(pathname.indexOf("manage") >= 0){
			color='#99cd00';
		}
		else if(pathname.indexOf("grow") >= 0){
			color='#b85ed5';
		}
		else if(pathname.indexOf("permit-wizard") >= 0){
			color='#ff6627';
		}
		else if(pathname.indexOf("resource-locator") >= 0){
			color='#ff9900';
		}
		else if(pathname.indexOf("node")>=0){
			//console.log('node page');
			if($('body').hasClass('node-type-permit')){
				console.log('permit here');
				color='#ff6627';
			}
			if($('body').hasClass('node-type-document') || $('body').hasClass('node-type-department')){
				console.log('document here');
				color='#ff9900';
			}
		}
		else{//any other section on the site
			color='#0d84e9';
		}
		return color;
	}	

	var ajaxProgress = {//monitor when ajax calls start and finish
		start : function(){
			$( document ).ajaxStart(function() {
 				 console.log('ajax started');
			});
		},
		end : function(){
			$( document ).ajaxStop(function() {
 				 setup();
 				 hide();
			});
		}
	}

})(jQuery);

