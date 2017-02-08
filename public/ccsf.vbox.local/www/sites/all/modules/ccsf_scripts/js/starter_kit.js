(function($){
	$(document).ready(function(){
		var our_kit = new Kit;
		our_kit.init();
	});

	var Kit = function(){
		this.contents = [];
	}

	Kit.prototype.init = function(){
		var that=this,
			sections = $('.starter-kit-wrap').find('.view');
		//console.log(sections);

		$.each(sections,function(i){
			if(i==0){//view seciton containing guide
				var section_guide = that.guide(sections[i]);
			}
			if(i==1){//view section containing permits
				
			}
			if(i==2){//view section containing docs

			}

		});
	}

	Kit.prototype.guide = function(section){
		//var guide_contents = [];
		//return guide_contents;
		var node = $(section).find('article'),
			node_id = parseInt(node.attr('class').split(' ')[0].replace(/\D/g,'')); 
		//console.log(node_id);
	}

	Kit.prototype.permit = function(){

	}

	Kit.prototype.doc = function(){

	}

})(jQuery);