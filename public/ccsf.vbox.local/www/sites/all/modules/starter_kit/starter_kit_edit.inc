<?php 

/**
*
* cunstructs the view of an individual starter-kit with links to edit the contents 
* contains the add/remove functions for controlling the content in your starterkit
* 
* atempted to submit forms via ajax, had trouble loading in the updated form after 
* callback, drupal good practice dictates ajax callback shouldnt contain form submit-handler logic
*
*/ 
function starter_kit_edit_form($form, &$form_state, $id){

  $starterkit = starter_kit_expanded($id);
  // work on refining this to fewer db calls
  //$journeymap = starter_kit_expanded($argument,1);
  //$journeyrelated = starter_kit_expanded($argument,2);
  //$adacompliance = starter_kit_expanded($argument,3);
  //$adarelated = starter_kit_expanded($argument,4);
  
  /*$kit = starter_kit_single($id);
	  
  foreach($kit as $key){
  	$title = $key->title;
  	$id = $key->id;
  }*/


  //Store the ID in the form for use during form submit
  $form['id']=array(//store starter kit id for form submission
    '#type'=>'value',
    '#value'=>$id,      
  );
  //THE MASSIVE FORM!
  $form['back']=array(
  	'#prefix'=>'<p>'.l('Back to main list','admin/structure/starter_kit').'</p>',
  );
  //The title section
  if(strlen($starterkit->title)>0){//if loading an existing starter kit show the title
	  $form['name'] = array(
      '#prefix'=>'<div id="new-name-wrap"><h3>Name</h3>',
      '#suffix'=>'<p>'. $starterkit->title .'</p>',
    );
    $form['name_edit']=array(
      '#type'=>'submit',
      '#value'=>'Edit Name',
      '#name'=>t('edit_name'),
      '#submit'=>array('starter_kit_edit_name_form_submit'),//still need to write this form handeler
      '#suffix'=>'</div>',
    );  
  }else{//if loaing a new starter kit show name input field
	  $form['name'] = array (
	  	'#prefix'=>'<div id="new-name-wrap">',
	  	'#type'=>'textfield',
	  	'#title'=>'Starter Kit Name',
	  	'#name'=>t('name_input'),
	  	'#size'=>50,
	  	'#maxlength'=>90,
	  );
    $form['name_input']=array(
      '#type'=>'submit',
      '#value'=>'Save Name',
      '#name'=>t('save_name'),
      '#submit'=>array('starter_kit_save_name_form_submit'),//still need to write this form handeler
      '#suffix'=>'</div>',
    );
  }

  //The description section
  if(strlen($starterkit->info)>0){
    $form['info'] = array(
      '#prefix'=>'<div id="new-info-wrap"><h3>Description</h3>',
      '#suffix'=>'<p>'.$starterkit->info.'</p>',
    );
    $form['info_edit']=array(
      '#type'=>'submit',
      '#value'=>'Edit Desctiption',
      '#name'=>t('edit_info'),
      '#submit'=>array('starter_kit_edit_info_form_submit'),
      '#suffix'=>'</div>'
    );
  }else{//if loading a kit with no info field content
    $form['info']=array(
      '#prefix'=>'<div id="new-info-wrap">',
      '#type'=>'textarea',
      '#title'=>'Starter Kit Description',
      '#name'=>t('info_input'),
      '#maxlength'=>500,
    );
    $form['info_input']=array(
      '#type'=>'submit',
      '#value'=>'Save Description',
      '#name'=>t('save_info'),
      '#submit'=>array('starter_kit_save_info_form_submit'),//still need to write this form handeler
      '#suffix'=>'</div>',
    );
  }



  //*****journey map sub-fieldset
  ///////////////// Guides field set///////////////////      	 
        $form['journeymap'] = array(
          '#prefix'=>'<div id="kit-admin-journey-map">',
          '#suffix'=>'</div>',
          '#type'=>'fieldset',
          '#title'=>t('Guides'),
          '#collapsible'=>TRUE,
          '#collapsed'=>FALSE,
        );

       	//loop over the items assigned to the journey map 
        foreach($starterkit->journeymap as $key){ 
          
          $node = individual_node($key);
          foreach($node as $index){
            $title=$index->title;
            $nid=$index->nid;
          
        	$form['journeymap']['check_'.$nid]=array(
        		'#type'=>'checkbox',
        		'#name'=>'selected[]',
        		'#attributes'=>array('value'=>$nid),
        		'#prefix'=>'<div class="starter-kit-node-entry clearfix"><div class="item-checkbox clearfix">',
        		'#suffix'=>'</div>'
        	);
        	$form['journeymap']['node_'.$nid] = array(
          	'#prefix'=> '<p>' .l($title,'node/' . $nid) .'</p>',//this link URL is based on the views set up ive built
          	'#suffix'=>'</div>'
        	);
          }
        }
        
       
        $form['journeymap']['journey_map_field'] = array(
	        '#type'=>'textfield',
	        '#title'=>t('Enter Node ID'),
	        '#size'=>10,
	        '#maxlength'=>10,
	        '#name'=>t('journey_map_textfield'),
	        '#prefix' =>'<div class="starter-kit-add-node clearfix">',
        );
        $form['journeymap']['journey_map_add_submit'] = array(
          	'#type'=>'submit',
          	'#value'=>t('Add'),
          	'#name'=>t('journey_map_submit'),
          	'#submit'=>array('starter_kit_add_item_submit'),
                
        );
        $form['journeymap']['journey_map_rearrange_submit'] = array(
	        '#type'=>'submit',
	        '#value'=>t('Rearrange'),
	        '#name'=>t('journey_map_rearrange_submit'),
	        '#submit'=>array('starter_kit_rearrange_form_submit'),
	        
        );
        $form['journeymap']['journey_map_remove_submit']=array(
        	'#type'=>'submit',
        	'#value'=>t('Remove Selected'),
        	'#name'=>t('journey_map_remove_selected_submit'),
        	'#submit'=>array('starter_kit_remove_selected_submit'),
        	'#suffix'=>'</div>',
        );
  
  
  /////////////Related Documents fieldset/////////////////
  $form['docs'] = array(
    '#prefix'=>'<div id="kit-admin-related-documents">',
    '#suffix'=>'</div>',
    '#type'=>'fieldset',
    '#title'=>t('Related Documents'),
    '#collapsible'=>TRUE,
    '#collapsed'=>FALSE,
  );
  foreach($starterkit->documents as $key){ 
          
    $node = individual_node($key);
    foreach($node as $index){
      $title=$index->title;
      $nid=$index->nid;
    
    $form['docs']['check_'.$nid]=array(
      '#type'=>'checkbox',
      '#name'=>'selected[]',
      '#attributes'=>array('value'=>$nid),
      '#prefix'=>'<div class="starter-kit-node-entry clearfix"><div class="item-checkbox clearfix">',
      '#suffix'=>'</div>'
    );
    $form['docs']['node_'.$nid] = array(
      '#prefix'=> '<p>' .l($title,'node/' . $nid) .'</p>',//this link URL is based on the views set up ive built
      '#suffix'=>'</div>'
    );
    }
  }

  $form['docs']['docs_field'] = array(
    '#type'=>'textfield',
    '#title'=>t('Enter Node ID'),
    '#size'=>10,
    '#maxlength'=>10,
    '#name'=>t('docs_textfield'),
    '#prefix' =>'<div class="starter-kit-add-node clearfix">',
  );
  $form['docs']['docs_add_submit'] = array(
      '#type'=>'submit',
      '#value'=>t('Add'),
      '#name'=>t('docs_submit'),
      '#submit'=>array('starter_kit_add_item_submit'),
          
  );
  $form['docs']['docs_rearrange_submit'] = array(
    '#type'=>'submit',
    '#value'=>t('Rearrange'),
    '#name'=>t('docs_rearrange_submit'),
    '#submit'=>array('starter_kit_rearrange_form_submit'),
    
  );
  $form['docs']['docs_remove_submit']=array(
    '#type'=>'submit',
    '#value'=>t('Remove Selected'),
    '#name'=>t('docs_remove_selected_submit'),
    '#submit'=>array('starter_kit_remove_selected_submit'),
    '#suffix'=>'</div>',
  );


  /////////////Related Premits fieldset///////////////
  $form['permits'] = array(
    '#prefix'=>'<div id="kit-admin-permits">',
    '#suffix'=>'</div>',
    '#type'=>'fieldset',
    '#title'=>t('Related Permits'),
    '#collapsible'=>TRUE,
    '#collapsed'=>FALSE,
  );
  foreach($starterkit->permits as $key){ 
          
    $node = individual_node($key);
    foreach($node as $index){
      $title=$index->title;
      $nid=$index->nid;
    
    $form['permits']['check_'.$nid]=array(
      '#type'=>'checkbox',
      '#name'=>'selected[]',
      '#attributes'=>array('value'=>$nid),
      '#prefix'=>'<div class="starter-kit-node-entry clearfix"><div class="item-checkbox clearfix">',
      '#suffix'=>'</div>'
    );
    $form['permits']['node_'.$nid] = array(
      '#prefix'=> '<p>' .l($title,'node/' . $nid) .'</p>',//this link URL is based on the views set up ive built
      '#suffix'=>'</div>'
    );
    }
  }

  $form['permits']['permits_field'] = array(
    '#type'=>'textfield',
    '#title'=>t('Enter Node ID'),
    '#size'=>10,
    '#maxlength'=>10,
    '#name'=>t('permits_textfield'),
    '#prefix' =>'<div class="starter-kit-add-node clearfix">',
  );
  $form['permits']['permits_add_submit'] = array(
      '#type'=>'submit',
      '#value'=>t('Add'),
      '#name'=>t('permit_submit'),
      '#submit'=>array('starter_kit_add_item_submit'),
          
  );
  $form['permits']['permits_rearrange_submit'] = array(
    '#type'=>'submit',
    '#value'=>t('Rearrange'),
    '#name'=>t('permits_rearrange_submit'),
    '#submit'=>array('starter_kit_rearrange_form_submit'),
    
  );
  $form['permits']['permits_remove_submit']=array(
    '#type'=>'submit',
    '#value'=>t('Remove Selected'),
    '#name'=>t('permits_remove_selected_submit'),
    '#submit'=>array('starter_kit_remove_selected_submit'),
    '#suffix'=>'</div>',
  );




  return $form;
}

