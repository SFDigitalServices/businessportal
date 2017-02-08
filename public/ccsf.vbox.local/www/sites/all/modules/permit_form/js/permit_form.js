(function($){
	var all = false;

	$(document).ready(function(){
		var pathname = window.location.pathname;
		if( !pathname.indexOf("admin") >= 0){
			if($('.t6-locator-wrap').length && $('#name-and-slogan').length){//if on the permit locator page
				formSetup.init();
				formSetup.searchButton();
				formSetup.searchScale();
				input.addPlaceholder();
				turnOff.run();
				tree.init();
				tree.collapse();
				tree.objectify();
				filterAppend.dirs();
				filterAppend.arrow();
				ajaxProgress.start();
				ajaxProgress.end();
				results.sidebarAdjust();
				requiredSection.toggle();
				guide.init();
				loader.append();
				
				mobileSetup.button();
				mobileSetup.closeButton();
				mobileSetup.clickButton();
				mobileSetup.clickCloseButton();

				resetOnScale.init();
				resetOnScale.watchIt();
			}
		}
		
	})	
	var onMobile = false;

	var resetOnScale = {//reset everything if moving from mobile to full screen dimensions
		init:function(){
			if( $('.view-filters').css('position')!='fixed' ){
				onMobile=false;
			}else{
				onMobile=true;
			}
		},
		watchIt:function(){//watch window resize to tell when switching from mobile to full size
			var that=this;
			$(window).resize(function(){
				if(onMobile==false){
					if($('.view-locator').find('.view-content').length>0){//if retruned filtered content is on screen
						results.resultsAdjust();//adjust the height if needed, this is because the font sizes change on different screen sizes
					}
					
					if($('.view-filters').css('position')=='fixed'){//went to mobile size from full size
						onMobile=true;
						that.fullToMobile();
					}
				}
				if(onMobile==true){
					if( $('.view-filters').css('position')!='fixed' ){//went to full size from mobile size
						onMobile=false;
						that.mobileToFull();
					}
				}
			});
		},
		fullToMobile:function(){
			$('.node-required-permits').css({
				'padding-top':'0',
				'margin-top':'0',
			});
			$('.required-items').css({'padding-top':'0'});
		},
		mobileToFull:function(){
			$('#permit-locator-guide').css('display','none');//hide the guide, otherwise it creates visual issues
			//
			if($('.view-locator').find('.view-content').length>0){//if there is content loaded by the filters on screen
				$('.node-required-permits').css({
					'padding-top':'0',
					'margin-top':'0',
				});//reset padding 
				results.resultsAdjust();//adjust the height of the required items section to be beneath the filtered content
			}else{//if there is no content loaded by the filters on screen
				$('.node-required-permits').css({
					'padding-top':'90px',
					'margin-top':'0',
				});//add padding to the required permits section
			}
		},
	}

	var input = {
		addPlaceholder:function(){
			$('#edit-search-api-views-fulltext').attr('placeholder','Search');
		},
	}
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
		},
		searchButton : function(){
			if( $('#permit-mobile-button').css('display')=='none'){
				var labelHeight = $('#edit-search-api-views-fulltext-wrapper').children().first().height();
				
				var searchMargin = $('#edit-search-api-views-fulltext').css('margin-top');
				searchMargin = parseInt( searchMargin.replace('px','') );
				
				var added = labelHeight+searchMargin;
				
				$('#edit-submit-locator').css("top",labelHeight+searchMargin+11);
				//console.log('search start');
			}
		},
		searchScale : function(){
			var that=this;
			
			$(window).resize(function(){
				if( $('#permit-mobile-button').css('display')=='none'){
					that.searchButton();
					//console.log('fix');
				}else{
					$('#edit-submit-locator').removeAttr('style');
					console.log('remove');
				}
			})
		},

	}
	var filterAppend = {
		dirs : function(){
			if(!$('#filter-dirs').length>0){
				$('#edit-search-api-views-fulltext-wrapper').append('<div id="filter-dirs"></p>Filter by Category<p></div>');
			}
			
		},
		arrow : function(){
			if(!$('#locator-triangle').length>0){
				$('#permit-locator-guide').parent().append('<div id="locator-triangle"><p>triangle</p></div>');
			}
			
		},
	}

	var turnOff = {//
		run:function(){
			setTimeout(function(){
				var treeInputs = $('.form-item').find('input');
				$.each(treeInputs,function(i){
				//$(treeItems[i]).css('background','red');
					if( $(treeInputs[i]).prop('checked',true) ){
						//console.log('uncheck');
						$(treeInputs[i]).prop('checked',false);
					}
				})
				var treeHighlights = $('.form-item');
				$.each(treeHighlights,function(j){
					if($(treeHighlights).hasClass('highlight')){
						$(treeHighlights).removeClass('highlight');
						//console.log('remove highlight');
					}
				});
			},500);
		}
		
	}

  var	tree ={//setting up the tree is very dependant on the mark up output by views and better exposed fileters, if the settings should change this will break.
    treeItems: function(){
      return $('.views-exposed-form').find('.form-item');
    },

    isReady: function(){
      return $('.views-exposed-form').hasClass('isReady');
    },

    init: function () {
      $('.views-exposed-form').addClass('isReady'); // doing this here is strange, but would require more restructure to place appropriately

      var treeItems = tree.treeItems().find('label');
      //uncheck all filter items incase the user is returning otherwise an error is thrown, views doesnt load previously selected filters when returning to the page.
      $.each(treeItems, function (i) {//set up the items in the business type tree
        var firstLetter = $(treeItems[i]).html().substring(0, 1);
        if (firstLetter != '-') {// if the label contains '-' it is a child label

          $(treeItems[i]).parent().data('parent', i);
          $(treeItems[i]).parent().addClass('tree-parent');


          for (var k = i + 1; k < treeItems.length; k++) {//each child under the current parent in the loop
            var nextOne = $(treeItems[k]).html().substring(0, 1);
            if (nextOne == '-') {
              $(treeItems[k]).parent().data('parent', i);
              $(treeItems[k]).parent().css({'display': 'none'});

              $(treeItems[k]).prev().on('click', function () {//click on the checkbox, this is also trigged when clicking the label
                $('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
                $('#edit-submit-locator').click();

              });
            }
            if (nextOne != '-') {
              break;
            }
          }
        }
      });

      ///////////set up the items in the issuing department tree

      var deptInputs = $('.form-item-field-issuing-department').find('.form-item').find('input');
      $.each(deptInputs, function (i) {
        $(deptInputs[i]).click(function (event) {
          //console.log('clicke it');
          $('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
          $('#edit-submit-locator').click();
        });
      });


      ///////////set up the items in the agency tree

      var agencyInputs = $('.form-item-field-government-level').find('.form-item').find('input');
      $.each(agencyInputs, function (i) {
        $(agencyInputs[i]).click(function () {
          console.log('clicke it');
          $('#edit-search-api-views-fulltext').val('');//remove the text in the search field if there is any there, otherwise this will be applied to the query as well
          $('#edit-submit-locator').click();
        });
      });

    },

    isOpen: {
      'industry-tag': true
    },

    collapse: function () {
      var that = this;
      function do_collapse(type) {
        var $befcb = $('.form-item-field-' + type).find('.bef-checkboxes');
        var $eftw = $('#edit-field-' + type + '-wrapper');
        if (that.isOpen[type]) {
          $befcb.css('display', 'block');
          $eftw.children().first().addClass('faq-rotate');
        } else {
          $befcb.css('display', 'none');
        }
        $eftw.children().first().click(function () {
          if (!that.isOpen[type]) {
            $befcb.css('display', 'block');
            $eftw.children().first().addClass('faq-rotate');
          } else {
            $befcb.css('display', 'none');
            $eftw.children().first().removeClass('faq-rotate');
          }
          that.isOpen[type] = !that.isOpen[type];
          results.sidebarAdjust();
        });
      }
      do_collapse('industry-tag');
      do_collapse('issuing-department');
      do_collapse('government-level');
    },

    objectify: function () {//only applied to the parent elements in the tree
      var treeItems = $('#edit-field-industry-tag-wrapper').find('.form-item').find('label');

      $.each(treeItems, function (i) {
        var firstLetter = $(treeItems[i]).html().substring(0, 1);
        if (firstLetter != '-') {// if the label doesnt contain '-'
          new ShowTree($(treeItems[i]).parent());//give each parent an object for toggleing its children
        }
        if (firstLetter == '-') {//remove dash at beginning of string if it has it
          var shortenedHTML = $(treeItems[i]).html().substr(1);
          $(treeItems[i]).html(shortenedHTML);
        }
      });
    },

    inspect: function () {
      var treeItems = tree.treeItems();
      $.each(treeItems, function (i) {
        var $p = $(treeItems[i]);
        var showTree = $p.data('showTree');
        if (showTree){
          console.log("-----------------", showTree)
        }
      });
    },

    hide: function () {
      var treeItems = tree.treeItems().find('label');

      $.each(treeItems, function (i) {
        var firstLetter = $(treeItems[i]).html().substring(0, 1);
        if (firstLetter != '-') {// if the label contains '-' it is a child label

          for (var k = i + 1; k < treeItems.length; k++) {
            var nextOne = $(treeItems[k]).html().substring(0, 1);
            if (nextOne == '-') {
              $(treeItems[k]).parent().data('parent', i);
              $(treeItems[k]).parent().css({'display': 'none'});
            }
            if (nextOne != '-') {//when you reach the next parent item, break
              break;
            }
          }
        }
      });
    },

    openArray: [],

    openItems: function () {//used to re-open the already open parents after an ajax call completes
      var that = this;
      var treeItems = tree.treeItems();
      $.each(that.openArray, function (i) {
        $.each(treeItems, function (k) {
          if ($(treeItems[k]).data('parent') == that.openArray[i]) { //TODO could change to indexOf and remove outer array
            var st = $(treeItems[k]).data('showTree');
            if (st)
              st.show();
          }
        })
      });
    },

    makeBold: function () {
      //console.log('makebold');
      var treeItems = tree.treeItems();
      $.each(treeItems, function (k) {
        if ($(treeItems[k]).find('input').attr('checked') == 'checked') {
          var parentLabel = $(treeItems[k]).data('parent');
          //console.log('parent:' + parentLabel);

          var items = $('#edit-field-industry-tag-wrapper').find('.form-item');
          $.each(items, function (j) {
            if (j == parentLabel) {
              //console.log($(items[parentLabel]).find('label').html());
              ///$(items[parentLabel + 1]).find('label').addClass('item-bold');
            }
          });
        }
      });
    }
  }

  var ShowTree = function (p) {
    this.open = false;
    this.$p = $(p);
    this.$p.data('showTree', this);
    this.$p.on('click', this.toggle.bind(this));
  }

  ShowTree.prototype.toggle = function (event) {
    event.preventDefault();
    this.show();
    // track open nodes in 'openArray' by parent id
    var parentId = this.$p.data('parent');
    var idx = tree.openArray.indexOf(parentId);
    if (this.open && idx == -1)
      tree.openArray.push(parentId)
    else if (!this.open && idx != -1)
      tree.openArray.splice(idx, 1);
  }

  ShowTree.prototype.show = function () {
    var parentData = this.$p.data('parent');

    var treeItems = tree.treeItems();
    var hasIndustryTag = this.$p.parent().parent().parent().hasClass('form-item-field-industry-tag');

    if (!this.open) {//if closed toggle open
      if (hasIndustryTag) {
        this.$p.find('label').addClass('faq-rotate');
      }
      this.open = true;
      $.each(treeItems, function (i) {
        if ($(treeItems[i]).data('parent') == parentData) {
          $(treeItems[i]).css({'display': 'block'});
          results.sidebarAdjust();
        }
      });
    } else {//if open toggle closed
      if (hasIndustryTag) {
        this.$p.find('label').removeClass('faq-rotate');
      }
      this.open = false;
      $.each(treeItems, function (i) {
        var has_tree_parent_class = $(treeItems[i]).attr('class').indexOf('tree-parent') >= 0;
        if (!has_tree_parent_class && $(treeItems[i]).data('parent') == parentData) {
          $(treeItems[i]).css({'display': 'none'});
          results.sidebarAdjust();
        }
      });
    }
  }

	var results = {
		
		sidebarAdjust : function(){//adjust the footer to the bottom of the expanded open filters
			
			if( $('.view-filters').css('position')!='fixed' ){//dont do it if in mobile layout
				//console.log('sidebar start');

				var sidebarOffset = $('#edit-field-issuing-department-wrapper').offset().top;
				var sidebarHeight = $('#edit-field-issuing-department-wrapper').height();
				var sidebarBottom = sidebarOffset + sidebarHeight;

				var footerTop = $('#footer').offset().top;

					
				var sideHeight = $('.view-filters').innerHeight();
				
				var permitHeight = $('#required-permit-wrapper').height();
				
				var diff = sideHeight-(permitHeight-200);
				
				$('.node-required-permits').css('padding-bottom','0');

				if(sidebarBottom > footerTop){
					//console.log('tall');
					//var diff = sidebarBottom - contentBottom + 40;
					if(diff > 0){
						$('.node-required-permits').css('padding-bottom',diff);
					}
				}
				if(sidebarBottom < footerTop){
					//console.log('short');
					//var diff = sidebarBottom - contentBottom + 40;
					if(diff > 0){
						$('.node-required-permits').css('padding-bottom',diff);
					}
				}
			}		

		},
		resultsAdjust : function(){//adjust the required items section height when results are returned
			
			if( $('.view-filters').css('position')!='fixed' ){//dont do it in mobile layout
				
				var contentTop = '';
				var contentHeight = '';
				var contentBottom = '';

				if($('.view-content').length>0){
					contentTop = $('.view-content').offset().top;
					contentHeight = $('.view-content').height();
					contentBottom = contentTop + contentHeight;
				}
				if($('.view-empty').length>0){
					contentTop = $('.view-empty').offset().top;
					contentHeight = $('.view-empty').height();
					contentBottom = contentTop + contentHeight;
					
				}

				var sidebarOffset = $('#edit-field-government-level-wrapper').offset().top;
				var sidebarHeight = $('#edit-field-government-level-wrapper').height();
				var sidebarBottom = sidebarOffset + sidebarHeight;
				
				
				//adjust the top margin of the required items section when search results load
				if(contentHeight > 0){//if there are seach results include 90px for the results top margin
					if($('.view-empty').length>0){
						console.log('here');
						$('.node-required-permits').css('margin-top',contentHeight);
					}else{
						$('.node-required-permits').css('margin-top',contentHeight+90);
					}
					//console.log('yes results');

					//setTimeout(function(){
						var requiredTop = $('.node-required-permits').offset().top;
						var requiredHeight = $('.node-required-permits').height();
						var requiredBottom = requiredTop + requiredHeight;

						if(requiredBottom < sidebarBottom){
							var diff = sidebarBottom-requiredBottom+40 -contentHeight ;
							//console.log('yes results,adjust to sidebar:'+diff);
							$('.node-required-permits').css('padding-bottom',diff);
						}
						if(requiredBottom > sidebarBottom){
							var diff = requiredBottom - sidebarBottom + 40 -contentHeight;
							//console.log('no results, adjust to required');
							$('.node-required-permits').css('padding-bottom',diff);
						}
					//},500);
				}

				if(contentHeight <= 0){//if there are no results reset the top margin to 0
					$('.node-required-permits').css('margin-top',0);
					//console.log('no results');
					setTimeout(function(){//need settimout because the requiredBottom variable get calculated before it has adjusted.
						var requiredTop = $('.node-required-permits').offset().top;
						var requiredHeight = $('.node-required-permits').height();
						var requiredBottom = requiredTop + requiredHeight;
						
						
						if(requiredBottom < sidebarBottom){
							var diff = sidebarBottom-requiredBottom+40;
							
							//console.log('sidebarBottom:'+sidebarBottom);
							//console.log('requiredBottom:'+requiredBottom);

							console.log('no results,adjust to sidebar:'+diff);
							$('.node-required-permits').css('padding-bottom',diff);
						}
						if(requiredBottom > sidebarBottom){
							var diff = requiredBottom - sidebarBottom + 40;

							//console.log('sidebarBottom:'+sidebarBottom);
							//console.log('requiredBottom:'+requiredBottom);

							console.log('no results, adjust to required');
							$('.node-required-permits').css('padding-bottom',diff);
						}
					},500);
				}
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
							console.log('adjust');
							var contentOffset = $('.node-required-permits').offset().top;
							var contentHeight = $('.node-required-permits').height();
							var contentBottom = contentOffset + contentHeight;	

							var sidebarOffset = $('#edit-field-issuing-department-wrapper').offset().top;
							var sidebarHeight = $('#edit-field-issuing-department-wrapper').height();
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

							var sidebarOffset = $('#edit-field-issuing-department-wrapper').offset().top;
							var sidebarHeight = $('#edit-field-issuing-department-wrapper').height();
							var sidebarBottom = sidebarOffset + sidebarHeight;

							//console.log('content:'+contentBottom);
							//console.log('sidebar:'+sidebarBottom);

							if(contentBottom < sidebarBottom){
							
								//console.log('too short');
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
		resetTop:function(){
			
			if(!$('.view-locator').find('.view-content').length>0 && !$('.view-locator').find('.view-empty').length>0 ){
				//console.log('contents gone');
				/*$('.node-required-permits').css('position','absolute');
				setTimeout(function(){
					$('.node-required-permits').css('position','relative');
				},500);*/
				
				$('.node-required-permits').css('margin-top','0');
			}
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

      $('#edit-submit-locator').click(function() {
        that.hide();
      })


			//set up click events
			$('#edit-search-api-views-fulltext').click(function(){
//				that.hide();
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
					if( $('.view-filters').css('position')!='fixed' ){//only do this if not in mobile layout
						$('.required-items').css('padding-top','90px');
					}
					
				//}, 200);
				});	
				that.guideOn = false;
			}
			
		}
	}
	var count = {
		resultsCount : function(){
			if( !$('.view-loacator-result-count').length>0 ){
				var items = $('.view-locator').find('.view-content').find('.views-row');
				var count = items.length;
				var pathname = window.location.pathname;
				var url = pathname.replace('permit-locator','');

				var nodes = [];
				$.each(items, function(i){
					var nodeClass = $(items[i]).find('article').attr('class').split(' ')[0];
					var nid = parseInt(nodeClass.replace('node-',''));
					nodes[i]=nid;
					//console.log($(items[i]).find('article').attr('class'));
				});
        
				var nodeString = nodes.join(',');
        
        //begin - adding required items to the list
        if($('#required-permit-wrapper .required-items-add-cta').parent('a').length > 0) {
          requiredItems = $('#required-permit-wrapper .required-items-add-cta').parent('a').attr('href').split("/");
          nodeString += ','+requiredItems[requiredItems.length-1];
        }
        //end - adding required items to the list
        
				//console.log(nodeString);
				//console.log('URL:'+pathname);
        var $viewContent = $('.view-locator').find('.view-content');
				$viewContent.prepend('<div class="view-loacator-result-count"><h3>Results <span>('+count+')</span></h3><div class="view-locator-result-actions">'+
          '<a href="/my-folder/download-single/permit/'+nodeString+'"><p class="view-locator-result-download-cta">Download all</p></a>'+
          '<a href="/my-folder/add/permit/'+nodeString+'" class="use-ajax"><p class="view-locator-result-folder-cta">Add all to My Folder</p></a></div></div>');
			  }
        Drupal.behaviors.AJAX.attach($viewContent,{});
		}
	}


	var loader = {//add the loading gif when form is submited
		append:function(){
			var itemInputs = $('.form-item').find('input');

			$.each(itemInputs,function(i){
				$(itemInputs[i]).click(function(){
					if(!$(itemInputs[i]).is($('#edit-search-api-views-fulltext')) && !$(itemInputs[i]).is($('#edit-custom-search-blocks-form-1--2')) ){//dont do this on the search field
						$(this).parent().prepend('<div id="ajax-loading-other" class="ajax-loader"><span>x</span></div>');
					}
				});
				
			});
		},
	}

	var mobileSetup = {
		button:function(){
			$('.t6-locator').prepend('<div id="permit-mobile-button"><p>Search or filter permits & licences</p></div>');
			//$('.t6-locator').prepend('<div id="permit-mobile-whiteout"></div>');
		},
		closeButton:function(){
			$('.view-filters').prepend('<div id="permit-mobile-close"><p><span>x</span></p></div>');
		},
		clickButton:function(){
			$('#permit-mobile-button').on('click',function(){
				//console.log('mobile button');
				if($('.view-filters').hasClass('filters-vis')){
					$('.view-filters').removeClass('filters-vis');
					//$('#permit-mobile-whiteout').css('display','none');
				}else{
					$('.view-filters').addClass('filters-vis');
					//$('#permit-mobile-whiteout').css('display','block');
				}
			});			
		},
		clickCloseButton:function(){
			$('#permit-mobile-close').on('click',function(){
				if($('.view-filters').hasClass('filters-vis')){
					$('.view-filters').removeClass('filters-vis');
					//$('#permit-mobile-whiteout').css('display','none');
				}else{
					$('.view-filters').addClass('filters-vis');
					//$('#permit-mobile-whiteout').css('display','block');
				}
			});
		}

	}
		/* Ajax Progress */
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
    end: function () {
      $(document).ajaxStop(function () {
        var pathname = window.location.pathname;
        if (pathname.indexOf("admin") >= 0) {

        } else {
          console.log('ajax finished');
          if (!tree.isReady()) {
            count.resultsCount();

            tree.init();
            tree.objectify();
            tree.openItems();
            tree.collapse();
            tree.makeBold();

            filterAppend.dirs();
            results.resultsAdjust();

            setTimeout(function () {
              results.sidebarAdjust();
            }, 500);

            requiredSection.resetTop();

            loader.append();
            mobileSetup.closeButton();
            mobileSetup.clickCloseButton();
            requiredSection.resetTop();
            // requiredSection.resetTop(); // why so many times?
          }
        }
      });
		}
	}

})(jQuery);



