<?php
/*
*
* Universally used download functions for the whole site
*
*/

/*
* download selected files as a .zip
*/
function my_folder_download_single_type($type, $items){// $items is a comma seperated string of items to download
	error_reporting(E_ALL);
	ini_set("display_errors", "On");

	$add = explode(',',$items);

	//$add=$items;
	dpm('start');
	//dpm($add);
	$files = array();
	//might change if files are uploaded to a different path
	$dir = 'SF-Business-Portal/';
	
	//creat the zip
	$zipname = 'zips/SF-Business-Portal.zip';
	$zip = new ZipArchive();

	if($zip->open($zipname, ZIPARCHIVE::CREATE)!=TRUE){
		//exit('cannot open ' . $zipname);
		dpm('cannot open ' . $zipname);
		exit;
	}

	// add all the items and organize them into folders
	if($type == 'permit'){
		$file_path = 'sites/default/files/forms/';
		foreach($add as $nid){
			$node = node_load($nid);
			//dpm($node);
			$title = $node->title;
			
			$files = my_folder_download_permits_prep($node);//returns array of file names
			
			//dpm($files);
			
			for($i=0; $i<count($files);$i++){
				if(file_exists($file_path.$files[$i]) && is_readable($file_path.$files[$i])){
					$zip->addFile( $file_path.$files[$i], $dir.'permits/'.$title.'/'.$files[$i] );
					dpm('add:'.$files[$i]);
				}
				//dpm('7');
				
			}
			//might want to check here that there are more that 0 files in the zip archive
			
		}

	}
	if($type == 'doc'){
		//finish this when documents are built out better
		$file_path = 'sites/default/files/documents/';
		foreach ($add as $nid){
			$node = node_load($nid);
			$title = $node->title;
			
			$file= $node->field_document_file['und'][0]['filename'];
			if(file_exists($file_path.$file) && is_readable($file_path.$file)){
				$zip->addFile($file_path.$file,$dir.'documents/'.$file);
			}		
		}
	}

	if($type=='guide'){
		$file_path = 'sites/default/files/';
		foreach ($add as $nid){
			$node = node_load($nid);
			$title = $node->title;
			//dpm($node);
			$file= $node->field_document['und'][0]['filename'];
			if(file_exists($file_path.$file) && is_readable($file_path.$file)){
				$zip->addFile($file_path.$file,$dir.'guides/'.$file);
			}
		}
	}

	if($type == 'kit'){
		foreach($add as $kitID){
			$kit = my_folder_prep_kit($kitID);
			
			$title = $kit[1];
			$files = my_folder_download_kit_prep($kit);//returns array of permits per section and their associated pdf's
			
			//	dpm($files);
			
			
			$guide_file_path = 'sites/default/files/';

			foreach($files[0] as $key=>$value){//guide section of the kit
				//dpm($value);
				
				if(file_exists($guide_file_path.$value) && is_readable($guide_file_path.$value)){
					$zip->addFile( $guide_file_path.$value , $dir.'starter-kits/'.$title.'/guides/'.$value );
				}else{
					//dpm('4');
					//dpm('no doc');
				}
				/*for($i=0;$i<count($value);$i++){
					//dpm($value[$i]);
					$zip->addFile( $file_path.$value[$i] , $dir.'starter-kits/'.$title.'/section-one/'.$key.'/'.$value[$i] );
				}*/
			}
			
			$doc_file_path = 'sites/default/files/documents/';

			foreach($files[1] as $key=>$value){//docs section of the kit
				
				
					if(file_exists($doc_file_path.$value) && is_readable($doc_file_path.$value)){
						$zip->addFile( $doc_file_path.$value , $dir.'starter-kits/'.$title.'/related-documents/'.$value );
					}else{
						//dpm('3');
						//dpm('no doc');
					}
				
			}

			$permit_file_path = 'sites/default/files/forms/';

			foreach($files[2] as $key=>$value){//Permits section fo the kit
				//dpm($key);
				for($i=0;$i<count($value);$i++){
					//dpm($value[$i]);
					
					if(file_exists($permit_file_path.$value[$i]) && is_readable($permit_file_path.$value[$i])){http://localhost:8888/vagrant/public/ccsf.vbox.local/www/node/1953
						$zip->addFile( $permit_file_path.$value[$i] , $dir.'starter-kits/'.$title.'/permits/'.$key.'/'.$value[$i] );
						//dpm($value[$i]);
						//dpm('1');
					}else{
						//dpm('2');
					}
				}
			}
			//drupal_goto('my-folder');

		}
	}

$filename = $zip->filename;
//dpm($filename);
$status = $zip->getStatusString();
//dpm($status);

	//echo ZipArchive::getStatusString;	
	/**************************************************************/
	//dpm($zip);
	if($zip->close()===false){
		//exit('Error creating ZIP file');
		dpm('Error creating ZIP file');

		drupal_goto('my-folder');
	}else{
		dpm('zip closed successfully');
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
        drupal_goto('my-folder');
        //exit('Could not find Zip file to download');
        //dpm('Could not find the ZIP file to download');
        exit;
    }
    
}

