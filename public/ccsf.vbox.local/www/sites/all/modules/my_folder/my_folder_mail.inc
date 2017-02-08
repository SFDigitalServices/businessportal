<?php
/*
*
*/
function my_folder_mail_reset(){
	dpm('reset');
	$_SESSION['mailed']=false;
	drupal_goto('my-folder');
}


/*
* Send the email that contains their folder contents
* The contents are passed as a comma seperated list in the url
*/

function my_folder_mail($address){
	//dpm('mail');
	//dpm($address);
	//drupal_goto('my-folder');
	////////////////////// PREPARE THE ARRAY TO PASS TO $_GET /////
	
	$myfolder = my_folder_contents();
	// set up permits
	$permitID=array();
	//$permitTitle=array();
	// set up kits
	$kitID = array();
	//$kitTitle = array();
	// set up docs
	$docID = array();
	//$docTitle = array();
	$guideID = array();

	foreach( $myfolder as $type=>$index ){
		if($type == 'permit'){
			if(count($index)>0){
				foreach($index as $row){
					array_push($permitID,$row[0]);//permit NID
					//array_push($permitTitle,$row[1]);//permit Title
				}
			}
		}
		if($type == 'kit'){
			if(count($index)>0){
				foreach($index as $row){
					array_push($kitID,$row[0]);//kit ID
					//array_push($kitTitle,$row[1]);//kit title
				}
			}
		}
		if($type == 'doc'){
			if(count($index)>0){
				foreach($index as $row){
					array_push($docID, $row[0]);
					//array_push($docTitle,$row[1]);
				}
			}
		}
		if($type == 'guide'){
			if(count($index)>0){
				foreach($index as $row){
					array_push($guideID, $row[0]);
					//array_push($docTitle,$row[1]);
				}
			}
		}
	}
	
	if(count($permitID)>0){
		$stringify_permitID = implode(',',$permitID);
	}else{
		$stringify_permitID = '0';
	}
	
	if(count($kitID)>0){
		$stringify_kitID = implode(',',$kitID);
	}else{
		$stringify_kitID = '0';
	}
	
	if(count($docID)>0){
		$stringify_docID = implode(',',$docID);
	}else{
		$stringify_docID = '0';
	}

	if(count($guideID)>0){
		$stringify_guideID = implode(',',$guideID);
	}else{
		$stringify_guideID = '0';
	}



	$link = $GLOBALS['base_url'].'/my-folder/rebuild';
	$link .= '?permit='.$stringify_permitID;
	$link .= '&kit='.$stringify_kitID;
	$link .= '&doc='.$stringify_docID;
	$link .= '&guide='.$stringify_guideID;

	
	//////////////////////  PREPARE THE MESSAGE ////
	$message = '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
	$message .= '<head>';
		$message .= '<meta name="CCSF My Folder Contents" content="noindex, nofollow">';
		$message .=	'<title>My Folder List,'.date("m.d.y").' | San Francisco Business Portal</title>';
	$message .=	'</head>';

		$message .= '<body style="margin:0; padding:0; font-family: helvetica; font-size: 16px; line-height: 24px; color: #222;">';
			$message .= '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
				$message .=	'<tbody>';
					$message .= '<tr>';
						$message .=	'<td style="padding: 20px;">';
							$message .=	'<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width: 620px; font-family: helvetica; font-size: 16px; width=" 100%"="" line-height:="" 24px;="" color:="" #222;"="">';
								$message .=	'<tbody>';
									$message .= '<tr valign="top">';
									/**///$message .= '<tbody>';
										$message .=	'<td align="center" style="padding: 20px 0;">';
											$message .= '<img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/header/header_logo.png'.'" style="width:250px; height:110px;"/>';
											$message .=	'<p style="margin:auto; width:75%; padding:20px 0; color: #aaa; font-size: 20px; line-height: 26px;">Your resources have arrived! Starter kits, guides, permits and licenses &#8212; get back to them all anytime by clicking the button below. Still have more questions? Go ahead and <a href="http://businessportal.sfgov.org/contact">contact us</a>. Meanwhile, best of luck with your business.</p>';
										$message .=	'</td>';
									$message .=	'</tr>';

									$message .=	'<tr valign="top">';
										$message .=	'<td align="center" style="padding: 20px 0;">';
											$message .= '<a href="'.$link.'"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/link-myfolder.png" alt="View My Folder" /></a>';
										$message .=	'</td>';
									$message .=	'</tr>';
								
									//$message .= '<table bgcolor="#EEEEEE">';
										//$message .= '<tbody>';
											if(count($myfolder['kit'])>0){
												$message .=	'<tr valign="top" bgcolor="#eeeeee">';
													$message .=	'<td style="padding: 0 30px 30px 30px;">';
														$message .=	'<h2 style="border-top: 1px solid #dfdfdf; margin:0 0 15px 0; padding: 30px 0 0 0; color: #222; font-size: 24px; line-height: 30px; font-weight: 400;">Starter Kits <span style="color:#aaa;">('.count($myfolder['kit']).')</span></h2>';
														$message .=	'<table width="100%" border="0" cellpadding="0" cellspacing="0">';
															$message .= '<tbody>';
																foreach($myfolder['kit'] as $row){
																	$message .= '<tr valign="top">';
																		$message .=	'<td width="20" style="width: 30px; padding-right:5px;"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/icon-bullet.png" /></td>';
																		$message .=	'<td valign="top" style="color:#222; font-size:16px; padding-bottom: 5px; width:100%;">'. $row[1] .'</td>';
																	$message .= '</tr>';
																}
															$message .= '</tbody>';
														$message .=	'</table>';
													$message .= '</td>';
												$message .=	'</tr>';
											}

											if(count($myfolder['permit'])>0){
												$message .=	'<tr valign="top" bgcolor="#eeeeee">';
													$message .=	'<td style="padding:0 30px 30px 30px;">';
														$message .=	'<h2 style="border-top: 1px solid #dfdfdf; margin:0 0 15px 0; padding: 30px 0 0 0; color: #222; font-size: 24px; line-height: 30px; font-weight: 400;">Permits <span style="color:#aaa;">('.count($myfolder['permit']).')</span></h2>';
														$message .= '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
															$message .=	'<tbody>';
																foreach($myfolder['permit'] as $row){
																	$message .= '<tr valign="top">';
																		$message .=	'<td width="20" style="width: 30px; padding-right:5px;"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/icon-bullet.png" /></td>';
																		$message .=	'<td valign="top" style="color:#222; font-size:16px; padding-bottom: 5px; width:100%;">'.$row[1].'</td>';
																	$message .= '</tr>';
																}
															$message .= '</tbody>';
														$message .=	'</table>';
													$message .= '</td>';
												$message .=	'</tr>';
											}

											if(count($myfolder['doc'])>0){
												$message .=	'<tr valign="top" bgcolor="#eeeeee">';
													$message .=	'<td style="padding:0 30px 30px 30px;">';
														$message .=	'<h2 style="border-top: 1px solid #dfdfdf; margin:0 0 15px 0; padding:30px 0 0 0; color: #222; font-size: 24px; line-height: 30px; font-weight: 400;">Documents <span style="color:#aaa;">('.count($myfolder['doc']).')</span></h2>';
														$message .= '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
															$message .=	'<tbody>';
																foreach($myfolder['doc'] as $row){
																	$message .= '<tr valign="top">';
																		$message .=	'<td width="20" style="width: 30px; padding-right:5px;"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/icon-bullet.png" /></td>';
																		$message .=	'<td valign="top" style="color:#222; font-size:16px; padding-bottom: 5px; width:100%;">'.$row[1].'</td>';
																	$message .= '</tr>';
																}
															$message .= '</tbody>';
														$message .=	'</table>';
													$message .= '</td>';
												$message .=	'</tr>';
											}

											if(count($myfolder['guide'])>0){
												$message .=	'<tr valign="top" bgcolor="#eeeeee">';
													$message .=	'<td style="padding:0 30px 30px 30px;">';
													$message .=	'<h2 style="border-top: 1px solid #dfdfdf; margin:0 0 15px 0; padding:30px 0 0 0; color: #222; font-size: 24px; line-height: 30px; font-weight: 400;">Guides <span style="color:#aaa;">('.count($myfolder['guide']).')</span></h2>';
														$message .= '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
															$message .=	'<tbody>';
																foreach($myfolder['guide'] as $row){
																	$message .= '<tr valign="top">';
																		$message .=	'<td width="20" style="width: 30px; padding-right:5px;"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/icon-bullet.png" /></td>';
																		$message .=	'<td valign="top" style="color:#222; font-size:16px; padding-bottom: 5px; width:100%;">'.$row[1].'</td>';
																	$message .= '</tr>';
																}
															$message .= '</tbody>';
														$message .=	'</table>';
													$message .= '</td>';
												$message .=	'</tr>';
											}
											/*
											$message .= '<tr valign="top" bgcolor="#eeeeee">';
												$message .= '<td style="padding:0 30px 30px 30px;">';
													$message .=	'<div style="border-top: 1px solid #dfdfdf; padding:20px 0 0 0"><a href="'.$link.'" title="View My Folder"><img src="'.$GLOBALS["base_url"].'/sites/all/themes/ccsf_theme/images/graphics/link-myfolder.png" alt="View My Folder" /></a></div>';
												$message .= '</td>';
											$message .= '</tr>';
											*/
											$message .=	'<tr valign="top" bgcolor="#eeeeee">';
												$message .=	'<td style="padding: 0 30px 20px 30px; font-size: 12px; line-height: 16px; color: #333;">';
													$message .= '<p style="border-top: 1px solid #dfdfdf; padding:20px 0 0 0">San Francisco Business Portal | <a href="http://www.businessportal.sfgov.org" style="color: #0080ef; text-decoration: none;">businessportal.sfgov.org</a></p>';
												$message .= '</td>';
											$message .= '</tr>';
										//$message .= '</tbody>';
									//$message .= '</table>';
								$message .= '</tbody>';
							$message .=	'</table>';
						$message .= '</td>';
					$message .= '</tr>';
				$message .= '</tbody>';
			$message .= '</table>';
		$message .=	'</body>';
	$message .= '</html>';
  
  $message = wordwrap($message);

	//$address = 'imjameslarson@gmail.com';
	$subject = 'Your San Francisco Business Portal Folder List';

	$headers = "From: SF Business Portal<no-reply@businessportal.sfgov.org>\r\n";
	$headers .= "MIME-Version:1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	//mail($address,$subject,$message,$headers);
	if(mail($address,$subject,$message,$headers)){
		
	
		my_folder_mail_success();

	}else{
		//$page = my_folder_mail_response('fail');
		//ajax_deliver($page);	
		//dpm('fail');
		//drupal_goto('my-folder/mail-fail');
		my_folder_mail_fail();
	}
	
	
}

