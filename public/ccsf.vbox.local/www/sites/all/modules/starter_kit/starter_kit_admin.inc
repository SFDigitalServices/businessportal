<?php
/**
*
* Main Admin form for the starter-kits
* Shows a list of the starter-kits that have already been made
* provides the functions to create a new starter-kit or delete a starter-kit
*
*/

/* First menu, displays existing starter kits and the ability to delete them */
function starter_kit_start_form($form, &$form_state) {

  $kits = starter_kit_all();
	
  $form['starter_kits'] = array(
    	'#type'=>'fieldset',
    	'#title'=>t('Your Starter Kits'),
    	'#collapsible'=>FALSE,
    	'#collapsed'=>FALSE,
  );
  
  foreach($kits as $node){
    if(strlen($node->title)>0){//if it has a name assigned
	    $form['starter_kits']['name_'.$node->id]=array(
	      	'#prefix'=>'<div class="starter-kit-node-entry clearfix"><p>'. l($node->title,'admin/structure/starter_kit/edit/'.$node->id) .'</p>',
	      	//this url links to the specific starter kit, using the $node->id as the wildcard in the menu
	    );
    }else{//if no name is assigned yet
	    $form['starter_kits']['name_'.$node->id]=array(
	      	'#prefix'=>'<div class="starter-kit-node-entry clearfix"><p>'. l('No name set yet','admin/structure/starter_kit/edit/'.$node->id) .'</p>',
	      	//this url links to the specific starter kit, using the $node->id as the wildcard in the menu
	    );
    }
    $form['starter_kits']['edit_'.$node->id]=array(
      	'#prefix'=>'<p class="kit-link">'. l('Edit','admin/structure/starter_kit/edit/'.$node->id) .'</p>',
    );
    $form['starter_kits']['delete_'.$node->id]=array(
      	'#prefix'=>'<p class="kit-link">'. l('Delete','admin/structure/starter_kit/delete/'.$node->id) .'</p>',
      	'#suffix'=>'</div>',
    );
    
  }
  
	$form['starter_kits']['submit'] = array(
		'#type'=>'submit',
		'#value'=>'New',
		'#name'=>'new',
		'#submit'=> array('starter_kit_new_starter_kit_submit'),
		'#prefix'=>'<div id="new-button">',
		'#suffix'=>'</div>'
	);
	return $form;
}
/**
* Submit handler for creating a new starter kit
*/
function starter_kit_new_starter_kit_submit($form, &$form_state){
    //$x=1;//this is the id of the starter kit to load
   // drupal_goto('admin/structure/starter_kit/edit/'.$x.'/'); 
   $kits = starter_kit_all();
   $index =0;
   foreach($kits as $key){
	   if($key->id > $index ){
		   $index = $key->id;
	   }
   }
   $index+=1;//increment to the next available id # 
   
   $newkit = db_insert('starter_kit')
   ->fields(array(
   	'id'=>$index,
   	'title'=>'',
   	'f1'=>0,
   	'f2'=>0,
   	'f3'=>0,
   	'f4'=>0,
   	'f5'=>0,
   ))
   ->execute();
   drupal_goto('admin/structure/starter_kit/edit/'.$index .'/');
}

/*
* Submit handler for editing existing starter kits
*/
function starter_kit_edit_kit_submit(){
	if(isset($_POST['edit'])){
		drupal_set_message($_POST['edit']);
	}
}