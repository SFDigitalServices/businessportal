<?php 
/*
* My folder remove actions
*/


/*
*	Remove one item from my folder, only used behind the scenes by us, not the user
*/
function my_folder_remove_single($type,$id){
	//if not a kit
	if($type!='kit'){
		foreach($_SESSION['folder'][$type] as $key=>$value){
			if($value==$id){
				//dpm('unset');
				unset($_SESSION['folder'][$type][$key]);
			}
		}
	}
	//if a kit
	if($type=='kit'){
		//dpm('kit remove');
		foreach($_SESSION['folder'][$type] as $key){
			if($key[0]==$id){
				$arIndex = array_search($key,$_SESSION['folder'][$type]);
				unset($_SESSION['folder'][$type][$arIndex]);
			}
		}
	}
	//remove from recent items array
	foreach($_SESSION['folder']['recent'] as $key){
		//dpm($key['id']);
		if($key['id'] == $id){
			//dpm($key);
			$arIndex = array_search($key,$_SESSION['folder']['recent']);
			//dpm($kx);
			unset($_SESSION['folder']['recent'][$arIndex]);
		}
	}	

	/*$kitCount=count($_SESSION['folder']['kit']);
	$permitCount=count($_SESSION['folder']['permit']);
	$docCount=count($_SESSION['folder']['doc']);
	$guideCount=count($_SESSION['folder']['guide']);
	$totalCount = $kitCount+$permitCount+$docCount+$guideCount;

	if($totalCount > 0){
		$page = my_folder_remove_ajax_response($id);
		ajax_deliver($page);
	}	   
	if( $totalCount == 0 ){
		$page = my_folder_empty_ajax_response($id);
		ajax_deliver($page);
	}*/
	$page = my_folder_remove_ajax_response($id);
		ajax_deliver($page);
	//drupal_goto('my-folder');
}

/*
*	Remove all items of a type from my folder
*/
function my_folder_remove_all($type){
	
	if($type=='all'){
		unset($_SESSION['folder']);
		//drupal_goto('my-folder');
		//$page = my_folder_remove_all_ajax_response($type);
		//ajax_deliver($page);
	}
	if($type != 'all'){
		//check and remove it from recent items array
		foreach($_SESSION['folder']['recent'] as $key){
			if($key['type']==$type){
				//dpm('remove recent');
				$arIndex = array_search($key,$_SESSION['folder']['recent']);
				unset($_SESSION['folder']['recent'][$arIndex]);
			}
		}

		//remove all of a type
		$_SESSION['folder'][$type]=array();

		
	}
	
	$page = my_folder_remove_ajax_response(0);
	ajax_deliver($page);
	
}

/*
*	Remove one item from the starter kit in my folder
*/
function my_folder_remove_single_kit_item($kitID, $sectionID, $nid){
	//if($sectionID == 2){//guide section
		foreach($_SESSION['folder']['kit'] as &$key){
			
			if($key[0]==$kitID){
				//dpm($key[$sectionID]);
				foreach($key[$sectionID] as $index){
					
					if($index[0]==$nid){
						//dpm($index[0]);	
						$arIndex = array_search($index,$key[$sectionID]);
						unset($key[$sectionID][$arIndex]);
						//unset($_SESSION['folder']['kit'][$key][$sectionID][$arIndex]);
					}
				}
			}
		}
		unset($key);//prevent memory leak

	
	$page = my_folder_remove_single_kit_item_ajax_response($kitID,$sectionID,$nid);
	ajax_deliver($page);
	//}
	/*
	if($sectionID == 3){//related docs seciton
		foreach($_SESSION['folder']['kit'][3] as $key){
			if($key[0]==$nid){
				$arIndex = array_search($key,$_SESSION['folder']['kit'][3]);
				unset($_SESSION['folder']['kit'][3][$arIndex]);
			}
		}
	}
	if($sectionID == 4){//permits section

	}
	*/
	/*for( $i=0; $i < count($_SESSION['folder']['kit']); $i++ ){
		if( $_SESSION['folder']['kit'][$i][0] == $kitID ){
			for( $j=0; $j < count($_SESSION['folder']['kit'][$i][$sectionID]); $j++ ){
				if($_SESSION['folder']['kit'][$i][$sectionID][$j][0] == $nid){
					unset($_SESSION['folder']['kit'][$i][$sectionID][$j]);
				}
			}
		}
	}*/
	//drupal_goto('my-folder');
}

