/*
*
* 
*
*/
///////// New
(function($){
	$(document).ready(function(){
		if($('.starter-kit-wrap').length>0){
			kittoggle();
		}
	});

	function kittoggle(){
		
		var section = $('.starter-kit-inner').find('.kit-section-name');
		$.each(section,function(i){
			$(section[i]).click(function(){
				$(section[i]).next().slideToggle('fast');
				
				if(!$(section[i]).hasClass('kit-open-active')){
					$(section[i]).addClass('kit-open-active');
				}else{
					$(section[i]).removeClass('kit-open-active');
				}
			});
		});
		

		var title = $('.starter-kit-inner').find('.kit-title');
		$.each(title,function(i){
			$(title[i]).click(function(){
				$(title[i]).parent().next().slideToggle('fast');
				
				if(!$(title[i]).hasClass('kit-open-active')){
					$(title[i]).addClass('kit-open-active');
				}else{
					$(title[i]).removeClass('kit-open-active');
				}
			});
		});
		/*$('.kit-title').click(function(){
			var that=$(this);
			console.log('title');
			that.parent().next().toggle('slow',function(){
				if(!that.hasClass('kit-open-active')){
					this.addClass('kit-open-active');
				}else{
					this.removeClass('kit-open-active');
				}
			});
			
		});*/
	}

})(jQuery);

///////// OLD & Possibly not needed.
(function($){
	$(document).ready(function(){
		selectAll();
		deselectAll();
		addSelected();
	});
	
	function selectAll(){
		//console.log('click');
		var clickObject,
			containerObject;
		var pathname = window.location.pathname;
		/*if(pathname.indexOf('locator')!==-1){//are we on the license and permit locator page
				clickObject = '.permit-locator-select-all';
				containerObject = '#views-form-permit-locator-default';
		}*/
		if(!(pathname.indexOf('locator')!==-1)){//we are interacting with a starter kit
			clickObject = '#starter-kit-select-all';
			containerObject = '#starter-kit-block-form';
		}

		$(clickObject).click(function(event){
			event.preventDefault();
			var checkboxes = $(containerObject).find('input');
			for(i=0;i<checkboxes.length;i++){
				if($(checkboxes[i]).attr('type')=='checkbox'){//if its a checkbox

					$(checkboxes[i]).attr('checked',true);//set it to checked
				}
			}
		});
	}
	
	function deselectAll(){
		$('#starter-kit-deselect-all').click(function(event){
			event.preventDefault();
			var checkboxes = $('#starter-kit-block-form').find('input');
			for(i=0;i<checkboxes.length;i++){
				if($(checkboxes[i]).attr('type')=='checkbox'){//if its a checkbox

					$(checkboxes[i]).attr('checked',false);//set it to checked
				}
			}
		});

	}
	
	function getChecked(){
		var selected = [];
		var checkboxes = $('#starter-kit-block-form').find('input');
		for(i=0;i<checkboxes.length;i++){
			if($(checkboxes[i]).attr('type')=='checkbox'){
				if($(checkboxes[i]).attr('checked')==true){
					var value = $(checkboxes[i]).attr('value');
					//console.log(value);
					selected.push(value);
				}
			}
		}
			
		var stringify = selected.toString();
		return stringify;
	}

	function addSelected(){
		//connect this to a more general class name so its usable elsewhere
		$('.add-selected').click(function(event){
			event.preventDefault();
			var items = getChecked();
			
			$.ajax({
				// this url calls starter_kit_add($items); 
				// 'items' needs to be a comma seperated string passed in the URL for drupal to handle it.
				url:'admin/structure/starter_kit/add/'+ items,
				type:'post',
				dataType:'text',
				success:function(data){
					alert('Folder updated successfully');
					updateFolder();
				}
			});

			/////////////////////////
			$(document).ajaxStart(function(){
				console.log('ajax start');
			});
			$(document).ajaxStop(function(){
				console.log('ajax stop');
			});
			
			
		});
	}

	function updateFolder(){
		$('#my-folder').load('my_folder/update');
	}
	
}(jQuery));