/* 
Submit handler for adding new nodes to the starter kit
*/
function starter_kit_add_item_submit($form, &$form_state){
 
  	if(isset($_POST['journey_map_submit'])){//adding a new guide
  		$newnode=$_POST['journey_map_textfield'];
  		$id = $form_state['values']['id'];
  		if(strlen($newnode)>0){
        starter_kit_general_add($id,1,$newnode);
      }
  	}
  	if(isset($_POST['docs_submit'])){//adding a new document
      $newnode=$_POST['docs_textfield'];
      $id= $form_state['values']['id'];
      if(strlen($newnode)>0){
        starter_kit_general_add($id,2,$newnode);
      }
  	}
  	if(isset($_POST['permit_submit'])){//adding a new permit
      $newnode=$_POST['permits_textfield'];
      $id=$form_state['values']['id'];
      if(strlen($newnode)>0){
        starter_kit_general_add($id,3,$newnode);
      }
  	}
  
}

/* the general function called to add a node to any section 
* $kitID = #id of specific starter-kit thats being modified 
* $section = which section of the kit the new item is being added to
* $newnode = nid of the new node to add
*/
function starter_kit_general_add($kitID, $section, $newnode){

	$new = $newnode;
	//check if the node they are trying to add exists
	$query = db_select('node','n')
	->fields('n',array('nid'))
	->condition('nid',$new)
	->range(0,1)
	->execute()
	->rowCount();

    if(!$query){//node doesnt exist
    	drupal_set_message(t("That content doesn't exist"),'error');
    	return;
    }else{//node does exist
    	
    	$starterkit = starter_kit_expanded($kitID);

      if($section==1){
        $sectionContent=$starterkit->journeymap;
      }
      if($section==2){
        $sectionContent=$starterkit->documents;
      }
      if($section==3){
        $sectionContent=$starterkit->permits;
      }
      //if($section==4){
        //$sectionContent=$starterkit->adarelated;
      //}
      	
  		if(in_array($new,$sectionContent)){//the node is already in this section
  			drupal_set_message(t('That item as already been added.'),'error');
  			return;
  		}
  		
  		array_push($sectionContent,$new);
  		
  		if(!empty($sectionContent)){
  			$stringify =implode(',',$sectionContent);
  			//drupal_set_message(t('stringify'));
  		}else{
  			$stringify = $sectionContent;
  			//drupal_set_message(t('no stringify'));
  		}
  		
  		if($section==1){//update field 'f1' that contains guides
        $update_field=db_update('starter_kit')
          ->fields(array(
            'f1'=>$stringify,
          ))
          ->condition('id',$kitID,'=')
          ->execute();
      }
      if($section==2){//update field 'f2' that contains documents
        $update_field=db_update('starter_kit')
          ->fields(array(
            'f2'=>$stringify,
          ))
          ->condition('id',$kitID,'=')
          ->execute();
      }
  		if($section==3){//update field 'f3' that contains permits
        $update_field=db_update('starter_kit')
          ->fields(array(
            'f3'=>$stringify,
          ))
          ->condition('id',$kitID,'=')
          ->execute();
      }

      	drupal_set_message(t('Content added'));
    }
}