/*
* Remove one whole starter kit
*/
function my_folder_remove_kit($kitID){
	for($i=0; $i < count($_SESSION['folder']['kit']); $i++ ){
		if($_SESSION['folder']['kit'][$i][0] == $kitID){
			unset($_SESSION['folder']['kit'][$i]);
		}
	}
	$_SESSION['folder']['kit']=array_values($_SESSION['folder']['kit']);//this resets the indexs of the array after the unset function runs

	drupal_goto('my-folder');
}


//////////// AJAX ////////////
/*
* constuct the ajax response to removing an item
*/
function my_folder_remove_ajax_response($id){
	
	$kitCount=count($_SESSION['folder']['kit']);
	$permitCount=count($_SESSION['folder']['permit']);
	$docCount=count($_SESSION['folder']['doc']);
	$guideCount=count($_SESSION['folder']['guide']);
	$totalCount = $kitCount+$permitCount+$docCount+$guideCount;

	$commands = array();
	if($totalCount > 0 ){
		if($id != 0){
			$itemChanged = ".node-".$id;//the item that was removed
			$commands[]=ajax_command_changed($itemChanged);
		}
		

		//$permits = '<div class="my-folder-sidebar-permit-num">('.$permitCount.')</div>';
		//$commands[]=ajax_command_replace('.my-folder-sidebar-permit-num',$permits);

		

		

		

		if($kitCount>0){
			$kitHeading = '<div class="my-folder-kit-heading-num"><h2 class="count">('.$kitCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-kit-heading-num',$kitHeading);

			$kits = '<div class="my-folder-sidebar-kit-num">('.$kitCount.')</div>';
			$commands[]=ajax_command_replace('.my-folder-sidebar-kit-num',$kits);
		}
		if($kitCount==0){
			$kitHeading = '<div class="my-folder-kit-heading-num"><h2 class="count">('.$kitCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-kit-heading-num',$kitHeading);
			$commands[]=ajax_command_changed('#my-folder-starter-kits-wrap-inner');

			$kits = '<div id="my-folder-sidebar-kit"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Starter Kits</p> <div class="my-folder-sidebar-kit-num my-folder-sidebar-no-items-num">('.$kitCount.')</div></div>';
			$commands[]=ajax_command_replace('#my-folder-sidebar-kit',$kits);
		}

		if($permitCount>0){
			$permitHeading = '<div class="my-folder-permit-heading-num"><h2 class="count">('.$permitCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-permit-heading-num',$permitHeading);

			$permits = '<div class="my-folder-sidebar-permit-num">('.$permitCount.')</div>';
			$commands[]=ajax_command_replace('.my-folder-sidebar-permit-num',$permits);
		}	
		if($permitCount==0){
			$permitHeading = '<div class="my-folder-permit-heading-num"><h2 class="count">('.$permitCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-permit-heading-num',$permitHeading);
			$commands[]=ajax_command_changed('#my-folder-permits-wrap');

			$permits = '<div id="my-folder-sidebar-permit"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Permits & Licenses</p> <div class="my-folder-sidebar-permit-num my-folder-sidebar-no-items-num">('.$permitCount.')</div></div>';
			$commands[]=ajax_command_replace('#my-folder-sidebar-permit',$permits);
			
		}

		if($docCount>0){
			$docHeading = '<div class="my-folder-doc-heading-num"><h2 class="count">('.$docCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-doc-heading-num',$docHeading);

			$docs = '<div class="my-folder-sidebar-doc-num">('.$docCount.')</div>';
			$commands[]=ajax_command_replace('.my-folder-sidebar-doc-num',$docs);
		}
		if($docCount==0){
			$docHeading = '<div class="my-folder-doc-heading-num"><h2 class="count">('.$docCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-doc-heading-num',$docHeading);
			$commands[]=ajax_command_changed('#my-folder-doc-wrap');

			$docs = '<div id="my-folder-sidebar-doc"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Documents</p> <div class="my-folder-sidebar-doc-num my-folder-sidebar-no-items-num">('.$docCount.')</div></div>';
			$commands[]=ajax_command_replace('#my-folder-sidebar-doc',$docs);
		}

		if($guideCount>0){
			$guideHeading = '<div class="my-folder-guide-heading-num"><h2 class="count">('.$guideCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-guide-heading-num',$guideHeading);

			$guides = '<div class="my-folder-sidebar-guide-num">('.$guideCount.')</div>';
			$commands[]=ajax_command_replace('.my-folder-sidebar-guide-num',$guides);	
		}
		if($guideCount==0){
			$guideHeading = '<div class="my-folder-guide-heading-num"><h2 class="count">('.$guideCount.')</h2></div>';
			$commands[]=ajax_command_replace('.my-folder-guide-heading-num',$guideHeading);
			$commands[]=ajax_command_changed('#my-folder-guide-wrap');

			$guides = '<div id="my-folder-sidebar-guide"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Guides</p> <div class="my-folder-sidebar-guide-num my-folder-sidebar-no-items-num">('.$guideCount.')</div></div>';
			$commands[]=ajax_command_replace('#my-folder-sidebar-guide',$guides);
		}

		$bannerCount = '<div class="banner-img-wrap"><p>'.$totalCount.'</p></div>';
		$commands[]=ajax_command_replace('.banner-img-wrap',$bannerCount);

		$bannerInlineCount = '<span class="banner-inline-count">'.$totalCount.'</span>';
		$commands[]=ajax_command_replace('.banner-inline-count',$bannerInlineCount);

		
	}
	if($totalCount == 0){
		$bannerCount = '<div class="banner-img-wrap"><p>'.$totalCount.'</p></div>';
		$commands[]=ajax_command_replace('.banner-img-wrap',$bannerCount);

		$bannerInlineCount = '<span class="banner-inline-count">'.$totalCount.'</span>';
		$commands[]=ajax_command_replace('.banner-inline-count',$bannerInlineCount);

		//$permits = '<div class="my-folder-sidebar-permit-num">('.$permitCount.')</div>';
		//$commands[]=ajax_command_replace('.my-folder-sidebar-permit-num',$permits);
		$permits = '<div id="my-folder-sidebar-permit"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Permits & Licenses</p> <div class="my-folder-sidebar-permit-num my-folder-sidebar-no-items-num">('.$permitCount.')</div></div>';
		$commands[]=ajax_command_replace('#my-folder-sidebar-permit',$permits);

		//$docs = '<div class="my-folder-sidebar-doc-num">('.$docCount.')</div>';
		//$commands[]=ajax_command_replace('.my-folder-sidebar-doc-num',$docs);
		$docs = '<div id="my-folder-sidebar-doc"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Documents</p> <div class="my-folder-sidebar-doc-num my-folder-sidebar-no-items-num">('.$docCount.')</div></div>';
		$commands[]=ajax_command_replace('#my-folder-sidebar-doc',$docs);

		//$guides = '<div class="my-folder-sidebar-guide-num">('.$guideCount.')</div>';
		//$commands[]=ajax_command_replace('.my-folder-sidebar-guide-num',$guides);
		$guides = '<div id="my-folder-sidebar-guide"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Guides</p> <div class="my-folder-sidebar-guide-num my-folder-sidebar-no-items-num">('.$guideCount.')</div></div>';
		$commands[]=ajax_command_replace('#my-folder-sidebar-guide',$guides);

		//$kits = '<div class="my-folder-sidebar-kit-num">('.$kitCount.')</div>';
		//$commands[]=ajax_command_replace('.my-folder-sidebar-kit-num',$kits);
		$kits = '<div id="my-folder-sidebar-kit"><p class="my-folder-sidebar-item my-folder-sidebar-no-items">Starter Kits</p> <div class="my-folder-sidebar-kit-num my-folder-sidebar-no-items-num">('.$kitCount.')</div></div>';
		$commands[]=ajax_command_replace('#my-folder-sidebar-kit',$kits);

		//#my-folder-full
		$empty = '<div id="folder-empty">You have no resources in your folder at this time.</div>';
		$commands[]=ajax_command_replace('#my-folder-full',$empty);

	}

	$page = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);

	return $page;
}

