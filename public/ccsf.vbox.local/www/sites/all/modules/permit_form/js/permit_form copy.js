(function($){
		
	var selected = false,
		all = false,
		selected = false;

	$(document).ready(function(){
		if($('.t6-locator-wrap').length && $('#name-and-slogan').length){//if on the permit locator page
			//console.log('permit script');
			formSetup.init();
			select.swap();
			select.storeValue();
			addition.allItems();
			addition.selectItems();
			download.allClick();
			download.selectedClick();
			tree.init();
			tree.collapse();
			tree.objectify();
			filterAppend.dirs();
			filterAppend.arrow();
			ajaxProgress.start();
			ajaxProgress.end();
			//results.init();
			//results.init();
			results.sidebarAdjust();
			//results.resultsAdjust();
			requiredSection.toggle();
			guide.init();

		};
		
	})	

	var filters = [//these id's are based on the id's created in the views admin page for each exposed filter
		'#edit-industry-filter-wrapper',
		'#edit-department-filter-wrapper',
	];

	var formSetup  = {
		//check if we are on the correct page to prevent code running on the wrong pages	
		check : function(url){
			var pathname = window.location.pathname;
			if(pathname.indexOf(url)!==-1){
				return true;
			}
		},
		init : function(){
			$.each(filters,function(i){
				var parent = $(filters[i]).find('.bef-tree-child').find('li');
				var children = parent.find('ul');
			});
		}

	}
	var filterAppend = {
		dirs : function(){
			$('#edit-search-api-views-fulltext-wrapper').append('<div id="filter-dirs"></p>Filter by Category<p></div>');
		},
		arrow : function(){
			$('#permit-locator-guide').parent().append('<div id="locator-triangle"><p>triangle</p></div>')
		},
	}
	var select = {
		
		clickObject : '.permit-locator-select-all',
		
		containerObject : '#views-form-permit-locator-default',

		inputCheckbox : '.form-checkbox',
		//this is the div wrapping the input text field
		//this is a place holder field to store the values of selected items
		//for use when executing download functions in permit_form.module
		selectedPlaceholder : '#selected-permits', 

		swap : function(){//select all toggle
			var that = this;
			$(that.clickObject).click(function(event){
				event.preventDefault();
				var checkboxes = $(that.containerObject).find('input');
				if(selected==false){//select all
					selected=true;
					for(i=0;i<checkboxes.length;i++){
						if($(checkboxes[i]).attr('type')=='checkbox'){//if its a checkbox
								$(checkboxes[i]).attr('checked',true);//set it to checked
								that.addSelection($(checkboxes[i]));//add to placeholder field
						}
					}
				}else if(selected==true){//deselect all
					selected=false;
					for(i=0;i<checkboxes.length;i++){
						if($(checkboxes[i]).attr('type')=='checkbox'){//if its a checkbox
								$(checkboxes[i]).attr('checked',false);//set it to not checked
								that.removeSelection($(checkboxes[i]));
						}
					}
				}
				
			});
		},
		storeValue : function(){//add item to hidden field when an entry is checked.
			var that = this;
			//console.log($(that.inputCheckbox));
			$(that.inputCheckbox).each(function(i){
				$(this).click(function(){
					if($(this).attr('checked')){//if not checked
						that.addSelection($(this));
					}
					if(!($(this).attr('checked'))){//if checked
						that.removeSelection($(this));
					}
					
				});

			});
		},
		addSelection : function(checked){
			var that = this,
				newSelection = checked.val(),
				prevSelection = $(that.selectedPlaceholder).find('input').val(),
				comboSelection = prevSelection + newSelection + ',';

			$(that.selectedPlaceholder).find('input').val(comboSelection);
			console.log('selected: '+ $(that.selectedPlaceholder).find('input').val());
		},
		removeSelection : function(checked){
			var that = this,
				newSelection = checked.val(),
				prevSelection = $(that.selectedPlaceholder).find('input').val();
					
			var removeSelection = prevSelection.replace(newSelection+',','');
			$(that.selectedPlaceholder).find('input').val(removeSelection);
		},
		
	}

	var addition = {

		allClickObject : '.permit-locator-add-all',

		selectedClickObject : '.permit-locator-add-selected',

		inputParent : '#views-form-permit-locator-default',

		inputClass : 'vbo-select form-checkbox',

		allItems : function(){
			var that = this,
				list = [];

			$(that.allClickObject).click(function(event){
				event.preventDefault();
				var inputs = $(that.inputParent).find('input');
				$.each(inputs,function(i){
					//get all checkboxes
					if($(inputs[i]).attr('class') == that.inputClass){
						list.push($(this).val());
					}
				});
				var stringify = list.toString();//needs to be a string to work with drupal menu hook
				console.log(stringify);
				that.ajaxCall(stringify);
			});
		},

		selectItems : function(){
			var that = this,
				list = [];

			$(that.selectedClickObject).click(function(event){
				event.preventDefault();
				var inputs = $(that.inputParent).find('input');
				$.each(inputs,function(i){
					//get just the checked ones
					if( ($(inputs[i]).attr('class') == that.inputClass) && ($(inputs[i]).attr('checked')==true)){
						list.push($(this).val());
					}
				});
				if(list.length==0){
					console.log(list.length);
					alert('Nothing Selected');
				}else{
					var stringify = list.toString();//needs to be a string to work with drupal menu hook
					that.ajaxCall(stringify);
				}
				
			});
		},

		ajaxCall : function(items){//adding items to cart
			var downloadURL = 'admin/structure/starter_kit/add/'+items;
			console.log(downloadURL);
			$.ajax({
				url: downloadURL,//menu URL set up in starter_kit.module
				type:'post',
				dataType:'text',
				success:function(data){
					alert('Folder Updated');
				}
			});
		},
	}

	var download = {
		
		allButton : '#edit-download-all',

		selectedButton : '#edit-download-selected',

		submitForm : '#permit-form-block-form',

		itemsForm : '#views-form-permit-locator-default',

		inputCheckbox : '.form-checkbox',

		//selectedPlaceholder : ''

		allClick : function(){
			var that=this;
			$(that.allButton).click(function(event){
				if(all==false){
					event.preventDefault();
					selected = false;
					$(select.clickObject).trigger('click');//select all and populate them to the placeholder field
					all=true;//set all to true so .preventDefault(); doesnt block submit
					$(that.allButton).trigger('click');//submit
					all=false;//reset
					$(select.clickObject).trigger('click');//deselect all so the placeholder  and the checkboxes are emptied
				}				
			});
		},

		selectedClick : function(){
			var that = this;
			$(that.selectedButton).click(function(event){
				var placeholderValues = $(select.selectedPlaceholder).find('input').val();
				if(selected == false){//prevent form submit
					event.preventDefault();
					if( placeholderValues == ''){//if nothing is selected
						alert('nothing selected');
					}else if(!(placeholderValues == '')){//if something is selected
						selected = true;//set selected to true so .preventDefault(); doesnt block submit
						$(that.selectedButton).trigger('click');//submit
						selected = false;//reset
					}
				}				
			});
		},
	}

  	tree ={//setting up the tree is very dependant on the mark up output by views and better exposed fileters, if the settings should change this will break.
  		init:function(){
  			var that=this;
  			var treeItems = $('.form-item').find('label');

  			
  			$.each(treeItems,function(i){//set up the items in the business type tree
  				var firstLetter = $(treeItems[i]).html().substring(0,1);
  				if(firstLetter != '-'){// if the label contains '-' it is a child label
  					
  					$(treeItems[i]).parent().data('parent',i);
  					$(treeItems[i]).parent().addClass('tree-parent');


  					for(k=i+1;k<treeItems.length;k++){//each child under the current parent in the loop
  						var nextOne = $(treeItems[k]).html().substring(0,1);
  						if(nextOne == '-'){
  							$(treeItems[k]).parent().data('parent',i);
  							$(treeItems[k]).parent().css({'display':'none'});
  							
  							

  							/*$(treeItems[k]).on('click',function(){//click on the label
  								console.log('clicke');
  								$(treeItems[k]).parent().addClass('highlight');
  								$('#edit-submit-locator').mousedown(function(){
  									console.log('mousedown');
  								});
  								//Drupal.ajax[base].eventResponse($('#edit-submit-locator'), 'click');
  							});*/

  							$(treeItems[k]).prev().on('click',function(){//click on the checkbox, this is also trigged when clicking the label
  								console.log('clicke');
  								//$(treeItems[k]).parent().addClass('highlight');
  								$('#edit-submit-locator').click();
  								//Drupal.ajax[base].eventResponse($('#edit-submit-locator'), 'click');
  							});
  						}
  						if(nextOne != '-'){
  							break;
  						} 	
  					}  					 
  				}
  			});

			///////////set up the items in the issuing department tree

			var deptInputs = $('.form-item-field-issuing-department').find('.form-item').find('input');
			var deptLabels = $('.form-item-field-issuing-department').find('.form-item').find('label');

			$.each(deptInputs,function(i){
				$(deptInputs[i]).click(function(){
					console.log('clicke it');
					$('#edit-submit-locator').click();
				});
			});

			$.each(deptLabels,function(i){
				$(deptLabels[i]).click(function(){
					console.log('clicke it');
					$('#edit-submit-locator').click();
				});
			});
			///////////set up the items in the agency tree

			var agencyInputs = $('.form-item-field-government-level').find('.form-item').find('input');
			var agencyLabels = $('.form-item-field-government-level').find('.form-item').find('label');

			$.each(agencyInputs,function(i){
				$(agencyInputs[i]).click(function(){
					console.log('clicke it');
					$('#edit-submit-locator').click();
				});
			});

			$.each(agencyLabels,function(i){
				$(agencyLabels[i]).click(function(){
					console.log('clicke it');
					$('#edit-submit-locator').click();
				});
			});
  		},

  		formArray : [],
  		
  		industryOpen : false,
  		deptOpen : false,
  		agencyOpen:false,

  		collapse : function(){
  			var that = this;
  		///////////industryOpen
  			if(that.industryOpen == false){
  				$('.form-item-field-industry-tag').find('.bef-checkboxes').css('display','none');
  			}

  			$('#edit-field-industry-tag-wrapper').children().first().click(function(){
  				if(that.industryOpen == false){
  					$('.form-item-field-industry-tag').find('.bef-checkboxes').css('display','block');
  					$('#edit-field-industry-tag-wrapper').children().first().addClass('faq-rotate');
  					that.industryOpen=true;
  					results.sidebarAdjust();
  				}else{	
  					$('.form-item-field-industry-tag').find('.bef-checkboxes').css('display','none');
  					$('#edit-field-industry-tag-wrapper').children().first().removeClass('faq-rotate');
  					that.industryOpen=false;
  					results.sidebarAdjust();
  				}
  			});
  		////////////deptOpen
  			if(that.deptOpen == false){
  				$('.form-item-field-issuing-department').find('.bef-checkboxes').css('display','none');
  			}

  			$('#edit-field-issuing-department-wrapper').children().first().click(function(){
  				if(that.deptOpen == false){
  					$('.form-item-field-issuing-department').find('.bef-checkboxes').css('display','block');
  					$('#edit-field-issuing-department-wrapper').children().first().addClass('faq-rotate');
  					that.deptOpen=true;
  					results.sidebarAdjust();
  				}else{
  					$('.form-item-field-issuing-department').find('.bef-checkboxes').css('display','none');
  					$('#edit-field-issuing-department-wrapper').children().first().removeClass('faq-rotate');
  					that.deptOpen=false;
  					results.sidebarAdjust();
  				}
  			});
  		////////// agengyOpen
  			if(that.agencyOpen == false){
  				$('.form-item-field-government-level').find('.bef-checkboxes').css('display','none');
  			}

  			$('#edit-field-government-level-wrapper').children().first().click(function(){
  				if(that.agencyOpen == false){
  					$('.form-item-field-government-level').find('.bef-checkboxes').css('display','block');
  					$('#edit-field-government-level-wrapper').children().first().addClass('faq-rotate');
  					that.agencyOpen=true;
  					results.sidebarAdjust();
  				}else{
  					$('.form-item-field-government-level').find('.bef-checkboxes').css('display','none');
  					$('#edit-field-government-level-wrapper').children().first().removeClass('faq-rotate');
  					that.agencyOpen=false;
  					results.sidebarAdjust();
  				}
  			});
  		},
  		objectify : function(){//only applied to the parent elements in the tree
  			var that = this;
  			var treeItems = $('#edit-field-industry-tag-wrapper').find('.form-item').find('label');
  			

  			$.each(treeItems,function(i){
  				var firstLetter = $(treeItems[i]).html().substring(0,1);
  				if(firstLetter != '-'){// if the label doesnt contain '-'

  				that.formArray[i] = new ShowTree();//give each parent an object for toggleing its children
  					
					$( treeItems[i] ).parent().on('click',function(event){//bind the parent to its object's method 'show'
						event.preventDefault();
						that.formArray[i].show(this);
					});
  				}
  				if(firstLetter == '-'){//remove dash at beginning of string if it has it
  					
					var shortenedHTML = $(treeItems[i]).html().substr(1);
					//console.log(shortenedHTML);
					$(treeItems[i]).html(shortenedHTML);
  				}
  			});  			
  		},
  		
  		hide : function(){
  			var treeItems = $('.form-item').find('label');
  			
  			$.each(treeItems,function(i){
  				var firstLetter = $(treeItems[i]).html().substring(0,1);
  				if(firstLetter != '-'){// if the label contains '-' it is a child label
  					
  					for(k=i+1;k<treeItems.length;k++){
  						var nextOne = $(treeItems[k]).html().substring(0,1);
  						if(nextOne == '-'){
  							$(treeItems[k]).parent().data('parent',i);
  							$(treeItems[k]).parent().css({'display':'none'});
  						}
  						if(nextOne != '-'){//when you reach the next parent item, break
  							break;
  						} 	
  					}  					 
  				}
  			});
  		},

  		openArray : [],

  		openItems : function(){//used to re-open the already open parents after an ajax call completes
  			var that=this;
  			var treeItems = $('.form-item');
  			$.each(that.openArray,function(i){
  				$.each(treeItems, function(k){
  					if( $(treeItems[k]).data('parent') == that.openArray[i] ){
  						$(treeItems[k]).trigger('click');
  						/*$.each(treeItems,function(l){
	  						if($(treeItems[l]).data('parent') == that.openArray[i]){
	  							$(treeItems[l]).css({'display':'block'});
	  						}
	  					});*/
  					}
  				})
  			});
  		},
  	}

  	var ShowTree = function(){
  		this.open = false;
  	}

  	ShowTree.prototype.show = function(parentItem){
  			var parentData = $(parentItem).data('parent');

  			var treeItems = $('.form-item');
  			

  			if(this.open==false){//if closed toggle open
  				//only add this class in the industry tag form
  				if($(parentItem).parent().parent().parent().hasClass('form-item-field-industry-tag') ){
  					$(parentItem).find('label').addClass('faq-rotate');
  				}
  				
  				this.open=true;
  				
  				if( tree.openArray.indexOf(parentData) == -1 ){//if it the parentData hasnt been stored yet denoting it is open
  					tree.openArray.push(parentData);//used to reopen the already opened parents after ajax call has completed
  					console.log(tree.openArray);
  				}
  				//console.log(tree.openArray.indexOf(parentData));
  				
  				$.each(treeItems,function(i){
	  				if($(treeItems[i]).data('parent') == parentData){
	  					$(treeItems[i]).css({'display':'block'});
	  					console.log('here');
	  					results.sidebarAdjust();
	  				}
	  			});
	  			return;
  			}
  			if(this.open==true){//if open toggle closed
  				
  				//only do this in the industry tag form 
  				if($(parentItem).parent().parent().parent().hasClass('form-item-field-industry-tag') ){
  					$(parentItem).find('label').removeClass('faq-rotate');
  				}
  				this.open=false;
  				$.each(treeItems,function(i){
	  				if(  $(treeItems[i]).attr('class').indexOf('tree-parent') >= 0 ){
	  					//do nothing
	  				}
	  				else if ($(treeItems[i]).data('parent') == parentData){
	  						$(treeItems[i]).css({'display':'none'});
	  						results.sidebarAdjust();
	  						//$.each(tree.OpenArray,function(i){
	  							
	  						//});
	  				}	
	  			});
	  			$.each(tree.openArray, function(i){
	  				if(tree.openArray[i] == parentData){
	  					tree.openArray.splice(i, 1);
	  				}
	  			});

	  			
				console.log(tree.openArray);
	  			return;
  			}
  	}
 
	/* Ajax Progress */
	var ajaxProgress = {//monitor when ajax calls start and finish
		start : function(){
			$( document ).ajaxStart(function() {
 				 console.log('ajax started');
 				 tree.formArray.length=0;//clear the array holding the toggle objects so we dont have a memory problem
			});
		},
		end : function(){
			$( document ).ajaxStop(function() {
 				 console.log('ajax finished');
 				 count.resultsCount();
 				 tree.init();
 				 tree.objectify();
 				 tree.openItems();
 				 tree.collapse();
 				 filterAppend.dirs();
 				 results.sidebarAdjust();
 				 results.resultsAdjust();
			});
		}
	}

	var results = {
		/*nit : function(){//need to add the adjust function to click on one of the child items in the business type filter tree
			var that=this;
			var childLabels = $('.form-item-field-industry-tag').find('.bef-checkboxes').find('.form-item').find('label');

			$.each(childLabels,function(i){
				$(childLabels[i]).click(function(){
					//console.log('child');
					that.sidebarAdjust();
				});
			});
		},*/
		sidebarAdjust : function(){
			//var that = this;

			//var that=this;
			var sidebarOffset = $('#edit-field-government-level-wrapper').offset().top;
			var sidebarHeight = $('#edit-field-government-level-wrapper').height();
			var sidebarBottom = sidebarOffset + sidebarHeight;

			var footerTop = $('#footer').offset().top;

			$('.node-required-permits').css('padding-bottom','0');
			var contentOffset = $('.node-required-permits').offset().top;
			var contentHeight = $('.node-required-permits').height();
			var contentBottom = contentOffset + contentHeight;	

			//console.log('sideBar bottom:'+sidebarBottom);
			//console.log('content bottom: '+contentBottom);
			//console.log('footer top:'+footerTop);

			if(sidebarBottom > footerTop){
				//console.log('need to move');
				var diff = sidebarBottom - contentBottom + 40;
				if(diff > 0){
					$('.node-required-permits').css('padding-bottom',diff);
				}
				
				//console.log('difference:'+diff);
			}
			if(sidebarBottom < footerTop){
				
				var diff = sidebarBottom - contentBottom + 40;
				if(diff > 0){
					$('.node-required-permits').css('padding-bottom',diff);
				}
				
				//console.log('difference:'+diff);
			}

		},
		resultsAdjust : function(){
			//the search results
			var contentTop = $('.view-content').offset().top;
			var contentHeight = $('.view-content').height();
			var contentBottom = contentTop + contentHeight;

			//the required permits section
			var requiredTop = $('.node-required-permits').offset().top;
			var requiredHeight = $('.node-required-permits').height();
			var requiredBottom = requiredTop + requiredHeight;
			var requiredPadding

			var sidebarOffset = $('#edit-field-government-level-wrapper').offset().top;
			var sidebarHeight = $('#edit-field-government-level-wrapper').height();
			var sidebarBottom = sidebarOffset + sidebarHeight;
			
			
			//adjust the top margin of the required items section when search results load
			if(contentHeight > 0){//if there are seach results include 90px for the results top margin
				$('.node-required-permits').css('margin-top',contentHeight+90);
			}
			if(contentHeight <= 0){//if there are no results reset the top margin to 0
				$('.node-required-permits').css('margin-top',0);
			}
			

			if(contentBottom < sidebarBottom){				
				//console.log('too short');
				var diff = sidebarBottom - contentBottom + 40;
				$('.node-required-permits').css('padding-bottom',diff);
			}
		},
	}
	var requiredSection = {
		
		requiredOn : true,

		toggle : function(){
			var that=this;
			$('.required-items-heading').find('h2').click(function(){
				//console.log('click');
				if(that.requiredOn == false){//turn it back on, OPEN

					$('.required-items-heading').find('h2').addClass('arrow-rotate');

					$('.required-items-nodes').slideToggle(600,function(){
						//$('.required-items-nodes-inner').fadeToggle(500,function(){
							//$('.node-required-permits').css('padding-bottom','0');		

							var contentOffset = $('.node-required-permits').offset().top;
							var contentHeight = $('.node-required-permits').height();
							var contentBottom = contentOffset + contentHeight;	

							var sidebarOffset = $('#edit-field-government-level-wrapper').offset().top;
							var sidebarHeight = $('#edit-field-government-level-wrapper').height();
							var sidebarBottom = sidebarOffset + sidebarHeight;

							//console.log('content:'+contentBottom);
							//console.log('sidebar:'+sidebarBottom);

							if(contentBottom > sidebarBottom){
							
								//console.log('too short');
								//var diff = sidebarBottom - contentBottom + 40;
								$('.node-required-permits').css('padding-bottom','0');
							}
							$('.node-required-permits').css('padding-bottom','0');
						//});
					});
					that.requiredOn=true;
					return;
				
				}

				if(that.requiredOn == true){//turn it off, CLOSE

					$('.required-items-heading').find('h2').removeClass('arrow-rotate');
					
					//$('.required-items-nodes-inner').fadeToggle(500,function(){
						$('.required-items-nodes').slideToggle(600,function(){							

							$('.node-required-permits').css('padding-bottom','0');
							var contentOffset = $('.node-required-permits').offset().top;
							var contentHeight = $('.node-required-permits').height();
							var contentBottom = contentOffset + contentHeight;	

							var sidebarOffset = $('#edit-field-government-level-wrapper').offset().top;
							var sidebarHeight = $('#edit-field-government-level-wrapper').height();
							var sidebarBottom = sidebarOffset + sidebarHeight;

							//console.log('content:'+contentBottom);
							//console.log('sidebar:'+sidebarBottom);

							if(contentBottom < sidebarBottom){
							
								console.log('too short');
								var diff = sidebarBottom - contentBottom + 40;
								$('.node-required-permits').css('padding-bottom',diff);
							}

						});
					//});
					that.requiredOn=false;
					return;
				}
			});
		},
	}
	var guide = {
		guideOn : true,
		init : function(){
			//console.log('here');
			var that=this;

			var innerheight = $('#permit-locator-guide').parent().height();
			//console.log(innerheight);
			$('#permit-locator-guide').css('height',innerheight);

			if(that.guideOn == false){
				$('#permit-locator-guide').css('display','none');
			}

			//set up click events
			$('#edit-search-api-views-fulltext').click(function(){
				that.hide();
			});
			$('#edit-field-industry-tag-wrapper').children().first().click(function(){
				that.hide();
				//console.log('label click');
			});
			$('#edit-field-issuing-department-wrapper').children().first().click(function(){
				that.hide();
			});
			$('#edit-field-government-level-wrapper').children().first().click(function(){
				that.hide();
			});
			$('.permit-locator-guide-title-close-cta').click(function(){
				that.hide();
			});

		},
		hide : function(){
			var that=this;

			if(that.guideOn == true){
				$('#permit-locator-guide-inner').fadeOut('slow',function(){
				//setTimeout(function() {
					$('#permit-locator-guide').slideToggle('slow');
					$('.required-items').css('padding-top','90px');
				//}, 200);
				});	
				that.guideOn = false;
			}
			
		}
	}
	var count = {
		resultsCount : function(){
			var items = $('.view-locator').find('.view-content').find('.views-row');
			var count = items.length;
			var pathname = window.location.pathname;
			var url = pathname.replace('permit-locator','');

			var nodes = [];
			

			$.each(items, function(i){
				var nodeClass = $(items[i]).find('article').attr('class').split(' ')[0];
				var nid = parseInt(nodeClass.replace('node-',''));
				nodes[i]=nid;
				console.log('nid:'+nid);
			});

			var nodeString = nodes.join(',');

			console.log(nodeString);
			console.log('URL:'+pathname);
			$('.view-locator').find('.view-content').prepend('<div class="view-loacator-result-count"><h3>Results <span>('+count+')</span></h3><div class="view-locator-result-actions"><a href="'+url+'my-folder/download-single/permit/'+nodeString+'"><p class="view-locator-result-download-cta">Download all</p></a><a href="'+url+'my-folder/add/premit/'+nodeString+'"><p class="required-items-add-cta">Add all to My Folder</p></a></div></div>');
			/*
			$('.view-locator').find('.view-content').prepend('
				<div class="view-loacator-result-count">
					<h3>Results <span>('+count+')</span></h3>
					<div class="view-locator-result-actions">
						<a href="'+url+'my-folder/download-single/permit'+nodeString+'"><p class="view-locator-result-download-cta">Download all</p></a>
						<a href="'+url+'my-folder/add/premit/'+nodeString+'"><p class="view-locator-result-folder-cta">Add all to My Folder</p></a>
					</div>
				</div>'
			);*/
			
		},	
	}

})(jQuery);



