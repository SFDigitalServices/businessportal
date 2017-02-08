<?php
/*
*
*	Functions for the cart-like features of 'my folder' 
*
*/
//dpm(ddebug_backtrace());
function my_folder_add($type,$id){
	$items = explode(',',$id);

    if( !isset($_SESSION['folder']) ){//if the $_SESSION array isnt set
        my_folder_init_array();
    }

    if($type == 'permit' || $type == 'doc' || $type == 'guide'){//add either permit or doc
        foreach($items as $key){
            my_folder_check_and_add($type,$key);//check if its been added, if not adds it
        }
    }
    if($type == 'kit'){
        my_folder_check_and_add_kit($type,$id);//if its a kit, only one will ever be added at once, no need to loop over the exploded array.
    }

    $page = my_folder_add_ajax_response();
    ajax_deliver($page);

	exit;
}
/*
* Called by my_folder_add();
* a function to check if the item has been added to the folder yet
* adds the item if its not been added yet
*/
function my_folder_check_and_add($type,$id){
	if( count($_SESSION['folder'][$type]) > 0 ){//if their are permits added already
		//dpm('more than 0');
		$already = false;
		foreach($_SESSION['folder'][$type] as $index){//check if this one has been added already
			
			if( $index == $id ){
				//dpm('already added');
				$already = true;
			}
		}
		if($already==false){// if it hasnt been added
			array_push($_SESSION['folder'][$type],$id);
			my_folder_add_recent($type,$id);
		}
	}else{//dont need to check if its in the folder already since the folder is empty
		array_push($_SESSION['folder'][$type],$id);
		my_folder_add_recent($type,$id);
	}
}
/*
* Add a starter kit, this expands the kit into an array that we can later remove items from
*/
function my_folder_check_and_add_kit($type,$id){
	if( count($_SESSION['folder'][$type]) > 0 ){//if a kit has been added already

		$already=false;
		$position = 0;

		for($i=0; $i< count($_SESSION['folder'][$type]); $i++){//check if current kit has been added yet
			if ( $_SESSION['folder'][$type][$i][0] == $id){
				$position = $i;
				$already=true;
				
				$newkit = my_folder_prep_kit($id);//get the contents of the kit 
				$_SESSION['folder'][$type][$i]=$newkit;//re-populate the kit that has been stored, in case any were removed and the user is re-adding the kit to restore them
			}
		}
		if($already == false){//if its not there, add it
			$newkit = my_folder_prep_kit($id);
			array_push($_SESSION['folder'][$type],$newkit);
			my_folder_add_recent($type,$id);
		}
	}else{//no kits are added, dont need to check if the one being added is there already
		$newkit = my_folder_prep_kit($id);
		array_push($_SESSION['folder'][$type],$newkit);
		my_folder_add_recent($type,$id);
	}
}
/*
* prep an array of an expanded starter kit and all its sections
*/
function my_folder_prep_kit($id){
		$kit_item=array();
		$kit = my_folder_get_starter_kit($id);
		foreach($kit as $index){
			array_push($kit_item,$index->id);
			array_push($kit_item,$index->title);
			
			$f1=explode(',',$index->f1);
			$f1_full = my_folder_expand_starter_kit($f1,'guide');
			//dpm($f1_full);
			array_push($kit_item,$f1_full);

			$f2=explode(',',$index->f2);
			$f2_full = my_folder_expand_starter_kit($f2,'doc');
			array_push($kit_item,$f2_full);

			$f3=explode(',',$index->f3);
			$f3_full = my_folder_expand_starter_kit($f3,'permit');
			array_push($kit_item,$f3_full);

			array_push($kit_item,$index->info);

			//$f4=explode(',',$index->f4);
			//$f4_full = my_folder_expand_starter_kit($f4);
			//array_push($kit_item,$f4_full);

			//$f5=explode(',',$index->f5);
			//$f5_full = my_folder_expand_starter_kit($f5);
			//array_push($kit_item,$f5_full);

		} 
		return $kit_item;
}
/*
*	Add to the recently added queue
*/
function my_folder_add_recent($type,$id){
	if($type != 'kit'){
		$node = my_folder_get_node($id);
		foreach($node as $key){
			$title = $key->title;
		}
	}else{
		$kit = my_folder_get_starter_kit($id);
		foreach($kit as $key){
			$title = $key->title;
		}
	}
	//dpm($title);	
	$recentItem = array(
		'type'=>$type,
		'id'=>$id,
		'title'=>$title,
	);
	//dpm('recent add');
	//if( count($_SESSION['folder']['recent']) < 5 ){

		array_push( $_SESSION['folder']['recent'],$recentItem );
	//}
	//if( count($_SESSION['folder']['recent']) >= 5 ){
	//	array_shift( $_SESSION['folder']['recent'] );
	//	array_push( $_SESSION['folder']['recent'],$recentItem );
	//}	
}