/*
* sidebar update after removing an item
*/
/*
function my_folder_sidebar_update(){
	$permits=count($_SESSION['folder']['permit']);
	$docs=count($_SESSION['folder']['doc']);
	$guides=count($_SESSION['foder']['guide']);
	$kits=count($_SESSION['folder']['kit']);

}
*/


/*
* response for remove all ajax response
*/
function my_folder_remove_all_ajax_response($type){
	
	$kitCount=count($_SESSION['folder']['kit']);
	$permitCount=count($_SESSION['folder']['permit']);
	$docCount=count($_SESSION['folder']['doc']);
	$guideCount=count($_SESSION['folder']['guide']);
	$totalCount = $kitCount+$permitCount+$docCount+$guideCount;

	if($type=='kit'){
		$kitHeading = '<div class="my-folder-kit-heading-num"><h2 class="count">('.$kitCount.')</h2></div>';
		$commands[]=ajax_command_replace('.my-folder-kit-heading-num',$kitHeading);
		$commands[]=ajax_command_changed('#my-folder-starter-kits-wrap-inner');
	}
	if($type=='permit'){
		$permitHeading = '<div class="my-folder-permit-heading-num"><h2 class="count">('.$permitCount.')</h2></div>';
		$commands[]=ajax_command_replace('.my-folder-permit-heading-num',$permitHeading);
		$commands[]=ajax_command_changed('#my-folder-permits-wrap');
	}
	if($type=='doc'){
		$docHeading = '<div class="my-folder-doc-heading-num"><h2 class="count">('.$docCount.')</h2></div>';
		$commands[]=ajax_command_replace('.my-folder-doc-heading-num',$docHeading);
		$commands[]=ajax_command_changed('#my-folder-doc-wrap');
	}
	if($type=='guide'){
		$guideHeading = '<div class="my-folder-guide-heading-num"><h2 class="count">('.$guideCount.')</h2></div>';
		$commands[]=ajax_command_replace('.my-folder-guide-heading-num',$guideHeading);
		$commands[]=ajax_command_changed('#my-folder-guide-wrap');
	}
	
	$bannerCount = '<div class="banner-img-wrap"><p>'.$totalCount.'</p></div>';
	$commands[]=ajax_command_replace('.banner-img-wrap',$bannerCount);

	$bannerInlineCount = '<span class="banner-inline-count">'.$totalCount.'</span>';
	$commands[]=ajax_command_replace('.banner-inline-count',$bannerInlineCount);

	$permits = '<div class="my-folder-sidebar-permit-num">('.$permitCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-permit-num',$permits);

	$docs = '<div class="my-folder-sidebar-doc-num">('.$docCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-doc-num',$docs);

	$guides = '<div class="my-folder-sidebar-guide-num">('.$guideCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-guide-num',$guides);

	$kits = '<div class="my-folder-sidebar-kit-num">('.$kitCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-kit-num',$kits);

	$page = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);

	return $page;

}

