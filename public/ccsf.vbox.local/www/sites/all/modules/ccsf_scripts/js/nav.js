(function($){
	$(document).ready(function(){
		nav.init();
		nav.dropdown();
		nav.scale();
		nav.highlight();
	});

	var nav = {
		init:function(){
			var that=this;
			$('#site-name').find('a').addClass('nav-logo-one');
			//var pathname = window.location.protocol + "//" + window.location.host + "/"
			//console.log(pathname);
			$(window).bind('scroll', function(){
				var height = 49;
				if($('#hamburger-one').css('display')=='none'){
					if($(window).scrollTop() > height){
						that.hide();
					}
					if($(window).scrollTop() < height){
						that.show();
					}
				}
				
			});
		},
		//url:'',
		vis:true,
		hide:function(){
			var that=this;
			var url=window.location.protocol + "//" + window.location.host + "/";
			//console.log('hide');
			if(that.vis==true){
				$('#header').css({
					'position':'fixed',
					'margin-top':'-49px',
				});
				/*$('#site-name').find('a').css({
					'background-image':'url("'+url+'/sites/all/themes/ccsf_theme/images/header/header_image_2.png")',
					'background-position-y':'54px',
				});*/
				if($('#site-name').find('a').hasClass('nav-logo-one')){
					$('#site-name').find('a').removeClass('nav-logo-one');
				}
				
				$('#site-name').find('a').addClass('nav-logo-two');
				$('#main').css('padding-top','106px');
				that.vis=false;
			}
			
		},
		show:function(){
			//console.log('show');
			var that=this;
			var url=window.location.protocol + "//" + window.location.host + "/";
			if(that.vis==false){
				$('#header').css({
					'position':'relative',
					'margin-top':'0',
				});
				/*$('#site-name').find('a').css({
					'background-image':'url("'+url+'/sites/all/themes/ccsf_theme/images/header/header_logo.png")',
					'background-color':'white',
					'background-position':'center',
				});*/

				if($('#site-name').find('a').hasClass('nav-logo-two')){
					$('#site-name').find('a').removeClass('nav-logo-two');
				}
				$('#site-name').find('a').addClass('nav-logo-one');
				$('#main').css('padding-top','0');
				that.vis=true;
			}
		},
		dropdown:function(){
			var parents = $('#nice-menu-1').find('.menuparent');

			$.each(parents,function(i){
				
				//
				
				$(parents[i]).hover(function(){
					//console.log('hover');
					if( !$(parents[i]).hasClass('menu-path-resource-locator') ){//dont do this on the resources menu. 
						$(parents[i]).find('ul').css({'display':'block','visibility':'visible','opacity':'1'});
						var parentPos = $(parents[i]).find('a').offset().left;
						var childPos = $(parents[i]).find('ul').children().first().find('a').offset().left;
						//console.log('parent:'+parentPos);
						//console.log('child:'+children);
						var newPos = parentPos - childPos;

						var children = $(parents[i]).find('ul').find('li');
						
						$.each(children,function(j){
							$(children[j]).find('a').css('padding-left',newPos);
						
						});
					}else{
						$(parents[i]).find('ul').css({'display':'block','visibility':'visible','opacity':'1'});
						/*var parent = $('.menu-path-resource-locator').width();
						console.log('parent:'+parent);
						var anchorLeft = $('.menu-path-resource-locator').find('a').offset().left;
						console.log('left:'+anchorLeft);
						var anchorRight = $(window).width() - anchorLeft + $('.menu-path-resource-locator').width();
						console.log('right:'+anchorRight);
						var anchor = anchorRight-anchorLeft;
						console.log('anchor:'+anchor);
						var howWide = (parent-anchor) / 2;
						console.log('howwide:'+howWide);
						var children = $(parents[i]).find('ul').find('li');
						$.each(children,function(k){
							$(children[k]).find('a').css('padding-left',howWide);
						});*/
					}

				},function(){
					//if( !$(parents[i]).hasClass('menu-path-resource-locator') ){
						$(parents[i]).find('ul').css({
							'opacity':'0',
							'display':'none',
							'visibility':'hidden',
						});
					//}
				});				
				
			});

			
		},
		/*resourceDropdown:function(){
			var parent = $('.menu-path-resource-locator').width();
			var anchor = $('.menu-path-resource-locator').find('a').offset().left;
		},	*/	
		scale:function(){
			var that=this;
			$(window).resize(function(){

				
					if($('#hamburger-one').css('display')=='block'){
						if($('#header').css('margin-top')=='-49px'){
							$('#header').css('margin-top','0px');
							$('#site-name').find('a').removeClass('nav-logo-two');
							$('#site-name').find('a').addClass('nav-logo-one');
							/*$('#site-name').find('a').css({
								'background-image':'url("http://localhost:8888/vagrant/public/ccsf.vbox.local/www/sites/all/themes/ccsf_theme/images/header/header_logo.png")',
								'background-color':'white',
								'background-position':'center',
							});*/
							//console.log('switch to mobile');
						}	
					}
					var height=49;

					if($('#hamburger-one').css('display')=='none'){
						if($(window).scrollTop() < height){
							$('#header').css({
								'position':'relative',
								'margin-top':'0',
							});
							$('#main').css('padding-top','0px');
							$('#site-name').find('a').removeClass('nav-logo-two');
							$('#site-name').find('a').addClass('nav-logo-one');
							/*$('#site-name').find('a').css({
								'background-image':'url("http://localhost:8888/vagrant/public/ccsf.vbox.local/www/sites/all/themes/ccsf_theme/images/header/header_logo.png")',
								'background-color':'white',
								'background-position':'center',
							});*/
							that.vis=true;
							//console.log('high');
						}
						if($(window).scrollTop() > height){
							$('#header').css({
								'position':'fixed',
								'margin-top':'-49px',
							});
							$('#main').css('padding-top','0px');
							$('#site-name').find('a').removeClass('nav-logo-one');
							$('#site-name').find('a').addClass('nav-logo-two');
							/*$('#site-name').find('a').css({
								'background-image':'url("http://localhost:8888/vagrant/public/ccsf.vbox.local/www/sites/all/themes/ccsf_theme/images/header/header_image_2.png")',
								'background-position-y':'54px',
							});*/
							$('#main').css('padding-top','106px');
							that.vis=false;
							//console.log('low');
						}
					}
					that.switchit=false;
				
			});
		},
		highlight:function(){
			//console.log('test nav');
			if($('.node-type-permit').length>0){
				//console.log('FFFFFF');
				$('.menu-path-permits-licenses').addClass('active-trail');
			}
			if( $('.page-resource-locator-online-resources').length>0 || $('.page-resource-locator-documents').length>0 || $('.page-resource-locator-terms').length>0 || $('.page-resource-locator-departments').length>0 || $('.node-type-department').length>0 || $('.node-type-document').length>0){
				$('.menu-path-resource-locator').addClass('active-trail');
			}

		},
	}

})(jQuery);