/*
* 	Gets all the file names of the forms from a permit entry
*/
function my_folder_download_permits_prep($node){
	$files=array();

	if( count($node->field_form_1_pdf)>0 ){
		array_push($files,$node->field_form_1_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_2_pdf)>0 ){
		array_push($files,$node->field_form_2_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_3_pdf)>0 ){
		array_push($files,$node->field_form_3_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_4_pdf)>0 ){
		array_push($files,$node->field_form_4_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_5_pdf)>0 ){
		array_push($files,$node->field_form_5_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_6_pdf)>0 ){
		array_push($files,$node->field_form_6_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_7_pdf)>0 ){
		array_push($files,$node->field_form_7_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_8_pdf)>0 ){
		array_push($files,$node->field_form_8_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_9_pdf)>0 ){
		array_push($files,$node->field_form_9_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_10_pdf)>0 ){
		array_push($files,$node->field_form_10_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_11_pdf)>0 ){
		array_push($files,$node->field_form_11_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_12_pdf)>0 ){
		array_push($files,$node->field_form_12_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_13_pdf)>0 ){
		array_push($files,$node->field_form_13_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_14_pdf)>0 ){
		array_push($files,$node->field_form_14_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_15_pdf)>0 ){
		array_push($files,$node->field_form_15_pdf['und'][0]['filename']);
	}
	if( count($node->field_form_16_pdf)>0 ){
		array_push($files,$node->field_form_16_pdf['und'][0]['filename']);
	}

	return $files;
}

/*
* a function that preps the file names of the permits containted in a starter kit 
*/

function my_folder_download_kit_prep($kit){
	$files=array();

	$sectionOne=array();
	//GUIDE SECTION NEEDS TO BE ADDRESSED
	foreach($kit[2] as $item){//first section of the starter kit, GUIDES
		if(isset($item[0])){
			
			$node=node_load($item[0]);
			$title = $node->title;
			dpm($node);
			//$nodefiles = my_folder_download_permits_prep($node);
			$guideFile= $node->field_document['und'][0]['filename'];

				//$zip->addFile($file_path.$file,$dir.'guides/'.$file);
			$sectionOne[$title]=$guideFile;
		}
	}
	array_push($files,$sectionOne);

	$sectionTwo=array();
	foreach($kit[3] as $item){//second section of the starter kit, DOCS
				
		if(isset($item[0])){
			$node=node_load($item[0]);
			$title=$node->title;
			//$nodefiles = my_folder_download_permits_prep($node);
			//dpm($node);
			$nodefiles=$node->field_document_file['und'][0]['filename'];
			$sectionTwo[$title]=$nodefiles;
			//dpm($sectionOne);
			//drupal_goto('my-folder');
		}		
		
	}
	//dpm($sectionTwo);
	array_push($files,$sectionTwo);

	$sectionThree=array();
	foreach($kit[4] as $item){//thrid section of starter kit, PERMITS
		if(isset($item[0])){
			$node=node_load($item[0]);
			$title=$node->title;
			$nodefiles=my_folder_download_permits_prep($node);
			$sectionThree[$title]=$nodefiles;	
		}
		
	}
	array_push($files,$sectionThree);
	//dpm($files);
	return $files;
}