function starter_kit_remove_selected_submit($form, &$form_state){
	$kitID=$form_state['values']['id'];

	if($_POST['journey_map_remove_selected_submit']){
		starter_kit_general_remove($kitID,1);	
	}
  if($_POST['docs_remove_selected_submit']){
    starter_kit_general_remove($kitID,2);
  }
  if($_POST['permits_remove_selected_submit']){
    starter_kit_general_remove($kitID,3);
  }
	
	//all other sections submit dection will go here
}

//handels general removal of items from the starter kit
function starter_kit_general_remove($kitID,$sectionID){
	
	if(!empty($_POST['selected'])){
		$kit = starter_kit_expanded($kitID);//get the array of nodes assigned to the section
		
    $section = array();

    switch($sectionID){
      case 1:
        $section = $kit->journeymap;
        break;
      case 2:
        $section = $kit->documents;
        break;
      case 3:
        $section = $kit->permits;
        break;
      //identify all other secitons here
    }
		
    foreach($_POST['selected'] as $nid){//remove the selected $nid's from the array of assigned items
			foreach($section as $key => $value){
				if($value==$nid){
					unset($section[$key]);
				}
			}
		}
	
		if(count($section)>1){
			$stringify =implode(',',$section);
		}else{
			$stringify = 0;
		}
			
		if($sectionID==1){
      $update_field=db_update('starter_kit')
      ->fields(array(
      'f1'=>$stringify,//f1 coresponds to the DB collum, THIS NEEDS TO BE DYNAMIC ONCE THE OUTLINE OF THE STARTERKIT IS LOCKED DOWN
      ))
      ->condition('id',$kitID,'=')
      ->execute(); 
    }
    if($sectionID==2){
      $update_field=db_update('starter_kit')
      ->fields(array(
      'f2'=>$stringify,//f1 coresponds to the DB collum, THIS NEEDS TO BE DYNAMIC ONCE THE OUTLINE OF THE STARTERKIT IS LOCKED DOWN
      ))
      ->condition('id',$kitID,'=')
      ->execute(); 
    }
    if($sectionID==3){
      $update_field=db_update('starter_kit')
      ->fields(array(
      'f3'=>$stringify,//f1 coresponds to the DB collum, THIS NEEDS TO BE DYNAMIC ONCE THE OUTLINE OF THE STARTERKIT IS LOCKED DOWN
      ))
      ->condition('id',$kitID,'=')
      ->execute(); 
    }
    
	
		drupal_set_message(t('Content removed'));
	
	}else{
		drupal_set_message(t('Nothing Selected'),'error');
	}
	
}

