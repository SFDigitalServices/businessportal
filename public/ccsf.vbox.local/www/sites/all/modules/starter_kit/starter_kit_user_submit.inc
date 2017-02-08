<?php
/**
*
* add to cart functions for ajax calls
* this ties the starter_kit module together closely with the basic_cart
*
*/

function starter_kit_add($items){//comma seperated list because we are passing an array through the URL via menu hook system

	$add=explode(',',$items);
	
	foreach($add as $nid){

		$node = node_load($nid);
	    $node->basic_cart_quantity = 1;
		$_SESSION['basic_cart']['cart'][$nid] = $node;
		
	}
	
	
}

/*
* DEPRICATED all downloads are handled vis my folder module now 
* download selected files as a .zip
*/
function starter_kit_download($items){//items is an array of the id's of items to download

	//$add = explode(',',$items);
	$add=$items;
	//dpm('add');
	//dpm($add);
	$files = array();
	$file_path = 'sites/default/files/permits/';//might change if files are uploaded to a different path
	$dir = 'my-folder/';

	//print_r($add);
	foreach($add as $nid){
		$node = node_load($nid);
		//dpm($node);
		$file_name = $node->field_pdf['und'][0]['filename'];//the file field of the node. might need to update if the content type ever changes
		//
		if(file_exists($file_path.$file_name)){
			
			array_push($files,$file_name);
			//dpm('push');
		}else{
			//dpm('file not found');
		}
	}

	
	$zipname = 'my-folder.zip';
	$zip = new ZipArchive();

	if($zip->open($zipname, ZIPARCHIVE::CREATE)!=TRUE){
		//exit('cannot open ' . $zipname);
		dpm('cannot open ' . $zipname);
		exit;
	}

	foreach($files as $file){
		if(file_exists($file_path.$file)){
			$zip->addFile($file_path.$file,$dir.$file);
		}
	}

	if($zip->close()===false){
		//exit('Error creating ZIP file');
		dpm('Error creating ZIP file');
		exit;
	}
	//dpm(filesize($zipname));
	 
	if(file_exists($zipname)){
        
        header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename="'.basename($zipname).'"'); 
		header('Content-Transfer-Encoding: binary');
		header('Connection: Keep-Alive');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-Length: ' . filesize($zipname));
		ob_clean();
		ob_end_flush();
        readfile($zipname);
        //delete file to prevent from downloading old requests
        unlink($zipname);
        exit;
    }else{//zip file wasnt there
        drupal_set_message(t('Count not find Zip file to download'));
        //exit('Could not find Zip file to download');
        //dpm('Could not find the ZIP file to download');
        exit;
    }
}