function my_folder_remove_single_kit_item_ajax_response($kitID, $sectionID, $nid){
	
	//$guideCount = 0;
	//$docCount = 0;
	//$permitCount = 0;

	foreach($_SESSION['folder']['kit'] as $key){
		
		if($key[0]==$kitID){
			//dpm($key[$sectionID]);
			$guideHeadingCount = count($key[2])-1;
			$docHeadingCount = count($key[3])-1;
			
			$permitHeadingCount = count($key[4])-1;
		}
	}
	//$docHeadingCount='test';
	$guideSection = '<div class="my-folder-kit-guide-heading-count"><h4>('.$guideHeadingCount.')</h4></div>';
	$commands[]=ajax_command_replace('.my-folder-kit-guide-heading-count',$guideSection);

	//dpm($docHeadingCount);
	$docSection = '<div class="my-folder-kit-doc-heading-count"><h4>('.$docHeadingCount.')</h4></div>';
	$commands[]=ajax_command_replace('.my-folder-kit-doc-heading-count',$docSection);

	$permitSection = '<div class="my-folder-kit-permit-heading-count"><h4>('.$permitHeadingCount.')</h4></div>';
	$commands[]=ajax_command_replace('.my-folder-kit-permit-heading-count',$permitSection);

	$commands[]=ajax_command_changed('.kit-item-'.$kitID.'-'.$sectionID.'-'.$nid);
	$page = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);
	return $page;
}

