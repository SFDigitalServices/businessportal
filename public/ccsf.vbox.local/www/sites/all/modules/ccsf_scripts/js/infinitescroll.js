(function($){
   Drupal.behaviors.viewsInfiniteScroll = {
   attach: function (context, settings) {
     $(function(){
    if (this.processed) return;
    this.processed=true;
    if ($('.search-results').length==0) return;
       var $container = $('.search-results');
       //$container.imagesLoaded( function(){
         $container.infinitescroll({
           navSelector  : 'ul.pager',    // selector for the paged navigation
           nextSelector : '.pager-next a',  // selector for the NEXT link (to page 2)
           itemSelector : '.search-results',     // selector for all items you'll retrieve
           animate      : true,
           msgText  : Drupal.t("Loading new results..."),
           img: '/sites/default/themes/bartik/images/ajax-loader.gif',
           donetext:Drupal.t('No more results to load.'),
       //},function(arrayOfNewElems,state){
        //YOUR CALLBACK STUFF .. To re-attach behaviour if needed
       
       // })
   })
 });
 }
};
    })(jQuery);