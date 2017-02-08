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
  if(strlen($starterkit->title)>0){//if loading an existing starter kit show the title
	  $form['name'] = array(
      '#prefix'=>'<div id="new-name-wrap">',
      '#suffix'=>'<h2>'. $starterkit->title .'</h2>',
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
  
  
  
  //Explore the Journey fieldset
  $form['explore'] = array(
    	'#type'=>'fieldset',
		'#title'=>t('Explore The Journey'),
		'#collapsible'=>TRUE,
		'#collapsed'=>FALSE,
  );
  //*****journey map sub-fieldset
       	 
        $form['explore']['journeymap'] = array(
          '#prefix'=>'<div id="journey-map">',
          '#suffix'=>'</div>',
          '#type'=>'fieldset',
          '#title'=>t('Journey Map'),
          '#collapsible'=>TRUE,
          '#collapsed'=>FALSE,
        );
       	
       	//$journeymap = starter_kit_expanded(1,1);

       	//loop over the items assigned to the journey map 
        foreach($starterkit->journeymap as $key){ 
          
          $node = individual_node($key);
          foreach($node as $index){
            $title=$index->title;
            $nid=$index->nid;
          
        	$form['explore']['journeymap']['check_'.$nid]=array(
        		'#type'=>'checkbox',
        		'#name'=>'selected[]',
        		'#attributes'=>array('value'=>$nid),
        		'#prefix'=>'<div class="starter-kit-node-entry clearfix"><div class="item-checkbox clearfix">',
        		'#suffix'=>'</div>'
        	);
          	$form['explore']['journeymap']['node_'.$nid] = array(
            	'#prefix'=> '<p>' .l($title,'permit/' . $nid) .'</p>',//this link URL is based on the views set up ive built
            	'#suffix'=>'</div>'
          	);
         /* $form['explore']['journeymap']['remove_node_'.$nid] = array(//"node" will need to be replace by the actual nid
            '#type'=>'button',
            '#value'=>t('Remove'),
            '#name'=>t('remove_node_'.$nid),
            '#submit'=>array('remove_node_submit'),
            '#suffix'=>'</div>',//end of wrapper per node
          );*/
          }
        }
        
       
        $form['explore']['journeymap']['journey_map_field'] = array(
	        '#type'=>'textfield',
	        '#title'=>t('Enter Node ID'),
	        '#size'=>10,
	        '#maxlength'=>10,
	        '#name'=>t('journey_map_textfield'),
	        '#prefix' =>'<div class="starter-kit-add-node clearfix">',
        );
        $form['explore']['journeymap']['journey_map_add_submit'] = array(
          	'#type'=>'submit',
          	'#value'=>t('Add'),
          	'#name'=>t('journey_map_submit'),
          	'#submit'=>array('starter_kit_add_item_submit'),
          	//'#ajax'=>array(
          	//	'callback'=>'add_node_js',
          	//	'wrapper'=>'journey-map',
          	//	'method'=>'replace',
          	//	'effect'=>'fade',
          	//),
          
        );
        $form['explore']['journeymap']['journey_map_rearrange_submit'] = array(
	        '#type'=>'submit',
	        '#value'=>t('Rearrange'),
	        '#name'=>t('journey_map_rearrange_submit'),
	        '#submit'=>array('starter_kit_rearrange_form_submit'),
	        
        );
        $form['explore']['journeymap']['journey_map_remove_submit']=array(
        	'#type'=>'submit',
        	'#value'=>t('Remove Selected'),
        	'#name'=>t('journey_map_remove_selected_submit'),
        	'#submit'=>array('starter_kit_remove_selected_submit'),
        	'#suffix'=>'</div>',
        );
         
  //****journey related resources sub-fieldset
       /* $form['explore']['journey_related'] = array(
          '#type'=>'fieldset',
          '#title'=>t('Related Resources'),
          '#collapsible'=>TRUE,
          '#collapsed'=>FALSE,
        );*/
        //loop over the items assigned to the related resources
        /*foreach($journeyrelated as $key){ 
          
          	$node = individual_node($key);
          	
          	foreach($node as $index){

            	$title=$index->title;
            	$nid=$index->nid;

		        $form['explore']['journey_related']['node_'.$nid] = array(
		            '#prefix'=>'<div class="starter-kit-node-entry clearfix"><p>'. l($title,'permit/' . $nid) .'</p>',//this link URL is based on the views set up ive built
		        );
		        $form['explore']['journey_related']['remove_node_'.$nid] = array(//"node" will need to be replace by the actual nid
		            '#type'=>'button',
		            '#value'=>t('Remove'),
		            '#name'=>t('remove_node'),
		            '#submit'=>array('remove_node_submit'),
		            '#suffix'=>'</div>',//end of wrapper per node
		        );
         	}
        }
        $form['explore']['journey_related']['journey_related_field'] = array(
          '#type'=>'textfield',
          '#title'=>t('Enter Node ID'),
          '#size'=>10,
          '#maxlength'=>10,
          '#prefix' =>'<div class="starter-kit-add-node clearfix">',
        );
        $form['explore']['journey_related']['journey_related_add_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Add'),
          '#name'=>t('journey_related_submit'),
          '#submit'=>array('starter_kit_add_item_submit'),
          
        );
         $form['explore']['journey_related']['journey_related_edit_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Rearrange'),
          '#name'=>t('journey_related_eidt_submit'),
          '#submit'=>array('starter_kit_eidt_item_submit'),
          '#suffix'=>'</div>',
        );*/
  
  //ADA requirements fieldset
  $form['ada'] = array(
    '#type'=>'fieldset',
    '#title'=>t('ADA Requirements'),
    '#collapsible'=>TRUE,
    '#collapsed'=>FALSE,
  );
  //****ADA compliance sub-fieldset  
        $form['ada']['ada_compliance'] = array(
          '#type'=>'fieldset',
          '#title'=>t('ADA Compliance Guide'),
          '#collapsible'=>TRUE,
          '#collapsed'=>FALSE,
        );
        //loop over items assigned to ada compliance
        /*foreach($adacompliance as $key){ 
          
          	$node = individual_node($key);
          	
          	foreach($node as $index){
            	
            	$title=$index->title;
            	$nid=$index->nid;

		        $form['ada']['ada_compliance']['node_'.$nid] = array(
		            '#prefix'=>'<div class="starter-kit-node-entry clearfix"><p>'. l($title,'permit/' . $nid) .'</p>',//this link URL is based on the views set up ive built
		        );
		        $form['ada']['ada_compliance']['remove_node_'.$nid] = array(//"node" will need to be replace by the actual nid
		        	'#type'=>'button',
		            '#value'=>t('Remove'),
		            '#name'=>t('remove_node'),
		            '#submit'=>array('remove_node_submit'),
		            '#suffix'=>'</div>',//end of wrapper per node
		        );
      		}
        }
        $form['ada']['ada_compliance']['ada_compliance_field'] = array(
          '#type'=>'textfield',
          '#title'=>t('Enter Node ID'),
          '#size'=>10,
          '#maxlength'=>10,
          '#prefix' =>'<div class="starter-kit-add-node clearfix">',
        );
        $form['ada']['ada_compliance']['ada_compliance_add_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Add'),
          '#name'=>t('ada_compliance_add_submit'),
          '#submit'=>array('starter_kit_add_item_submit'),
          
        );
        $form['ada']['ada_compliance']['ada_compliance_edit_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Rearrange'),
          '#name'=>t('ada_compliance_edit_submit'),
          '#submit'=>array('starter_kit_edit_item_submit'),
          '#suffix'=>'</div>',
        );*/
//******Related resources sub-fieldset
        $form['ada']['ada_related'] = array(
          '#type'=>'fieldset',
          '#title'=>t('Related Resources'),
          '#collapsible'=>TRUE,
          '#collapsed'=>FALSE,
        );
        //loop over items assigned to related 
        /*foreach($adarelated as $key){ 
          
          	$node = individual_node($key);
          	
          	foreach($node as $index){
		        
		        $title=$index->title;
		        $nid=$index->nid; 

		        $form['ada']['ada_related']['node_'.$nid] = array(
		            '#prefix'=>'<div class="starter-kit-node-entry clearfix"><p>'. l($title,'permit/' . $nid) .'</p>',//this link URL is based on the views set up ive built
		        );
		        $form['ada']['ada_related']['remove_node_'.$nid] = array(//"node" will need to be replace by the actual nid
		            '#type'=>'button',
		            '#value'=>t('Remove'),
		            '#name'=>t('remove_node'),
		            '#submit'=>array('remove_node_submit'),
		            '#suffix'=>'</div>',//end of wrapper per node
		        );
      		}
        }
        $form['ada']['ada_related']['ada_related_field'] = array(
          '#type'=>'textfield',
          '#title'=>t('Enter Node ID'),
          '#size'=>10,
          '#maxlength'=>10,
          '#prefix' =>'<div class="starter-kit-add-node clearfix">',
        );
        $form['ada']['ada_related']['ada_related_add_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Add'),
          '#name'=>t('ada_related_add_submit'),
          '#submit'=>array('starter_kit_add_item_submit'),
          
        );
        $form['ada']['ada_related']['ada_related_edit_submit'] = array(
          '#type'=>'submit',
          '#value'=>t('Rearrange'),
          '#name'=>t('ada_related_edit_submit'),
          '#submit'=>array('starter_kit_edit_item_submit'),
          '#suffix'=>'</div>',
        );*/

  return $form;
}

/* 
Submit handler for adding new nodes to the starter kit
*/
function starter_kit_add_item_submit($form, &$form_state){
 
  	if(isset($_POST['journey_map_submit'])){
  		$newnode=$_POST['journey_map_textfield'];
  		$id = $form_state['values']['id'];
  		starter_kit_general_add($id,1,$newnode);
    
  	}
  	if(isset($_POST['journey_related_submit'])){
    	drupal_set_message(t('Journey Related Clicked!  >>  Content: '.$_POST['journey_related_field']));
    	drupal_goto('admin/structure/starter_kit');
  	}
  	if(isset($_POST['ada_compliance_submit'])){
    	drupal_set_message(t('ADA Compliance Clicked!  >>  Content: '.$_POST['journey_related_field']));
    	drupal_goto('admin/structure/starter_kit');
  	}
  	if(isset($_POST['ada_related_submit'])){
    	drupal_set_message(t('ADA Related Clicked!  >>  Content: '.$_POST['journey_related_field']));
    	drupal_goto('admin/structure/starter_kit');
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
      $sectionContent=$starterkit->journeyrelated;
    }
    if($section==3){
      $sectionContent=$starterkit->adacompliance;
    }
    if($section==4){
      $sectionContent=$starterkit->adarelated;
    }
    	
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
		
		
		$update_field=db_update('starter_kit')
			->fields(array(
				'f1'=>$stringify,
			))
		->condition('id',$kitID,'=')
		->execute();

    	drupal_set_message(t('Content added'));
    }
}

function starter_kit_remove_selected_submit($form, &$form_state){
	$kitID=$form_state['values']['id'];

	if($_POST['journey_map_remove_selected_submit']){
		starter_kit_general_remove($kitID,1);	
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
        $section = $kit->journeyrelated;
        break;
      case 3:
        $section = $kit->adacompliance;
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
			
		$update_field=db_update('starter_kit')
			->fields(array(
			'f1'=>$stringify,//f1 coresponds to the DB collum, THIS NEEDS TO BE DYNAMIC ONCE THE OUTLINE OF THE STARTERKIT IS LOCKED DOWN
			))
			->condition('id',$kitID,'=')
			->execute();
	
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

function starter_kit_rearrange_form_submit($form, &$form_state){
	
	$id=$form_state['values']['id'];
	
	if($_POST['journey_map_rearrange_submit']){
		drupal_goto('admin/structure/starter_kit/rearrange/'.$id.'/1');//this only works for the first section
	}

  //all other sections submits go here
}