function my_folder_empty_ajax_response(){
	$kitCount=count($_SESSION['folder']['kit']);
	$permitCount=count($_SESSION['folder']['permit']);
	$docCount=count($_SESSION['folder']['doc']);
	$guideCount=count($_SESSION['folder']['guide']);
	$totalCount = $kitCount+$permitCount+$docCount+$guideCount;
	/*
	$kitHeading = '<div class="my-folder-kit-heading-num"><h2 class="count">('.$kitCount.')</h2></div>';
	$commands[]=ajax_command_replace('.my-folder-kit-heading-num',$kitHeading);
	$commands[]=ajax_command_changed('#my-folder-starter-kits-wrap-inner');

	$permitHeading = '<div class="my-folder-permit-heading-num"><h2 class="count">('.$permitCount.')</h2></div>';
	$commands[]=ajax_command_replace('.my-folder-permit-heading-num',$permitHeading);
	$commands[]=ajax_command_changed('#my-folder-permits-wrap');

	$docHeading = '<div class="my-folder-doc-heading-num"><h2 class="count">('.$docCount.')</h2></div>';
	$commands[]=ajax_command_replace('.my-folder-doc-heading-num',$docHeading);
	$commands[]=ajax_command_changed('#my-folder-doc-wrap');

	$guideHeading = '<div class="my-folder-guide-heading-num"><h2 class="count">('.$guideCount.')</h2></div>';
	$commands[]=ajax_command_replace('.my-folder-guide-heading-num',$guideHeading);
	$commands[]=ajax_command_changed('#my-folder-guide-wrap');
	*/
	$bannerCount = '<div class="banner-img-wrap"><p>'.$totalCount.'</p></div>';
	$commands[]=ajax_command_replace('.banner-img-wrap',$bannerCount);

	$bannerInlineCount = '<span class="banner-inline-count">'.$totalCount.'</span>';
	$commands[]=ajax_command_replace('.banner-inline-count',$bannerInlineCount);

	$permits = '<div class="my-folder-sidebar-permit-num">('.$permitCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-permit-num',$permits);

	$docs = '<div class="my-folder-sidebar-doc-num">('.$docCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-doc-num',$docs);

	$guides = '<div class="my-folder-sidebar-guide-num">('.$guideCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-guide-num',$guides);

	$kits = '<div class="my-folder-sidebar-kit-num">('.$kitCount.')</div>';
	$commands[]=ajax_command_replace('.my-folder-sidebar-kit-num',$kits);

	//#my-folder-full
	$empty = '<div id="folder-empty">You have not resources in your folder at this time.</div>';
	$commands[]=ajax_command_replace('#my-folder-full',$empty);

	$page = array(
		'#type'=>'ajax',
		'#commands'=>$commands,
	);

	return $page;
}