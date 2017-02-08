(function($){
	//add class 'active-trail' to header nav items when viewing page or child pages are 
	//being viewed. The subsection pages create a bug where this isnt being added
	//automatically

	$(document).ready(function(){
		highlight();
	});

	function highlight(){
		var pathname = window.location.pathname;
		var menu = $('#block-nice-menus-1').find('ul');

		if(pathname.indexOf("start") >= 0){//in the start section
			
					var menuItem = $('.menu-path-start');
					if(!menuItem.hasClass('active-trail')){
						menuItem.addClass('active-trail');
					}

			if(pathname.indexOf("starter-kits") >= 0){
				if(!menuItem.find('.menu-path-start-starter-kits').hasClass('active-trail')){
					menuItem.find('.menu-path-start-starter-kits').addClass('active-trail');
				}
			}
			if(pathname.indexOf("create-a-plan") >= 0){
				if(!menuItem.find('.menu-path-start-create-a-plan').hasClass('active-trail')){
					menuItem.find('.menu-path-start-create-a-plan').addClass('active-trail');
				}
			}
			if(pathname.indexOf("choose-a-structure") >= 0){
				if(!menuItem.find('.menu-path-start-choose-a-structure').hasClass('active-trail')){
					menuItem.find('.menu-path-start-choose-a-structure').addClass('active-trail');
				}
			}
			if(pathname.indexOf("register-your-business") >= 0){
				if(!menuItem.find('.menu-path-start-register-your-business').hasClass('active-trail')){
					menuItem.find('.menu-path-start-register-your-business').addClass('active-trail');
				}
			}
			if(pathname.indexOf("choose-a-name") >= 0){
				if(!menuItem.find('.menu-path-start-choose-a-name').hasClass('active-trail')){
					menuItem.find('.menu-path-start-choose-a-name').addClass('active-trail');
				}
			}
			if(pathname.indexOf("location-options") >= 0){
				if(!menuItem.find('.menu-path-start-location-options').hasClass('active-trail')){
					menuItem.find('.menu-path-start-location-options').addClass('active-trail');
				}
			}
			if(pathname.indexOf("hire-employees") >= 0){
				if(!menuItem.find('.menu-path-start-hire-employees').hasClass('active-trail')){
					menuItem.find('.menu-path-start-hire-employees').addClass('active-trail');
				}
			}
			if(pathname.indexOf("financial-options") >= 0){
				if(!menuItem.find('.menu-path-start-financial-options').hasClass('active-trail')){
					menuItem.find('.menu-path-start-financial-options').addClass('active-trail');
				}
			}
		}

		if(pathname.indexOf("manage") >= 0){//in the manage section
			
					var menuItem = $('.menu-path-manage');
					if(!menuItem.hasClass('active-trail')){
						menuItem.addClass('active-trail');
					}

			if(pathname.indexOf("key-dates") >= 0){
				if(!menuItem.find('.menu-path-manage-key-dates').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-key-dates').addClass('active-trail');
				}
			}
			if(pathname.indexOf("location-options") >= 0){
				if(!menuItem.find('.menu-path-manage-location-options').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-location-options').addClass('active-trail');
				}
			}
			if(pathname.indexOf("green-your-business") >= 0){
				if(!menuItem.find('.menu-path-manage-green-your-business').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-green-your-business').addClass('active-trail');
				}
			}
			if(pathname.indexOf("close-your-business") >= 0){
				if(!menuItem.find('.menu-path-manage-close-your-business').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-close-your-business').addClass('active-trail');
				}
			}
			if(pathname.indexOf("professional-assistance") >= 0){
				if(!menuItem.find('.menu-path-manage-professional-assistance').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-professional-assistance').addClass('active-trail');
				}
			}
			if(pathname.indexOf("local-resources") >= 0){
				if(!menuItem.find('.menu-path-manage-local-resources').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-local-resources').addClass('active-trail');
				}
			}
			if(pathname.indexOf("disaster") >= 0){
				if(!menuItem.find('.menu-path-manage-disaster').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-disaster').addClass('active-trail');
				}
			}
			if(pathname.indexOf("finance-options") >= 0){
				if(!menuItem.find('.menu-path-manage-finance-options').hasClass('active-trail')){
					menuItem.find('.menu-path-manage-finance-options').addClass('active-trail');
				}
			}
		}

		if(pathname.indexOf("grow") >= 0){//in the grow section
			
					var menuItem = $('.menu-path-grow');
					if(!menuItem.hasClass('active-trail')){
						menuItem.addClass('active-trail');
					}

			if(pathname.indexOf("hire-employees") >= 0){
				if(!menuItem.find('.menu-path-grow-hire-employees').hasClass('active-trail')){
					menuItem.find('.menu-path-grow-hire-employees').addClass('active-trail');
				}
			}
			if(pathname.indexOf("buy-existing") >= 0){
				if(!menuItem.find('.menu-path-grow-buy-existing').hasClass('active-trail')){
					menuItem.find('.menu-path-grow-buy-existing').addClass('active-trail');
				}
			}
			if(pathname.indexOf("location-options") >= 0){
				if(!menuItem.find('.menu-path-grow-location-options').hasClass('active-trail')){
					menuItem.find('.menu-path-grow-location-options').addClass('active-trail');
				}
			}
			if(pathname.indexOf("finance-options") >= 0){
				if(!menuItem.find('.menu-path-grow-finance-options').hasClass('active-trail')){
					menuItem.find('.menu-path-grow-finance-options').addClass('active-trail');
				}
			}
			if(pathname.indexOf("business-with-sf") >= 0){
				if(!menuItem.find('.menu-path-grow-business-with-sf').hasClass('active-trail')){
					menuItem.find('.menu-path-grow-business-with-sf').addClass('active-trail');
				}
			}
		}
		/*if(pathname.indexOf('resource-locator')>=0){
			var menuItem = $('.menu-path-resource-locator');
			if(!menuItem.hasClass('active-trail')){
				menuItem.addClass('active-trail');
			}

			if(pathname.indexOf('documents')){
				if(!menuItem.find('.menu-path-resource-locator-documents').hasClass('active-trail')){
					menuItem.find('.menu-path-resource-locator-documents').addClass('active-trail');
				}
			}
			if(pathname.indexOf('online-resources')){
				if(!menuItem.find('.menu-path-resource-locator-online-resources').hasClass('active-trail')){
					menuItem.find('.menu-path-resource-locator-online-resources').addClass('active-trail');
				}
			}
			if(pathname.indexOf('terms')){
				if(!menuItem.find('.menu-path-resource-locator-terms').hasClass('active-trail')){
					menuItem.find('.menu-path-resource-locator-terms').addClass('active-trail');
				}
			}
			if(pathname.indexOf('departments')){
				if(!menuItem.find('.menu-path-resource-locator-departments').hasClass('active-trail')){
					menuItem.find('.menu-path-resource-locator-departments').addClass('active-trail');
				}
			}
		}*/

	}
})(jQuery);