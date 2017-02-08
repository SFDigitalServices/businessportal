(function($){

	$(document).ready(function(){
		if($('.date-modified').length){//if on a page that contains a node with the date exposed
			lastModified.getDates();
		}

		//splashStretcher.check();

	});
	//prepares the 'last modified' date for the footer of the page by assessing the hidden last modified field output by each node.
	var lastModified = {
		
		month : '',
		day : '',
		year : '',

		getDates : function(){
			var that=this,
				dateItems = $('.date-modified'),
				highest = 0;

			$.each(dateItems,function(i){//get the highest date, this is the last modified
				var num = $(dateItems[i]).html(),
					sub = num.substring(0, (num.length - 5) ),//remove hours and minutes from the date
					noLetters = sub.replace(/\D/g,'');//remove all non-number characters

				if( noLetters > highest ){
					highest = noLetters;
				}
			});

			var month = highest.substring(0,(highest.length-6));
			that.formatMonth(month);	
			
			var day = highest.substring(2,(highest.length-4));
				that.formatDay(day);

			var year = highest.substring(4,(highest.length));
				that.year = year;

			that.setDate();

		},

		formatMonth : function(input){
			var that = this,
				month = input;

			switch(month){//prep the month as its string version
				case '01':
					month = 'January';
					break;
				case '02':
					month = 'February';
					break;
				case '03':
					month = 'March';
					break;
				case '04':
					month = 'April';
					break;
				case '05':
					month = 'May';
					break;
				case '06':
					month = 'June';
					break;
				case '07':
					month = 'July';
					break;
				case '08':
					month = 'August';
					break;
				case '09':
					month = 'September';
					break;
				case '10':
					month = 'October';
					break;
				case '11':
					month = 'November';
					break;
				case 12:
					month = 'December';
					break;
			}
			that.month = month;
		},

		formatDay : function(input){
			var that = this,
				day = input;

			if(day.substring(0,day.length-1)=='0'){//remove the '0' if the day is '01','02',etc..
				day = day.substring(1,day.length);
			}
			that.day=day;
		},

		setDate : function(){
			var that = this,
				modifiedDate = 'Page last updated on ' + that.month + ' ' + that.day + ', ' + that.year;

			$('#last-modified-date').html(modifiedDate);
		}
	}

})(jQuery);




