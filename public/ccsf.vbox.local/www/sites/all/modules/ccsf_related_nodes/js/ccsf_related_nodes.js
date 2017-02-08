(function($){
	$(document).ready(function(){
		resize();

		if($('.permit-full-wrap').length>0){
			fixHeight('.block-ccsf-related-nodes','.related-permit-single');
		}
		if($('.doc-full-wrap').length>0){
			fixHeight('.block-ccsf-related-nodes','.related-doc-single');
		}
		
	});

  function resize(){
    $(window).resize(function(){
      if($('.permit-full-wrap').length>0){
        fixHeight('.block-ccsf-related-nodes','.related-permit-single');
      }
      if($('.doc-full-wrap').length>0){
        fixHeight('.block-ccsf-related-nodes','.related-doc-single');
      }
      
    });
  }
  
  function fixHeight(wrapper,item){//fix the height of the featured items tiles
    var winWidth = $(window).width();
    var maxHeight = 0;
    var panes = $(wrapper).find(item);
    
    if(winWidth>715){
     
      $.each(panes,function(i){
        
        //if(i!=panes.length-1){//so that we dont do this to the last item 
          if(i==0 || i%2==0){//even number or zero
            var totalHeight = 0;
            var children = $(panes[i]).children();
            $.each(children,function(j){
              totalHeight+=$(children[j]).outerHeight();
            });
            var nextTotalHeight = 0;
            var nextChildren = $(panes[i+1]).children();
            $.each(nextChildren,function(k){
              nextTotalHeight+=$(nextChildren[k]).outerHeight();
            });
            
            if(nextTotalHeight>totalHeight){
               $(panes[i]).css('height',nextTotalHeight);
               $(panes[i+1]).css('height',nextTotalHeight);
            }else{
              $(panes[i]).css('height',totalHeight);
              $(panes[i+1]).css('height',totalHeight);
            }
          }
        //}

      });
    }

  }



})(jQuery);