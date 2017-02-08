

/* Contact Us Form */
var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
var locked = true;
var $swipeControl;

(function($) {

  
  $(document).ready(function(){

    if($('#contact-us-wrap').length > 0 && $("#swipe_control").length > 0) {
      
               
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
      




      
      $('#contact_form .field').each(function() {
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

      
      $('#contact_form').submit(function() {
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
    
      
      //Custom drop downs 
      $(".selectBox").each(function() {
        
        $(this).hide();
        var source = $(this);
        var selected = source.find("option[selected]");
        var options = $("option", source);

        var source_container = $(this).parents(".selectBox-container");
        $(source_container).append('<dl class="dropdown"></dl>');

        $(".dropdown", source_container).append('<dt><a href="javascript:void();">' + source.attr('title') + '<span class="value"></span></a></dt>');
        $(".dropdown", source_container).append('<dd><ul></ul></dd>');

        options.each(function(){
          var options_class = $(this).attr('class');
          var options_link = $(this).attr('rel');

          if($(source).attr("id") == "cmb_blog_types") {
            $(".dropdown dd ul", source_container).append('<li class="'+options_class+'"><a href="'+options_link+'">' +
            $(this).text() + '<span class="value">' +
            $(this).val() + '</span></a></li>');
          } else {
            $(".dropdown dd ul", source_container).append('<li class="'+options_class+'"><a href="javascript:void();">' +
            $(this).text() + '<span class="value">' +
            $(this).val() + '</span></a></li>');
          }
        });

        $(".dropdown dt a", source_container).click(function() {
          dropdown_options = $(".dropdown dd ul", source_container);
          $(".dropdown dd ul").not(dropdown_options).hide();
          $(dropdown_options).toggle();
          return false;
        });

        $(".dropdown dd ul li a", source_container).click(function() {
          var containerId = $(this).parents('.selectBox-container').attr('id');
          var text = $(this).find("span.value").html();
          if (text=="") text = $(this).text();

          $(".dropdown dt a", source_container).html(text).addClass('selected');
          $(".dropdown dd ul", source_container).hide();

          var source = $(".selectBox", source_container);
          source.val($(this).find("span.value").html());
        });
      });

      $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("dropdown"))
          $(".dropdown dd ul").hide();
      });

    }

  });
})(jQuery);