function starter_kit_save_name_form_submit($form, &$form_state){
	if($_POST['save_name']){
		if(empty($_POST['name_input'])){
			drupal_set_message(t('No name entered'));
		}else{
			$id = $form_state['values']['id'];
			
			$update_field=db_update('starter_kit')
				->fields(array(
					'title'=>$_POST['name_input'],
				))
				->condition('id',$id,'=')
				->execute();
		}
	}
}

function starter_kit_edit_name_form_submit($form, &$form_state){
  if($_POST['edit_name']){
    $id = $form_state['values']['id'];
    
    $update_field=db_update('starter_kit')
        ->fields(array(
          'title'=>'',
        ))
        ->condition('id',$id,'=')
        ->execute();
        drupal_goto('admin/structure/starter_kit/edit/'.$id);
  }
}

function starter_kit_save_info_form_submit($form, &$form_state){
  if($_POST['save_info']){
    if(empty($_POST['info_input'])){
      drupal_set_message(t('No info entered'));
    }else{
      
      if(strlen($_POST['info_input'])>500){
        drupal_set_message(t('Description is too long. Must be 500 characters or less.'),'error');

      }else{
        $id = $form_state['values']['id'];
        
        $update_field=db_update('starter_kit')
          ->fields(array(
            'info'=>$_POST['info_input'],
          ))
          ->condition('id',$id,'=')
          ->execute();
      }
    }
  }
}

function starter_kit_edit_info_form_submit($form, &$form_state){
  if($_POST['edit_info']){
    $id = $form_state['values']['id'];
    
    $update_field=db_update('starter_kit')
        ->fields(array(
          'info'=>'',
        ))
        ->condition('id',$id,'=')
        ->execute();
        drupal_goto('admin/structure/starter_kit/edit/'.$id);
  }
}

function starter_kit_rearrange_form_submit($form, &$form_state){
	
	$id=$form_state['values']['id'];
	
	if(isset($_POST['journey_map_rearrange_submit'])){
		drupal_goto('admin/structure/starter_kit/rearrange/'.$id.'/1');//this only works for the first section
	}
  if(isset($_POST['docs_rearrange_submit'])){
    drupal_goto('admin/structure/starter_kit/rearrange/'.$id.'/2');
  }
  if(isset($_POST['permits_rearrange_submit'])){
    drupal_goto('admin/structure/starter_kit/rearrange/'.$id.'/3');
  } 

  //all other sections submits go here
}