<?php 
/*
contact us captcha integration
*/
?>

<?php 
 
ob_start();
session_start();
 
include_once($GLOBALS['base_url'].'/sites/all/modules/ccsf_contact/recaptcha-php-1.11/recaptchalib.php');
 
         //Recaptcha Settings
       $publickey = "6LeR4_cSAAAAALdpQCoMOgq6mkI3G2Cm1-iyt-s3"; // you got this from the signup page
	   $privatekey = "6LeR4_cSAAAAAEXrsWvbLa3pSIl0gO-yNXdV0fqL";
 
 
	//curl method posting
	//extract data from the post
      extract($_POST);
 
		if ($submit){
 
		$ok = 1;
 
		 $resp = recaptcha_check_answer ($privatekey,
                                $_SERVER["REMOTE_ADDR"],
                                $_POST["recaptcha_challenge_field"],
                                $_POST["recaptcha_response_field"]);
 
		 if (!$resp->is_valid) {
			  $ok = 0;
			}
 
	if ($ok){		
		//set POST variables
		$url = 'https://www.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8';
		$fields = array(
					'oid'=>urlencode($oid),
					'retURL'=>urlencode($retURL),
					'name'=>urlencode($name),
					'email'=>urlencode($email),
					'phone'=>urlencode($phone),
					'00N40000002qX56'=>urlencode($reach_me_field),
					'00N40000002qX4h'=>urlencode($subject_field),
					'00N40000002qX4r'=>urlencode($message_field)
				);
 
		//url-ify the data for the POST
		foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
		rtrim($fields_string,'&');
 
		//print_r($fields_string);
 
		//open connection
		$ch = curl_init();
 
		//set the url, number of POST vars, POST data
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_POST,count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
 
		//execute post
		$result = curl_exec($ch);
 
		//close connection
		curl_close($ch);
 
	} //if ok
	else {
			  drupal_goto('contact');
			  dpm('wrong captcha');
			  echo "<h4>Sorry - Invalid Captcha </h4>";
			}	
 
 
 } //if submit.
 ?>