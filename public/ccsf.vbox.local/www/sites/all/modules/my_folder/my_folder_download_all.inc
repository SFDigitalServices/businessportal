<?php 
/*
* Download all function
*/

/*
* download all or all of a type, dispatches the call to the appropriate function according to type
*/
function my_folder_download_all($type){
	
	if($type=='all'){
		//dpm('start whole');
		my_folder_download_whole_folder();
	}

	if($type=='permit'){
		$permitList=array();
		foreach($_SESSION['folder']['permit'] as $permit=>$nid){
			array_push($permitList,$nid);
		}
		$permitList=implode(',',$permitList);
		//dpm($permitList);
		my_folder_download_single_type('permit',$permitList);
	}

	if($type=='doc'){
		$docList=array();
		foreach($_SESSION['folder']['doc'] as $doc=>$nid){
			array_push($docList,$nid);
		}
		$docList=implode(',',$docList);
		my_folder_download_single_type('doc',$docList);
	}

	if($type=='guide'){
		$guideList=array();
		foreach($_SESSION['folder']['guide'] as $guide=>$nid){
			array_push($guideList,$nid);
		}
		$guideList=implode(',',$guideList);
		my_folder_download_single_type('guide',$guideList);
	}
	if($type=='kit'){
		$kitList=array();
		foreach($_SESSION['folder']['kit'] as $kit){
			array_push($kitList,$kit[0]);
		}
		$kitList=implode(',',$kitList);
		my_folder_download_single_type('kit',$kitList);
	}
}

function my_folder_download_whole_folder(){
	$files = array();
	//might change if files are uploaded to a different path
	$dir = 'SF-Business-Portal/';
	
	$permit_file_path = 'sites/default/files/forms/';
	$doc_file_path = 'sites/default/files/documents/';
	$guide_file_path = 'sites/default/files/guide/';

	//creat the zip
	$zipname = 'zips/SF-Business-Portal.zip';
	$zip = new ZipArchive();

	if($zip->open($zipname, ZIPARCHIVE::CREATE)!=TRUE){
		//exit('cannot open ' . $zipname);
		dpm('cannot open ' . $zipname);
		exit;
	}

///////////////add permits/////////////
	
	$permitList=array();
	foreach($_SESSION['folder']['permit'] as $permit=>$nid){
		array_push($permitList,$nid);
	}
	//$permitList=implode(',',$permitList);

	
	foreach($permitList as $nid){
		$node = node_load($nid);
		//dpm($node);
		$title = $node->title;
		
		$files = my_folder_download_permits_prep($node);//returns array of file names
		
		//dpm($files);
		
		for($i=0; $i<count($files);$i++){
			if(file_exists($permit_file_path.$files[$i]) && is_readable($permit_file_path.$files[$i])){
				$zip->addFile( $permit_file_path.$files[$i], $dir.'permits/'.$title.'/'.$files[$i] );
				//dpm('add permit 1');
			}else{
				//dpm('no permit 1');
			}
			
			//dpm('add'.$files[$i]);
		}
		//might want to check here that there are more that 0 files in the zip archive	
	}
	//dpm('permit');
	//dpm($zip);
////////////////add docs////////////
	$docList=array();
	foreach($_SESSION['folder']['doc'] as $doc=>$nid){
		array_push($docList,$nid);
	}
	//$docList=implode(',',$docList);

	
	foreach ($docList as $nid){
		$node = node_load($nid);
		$title = $node->title;
		
		$file= $node->field_document_file['und'][0]['filename'];
		//dpm($file);
		if(file_exists($doc_file_path.$file) && is_readable($doc_file_path.$file)){
			$zip->addFile($doc_file_path.$file,$dir.'documents/'.$file);
			//dpm('add doc 1');
		}else{
			//dpm('no doc 1');
		}
		
	}
	//dpm('doc');
	//dpm($zip);
/////////////////add guides//////////////
	$guideList=array();
	foreach($_SESSION['folder']['guide'] as $guide=>$nid){
		array_push($guideList,$nid);
	}

	
	foreach ($guideList as $nid){
		$node = node_load($nid);
		$title = $node->title;
		//dpm($node);
		$file= $node->field_document['und'][0]['filename'];
		//dpm($file);
		if(file_exists($guide_file_path.$file) && is_readable($guide_file_path.$file)){
			$zip->addFile($guide_file_path.$file,$dir.'guides/'.$file);
			//dpm('add guide 1');
		}else{
			//dpm('no guide 1');
		}
		
	
	}
	//dpm('guide');
	//dpm($zip);

	
////////////////add kits//////////////
	//if($type == 'kit'){
	$kitList=array();
	foreach($_SESSION['folder']['kit'] as $kit){
		array_push($kitList,$kit[0]);
	}
	//dpm($kitList);
	foreach($kitList as $kitID){
		$kit = my_folder_prep_kit($kitID);
		//dpm($kit);
		$title = $kit[1];
		$files = my_folder_download_kit_prep($kit);//returns array of permits per section and their associated pdf's
		
		//dpm($files);
		
		foreach($files[0] as $key=>$value){//guide section of the kit
			//dpm($value);
			if(file_exists($guide_file_path.$value) && is_readable($guide_file_path.$value)){
				$zip->addFile( $guide_file_path.$value , $dir.'starter-kits/'.$title.'/guides/'.$value );
				//dpm('add kit guide');
			}else{
				//dpm('no guide 2');
			}
		}
		
		
		
		foreach($files[1] as $key=>$value){//docs section of the kit
				//dpm($value);
				if(file_exists($doc_file_path.$value) && is_readable($doc_file_path.$value)){
					$zip->addFile( $doc_file_path.$value , $dir.'starter-kits/'.$title.'/related-documents/'.$value );
					//dpm('add kit doc');
				}else{
					//dpm('no doc 2');
				}
		}
		
		

		foreach($files[2] as $key=>$value){//Permits section fo the kit
			//for($i=0;$i<count($key);$i++){
			foreach($value as $file){	
				//dpm($file);
				if(file_exists($permit_file_path.$file) && is_readable($permit_file_path.$file)){
					$zip->addFile( $permit_file_path.$file , $dir.'starter-kits/'.$title.'/permits/'.$key.'/'.$file );
					//dpm('add kit permit');
				}else{
					//dpm('no permit 2');
				}
			//}
			}
		}
	}
	//dpm('kit');
	//dpm($zip);

//dpm(filesize($zipname));
///////////////////////// send zip ///////////////////////
	if($zip->close()===false){
		dpm('Error creating ZIP file');
		drupal_goto('my-folder');
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