(function($){
	
	$(document).ready(function(){
		//addLink();
		cleanUp();
	});

	function addLink(){
		
		//setTimeout(function(){
			var content = $('.views-field-screen-name').find('.field-content').find('span').html();
			// console.log('twitter:'+content);
		//},1000);
			$('.views-field-screen-name').find('.field-content').find('span').wrap('<a href="https://twitter.com/'+content+'"></a>');	
	}
	function cleanUp(){
		var links = $('.view-footer-twitter-feed').find('a');

		$.each(links,function(i){
			content = $(links[i]).html();
			// console.log(content);
			if( content.indexOf("http://")>=0 ){
				remove = content.replace('http://','');
				$(links[i]).html(remove);
			}
		});

		var spans = $('.view-footer-twitter-feed').find('span');

		$.each(spans,function(i){
			content = $(spans[i]).html();
			// console.log(content);
			if( content.indexOf("http://")>=0  || content.indexOf("http:/")>=0 || content.indexOf("http:")>=0  || content.indexOf("http")>=0 ){
				// console.log('its here 1');
				remove = content.replace('http://','');
				$(spans[i]).html(remove);
			}else if( content.indexOf("http:/")>=0 ){
				// console.log('its here 2');
				remove = content.replace('http:/','');
				$(spans[i]).html(remove);
			}else if( content.indexOf("http:")>=0 ){
				// console.log('its here 3');
				remove = content.replace('http:','');
				$(spans[i]).html(remove);
			}else if(  content.indexOf("http")>=0 ){
				// console.log('its here 4');
				remove = content.replace('http','');
				$(spans[i]).html(remove);
			}
		});
	}
}) (jQuery);
