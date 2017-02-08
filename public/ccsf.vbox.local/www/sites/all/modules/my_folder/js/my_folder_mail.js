(function($){
	$(document).ready(function(){
		showModal();
		sendMail();
		addEmail();
		//sendTest();
	});

	modalVis = false;

	function showModal(){
		$('#my-folder-sidebar-email').click(function(event){
			event.stopPropagation();
			if(modalVis==false){
				$('#mail-modal').fadeIn('fast');
				$('#mail-whiteout').fadeIn('fast');
				modalVis=true;
			}else{
				//
			}
		});

		$('#mail-modal-close').click(function(){
			if(modalVis==true){
				$('#mail-modal').fadeOut('fast');
				$('#mail-whiteout').fadeOut('fast');
				modalVis=false;
			}
		});

		$('#page').click(function(){
			if(modalVis==true){
				$('#mail-modal').fadeOut('fast');
				$('#mail-whiteout').fadeOut('fast');
				modalVis=false;
			}
		});

		$('#mail-modal').click(function(event){
			event.stopPropagation();
		});

		$('.mail-close-button').on('click',function(){
			console.log('close click');
			if($('#mail-modal-success').length>0){
				$('#mail-modal-success').fadeOut('fast');
				$('#mail-whiteout').fadeOut('fast');
			}
			if($('#mail-modal-fail').length>0){
				$('#mail-modal-fail').fadeOut('fast');
				$('#mail-whiteout').fadeOut('fast');
			}
			
		});
	}

	function sendMail(){
		$('#mail-modal-send-link').click(function(event){
			
			event.preventDefault();
			//event.stopPropagation();
			var email = $('#mail-modal-input').val();

			if(!validateEmail(email) || email.length==0){//not valid
				$('#mail-modal-error').fadeIn('fast');
			}else{//valid
				
				var path = $('#mail-modal-send-link').attr('href');
				//var newPath = path + '/'+email;
					//$('#mail-modal-send-link').attr('href',newPath);
					//console.log($('#mail-modal-send-link').attr('href'));
				window.location = path;
				//$('#mail-modal-send-link').submit();
			}
		});
		
	}

	var oldInput = '';
	function addEmail(){
		$('#mail-modal-input').keyup(function(){
			
			var email = $('#mail-modal-input').val();
			console.log(email.length);
			var path = $('#mail-modal-send-link').attr('href');
			
			if(email == ''){
				path = path.replace(oldInput,'');
				path.slice(0,-1);
			}else{
				path = path.replace(oldInput,'');
			}
			
			if(email.length>0){
				var newPath = path + '/' + email;
			}else{
				path = path.replace(oldInput,'');
				var newPath = path;
			}
			
			oldInput='/'+email;
			$('#mail-modal-send-link').attr('href',newPath);
		});
	}

	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	  	if( !emailReg.test( $email ) ) {
	    	return false;
	  	} else {
	    	return true;
	  	}
	}
	function sendTest(){
		$('#mail-modal-send').click(function(){
			var path = window.location.pathname;
			console.log(path);
			console.log('send click');
			var email = $('#mail-modal-input').val();
			if(!validateEmail(email) || email.length==0){//not valid
				$('#mail-modal-error').fadeIn('fast');
				console.log('invalid email');
			}else{//valid
				console.log('valid');
				$.ajax({
					type: 'POST',
					url: 'email.php',
					data:{ueserEmail:email},
					success:function(data){
						console.log('success');
					}
				})
			}
		});
		
	}


})(jQuery);