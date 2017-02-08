(function($){
	$(document).ready(function(){
		if($('.t10-main').length){//if on the template for the FAQ page
			faqInit();
			//console.log('faq');
		}
		
	});

	var faqArray = [];//array to hold all instances of Faq object

	var faqInit = function(){
		var questions = $('.form-item').not($('#block-search-by-page-1 .form-item'));
		
		$.each(questions,function(i){
      //make a new instance for each question
      var faqinstance = new Faq();
      faqArray.push(faqinstance);

      //hide all the answers
      var answer = $(questions[i]).next();
      faqArray[i].me=$(questions[i]);
      answer.css({'display':'none'});
      faqArray[i].answer = answer;
      faqArray[i].fid = i;

      //bind the heading/question to the open function
      var questionHeading = $(questions[i]);
      questionHeading.on('click',function(){

        faqArray[i].openClose();
      });
		});

	}

	var Faq = function(){
		this.fid = null;//id number 
		this.answer = null;
		this.isOpen = false;
		this.me = null;
	}

	Faq.prototype.openClose = function(){
		if(!this.isOpen){
			//console.log(this.answer);
			//this.answer.css({'display':'block'});
			this.answer.slideToggle('fast');
			this.me.addClass('faq-active');
			this.isOpen = true;
			//this.closeOthers(this.fid);
			return;
		}
		if(this.isOpen){
			//this.answer.css({'display':'none'});
			this.answer.slideToggle('fast');
			this.me.removeClass('faq-active');
			this.isOpen = false;
			//this.closeOthers();
			return;
		}
	}

	Faq.prototype.closeOthers = function(id){
		//console.log('close others');
		$.each(faqArray,function(i){
			//console.log(faqArray[i].fid);
			if(faqArray[i].fid != id){
				if(faqArray[i].isOpen){
					faqArray[i].answer.css({'display':'none'});
					faqArray[i].isOpen=false;
				}
			}
		});
	}

})(jQuery);