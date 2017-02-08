(function($){
	$(document).ready(function(){
		
		//fixHeight('.block-ccsf-related-nodes','.related-permit-single');
		//fixWidth('.block-ccsf-related-nodes','.related-permit-single');
	});

	function fixHeight(wrapper,item){//fix the height of the featured items tiles
    console.log('fixheight');
    var maxHeight = 0;
    var panes = $(wrapper).find(item);
      console.log($('.block-ccsf-related-nodes'));
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
    
    console.log('row one:'+rowOne);
    console.log('row two:'+rowTwo);
    console.log('row three:'+rowThree);

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

  }

  function fixWidth(wrapper,item){//adjust the witdh and float items to the left and right sides.
   console.log('fixwidth');
    var panes = $(wrapper).find(item);
    $.each(panes,function(i){
      $(panes[i]).css('width','395px');
      if(i == 0 || i==2 || i==4){
        $(panes[i]).css({
          'float':'left',
          'margin-left':'30px',
          'margin-right':'0',
        });
      }
      if(i==1||i==3||i==5){
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

})(jQuery);