/*
* helper function, checks if the node or kit being added to my folder exists
*/
function my_folder_does_it_exist($type,$id){

	$exists = FALSE;

	switch($type){
		case 'kit':
				//check the starter kits table
			if( my_folder_check_kit($id) != false ){
				//dpm(t('kit exists'));
				$exists = TRUE;
			}else{
				//dpm(t('kit doesnt exist'));
			}
			break;
		case 'doc':
				//check the node table for doc with nid=$id
			if( my_folder_check_node($id) != false ){
				//dpm(t('permit exists'));	
				$exists = TRUE;
			}else{
				//dpm(t('permit doesnt exist'));
			}
			break;
		case 'permit':
				
			if( my_folder_check_node($id) != false ){
				//dpm(t('permit exists'));	
				$exists = TRUE;
			}else{
				//dpm(t('permit doesnt exist'));
			}
			break;
		case 'guide':
			if( my_folder_check_node($id) != false ){
				$exists = TRUE;
			}else{
				//the guide doesnt exist
			}
			break;
	}

	return $exists;
}

//simple set up for the my folder arrays
function my_folder_init_array(){
	if( !isset($_SESSION['folder']) ){
		$_SESSION['folder']=array();
	}
	if( !isset($_SESSION['folder']['recent']) ){
		$_SESSION['folder']['recent']= array();
	}
	if( !isset($_SESSION['folder']['permit']) ){
		$_SESSION['folder']['permit']= array();
	}
	if( !isset($_SESSION['folder']['doc']) ){
		$_SESSION['folder']['doc']= array();
	}
	if( !isset($_SESSION['folder']['kit']) ){
		$_SESSION['folder']['kit']= array();
	}
	if( !isset($_SESSION['folder']['guide']) ){
		$_SESSION['folder']['guide']=array();
	}
	
}

/*
* count the contents of my folder
*/
function my_folder_contents_count(){
	 

	 $count = count($_SESSION['folder']['permit'])+count($_SESSION['folder']['doc'])+count($_SESSION['folder']['kit'])+count($_SESSION['folder']['guide']);

	return $count;
}

/*
* Prep the ajax response
*/
function my_folder_add_ajax_response(){
	
	$count = my_folder_contents_count();

	$newCount = '<h2 id="my-folder-count">'.$count.'</h2>';
	$newWidgetContent = my_folder_new_widget_content();

	$commands = array();
	$commands[]=ajax_command_replace('#my-folder-count',$newCount);
	$commands[]=ajax_command_replace('#my-folder-names',$newWidgetContent);
	$commands[]=ajax_command_changed('#my-folder-widget-dot');
	$page = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);

	return $page;
}


/*
* Prep new contents for the folder widget to be returned by ajax call
*/
function my_folder_new_widget_content(){
	
	$newCount = my_folder_contents_count();
	
	$recentCount = 0;

	if ($newCount<=5) {
		$recentCount=$newCount;
	}else{
		$recentCount=5;
	}

	$newWidgetContent = '<div id="my-folder-names" class="test">';
	$newWidgetContent .= '<p class="my-folder-info">You have <strong>'.$newCount .'</strong> resources in your folder. Below are the <strong>'.$recentCount.'</strong> most recently added.</p>';
	
	$recentItems = array_reverse ($_SESSION['folder']['recent'],true);
	$i=0;
	foreach($recentItems as $key){
		//$newWidgetContent .= '<pre>';
		//$newWidgetContent .= print_r($key);
		//$newWidgetContent .= '</pre>';
		if($i<5){
			$newWidgetContent .= '<p class="my-folder-title" id="node-'.$key['id'].'">'.$key['title'].'</p>';
			$i++;
		}
	}

	$newWidgetContent .= '<a href="'.base_path().'my-folder"><p class="my-folder-view-link">View all in my folder</p></a>';
	$newWidgetContent .= '</div>';

	//dpm($newWidgetCount);
	return $newWidgetContent;
	
	/*
		<div id="my-folder-names">
			<p class='my-folder-info'>You have <strong><?php echo $newCount; ?></strong> resources in your folder. Below are the <strong><?php echo $recentCount; ?></strong> most recently added.</p>
			<?php foreach($myfolder['recent'] as $key) : ?>
				<p class="my-folder-title" id="node-<?php echo $key['id']; ?>"><?php echo $key['title']; ?></p>
				
			<?php endforeach; ?>
			
			<a href='<?php echo base_path().'my-folder'; ?>' ><p class='my-folder-view-link'>View all in my folder</p></a>
		</div>
	*/
}

