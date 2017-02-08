<?php
/** 
*
*
* The form to rearrange the order of your starter kit nodes
*
*/

function starter_kit_rearrange_form($form, &$form_state, $id, $sectionID){
	
	$kit = starter_kit_expanded($id);//this broke because i created an object
	$sectionContents = array();
	switch($sectionID){
		case 1://journeymap
			$sectionContents = $kit->journeymap;
			break;
		case 2://documents
			$sectionContents = $kit->documents;
			break;
		case 3:// permits
			$sectionContents = $kit->permits;
			break;
		//etc....
	}
	//dpm($sectionContents);
	//dpm($section);
	//$kit = starter_kit_single($id);
	/*foreach($kit as $key){
  		$id = $key->id;
  		$title = $key->title;

  	}*/
  	
	$form['id']=array(
		'#type'=>'value',
		'#value'=>$id,
	);
	$form['sectionID']=array(
		'#type'=>'value',
		'#value'=>$sectionID,
	);
	$from['title']=array(
		'#type'=>'value',
		'#value'=>$kit->title,
	);
	$form['list']=array(
		'#prefix'=>'<div id="section-list">',
		'#suffix'=>'</div>',
		'#tree'=>TRUE,
		'#theme'=>'starter_kit_draggable',
	);
	
	foreach($sectionContents as $key){//fix this once the above issue with the $section is fixed.
		//dpm($key['id']);
		$node = individual_node($key);///////  !!
		foreach($node as $index){
			$title=$index->title;
            $nid=$index->nid;
            
			$form['list'][$key]['name']=array(
            	'#prefix' => '<p class="rearrange-title">'. $title .'</p>',
				//'#default_value' => $key,
            );
            $form['list'][$key]['weight'] = array(
				'#type' => 'weight',
				//'#default_value' => $i,
				'#size' => 3,
				'#attributes' => array('class' => array('rank-weight')), // needed for table dragging
			);   
		}
	}
	
	$form['submit'] = array(
    	'#type' => 'submit',
    	'#value' => t('Submit'),
    	'#name'=>t('Save'),
    	'#submit'=>array('starter_kit_rearrange_submit'),
	);
	$form['finished']=array(
		'#prefix'=>'<p id="rearrange-finished">'. l('Finished','admin/structure/starter_kit/edit/'. $kit->id ) .'</p>',
	);


  return $form;
}


function theme_starter_kit_draggable($vars) {
   $element = $vars['element'];
  drupal_add_tabledrag('form_id', 'order', 'sibling', 'rank-weight'); // needed for table dragging
  
  $header = array(
    'name' => t('Name'), 
   
    'weight' => t('Rank'),
  );
  
  $rows = array();
  foreach (element_children($element) as $key) {
    $row = array();
    
    $row['data'] = array();
    foreach ($header as $fieldname => $title) {
      $row['data'][] = drupal_render($element[$key][$fieldname]);
      $row['class'] = array('draggable'); // needed for table dragging
    }
    $rows[] = $row;
  }
  
  return theme('table', array(
    'header' => $header, 
    'rows' => $rows,
    'attributes' => array('id' => 'form_id'), // needed for table dragging
  ));
}

function starter_kit_rearrange_submit($form, &$form_state){
	$id = $form_state['values']['id'];
	$sectionID = $form_state['values']['sectionID'];
	
	$db_index='';
	
	if($sectionID==1){//journeymap section
		$db_index='f1';	
	}
	if($sectionID==2){
		$db_index='f2';
	}
	if($sectionID==3){
		$db_index='f3';
	}
	//if($sectionID==4){
	//	$db_index='f4';
	//}
	
	//$title = $form_state['values']['title'];
	$kit = starter_kit_expanded($id);
	$section = array();

	switch($sectionID){//set the right section from our kit object to the array that the re-assingment loop below will go over.
		//this whole section might become dynamic if the names arent pre-determined names
		case 1:
			$section=$kit->journeymap;
			break;
		case 2:
			$section=$kit->documents;
			break;
		case 3:
			$section=$kit->permits;
			break;
		//the rest of the sections here
	}


	$newarray = array();
	
	for($i=0;$i<=20;$i++){//this is the number of allowable rank positions -10 to 10 = 21 positions
		$newarray[$i]=0;
	}
	
	foreach($section as $key){
		if($key>0){
			$weight = 10 + $_POST['list'][$key]['weight'];//this value is offset by 10 because drupal weights start at -10
			$replacement = array($weight=>$key);
			$newarray = array_replace($newarray,$replacement);
		}
	}
	for($i=0, $count=count($newarray);$i<$count;$i++){
		if($newarray[$i]==0){
			unset($newarray[$i]);
		}
	}
	array_unshift($newarray, 0);
	$stringify=implode(',',$newarray);
	
	$update_field=db_update('starter_kit')
			->fields(array(
				$db_index=>$stringify,
			))
		->condition('id',$id,'=')
		->execute();	

	drupal_set_message('Order Updated.');
	
}


