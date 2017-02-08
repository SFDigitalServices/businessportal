<?php
/**
* 
* @file
* The delete form for the starter kit module
*
*/

function starter_kit_delete_form($form, &$form_state, $argument){
	
	$kit = starter_kit_single($argument);
  
	foreach($kit as $key){
  		$title = $key->title;
  		$id = $key->id;
  	}
	$form['id']=array(//for use with form submit
		'#type'=>'value',
		'#value'=>$id,
	);
	$form['title']=array(
		'#type'=>'value',
		'#value'=>$title,
	);
	$form['delete']=array(
		'#type'=>'fieldset',
		'#title'=>t('Delete Your Starter Kit'),
		'#collapsible'=>FALSE,
		'#collapsed'=>FALSE,
	);
	$form['delete']['message']=array(
		'#prefix'=>'<p>Are you sure you want to delete</p>',
	);
	$form['delete']['name']=array(
		'#prefix'=>'<p><strong>'. $title . '</strong></p>',
	);
	$form['delete']['confirm']=array(
		'#prefix'=>'<div id="delete-buttons" class="clearfix">',
		'#type'=>'submit',
        '#value'=>t('Delete'),
        '#name'=>t('delete_submit'),
        '#submit'=>array('starter_kit_delete_submit'),
	);
	$form['delete']['cancel']=array(
		'#prefix'=>'<p id="delete-cancel">'. l('Cancel','admin/structure/starter_kit') .'</p>',
		'#suffix'=>'</div>',
	);
	
	return $form;
	
}

function starter_kit_delete_submit($form, &$form_state){
	if($_POST['delete_submit']){
		$id = $form_state['values']['id'];
		$title = $form_state['values']['title'];
		
		$delete = db_delete('starter_kit')//remove it from out table
			->condition('id',$id)
			->execute();
		$delete_block = db_delete('block')//romove it from the block table
			->condition('delta','starter_kit_'.$id)
			->execute();
		
		dpm('starter_kit_'.$id);	
		if(strlen($title)>0){
			drupal_set_message(t($title.' was successfully deleted.'));
		}else{
			drupal_set_message(t('Unnamed starter kit was successfully deleted.'));
		}	
		
		drupal_goto('admin/structure/starter_kit');
	}
}