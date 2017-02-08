(function($){
  $(document).ready(function(){

  


          $('select').each(function() {
            
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
      });
})(jQuery);