/*
* Recontructs their folder if they clicked the link in the email sent to them
* $_GET will hold 'permit' 'kit' and 'doc' as comma seperated strings
*/
function my_folder_rebuild(){
	
	$permits = explode(',',$_GET['permit']);
	$kit = explode(',',$_GET['kit']);
	$doc = explode(',',$_GET['doc']);
	$guide = explode(',',$_GET['guide']);
	//dpm($permits);
	foreach($permits as $item){
		my_folder_rebuild_add('permit',$item);
		dpm($item);
	}
	foreach($kit as $item){
		my_folder_rebuild_add('kit',$item);
	}
	foreach($doc as $item){
		my_folder_rebuild_add('doc',$item);
	}
	foreach($guide as $item){
		my_folder_rebuild_add('guide',$item);
	}

	drupal_goto('my-folder');
	
}
function my_folder_rebuild_add($type,$id){
	
	//check if it exists to prevent SQL injection
	if(my_folder_does_it_exist($type,$id) ){//item being added exists, will check all three types
		
		if( !isset($_SESSION['folder']) ){//if the $_SESSION array isnt set
			//dpm('init array');
			my_folder_init_array();
		}
		if($type == 'permit' || $type == 'doc' || $type == 'guide'){
			my_folder_check_and_add($type,$id);//check if its been added, if not adds it
		}
		if($type == 'kit'){
			my_folder_check_and_add_kit($type,$id);
		}	
	}else{//it item being added doesnt exist
		dpm('node doesnt exist');
		//this will catch the '0' value assigned in my_folder_mail() when the array for each type of item is empty (my folder contained none of that type)
	}

	
}
/*
function my_folder_mail_response($status){
	
	$commands = array();

	if($status=='success'){
		$successResponse = '<div class="mail-modal-contents"><h3>Your List has Been Sent</h3><p>Your My Folder list has successfully been sent.</p><div class="mail-modal-add-close"><p>Close</p></div></div>';
		$commands[]=ajax_command_replace('.mail-modal-contents',$successResponse);
		$page = array(
			'#type'=>'ajax',
			'#commands'=>$commands,
		);

		return $page;
	}
	if($status=='fail'){
		
	}

	
}
*/
/*
function my_folder_mail_form(){
	$form['start']=array(
		'#prefix'=>'<div>TEST</div>',
	);
	return $form;
}*/

function my_folder_mail_success(){
	$_SESSION['mail_status']='success';
	drupal_goto('my-folder');
}

function my_folder_mail_fail(){
	$_SESSION['mail_status']='fail';
	drupal_goto('my-folder');
}
function my_folder_mail_reset_status(){
	unset($_SESSION['mail_status']);
	//dpm('fancy');
	//$_SESSION['mail_status']='foobar';
	$commands=array();
	$commands[]=ajax_command_changed('.mail-modal-success');
	$pages = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);
	ajax_deliver($pages);
	//drupal_goto('my-folder');
}