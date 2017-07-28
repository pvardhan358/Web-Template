 function saveRule(val){

 $('#issue').val(val);
 $(".modal").modal("hide"); 
 $('#issue').focus();
 }
 
 function submitDetails(){
	 if(($('#prjname').val().trim()!="") && ($('#testurl').val().trim()!="" ) && ($('#env').val().trim()!="") && ($('#pgtitle').val().trim()!="")){

	 

	 $(".modal").modal("hide");
	 $(".prjDetails").focus();
	 return false;
 }
	 }
	  var rule="", level="",severity="",successcriteria="";
 function AddTableRow(){
	 $("#rule,#level,#severity,#wcag").css('cursor','auto');
	 var sv='';
	 var slno =sl,
	    issue = $('#issue').val(),
		page=$('#page').val(),
		rule=$('#rule').val(),
		successcriteria=$('#wcag').val(),
		level=$('#level').val(),
		severity=$('#severity').val(),
		
		 
		comments=$('#comments').val();
		if((issue.length > 0) && (page.length>0) && (comments.length>0)){		
	    $('table tbody')[0].innerHTML += "<tr class='tableRow'><td class='slc' style='width:10px;display:none'>"+slno+"</td><td   style='width:50px;' class='tblissue'>"+issue+"</td><td  style='width:50px' class='tblpage'>"+page+"</td><td  style='width:10px' class='tblrule'>"+rule+"</td><td  style='width:50px' class='tblwcag'>"+successcriteria+"</td><td style='width:10px' class='tbllevel'>"+level+"</td><td  style='width:10px' class='tblseverity'>"+severity+"</td><td  style='width:50px' class='tblcomments'>"+comments+"</td><td style='width:50px' class='text-center noExl'><button class='btn btn-info btn-sm noExl editbtn' id='editbtn' onclick='edit(sv)'>Edit</button>&nbsp;&nbsp;<button class='btn btn-danger btn-sm noExl deletebtn' id='delbtn' data-title='Delete' data-toggle='modal' data-target='#deletemodal'>Delete</button></td></tr>";
		sv=$('.tableRow').index();
		//alert(sv);
		//count=$('.slc').attr('class', 'slc' + sl);
		//alert($('.slc').text());
		$("td").each(function (i) { $(this).attr('tabindex', i + 1); });
		$('#issue,#page,#comments,#rule,#level,#wcag,#severity').val('');
		$("#rule,#level,#severity,#wcag").removeAttr('readonly');
		sl++;
}
	}
			


function setValue(issue){
	
		
		for (var i = 0; i < cart.contents.length; i++){
	    	  // look for the entry with a matching `code` value
	    	  if (cart.contents[i].IssueDescription.trim() == issue.trim()){
				$("#rule,#level,#severity,#wcag").attr('readonly','true');
				$("#rule,#level,#severity,#wcag").css('cursor','not-allowed');
				
		
	    	     // we found it
	    	    // obj[i].name is the matched result
	    		 
	    		    rule=cart.contents[i].SLNO;
	    		    severity=cart.contents[i].SeverityLevel;
	    		    level=cart.contents[i].ConformanceLevel;
	    		    successcriteria=cart.contents[i].SuccessCriteria;
	    	  }
	    	}
}


	 
 function callJson(){
$.typeahead({
    input: '#query',
    order: "asc",
    local: Success,
    source: Success,
    minLength: 1,
    hint: true,
         // If text is detected in the input, a cancel button will be available to reset the input (pressing ESC also cancels)
    loadingAnimation: true,
    highlight: true, 
    cache: false,
    callback: {
        onInit: function (node) {
            console.log('Typeahead Initiated on ' + node.selector);
        },
   
        onClick: function (node, a, item, event) {
       	 $('#issue').val($('#query').val());
		 setValue($('#query').val());
		 $("#rule").val(rule);
		 $("#wcag").val(successcriteria);
		 $("#level").val(level);
		 $("#severity").val(severity);
       	 $(".modal").modal("hide"); 
       	 $('#issue').click();

 
 
            console.log('onClick function triggered');
 
        },
        onSubmit: function (node, form, item, event) {
        	
          	 $('#issue').val($('#query').val());
          	 $(".modal").modal("hide"); 
         
			
 
           
            console.log('onSubmit override function triggered');
 
        }
        }
});
 

//$('.tt-query').css('background-color','#fff');
 }
  
         var d = new Date();
