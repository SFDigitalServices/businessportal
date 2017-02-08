(function($){
	$(document).ready(function(){
		page();
		adjust();
		watchWidth();
    


		if(!$('#block-system-main').length>0){//this div is on the admin pages for panels, if it isnt there, run the isotope scripts 
      //layout for the start a business page
  		if($('.t2-items-wrap').length>0){
  			var $container = $('.t2-items-wrap').find('.panels-flexible-region-template_2-items-inside').isotope({
  				itemSelector:'.pane-node',
  				layoutMode:'fitRows',
  			});
  			//var $containerTwo = 
  		}

  		//isotope layout on the starter kits page.
  		if($('.t3-items-wrap').length>0){
  			var $container = $('.t3-items-wrap').find('.panels-flexible-region-template_3-items-inside').isotope({
  				itemSelector:'.pane-node',
  				layoutMode:'fitRows',
  			});
  		}

      //the featured items section is on the page
      if($('.t5-featured-wrap').length>0){
        resize('.t5-featured-wrap');//adjust height on window resize
        fixHeight('.t5-featured-wrap');
        //fixWidth();

        /*var $container = $('.t5-featured-wrap').find('.panels-flexible-region-t5-wrap-featured_items-inside').isotope({
          itemSelector:'.pane-node',
          //layoutMode:'fitRows',
        });*/
      }

      if($('.t4-featured-wrap').length>0){
        resize('.t4-featured-wrap');//adjust height on window resize
        fixHeight('.t4-featured-wrap');
      }
    }
	
	});

	function watchWidth(){
		
		$( window ).resize(function() {
  			adjust();
		});
	}

	var where = '';

	function page(){

		//find out which page you are on
		if($('.t2-items-wrap').length>0){//on the start a business page
			where='start';
		}

		if($('.t3-items-wrap').length>0){//on the starterkits page
			where='kit';
		}
	}
	
	function adjust(){
		var width = $(window).width();

  			if(width>561){
  				if(where=='start'){
  					/*$('.t2-tips').css({
  						'width':'100%',
  					});*/
  				}
  			}
  			if(width>731){
  				/*if(where=='start'){
  					$('.t2-items-wrap').find('.panels-flexible-region-template_2-items-inside').css({
  						'width':'100%',
  					});
  				}*/
  				/*if(where=='kit'){
  					$('.t3-items-wrap').find('.panels-flexible-region-template_3-items-inside').css({
  						'width':'100%',
  					});
  				}*/
  			}

  			if(width< 1134){
  				/*if(where=='start'){
  					$('.t2-items-wrap').find('.panels-flexible-region-template_2-items-inside').css({
  						'width':'730px',
  					});
  				}*/
  				/*if(where=='kit'){
  					$('.t3-items-wrap').find('.panels-flexible-region-template_3-items-inside').css({
  						'width':'730px',
  					});
  				}*/
  			}
  			if(width< 730){
  				/*if(where=='start'){
  					$('.t2-items-wrap').find('.panels-flexible-region-template_2-items-inside').css({
  						'width':'365px',
  					});
  				}*/
  				/*if(where=='kit'){
  					$('.t3-items-wrap').find('.panels-flexible-region-template_3-items-inside').css({
  						'width':'365px',
  					});
  				}*/
  			}
  			if(width<566){
  				if(where=='start'){
  					
  				}
  			}
	}

  function fixHeight(x){//fix the height of the featured items tiles
    
    var maxHeight = 0;
    var panes ='';
    //if(x==1){
       panes = $(x).find('.panels-flexible-region-inside').find('.pane-node');
    //}
    //if(x==2){
    //   panes = $('.t4-featured-wrap').find('.panels-flexible-region-t5-wrap-featured_items-inside').find('.pane-node');
    //}
   
    
    $.each(panes,function(i){
      if(i!=panes.length-1){//so that we dont do this to the last item 
        if(i==0 || i%2==0){//even number or zero
          //var rowHeight=$(panes[i]).height();
          var totalHeight = 0;
          var children = $(panes[i]).children();
          $.each(children,function(j){
            totalHeight+=$(children[j]).outerHeight();
          });
          //console.log('first'+totalHeight);
          var nextTotalHeight = 0;
          var nextChildren = $(panes[i+1]).children();
          $.each(nextChildren,function(k){
            nextTotalHeight+=$(nextChildren[k]).outerHeight();
          });
          //console.log('next'+nextTotalHeight);
          
          if(nextTotalHeight>totalHeight){
            //rowHeight=$(panes[i+1]).height();
              $(panes[i]).css({
                'height':nextTotalHeight,
                'float':'left',
              });
              $(panes[i+1]).css({
                'height':nextTotalHeight,
                'float':'right',
              });
          }else{
            $(panes[i]).css('height',totalHeight);
            $(panes[i+1]).css('height',totalHeight);
          }
          //console.log(i+':'+rowHeight);
          
           
        }
      }else{
        //do nothing
        //console.log('I:'+$(panes[i]).find('h3').html());
      }
      
    });
    /*  
    var rowOne = 0;
    var rowTwo = 0;
    var rowThree = 0;

    $.each(panes,function(i){
      var height = $(panes[i]).height();
      
      if(i==0 || i==1){
        if(height>rowOne){
          rowOne=height;
        }
      }
      if(i==2 || i==3){
        if(height>rowTwo){
          rowTwo=height;
        }
      }
      if(i==4 || i==5){
        if(height>rowThree){
          rowThree=height;
        }
      }

    });
    
    console.log(rowOne);
    console.log(rowTwo);
    console.log(rowThree);

    $.each(panes,function(j){
      if(j==0 || j==1){
        $(panes[j]).css('height',rowOne);
      }
      if(j==2 || j==3){
        $(panes[j]).css('height',rowTwo);
      }
      if(j==4 || j==5){
        $(panes[j]).css('height',rowThree);
      }
    });
`   */
  }

  function fixWidth(){//adjust the witdh and float items to the left and right sides.
    var panes = $('.t5-featured-wrap').find('.panels-flexible-region-t5-wrap-featured_items-inside').find('.pane-node');
    $.each(panes,function(i){
      $(panes[i]).css('width','395px');
      if(i == 0 || i%2 == 0){
        $(panes[i]).css({
          'float':'left',
          'margin-left':'30px',
          'margin-right':'0',
        });
      }else{
        $(panes[i]).css({
          'float':'right',
          'margin-left':'0',
          'margin-right':'0',
          'right':'0',
          'left':''
        });
      }
    });
  }
  function resize(x){
    $(window).resize(function(){
      fixHeight(x);
    });
  }
  
})(jQuery);