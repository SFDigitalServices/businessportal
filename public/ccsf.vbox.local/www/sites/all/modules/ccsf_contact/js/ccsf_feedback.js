

/* Feedback */

var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
var locked = true;
var $swipeControl;

(function($) {
  console.log('feedback form');
  







  $(document).ready(function(){
    if($('#feedback_form').length>0 && $("#swipe_control").length > 0) {

        $swipeControl = $("#swipe_control");
        
        $('.btn-submit').attr('disabled','disabled');
        
        if ( $.isFunction($.fn.draggable) ) {
          $swipeControl.draggable({
            axis: 'x',
            containment: 'parent',
            drag: function(event, ui) {
              if(locked==false) return false;

              /*if (ui.position.left >= 280) {
                locked = false;
                $swipeControl.addClass('unlocked');
                $('.btn-submit').removeClass('locked').removeAttr('disabled');
                $swipeControl.draggable( "disable" );
                $('.swipe_text').fadeOut('fast');
              } else {*/
              var swipeWidth = $('#swipe_lock').width();
              var lockWidth = 54;

              if (ui.position.left >= swipeWidth-lockWidth) {
                locked = false;
                $swipeControl.addClass('unlocked');
                $('.btn-submit').removeClass('locked').removeAttr('disabled');
                $swipeControl.draggable( "disable" );
                $('.swipe_text').fadeOut('fast');
              } else {
                  // Apparently Safari isn't allowing partial opacity on text with background clip? Not sure.
                // $("h2 span").css("opacity", 100 - (ui.position.left / 5))
              }
            },
            stop: function(event, ui) {
              if(locked==false) return false;
              $swipeControl.animate({left: 0});
            }
          });
      
        }else{
          $('.btn-submit').removeClass('locked').removeAttr('disabled');
          $('.btn-submit').css('opacity','1');
          $('.swipe_text').fadeOut('fast');
        }
      
      $('#feedback_form .field').each(function() {
        var $this = $(this);
        $this.bind({
          click: function() {
            $('.ph-text', $this).hide();
            $('.txtBox', $this).focus();
          }
        });

        $('.txtBox', $this).focus(function() {
          if ($(this).val() == "") {
            $('.ph-text', $this).hide();
          }
        });

        $('.txtBox', $this).blur(function() {
          if ($(this).val() == "") {
            $('.ph-text', $this).show();
          }
        });
      });


      $('#feedback_form').submit(function() {
        var isValid = true;
        var errMsg = '';
        $('.error_input').removeClass('error_input');
        $('.field_error').empty().hide();
        $(".required").each(function() {
          if($(this).val().replace(/^\s*|\s*$/g,"")==""){
            $parent = $(this).parents('.field-group');
            $('.field', $parent).addClass('error_input');
            $('.field_error', $parent).empty().append($(this).attr('data-error-msg')).fadeIn();
            isValid = false;
          }
        });

        $(".email").each(function() {
          if(emailfilter.test($(this).val())==false){
            $parent = $(this).parents('.field-group');
            $('.field', $parent).addClass('error_input');
            $('.field_error', $parent).empty().append($(this).attr('data-error-msg')).fadeIn();
            isValid = false;
          }
        });
        return isValid;
      });
    }
  });
})(jQuery);