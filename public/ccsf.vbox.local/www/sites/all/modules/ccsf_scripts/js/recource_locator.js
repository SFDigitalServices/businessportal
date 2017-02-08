(function($){
	
	$(document).ready(function(){
		var pathname = window.location.pathname;
		if( !pathname.indexOf("admin") >= 0){
			if($('.t6-2-splash-wrap').length>0){
				ajaxProgress.start();
				ajaxProgress.end();
				guide.clickOnGuide();
				guide.clickOnFilter();
				requiredItems.toggle();
				requiredItems.hideCTA();
				documentsFilter.treeInit();
				documentsFilter.submitInit();
				//documentsFilter.treeToggle();
				//footer.adjust();
				termFilter.init();
				deptFilter.init();
				agencyFilter.init();
				arrow.arrow();
				input.addPlaceholder();
				loader.append();
				//searchClear.clearIt();

				mobileSetup.button();
				mobileSetup.closeButton();
				mobileSetup.clickButton();
				mobileSetup.clickCloseButton();
				mobileSetup.menu();

				resetOnScale.init();
				resetOnScale.watchIt();

			}
		}
		
	});	

		
	var guide = {//controls interactions with the guide on the front page of the resource locator
		visible : true,
		fade:function(){
			var that=this;
			if( that.visible==true ){	
				$('#resource-locator-guide').fadeTo('slow', 0).slideUp('slow', function(){
					$('#resource-locator-guide').css('display','none');
					console.log('hide it!');
				});

				if( $('.resource-required-docs-wrap').length>0 ){
					$('.resource-required-docs-wrap').css('padding-top','90px');
					console.log('move docs!');
				}

				that.visible=false;
				//$('.resource-required-docs-wrap').css('padding-top','90px');
				//$('.resource-grey-out').fadeTo('slow',0);
			}	
			
		},
		clickOnGuide : function(){
			var that=this;
			$('.resource-locator-guide-title-close-cta').click(function(){
				that.fade();
			});
		},
		clickOnFilter : function(){
			var that=this;
			$('.view-filters').click(function(){
				that.fade();
			});
		}	
	}

	var requiredItems = {//controls toggle of the required/featured item sections
		
		docsOn : true,
		resourcesOn : true,
		termsOn : true,
		deptsOn : true,

		toggle:function(){
			var that=this;

			if( $('#required-docs-wrapper').length>0 ){//the featured docs section exists

				$('#required-docs-wrapper').find('.required-items-heading').find('h2').click(function(){
					
					if( that.docsOn == true ){//toggle closed
						//buffer.adjust('close');
						$('#required-docs-wrapper').find('.required-items-nodes').slideUp('500',function(){});
						$('#required-docs-wrapper').find('.required-items-heading').find('h2').removeClass('arrow-rotate');
						
						that.docsOn = false;
						return;
					}
					else if( that.docsOn == false ){//toggle open
						
						
						$('#required-docs-wrapper').find('.required-items-nodes').slideDown('500',function(){
							//buffer.adjust('open');

						});
						$('#required-docs-wrapper').find('.required-items-heading').find('h2').addClass('arrow-rotate');
						$('.resource-required-docs-wrap').css('padding-bottom', '0');
						$('.resource-required-docs-wrap').css('height', 'auto');
						that.docsOn = true;
						return;
					}
					
				});
			}

			if( $('#required-term-wrapper').length>0 ){//the featured terms section exists

				$('#required-term-wrapper').find('.required-items-heading').find('h2').click(function(){

					if( that.termsOn == true ){//toggle closed
						//buffer.adjust('close');
						$('#required-term-wrapper').find('.required-items-nodes').slideUp('500',function(){});
						$('#required-term-wrapper').find('.required-items-heading').find('h2').removeClass('arrow-rotate');
						that.termsOn = false;
						return;
					}
					else if( that.termsOn == false ){//toggle open
						$('#required-term-wrapper').find('.required-items-nodes').slideDown('500',function(){
							//buffer.adjust('open');
						});
						$('#required-term-wrapper').find('.required-items-heading').find('h2').addClass('arrow-rotate');
						$('.resource-required-terms-wrap').css('height', 'auto');
						that.termsOn = true;
						return;
					}

				});

			}

			if( $('#required-dept-wrapper').length>0 ){//the featured departemts section exists

				$('#required-dept-wrapper').find('.required-items-heading').find('h2').click(function(){

					if( that.deptsOn == true ){
						$('#required-dept-wrapper').find('.required-items-nodes').slideUp('500',function(){});
						$('#required-dept-wrapper').find('.required-items-heading').find('h2').removeClass('arrow-rotate');
						that.deptsOn = false;
						return;
					}
					else if( that.deptsOn == false ){
						$('#required-dept-wrapper').find('.required-items-nodes').slideDown('500',function(){});
						$('#required-dept-wrapper').find('.required-items-heading').find('h2').addClass('arrow-rotate');
						$('.resource-required-depts-wrap').css('height', 'auto');
						that.deptsOn = true;
						return;
					}

				});

			}

			if( $('#required-resources-wrapper').length>0 ){//the featured online resources section exists

				$('#required-resources-wrapper').find('.required-items-heading').find('h2').click(function(){

					if( that.resourcesOn == true ){
						$('#required-resources-wrapper').find('.required-items-nodes').slideUp('500',function(){});
						$('#required-resources-wrapper').find('.required-items-heading').find('h2').removeClass('arrow-rotate');
						that.resourcesOn = false;
						return;
					}
					else if( that.resourcesOn == false ){
						$('#required-resources-wrapper').find('.required-items-nodes').slideDown('500',function(){});
						$('#required-resources-wrapper').find('.required-items-heading').find('h2').addClass('arrow-rotate');
						$('.resource-required-resources-wrap').css('height', 'auto');
						that.resourcesOn = true;
						return;
					}

				});

			}

		},
		hideCTA:function(){//if on the interior pages of the resource locator, add a class that will hide the 'view all' CTA controls
			if( $('.view-resource-locator-online-resources').length>0 ){
				$('#required-resources-wrapper').addClass('required-interior');
			}
			if( $('.view-resource-locator-documents').length>0 ){
				$('#required-docs-wrapper').addClass('required-interior');
			}	
			if( $('.view-resource-locator-terms').length>0 ){
				$('#required-term-wrapper').addClass('required-interior');
			}
			if( $('.view-resource-locator-departments').length>0 ){
				$('#required-dept-wrapper').addClass('required-interior');
			}
			
		}
	}

	var agencyFilter = {
		init:function(){
			if( $('.view-resource-locator-departments').length>0 ){
				$('#edit-field-department-type-wrapper').find('label').first().addClass('hide-arrow');
			}
		}
	}
	var documentsFilter = {//controls for the exposed filter that controls the documents page of the resource locator
		
		stageOpen : false,
		needOpen : true,
		agencyOpen : false,
		typeOpen : false,

    isReady: function(){
      return $('.view-resource-locator-documents').hasClass('isReady');
    },

		treeInit:function(){
			var that=this;
			//console.log('tree init');
			if($('.view-resource-locator-documents').length>0 || $('.view-resource-locator-online-resources').length>0){//make sure we are on the documents page with the doument view assigned

         $('.view-resource-locator-documents').addClass('isReady');


				//$('.views-exposed-form').find('.bef-checkboxes').css('display','none');//hide the child items so that we have to toggle them open
				
				if(that.stageOpen == false){//if it was the 'business stage' label
					$('#edit-field-business-stage-wrapper').find('.bef-checkboxes').css('display','none');
				}
				if(that.needOpen == false){//if it was the 'business need' label
					$('#edit-field-business-need-wrapper').find('.bef-checkboxes').css('display','none');
					$('#edit-field-business-need-1-wrapper').find('.bef-checkboxes').css('display','none');
				}
				if(that.agencyOpen == false){//if it was the 'agency type' label
					$('#edit-field-government-level-term-wrapper').find('.bef-checkboxes').css('display','none');
					$('#edit-field-government-level-wrapper').find('.bef-checkboxes').css('display','none');
				}
				if(that.typeOpen == false){//if it was the 'type' label
					$('#edit-field-type-wrapper').find('.bef-checkboxes').css('display','none');
					
				}

				var labels = $('.views-exposed-form').find('.views-exposed-widget');
			
				$.each(labels,function(i){
					if( !$(labels[i]).is('#edit-search-api-views-fulltext-wrapper') ){//make sure its not the label on the search text field
						////set up the toggle on the parent labels of each filter section
						
						//Does the check if the section was open already in the occasion the form is reloaded after an ajax call
						if($(labels[i]).is('#edit-field-business-stage-wrapper')){//if it was the 'business stage' label
							if(that.stageOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-business-stage-wrapper').children().first().addClass('arrow-rotate');
							}
						}
						if($(labels[i]).is('#edit-field-business-need-wrapper')){//if it was the 'business need' label
							if(that.needOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-business-need-wrapper').children().first().addClass('arrow-rotate');
							}
						}
						if($(labels[i]).is('#edit-field-business-need-1-wrapper')){//if it was the 'business need' label
							if(that.needOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-business-need-1-wrapper').children().first().addClass('arrow-rotate');
							}
						}
						if($(labels[i]).is('#edit-field-government-level-term-wrapper')){//if it was the 'agency type' label
							if(that.agencyOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-government-level-term-wrapper').children().first().addClass('arrow-rotate');
							}
						}
						if($(labels[i]).is('#edit-field-government-level-wrapper')){//if it was the 'agency type' label
							if(that.agencyOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-government-level-wrapper').children().first().addClass('arrow-rotate');
							}
						}
						if($(labels[i]).is('#edit-field-type-wrapper')){//if it was the 'type' label
							if(that.typeOpen == false){
								$(labels[i]).children().first().data('toggle','closed');
							}else{
								$(labels[i]).children().first().data('toggle','open');
								$('#edit-field-type-wrapper').children().first().addClass('arrow-rotate');
							}
						}

						/////////call the toggle function
						$(labels[i]).children().first().click(function(){
							var label = $(labels[i]).children().first();
							that.treeToggle(label);
						});
						
					}
				});
			}
		},
		filterClicked : false,
		submitInit:function(){//submit handler for the documents and the online resources pages
			var that=this;
			console.log('submit init');
			if($('.view-resource-locator-documents').length>0 || $('.view-resource-locator-online-resources').length>0){//make sure we are on the documents page with the doument view assigned
				
				var labels = $('.views-exposed-form').find('.views-exposed-widget');
			
				$.each(labels,function(i){
					if( !$(labels[i]).is('#edit-search-api-views-fulltext-wrapper') ){//make sure its not the label on the search text field
						
						////set up the auto submit on all of the filter objects
						var filters = $(labels[i]).find('.bef-checkboxes').find('.form-item');
						$.each(filters,function(i){
							
								$(filters[i]).find('input').on('click',function(){
								//$(this).find('input').on('click',function(){
									if(that.filterClicked==false){
										that.filterClicked = true;

										if($('.view-resource-locator-documents').length>0){//if on the documents view, click its submit button
											$('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
											$('#edit-submit-resource-locator-documents').click();
										}
										if($('.view-resource-locator-online-resources').length>0){//if on the online resources view, click its submit button
											$('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
											$('#edit-submit-resource-locator-online-resources').click();
										}
									}

								});
								
							//}

						});
					}
				});
			}
		},
		treeToggle : function(label){//toggle the filter sections open and closed
			var that=this;
			//console.log($(label));
			var toggle = label.data('toggle');

						
			if( toggle == 'closed'){//open it
				//console.log(toggle);
				label.next().find('.bef-checkboxes').css('display','block');
				label.data('toggle','open');
				
				footer.adjust();

				//log that the section is open for use when the form is refreshed after an ajax call
				if(label.parent().is('#edit-field-business-stage-wrapper')){//if it was the 'business stage' label
					that.stageOpen=true;
					$('#edit-field-business-stage-wrapper').children().first().addClass('arrow-rotate');
				}
				//
				if(label.parent().is('#edit-field-business-need-wrapper')){//if it was the 'business need' label
					that.needOpen=true;
					$('#edit-field-business-need-wrapper').children().first().addClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-business-need-1-wrapper')){//if it was the 'business need' label
					that.needOpen=true;
					$('#edit-field-business-need-1-wrapper').children().first().addClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-government-level-term-wrapper')){//if it was the 'agency type' label
					that.agencyOpen=true;
					$('#edit-field-government-level-term-wrapper').children().first().addClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-government-level-wrapper')){//if it was the 'agency type' label
					that.agencyOpen=true;
					$('#edit-field-government-level-wrapper').children().first().addClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-type-wrapper')){//if it was the 'type' label
					that.typeOpen=true;
					$('#edit-field-type-wrapper').children().first().addClass('arrow-rotate');	
				}
				return;
			}
			else if( toggle =='open'){//close it
				//console.log(toggle);
				label.next().find('.bef-checkboxes').css('display','none');
				label.data('toggle','closed');
				
				
				footer.adjust();

				//log that the section is closed for use when the form is refreshed after an ajax call
				if(label.parent().is('#edit-field-business-stage-wrapper')){//if it was the 'business stage' label
					that.stageOpen=false;
					$('#edit-field-business-stage-wrapper').children().first().removeClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-business-need-wrapper')){//if it was the 'business need' label
					that.needOpen=false;
					$('#edit-field-business-need-wrapper').children().first().removeClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-business-need-1-wrapper')){//if it was the 'business need' label
					that.needOpen=false;
					$('#edit-field-business-need-1-wrapper').children().first().removeClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-government-level-term-wrapper')){//if it was the 'agency type' label
					that.agencyOpen=false;
					$('#edit-field-government-level-term-wrapper').children().first().removeClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-government-level-wrapper')){//if it was the 'agency type' label
					that.agencyOpen=false;
					$('#edit-field-government-level-wrapper').children().first().removeClass('arrow-rotate');
				}
				if(label.parent().is('#edit-field-type-wrapper')){//if it was the 'type' label
					that.typeOpen=false;
					$('#edit-field-type-wrapper').children().first().removeClass('arrow-rotate');	
				}

				//console.log(that.openarray);
				return;
			}
		}
	}

	var termFilter={//handle formating and submit on the terms filter
		init:function(){
			if($('.form-item-field-term-alphabet').length>0){//make sure we are on the terms page
				var alpha = $('.form-item-field-term-alphabet').find('.form-item');
				$.each(alpha,function(i){
					$(alpha[i]).find('label').click(function(event){
						event.preventDefault();
						$('#edit-search-api-views-fulltext').val('');//clear search field
						var id = $(alpha[i]).find('input').attr('id');
						//console.log('id:'+id);
						
						$.each(alpha,function(j){//reset all filters
							$(alpha[j]).find('input').prop( "checked", false);
							$(alpha[j]).removeClass('highlight');
							
						});

						$(alpha[i]).find('input').prop( "checked", true );
						$(alpha[i]).addClass('highlight');
						loader.termAppend();
						$('#edit-submit-resource-locator-terms').click();
					});
				});
			}	
			
		},
	}

	var deptFilter={
		
		filterOn:false,

		init:function(){
			var that=this;

			if($('.view-resource-locator-departments').length>0){//make sure the depts view is on screen
				//hide items for toggle setup
				
				//////DONT REMOVE THIS!!!! ////////
				//this inits the toggle of the filter tree, turned of during QA, might want to turn it back on later
				
				/*if(that.filterOn==false){
					$('#edit-field-department-type-wrapper').find('.bef-checkboxes').css('display','none');
				}else if(that.filterOn==true){
					$('#edit-field-department-type-wrapper').find('.bef-checkboxes').css('display','block');
				}
				

				//add click even for toggle
				$('#edit-field-department-type-wrapper').children().first().click(function(){
					that.toggle();
				});
				*/

				//////DONT REMOVE THIS!!!! ///////

				//auto submit
				var filter = $('#edit-field-department-type-wrapper').find('.bef-checkboxes').find('.form-item');
				$.each(filter,function(i){
					$(filter[i]).find('input').click(function(){
						$('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
						$('#edit-submit-resource-locator-departments').click();
					});
				});
			}
		},
		toggle:function(){
			var that=this;

			if(that.filterOn==false){//toggle open the filters
				$('#edit-field-department-type-wrapper').find('.bef-checkboxes').css('display','block');
				that.filterOn=true;
				return;
			}else if(that.filterOn==true){//toggle closed the filters
				$('#edit-field-department-type-wrapper').find('.bef-checkboxes').css('display','none');
				that.filterOn=false;
				return;
			}

			
		},
	}

	var results = {
		count:function(){
			if( !$('.resource-result-count').length>0 ){//make sure it hasnt already been added
				var items = '';
				var pathname = window.location.pathname;
				var url = '';
				var type = '';
        var $viewContent;
        
				if($('.view-resource-locator-documents').length>0){//the document view is on screen
          $viewContent = $('.view-resource-locator-documents').find('.view-content')
					items = $('.view-resource-locator-documents').find('.view-content').find('.views-row');
					url = pathname.replace('resource-locator/documents','');
					type='doc';
				}
				
				if( $('.view-resource-locator-online-resources').length>0 ){//the online resource view is on screen
          $viewContent = $('.view-resource-locator-online-resources').find('.view-content')
					items = $('.view-resource-locator-online-resources').find('.view-content').find('.views-row');
					url = pathname.replace('resource-locator/online-resources');
					type='resource';
				}
				if( $('.view-resource-locator-terms').length>0 ){// the terms view is on screen
          $viewContent = $('.view-resource-locator-terms').find('.view-content')
					items = $('.view-resource-locator-terms').find('.view-content').find('.views-row');
					url= pathname.replace('resource-locator/terms','');
					type='term';
				}
				if( $('.view-resource-locator-departments').length>0 ){
          $viewContent = $('.view-resource-locator-departments').find('.view-content')
					items = $('.view-resource-locator-departments').find('.view-content').find('.views-row');
					url= pathname.replace('resource-locator/departments','');
					type='depts';
				}
				
				var count = items.length;
				//console.log('url:'+url);
				//console.log('count:'+count);

				
				
				var nodes = [];

				$.each(items,function(i){
					var nodeClass = $(items[i]).find('article').attr('class').split(' ')[0];
					var nid = parseInt( nodeClass.replace('node-','') );
					nodes[i]=nid;
				});
				//console.log(nodes);

				var nodeString = nodes.join(',');
//        var $viewContent = $('.view-resource-locator-documents').find('.view-content');

				if(type=='doc'){
					$viewContent.prepend('<div class="resource-result-count"><h3>Results <span>('+count+')</span></h3><div class="resource-result-actions">'+
            '<a href="'+url+'my-folder/download-single/'+type+'/'+nodeString+'"><p class="resource-result-download-cta">Download all</p></a>'+
            '<a href="'+url+'my-folder/add/'+type+'/'+nodeString+'" class="use-ajax"><p class="resource-result-folder-cta">Add all to My Folder</p></a></div></div>');
				}
				if(type=='term'){
					//what to prepend for other types
					$viewContent.prepend('<div class="resource-result-count"><h3>Terms <span>('+count+')</span></h3></div>');
				}
				if(type=='resource'){
					$viewContent.prepend('<div class="resource-result-count"><h3>Online Resource Results <span>('+count+')</span></h3></div>');
				}
				if(type=='depts'){
					$viewContent.prepend('<div class="resource-result-count"><h3>Results <span>('+count+')</span></h3></div>');
				}
				Drupal.behaviors.AJAX.attach($viewContent,{});

				/*
					
					//docs

					<div class="resource-result-count">
						<h3>Results <span>('+count+')</span></h3>
						<div class="resource-result-actions">
							<a href="'+url+'/my-folder/download-single/permit'+nodeString+'"><p class="resource-result-download-cta">Download all</p></a>
							<a href="'+url+'/my-folder/add/premit/'+nodeString+'"><p class="resource-result-folder-cta">Add all to My Folder</p></a>
						</div>
					</div>

					//all other types
					<div class="resource-result-count">
						<h3>Results <span>('+count+')</span></h3>
					</div>
				*/
			}

		}
	}
	var buffer = {
		
		minHeight : 800,

		adjust:function(x){//x=which toggle
			var that=this;

			//console.log('toggle');
			//console.log(x);
			if(x=='close'){
				if($('.view-content').height() <= 0){
					//var sidebarTop=$('#edit-field-type-wrapper').offset().top;
  					//var sidebarHeight=$('#edit-field-type-wrapper').height();
  					var sidebarTop=$('.views-exposed-widgets').offset().top;
  					var sidebarHeight=$('.views-exposed-widgets').height();
  					var sidebarBottom=sidebarTop+sidebarHeight;

  					var splashTop= $('.t6-2-splash-wrap').offset().top;
  					var splashHeight= $('.t6-2-splash-wrap').height();
  					var splashBottom= splashTop + splashHeight;


  					if(sidebarBottom > that.minHeight+splashBottom){//if the side bar filters are expanded and are taller than the min height
  						var newHeight = $('.view-filters').outerHeight(true);//get the height of the sidebar to match the content to it.
  						
  						if($('.resource-required-docs-wrap').length>0){//if on the documents page of the resource locator
  							$('.resource-required-docs-wrap').css('height',newHeight);
  						}
  						if($('.resource-required-terms-wrap').length>0){//if on the terms page of the resource locator
  							$('.resource-required-terms-wrap').css('height',newHeight);
  						}

  					}else{
  						if($('.resource-required-docs-wrap').length>0){
  							$('.resource-required-docs-wrap').css('height',that.minHeight);
  						}
  						if($('.resource-required-terms-wrap').length>0){
  							$('.resource-required-terms-wrap').css('height',that.minHeight);
  						}
  						//}
  						
  					}
					
					
				}
			}
			if(x=='open'){
				//console.log($('.view-content').height());
				if($('.resource-required-docs-wrap').length>0){
					$('.resource-required-docs-wrap').css('height','auto');
				}
				if($('.resource-required-terms-wrap').length>0){
					$('.resource-required-terms-wrap').css('height','auto');
				}
			}
			
		}
	}
	
	var footer = {
		adjust:function(){
			
  			//console.log('footer adjust');

			var bottomPadding = 60;
			var contentTopPadding = 90;
			var minHeight = 800;
				
			var sidebarOuterHeight = $('.view-filters').outerHeight(true);
			
			var contentOuterHeight = 0;  					

			var whichpage = '';

			if($('.resource-required-docs-wrap').length>0){
				contentOuterHeight = $('.resource-required-docs-wrap').outerHeight(true);
				whichpage = 'doc';
			}
			if($('.resource-required-resources-wrap').length>0){
				contentOuterHeight = $('.resource-required-resources-wrap').outerHeight(true);
				whichpage = 'resource';
			}


			if(sidebarOuterHeight + 60 > minHeight){//if the sidebar is taller than the min height
				
				if(sidebarOuterHeight +60 > contentOuterHeight-contentTopPadding){//if taller than the current height of the content
					if(whichpage == 'doc'){
						//console.log('twit');
						$('.resource-required-docs-wrap').css('height',sidebarOuterHeight);
					}
					if(whichpage == 'resource'){
						//console.log('foo');
						$('.resource-required-resources-wrap').css('height',sidebarOuterHeight);
					}
					
				}
				if(sidebarOuterHeight + 60 < contentOuterHeight-contentTopPadding){//if shorter than the current height of the content
					if(whichpage == 'doc'){
						
						if(requiredItems.docsOn==false){//the required section is toggled off
							//console.log('knock');
							$('.resource-required-docs-wrap').css('height',sidebarOuterHeight);
						}else{//the required section is toggled on
							//console.log('shwoop');
							$('.resource-required-docs-wrap').css('height','auto');
						}
					
					}
					if(whichpage == 'resource'){
						
						if(requiredItems.resourceOn==false){//the required section is toggled off
							//console.log('eww');
							$('.resource-required-resources-wrap').css('height',sidebarOuterHeight);
						}else{//the required section is toggled on
							//console.log('wooooop');
							$('.resource-required-resources-wrap').css('height','auto');
						}
						
					}
				}
			}

			if(sidebarOuterHeight + 60 < minHeight){//if the sidebar is shorter than the min height
				if(whichpage == 'doc'){
					if(requiredItems.docsOn==false){//if the featured section is toggled closed
						//console.log('yaa');
						$('.resource-required-docs-wrap').css('height',minHeight);
					}else{
						//console.log('here');
						$('.resource-required-docs-wrap').css('height','auto');
					}
				}
				if(whichpage == 'resource'){
					//console.log('blarg');
					if(requiredItems.resourcesOn==false){
						console.log('doooo');
						$('.resource-required-resources-wrap').css('height',minHeight);
					}else{
						//console.log('swap');
						$('.resource-required-resources-wrap').css('height','auto');
					}	
				}
				
			}  				

		}
	}
	var arrow = {
		arrow : function(){
			if($('.t6-2-locator').length>0){
				
				$('.pane-menu-menu-resource-locator-menu').prepend('<div id="resource-locator-triangle"><p>triangle</p></div>');
			}
			
		},
	}
	var input = {
		addPlaceholder:function(){
			$('#edit-search-api-views-fulltext').attr('placeholder','Search');
		},
	}

	var loader = {//add the loader gif when clicking and auto submitting the filters
		append : function(){
			var itemInputs = $('.view-filters').find('.form-item').find('input');
			//var itemLabels = $('.form-item').find('label');

			$.each(itemInputs,function(i){
				$(itemInputs[i]).click(function(){
					//var pathname = window.location.pathname;
					//if( !pathname.indexOf("admin") >= 0 ){
						if(!$(itemInputs[i]).is($('#edit-search-api-views-fulltext'))){//dont do this on the search field
							
							$(this).parent().prepend('<div id="ajax-loading-other" class="ajax-loader"><span>x</span></div>');
						}
					//}
				})
			});

			

		},
		termAppend : function(){
			$('#edit-field-term-alphabet-wrapper').prepend('<div id="ajax-loading-term" class="ajax-loader"><span>x</span></div>');
		}
	}
	var searchClear = {//when a user selects a filer, clear out the search field, if it is filled, it will also be applied to the filter
		clearIt : function(){
			var itemInputs = $('.form-item').find('input');
			$.each(itemInputs,function(i){
				$(itemInputs[i]).click(function(){
					if(!$(itemInputs[i]).is($('#edit-search-api-views-fulltext'))){//dont do this on the search field
						
						$('#edit-search-api-views-fulltext').val('');
					}
					
				})
			});
		}
	}

	var mobileSetup = {
		button:function(){
			if($('.page-resource-locator-documents').length>0){
				$('.pane-menu-menu-resource-locator-menu').append('<div class="resource-mobile-button"><p>Search or filter documents</p></div>');
				//$('.t6-2-locator').find('.panels-flexible-region-inside-first').prepend('<div class="resource-mobile-button"><p>Search or filter documents</p></div>');
			}	
			if($('.page-resource-locator-online-resources').length>0){
				$('.pane-menu-menu-resource-locator-menu').append('<div class="resource-mobile-button"><p>Search or filter online resources</p></div>');
				//$('.t6-2-locator').find('.panels-flexible-region-inside-first').prepend('<div class="resource-mobile-button"><p>Search or filter online resources</p></div>');
			}
			if($('.page-resource-locator-terms').length>0){
				$('.pane-menu-menu-resource-locator-menu').append('<div class="resource-mobile-button"><p>Search or filter terms</p></div>');
				//$('.t6-2-locator').find('.panels-flexible-region-inside-first').prepend('<div class="resource-mobile-button"><p>Search or filter terms & definitions</p></div>');
			}
			if($('.page-resource-locator-departments').length>0){
				$('.pane-menu-menu-resource-locator-menu').append('<div class="resource-mobile-button"><p>Search or filter departments</p></div>');
				//$('.t6-2-locator').find('.panels-flexible-region-inside-first').prepend('<div class="resource-mobile-button"><p>Search or filter departments</p></div>');
			}
		},
		closeButton:function(){
			$('.view-filters').prepend('<div id="resource-mobile-close"><p><span>x</span></p></div>');
			//console.log('doing ti');
		},
		clickButton:function(){
			$('.resource-mobile-button').on('click',function(){
				//console.log('mobile button');
				if($('.view-filters').hasClass('filters-vis')){
					$('.view-filters').removeClass('filters-vis');
				}else{
					$('.view-filters').addClass('filters-vis');
				}
			});	
		},
		clickCloseButton:function(){
			$('#resource-mobile-close').on('click',function(){
				if($('.view-filters').hasClass('filters-vis')){
					$('.view-filters').removeClass('filters-vis');
				}else{
					$('.view-filters').addClass('filters-vis');
				}
			});
		},
		menu:function(){
			$('.pane-menu-menu-resource-locator-menu').find('.pane-title').click(function(){
				if($('.view-filters').css('position')=='fixed'){
					$('.pane-menu-menu-resource-locator-menu').find('.menu').slideToggle();
				}
				if( !$('.view-filters').length>0 && $('.t6-2-splash-wrap').find('.field-name-field-img').css('display')=='none' ){//on the main resources parent page
					$('.pane-menu-menu-resource-locator-menu').find('.menu').slideToggle();
				}

			});
		}	
	}

	var resoureOnMobile = false;

	var resetOnScale = {
		init:function(){
			if( $('.view-filters').css('position')!='fixed' ){
				resourceOnMobile=false;
			}else{
				resourceOnMobile=true;
			}
		},
		watchIt:function(){//watch window resize to tell when switching from mobile to full size
			var that=this;
			$(window).resize(function(){
				if(resourceOnMobile==false){					
					if($('.view-filters').css('position')=='fixed'){//went to mobile size from full size
						//console.log('full to mob');
						resourceOnMobile=true;
						that.fullToMobile();
					}
				}
				if(resourceOnMobile==true){
					if( $('.view-filters').css('position')!='fixed' ){//went to full size from mobile size
						//console.log('mob to full');
						resourceOnMobile=false;
						that.mobileToFull();
					}
				}
			});
		},
		fullToMobile:function(){
			$('.pane-menu-menu-resource-locator-menu').find('.menu').css('display','none');
		},
		mobileToFull:function(){
			$('.pane-menu-menu-resource-locator-menu').find('.menu').css('display','block');
		},
	}

	var ajaxProgress = {//monitor when ajax calls start and finish
		start : function(){
			$( document ).ajaxStart(function() {
 				 var pathname = window.location.pathname;
				if( pathname.indexOf("admin") >= 0){
 					
 				}else{
 					console.log('ajax started');
 				}
			});
		},
		end : function(){
			$( document ).ajaxStop(function() {
 				var pathname = window.location.pathname;
 				console.log('pathname: '+pathname);
				if( pathname.indexOf("admin") >= 0){
	 				//searchClear.clearIt();
 				}else{
 					//if(documentsFilter.filterClicked==true){
          if (!documentsFilter.isReady()) {
            console.log('ajax finished');
            //footer.adjust();
            documentsFilter.treeInit();
            documentsFilter.submitInit();
            results.count();
            termFilter.init();
            deptFilter.init();
            loader.append();
            mobileSetup.closeButton();
            mobileSetup.clickCloseButton();

            documentsFilter.filterClicked = false;
            console.log('filter status:' + documentsFilter.filterClicked);
          }
	 				//}else{
	 				//	console.log('not reset');
	 				//}
	 				
 				}
			});
		},

	}

})(jQuery);