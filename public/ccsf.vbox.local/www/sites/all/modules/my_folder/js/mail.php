<?php

$address='imjameslarson@gmail.com';
$message = 'foobar';


$subject = 'Your CCSF Folder';

	$headers = "From: SF Business Portal<no-reply@ccsf.com>\r\n";
	$headers .= "MIME-Version:1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

	//mail($address,$subject,$message,$headers);
	if(mail($address,$subject,$message,$headers)){
		print 'success';
		exit;
	}else{
		exit;
	}


?>