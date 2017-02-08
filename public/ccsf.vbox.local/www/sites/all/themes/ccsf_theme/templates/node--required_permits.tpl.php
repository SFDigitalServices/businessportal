<?php
/**
 * @file
 * Returns the HTML for a required permits node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
drupal_add_library('system', 'drupal.ajax');//make sure we load the ajax library otherwise most of the cart function wont work!
?>

<?php
 ////////////////////////////////////////////* VARIABLES *////////////////////////////////////////////////
 //echo '<pre>';
 //print_r($content);
 //echo '</pre>';
 /**/
$items = array();
$type = $content['field_item_type']['#object']->field_item_type['und'][0]['taxonomy_term']->name;
//echo $type;
//$node_id=$content['field_description']['#object']->nid;

if(isset($content['field_form_1_title']['#object']->field_form_1_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_1_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_2_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_2_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_3_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_3_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_4_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_4_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_5_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_5_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_6_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_6_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_7_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_7_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_8_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_8_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_9_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_9_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_10_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_10_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_11_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_11_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_12_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_12_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_13_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_13_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_14_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_14_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_15_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_15_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_16_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_16_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_17_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_17_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_18_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_18_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_19_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_19_title['und'][0]['value']);
}
if(isset($content['field_form_1_title']['#object']->field_form_20_title['und'][0]['value'])){
  array_push($items,$content['field_form_1_title']['#object']->field_form_20_title['und'][0]['value']);
}

/////get the comma seperated list to send to the download all and add all functions
$list = array();
$stringified_list = '';

foreach($items as $key){//get the NID's for each item listed
  //dpm($key);
  if($node_id = ccsf_scripts_get_nid($key)){
    array_push($list,$node_id);
  }
  
}
//dpm($list);
$stringified_list = implode(',',$list);



?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  
  <?php if(!$teaser || $teaser): ?>
    <?php if($type=='Permit'): ?>
      
      <div id='required-permit-wrapper'>
        <div class='required-items'>
          <div class='required-items-heading'>

            <h2 class='arrow-rotate'>Required for all businesses <span>(<?php echo count($items); ?>)</span></h2>
            <div class='required-items-heading-actions'>
              <a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/permit/'.$stringified_list; ?>'><p class='required-items-download-cta'>Download all</p></a>
              <a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/permit/'.$stringified_list; ?>' class='use-ajax'><p class='required-items-add-cta'>Add all to My Folder</p></a>
            </div>    
          </div>

          <div class='required-items-nodes'>
            <div class='required-items-nodes-inner'>
              <?php foreach($items as $node_name): ?>
                <?php echo ccsf_scripts_related_item($node_name); ?>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif($type=='Document'): ?>
      
      <div id='required-docs-wrapper'>
        <div class='required-items'>
          <div class='required-items-heading'>

            <h2 class='arrow-rotate'>Featured Documents <span>(<?php echo count($items); ?>)</span></h2>
            <div class='required-items-heading-actions'>
              <!--<a href='<?php echo $GLOBALS['base_url'].'/resource-locator/documents';?>'><p class='required-items-view-cta'>View all</p></a>-->
              
            </div>    
          </div>

          <div class='required-items-nodes'>
            <div class='required-items-nodes-inner'>
              <?php foreach($items as $node_name): ?>
                <?php echo ccsf_scripts_related_item($node_name); ?>
              <?php endforeach; ?>
            </div>
          </div>
        </div> 
      </div>   

    <?php elseif($type=='Term'): ?>
    
      <div id='required-term-wrapper'>
        <div class='required-items'>
          <div class='required-items-heading'>

            <h2 class='arrow-rotate'>Featured Terms <span>(<?php echo count($items); ?>)</span></h2>
            <div class='required-items-heading-actions'>
              <!--<a href='<?php echo $GLOBALS['base_url'].'/resource-locator/terms';?>'><p class='required-items-view-cta'>View all</p></a>-->
              
            </div>    
          </div>

          <div class='required-items-nodes'>
            <div class='required-items-nodes-inner'>
              <?php foreach($items as $node_name): ?>
                <?php echo ccsf_scripts_related_item($node_name); ?>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif($type=='Department'): ?>
      
      <div id='required-dept-wrapper'>
        <div class='required-items'>
          <div class='required-items-heading'>

            <h2 class='arrow-rotate'>Featured Departments <span>(<?php echo count($items); ?>)</span></h2>
            <div class='required-items-heading-actions'>
              <!--<a href='<?php echo $GLOBALS['base_url'].'/resource-locator/departments';?>'><p class='required-items-view-cta'>View all</p></a>-->
              
            </div>    
          </div>

          <div class='required-items-nodes'>
            <div class='required-items-nodes-inner'>
              <?php foreach($items as $node_name): ?>
                <?php echo ccsf_scripts_related_item($node_name); ?>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php elseif($type=='Online Resource'): ?>
      
      <div id='required-resources-wrapper'>
        <div class='required-items'>
          <div class='required-items-heading'>

            <h2 class='arrow-rotate'>Featured Online Resources <span>(<?php echo count($items); ?>)</span></h2>
            <div class='required-items-heading-actions'>
              <!--<a href='<?php echo $GLOBALS['base_url'].'/resource-locator/online-resources';?>'><p class='required-items-view-cta'>View all</p></a>-->
              
            </div>    
          </div>

          <div class='required-items-nodes'>
            <div class='required-items-nodes-inner'>
              <?php foreach($items as $node_name): ?>
                <?php echo ccsf_scripts_related_item($node_name); ?>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>

    <?php endif; ?>

  <?php endif; ?>
  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