var strDate = d.getDate()+ "/" + (d.getMonth()+1) + "/" + d.getFullYear() ;
           function ExportToExcel() {
                 var $table = $('#table2excel');
					$table.removeData();
					$table.table2excel({
						exclude: ".noExl",
						name: $('#testing :selected').text(),
                        filename: $("#prjname").val() + "_"+ $('#testing :selected').text()+"_"+ strDate ,
                        worksheet:$("#pgtitle").val(),
                        sheetName:$("#pgtitle").val(),
					fileext: ".xls",
					exclude_img: false,
					exclude_links: false,
					exclude_inputs: false,
					projectName:$("#prjname").val(),
					projectTitle:$("#pgtitle").val(),
					projectURL:$("#testurl").val(),
					projectBrowser:$("#env").val(),
					projectTester:tester
					}); 
						
            }
			
			
           $(".subreport").keydown(function (e) {    
        	    if (e.which == 9) {
        	        $(".btn-remove").focus();
        			e.preventDefault();
        	    }
        		});
	$(document).ready(function(){
			
			$(document).on('click','tr.tableRow',function(){
		 var k=$(this).index();
		  $("table.table2excel").find('tr.tableRow').each(function (i, el) {
			  if(k==$(this).index()){
				 var $tds = $(this).find('td'); 
				 $("#issue").val($tds.eq(1).text());
				 $("#page").val($tds.eq(2).text());
				 $("#rule").val($tds.eq(3).text());
				 $("#wcag").val($tds.eq(4).text());
				 $("#level").val($tds.eq(5).text());
				 $("#severity").val($tds.eq(6).text());
				 $("#comments").val($tds.eq(7).text());
					$("#issue").focus();	 
			  }
		  });
		});
		$('tr.tableRow').click(function(){
			$('.editbtn').trigger('click');
		});
		
		$('#deletemodal').on('shown.bs.modal', function(e) {
    // store the clicked element as data on the confirm button
    $('#confirmdeletebtn').data('triggered-from', e.relatedTarget);
  });
  
  $("#confirmdeletebtn").click(function() {
    // retrieve the button that triggered the action and use it
    var trigger = $(this).data('triggered-from');
    $(trigger).closest('tr').remove();
    $('#deletemodal').modal('hide');
  });
		$(document).on('click','#btnDetails',function(){
		 
			$('#addDetails').show();
			
	});
	

	$(document).keydown(function(e) {
			if (e.keyCode == 27) {
				$(".modal").modal("hide");
				$("#issue").click();
				
				
		}
		
	});
	
 	
		
	$(".clsbtn").keydown(function (e) {    
    if (e.which == 9) {
        $(".btn-remove").focus();
		e.preventDefault();
    }
	});
	
	$(".hintbtn,.prjDetails").keydown(function (e) {    
    if (e.which == 9) {
        $(".upload").css('outline','#00aeff solid 3px');
		
    }
	});
	$(document).on('keydown','#firstItem',function(e){
		if (e.which == 9 && e.shiftKey) {
         $(".upload").css('outline','#00aeff solid 3px'); 
		
    }
	});
	$(document).on('click','#createNewRow',function(e){
		if($(".tableRow").length>0){
         $("#btnExport").css('display','inline-block'); 
         $("#send").css('display','inline-block'); 
         $("#send").css('display','inline-block'); 
		 $("#tablerow").css('visibility','visible'); 
		}
	});
	$(".upload").keydown(function (e) {    
    if (e.which == 9) {
        $(".upload").removeAttr('style');
		
    }
	});
	$(".hintbtn").keydown(function (e) {    
    if (e.which == 9 && e.shiftKey) {
        $(".upload").removeAttr('style');
		
    }
	});
	$(".subreport").keydown(function (e) {    
    if (e.which == 9) {
        $(".btn-remove").focus();
		e.preventDefault();
    }
	});
	$(".btn-default,.addbtn").keydown(function (e) {    
    if (e.which == 9) {
        $(".btn-remove").focus();
		e.preventDefault();
    }
	});
	
		
			$(".hintbtn,.prjDetails,.sendreview").click(function () {
				$("#query").val('');
				
				setTimeout(function() { $('.btn-remove').focus(); }, 490);
				
					
				});
				$("table.table2excel").click(function () {
					
					setTimeout(function() { $('.btn-remove').focus(); }, 490);
				});
				
			$(".btn-remove").on('keydown', function (e) {
				if ((e.which == 9 && e.shiftKey)) {
					e.preventDefault();
					$(".clsbtn").focus();
					$(".subreport").focus();
					$(".btn-default").focus();
					$(".addbtn").focus();
				}
			});
			$(".clsbtn,.subreport,.addbtn").on('keydown', function (e) {
				if ((e.which == 9 && e.shiftKey)) {
					e.preventDefault();
					$(".searchbtn").focus();
					$("#testing").focus();
					$("#mailid").focus();
					
					
				}
			});
			$(".btn-default").on('keydown', function (e) {
				if ((e.which == 9 && e.shiftKey)) {
					e.preventDefault();
					$("#confirmdeletebtn").focus();
				}
			});
	
		//Check to see if the window is top if not then display button
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollToTop').fadeIn();
			} else {
				$('.scrollToTop').fadeOut();
			}
		});
	
		//Click event to scroll to top
		$('.scrollToTop').click(function(){
			$('html, body').animate({scrollTop : 0},800);
			return false;
		});
