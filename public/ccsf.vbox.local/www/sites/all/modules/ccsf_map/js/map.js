var $mapPane;
var arrPositions;
var arrPositionsDef;
var $btnNext;
var $btnPrev;
var $map;
var $steps;
var $rows;
var $rowCurrent;
var repositionStep = 0;
var snapTo = -1;
var adjustment = 245;
var resize = false;

(function($){
  function repositionRoadMap() {
    var stepMargin = ($(window).width() - $('#footer .footer-inner:eq(0)').width()) / 2;
    
    if(stepMargin <= 90) stepMargin = 90;
    if($('.home-map-section').length>0){
      $steps.css({'margin-left': '45px'});
      $steps.css({'padding-right': '45px'});
    }else{
      $steps.css({'margin-left': stepMargin+'px'});
      $steps.css({'padding-right': (stepMargin)+'px'});
    }
    

      var i = 0;
      $rows.each(function() {
        arrPositions[i] = $(this).position().left;
        if(!resize) {
          arrPositionsDef[i] = $(this).position().left;
        }
        i++;
      });
      stepMargin = ($(window).width() - $('#footer .footer-inner:eq(0)').width()) / 2;
//      console.log(arrPositions.toSource());
//      console.log(arrPositionsDef.toSource());
      resize = true;
//    }
  }
  
  
  $(document).ready(function(){
    $mapPane = $('.pane-map');
    if($mapPane.length > 0) {
      arrPositions = new Array();
      arrPositionsDef = new Array();
      
      $btnNext = $('.map-controls .next')
      $btnPrev = $('.map-controls .prev')
      $map = $(".view-map", $mapPane);
      $steps = $('.steps', $map);
      $rows = $('.views-row', $map);
      $rowCurrent = $('.views-row-current', $steps)
      
      if($('.home-map-section').length>0){
        $rows.each(function(){
          $(this).find('.overlay').css({'opacity':'0'});
        })
      }
      
      $rowCurrent.find('.overlay').css({'opacity':'0'});

      $btnNext.css({'opacity':'0'});
      $btnPrev.css({'opacity':'0'});

      $btnNext.hover(function() {
        $btnNext.stop().animate({'opacity':'1'})
      });
      $btnPrev.hover(function() {
        $btnPrev.stop().animate({'opacity':'1'})
      })
      $rows.each(function() {
        var $row = $(this);
        if($row.hasClass('views-row-current')) return;
        
        $row.find('.map-row-inner').each(function() {
         
            $(this).hover(function() {
              
             if($('.home-map-section').length>0){
              $row.addClass('mouseover');
             // $row.find('.overlay').css({'opacity': 0, 'display':'block'}).stop().animate({opacity: .5}, 100);
            }else{
              $row.addClass('mouseover');
              $row.find('.overlay').css({'opacity': .5, 'display':'block'}).stop().animate({opacity: 0}, 100);
  //            $('.overlay', $row).css({'opacity': 0, 'display':'block'}).stop().animate({opacity: .5}, 100);
            }

            }, function() {
              if($('.home-map-section').length>0){
                $row.removeClass('mouseover');
                //$row.find('.overlay').stop().animate({opacity: 0}, 100);
  //            $('.overlay', $row).stop().animate({opacity: 0}, 100);
              }else{
                $row.removeClass('mouseover');
                $row.find('.overlay').stop().animate({opacity: .5}, 100);
  //            $('.overlay', $row).stop().animate({opacity: 0}, 100);
              }
            });

        });

      });
      
      
      
      var myScroll = $map.niceScroll({
        mousescrollstep: 0,
        cursorwidth: 0,
        scrollspeed: 100,
        zindex: 1001,
        enablemousewheel:false,
        cursoropacitymin: .2,
        cursoropacitymax: .7,
        cursorborder: 0,
        enablekeyboard: false,
        touchbehavior: true
      });
      $map.scrollLeft(0);
      repositionRoadMap();

      myScroll.onscrollend = function (data) {
        console.log('onscroll end');
        if(myScroll.scrollvaluemaxw == myScroll.scroll.x) {
          console.log('end');
        } else if(myScroll.scroll.x==0) {
          console.log('start');
        }
        
        stepMargin = ($(window).width() - $('#footer .footer-inner:eq(0)').width()) / 2;
        if($('.home-pane-map').length > 0) {
          stepMargin = stepMargin;
        } else {
          stepMargin += adjustment;
        }
        
        
        
        if(repositionStep==0) {
          console.log('function going');
          idx = $rows.index($rowCurrent);
//          console.log(arrPositions.toSource());
          if( $(window).width()<=580 ){//if on mobile
            stepMargin=50;
            $map.stop().animate({
              scrollLeft: (arrPositions[idx] - stepMargin)//added this to adjust position for mobile 
            }, 300);
            console.log('small screen');
          /*}else if( $(window).width()>=580 && $(window).width()<=930 ){
            $map.stop().animate({
              scrollLeft: (arrPositions[idx] - stepMargin+400)//added this to adjust position for mobile 
            }, 300);
            console.log('tablet screen');*/
          }else{
            $map.stop().animate({
              scrollLeft: (arrPositions[idx] - stepMargin)
            }, 300);
            //console.log('other screen');
          }
          repositionStep=1;
        } else {
//          snapTo = -1;
//          var sl = ($map.scrollLeft() + stepMargin)+ 1;
//          i = $rows.length;
//
//          for(j=0; j<i;j++) {
//            if(sl <= arrPositions[j] && snapTo<0) {
//              snapTo = j;
//              if(snapTo > 0) {
//
//  //              console.log("diff" + (sl-arrPositions[snapTo-1]) +" < "+ (arrPositions[snapTo]-sl));
//                if(sl-arrPositions[snapTo-1] < arrPositions[snapTo]-sl) {
//                  snapTo -= 1;
//                }
//  //              $(".view-map").scrollLeft(arrPositions[snapTo]);
//                $map.stop().animate({
//                  scrollLeft: (arrPositions[snapTo] - stepMargin+150)
//                }, 300);
//                //console.log('here');
//              }
//            }
//          }
        }
      }

      // trigger the scrollend event right away to set the inital state
      myScroll.triggerScrollEnd();

      $btnNext.click(function (e) {
        e.preventDefault();
        
        snapTo = -1;
        i = $rows.length;
        stepMargin = ($(window).width() - $('#footer .footer-inner:eq(0)').width()) / 2;
        if($('.home-pane-map').length > 0) {
          stepMargin = stepMargin;
        } else {
          stepMargin += adjustment;
        }

        var sl = ($map.scrollLeft() + stepMargin)+ 1;
//        console.log("stepMargin : " + stepMargin)
//        console.log("$map.scrollLeft() : " + $map.scrollLeft());
//        console.log("sl : " + sl);
        
        for(j=0; j<i;j++) {
          if(sl < arrPositionsDef[j] && snapTo<0) {
            snapTo = j;
            $map.stop().animate({
              scrollLeft: (arrPositionsDef[snapTo] - stepMargin)
            }, 500);
          }
        }
      });

      $btnPrev.click(function (e) { 
        e.preventDefault();
        snapTo = -1;
        i = $rows.length;
        stepMargin = ($(window).width() - $('#footer .footer-inner:eq(0)').width()) / 2;
        if($('.home-pane-map').length > 0) {
          stepMargin = stepMargin;
        } else {
          stepMargin += adjustment;
        }
        var sl = ($map.scrollLeft() + stepMargin) - 1;
        for(j=0; j<i;j++) {
          if(sl <= arrPositionsDef[j] && snapTo<0) {
            snapTo = j-1;
            if(snapTo >= 0) {
              $map.stop().animate({
                scrollLeft: (arrPositionsDef[snapTo] - stepMargin)
              }, 500);
            }
          }
        }
      });
      
      $map.on('mousemove', function(e) {
        if ((e.pageX - this.offsetLeft) < $(this).width() / 2) {
          $btnPrev.css({'opacity': 1});
          $btnNext.css({'opacity': 0});
        } else {
          $btnNext.css({'opacity': 1});
          $btnPrev.css({'opacity': 0});
        }
      });
      
      $('.pane-map').on('mouseleave', function(e) {
          $btnNext.stop().animate({'opacity': 0}, 300);
          $btnPrev.stop().animate({'opacity': 0}, 300);
      });
      
      $(window).bind('resize', repositionRoadMap);
    }
  });
})(jQuery);