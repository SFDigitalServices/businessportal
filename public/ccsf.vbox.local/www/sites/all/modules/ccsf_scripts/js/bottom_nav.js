(function($){
	//append the 'prev' and 'next' links to the bottom of pages inside the start,manage and grow sections
	//that have a sidebar nav
	
	$(document).ready(function(){
		//appendNav();
	});

	function appendNav(){
		
		var pathname = window.location.pathname;

		if ( pathname.indexOf("start") >= 0 || pathname.indexOf("manage") >= 0 || pathname.indexOf("grow") >= 0){//are we in the start, manage, or grow section
			
			if($('.t5-menu').find('.pane-block').length>0){//is there a sidebar menu on the page
				//console.log('menu here');
				var links = $('.t5-menu').find('.pane-block').find('.menu').find('li'),
					allLinks = [],
					current = '',
					previousText = 'na',
					previousLink = 'na',
					nextText = 'na',
					nextLink = 'na';

				$.each(links,function(i){
					//console.log('here');
					if($(links[i]).hasClass('active-trail')){						
						current = $(links[i]).find('a').html();
						
						if(i!=0){
							previousText = $(links[i-1]).find('a').html();
							previousLink = $(links[i-1]).find('a').attr('href');
						}
						if(i!=links.length-1){
							nextText = $(links[i+1]).find('a').html();
							nextLink = $(links[i+1]).find('a').attr('href');
						}
					}
				});

				
				//console.log('current: '+current);
				//console.log('prevL:'+previousLink);
				//console.log('prevT:'+previousText);
				//console.log('nextL:'+nextLink);
				//console.log('nextT:'+nextText);
				
				if(previousText !='na' || nextText !='na' ){//as long as one of the two links exits
					var wrapperDiv = "<div id='bottom-nav-wrapper'></div>";
					$('.panels-flexible-column-t5-wrap-main-inside').append(wrapperDiv);
				}

				if(previousText!='na'){//there is a previous page
					previousLink = window.location.protocol + "//" + window.location.host + previousLink;
					var prevDiv = "<div class='bottom-previous-page-link'><a href='"+previousLink+"'><div class='prev-arrow'><span>Previous Page</span></div><p>"+previousText+"</p></a></div>";
					$('#bottom-nav-wrapper').append(prevDiv);
				}
				if(nextText!='na'){//there is a next page
					nextLink = window.location.protocol + "//" + window.location.host + nextLink;
					var nextDiv = "<div class='bottom-next-page-link'><a href='"+nextLink+"'><p>"+nextText+"</p><div class='next-arrow'><span>Next Page</span></div></a></div>";
					$('#bottom-nav-wrapper').append(nextDiv);
				}
				
			}
		}

	}	
})(jQuery);

/*
///// Previous Div
	"<div class='bottom-previous-page-link'>
		<a href='"+previousLink+"'>
			<div class='prev-arrow'><span>Previous Page</span></div>
			<p>"+previousText+"</p>
		</a>
	</div>"

///// Next Div
	"<div class='bottom-next-page-link'>
		<a href='"+nextLink+"'>
			<div class='prev-arrow'><span>Previous Page</span></div>
			<p>"+nextText+"</p>
		</a>
	</div>"
*/