/* 		 if($("#rule,#level,#severity,#wcag").attr('readonly')){
		
			$("#rule,#level,#severity,#wcag").css('cursor','not-allowed'); 
		 } */
		
		var autosrc=$('#query').typeahead({        
			local: ['Alt text is missing for graphic','Alt text is not appropriate/descriptive for the graphic','Missing alt text for image buttons','Marking erroneous field in a form using colour without providing any descriptive textual information ','Heading levels are not in Meaningful Sequence','Form fields are not associated with the adjacent text using label tag and for attribute ','Form fields are not grouped','Using placeholders instead of label ','Missing label for controls.' ,'No text alternative for flow chart, concept map, etc.','Focus order not logical','Keyboard focus indicator not visible','Resizing text to 2X causes issue','Provide a mechanism to bypass blocks of content that are repeated on multiple Web pages.','Element not keyboard operable','Inconsistent Navigation w Keyboard - Navigational mechanisms repeated on multiple Web pages within a set of Web pages do not occur in the same relative order each time they are repeated. Exception: unless a change is initiated by the user.','Error not identified - Although an input error is automatically detected, the item that is in error is NOT identified and the error is NOT described to the user in text.','Error repair not suggested - Although an input error is automatically detected and suggestions for correction are known, the suggestions are not provided to the user, unless it would jeopardize the security or purpose of the content.','Errors not Prevented (Legal, Financial, Data) - For Web pages that cause legal commitments or financial transactions, that modify or delete user-controllable data, or that submit user test responses, at least one of the following is true: Reversible: Submissions are reversible.  Checked: Data entered by the user is checked for input errors and the user is provided an opportunity to correct them. Confirmed: A mechanism is available for reviewing, confirming, and correcting information before finalizing the submission.','Use header elements where appropriate.','Provide a mechanism to bypass blocks of content that are repeated on multiple Web pages.','Verify that important background image information is conveyed when the system is in high contrast mode.','Check the accessibility of linked documents.']
			});     
			$('.tt-query').css('background-color','#fff');
		
		
		/*	<!-- $('.tt-dropdown-menu').remove(); -->
			<!-- $('.tt-dropdown-menu').val(''); -->
			<!-- $( ".twitter-typeahead" ).autocomplete( "disable" ); -->
		<!-- $('.typeahead').typeahead('val', myVal); -->
		<!-- }); -->*/
			
		(function($) {
				$.fn.checkFileType = function(options) {
					var defaults = {
						allowedExtensions: [],
						success: function() {},
						error: function() {}
					};
					options = $.extend(defaults, options);
			
					return this.each(function() {
			
						$(this).on('change', function() {
							var value = $(this).val(),
								file = value.toLowerCase(),
								extension = file.substring(file.lastIndexOf('.') + 1);
			
							if ($.inArray(extension, options.allowedExtensions) == -1) {
								options.error();
								$(this).focus();
							} else {
								options.success();
			
							}
			
						});
			
					});
				};
			
			})(jQuery);
			
			$(function() {
				$('#image').checkFileType({
					allowedExtensions: ['jpg', 'jpeg'],
					success: function() {
						alert('Success');
					},
					error: function() {
						alert('Error');
					}
				});
						
		
	});
	
	
});
    