<?php
/**
*
* Admin functions for Starter Kit
*
*/


/**
* implements hook_menu().
*/
function starter_kit_menu(){
	$items = array();
	$items['admin/config/content/starter_kit'] = array(
		'title'=>'Starter Kit',
		'description'=>'Configuration for Starter Kit Module',
		'page callback'=>'drupal_get_form',
		'page arguments'=>array('starter_kit_form'),
		'access argument'=>array('access administration page'),
		'type'=>MENU_NORMAL_ITEM,
	);
	return $items;
}



function starter_kit_form($form, &$form_state){
	
	$form['starter_kit_max'] = array(
		'#type' => 'textfield',
		'#title' => t('Maximum number of posts'),
		'#default_value' => variable_get('starter_kit_max',3),
		'#size' => 2,
		'#maxlength' => 2,
		'#description'=> t('The maximum number of links to display in the block'),
		'#required' => TRUE,
	);
	return system_settings_form($form);
}