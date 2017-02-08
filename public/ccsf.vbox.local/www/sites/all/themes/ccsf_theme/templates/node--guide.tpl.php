<?php
/**
 * @file
 * Returns the HTML for a node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
//echo '<pre>';
//print_r($content);
//echo '<pre>';
drupal_add_library('system', 'drupal.ajax');//make sure we load the ajax library otherwise most of the cart function wont work!

$id=$node->nid;
//dpm($id);
if(isset($content['field_description']['#object']->field_heading['und'][0]['value'])){
  $heading = $content['field_description']['#object']->field_heading['und'][0]['value'];  
}

if(isset($content['field_description']['#object']->field_description['und'][0]['value'])){
  $description = $content['field_description']['#object']->field_description['und'][0]['value'];  
}

if(isset($content['field_description']['#object']->field_document['und'][0]['value'])){
  $body = $content['field_description']['#object']->field_document['und'][0]['value'];  
}

if(isset($content['field_description']['#object']->body['und'][0]['value'])){
  $body = $content['field_description']['#object']->body['und'][0]['value'];  
}

?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  

  <?php if(!$teaser): ?>
    <div class='guide-outter-wrap'> 
      <div class='guide-heading'>
        <h2><?php echo $heading; ?></h2>
      </div>
      
      <div class='guide-description'>
        <p><?php echo $description; ?></p>
      </div>
      
      <div class='guide-actions'>
          <a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/guide/'.$id; ?>'><p class='guide-download'>Download Guide</p></a>
          <a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/guide/'.$id; ?>' class='use-ajax'><p class='guide-add-folder'>Add Guide to My Folder</p></a>
      </div>

      <div class='guide-body'>
        <?php echo $body; ?>
      </div>
    </div>
  <?php elseif($teaser): ?>
    <div class='guide-teaser-outter-wrap'> 
      <div class='guide-teaser-heading'>
        <h2><?php echo $heading; ?></h2>
      </div>
      
      <div class='guide-teaser-description'>
        <p><?php echo $description; ?></p>
      </div>
      
      <div class='guide-teaser-actions'>
          <a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/guide/'.$id; ?>'><p class='guide-download tool-tip' title='Download Guide'>Download Guide</p></a>
          <a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/guide/'.$id; ?>' class='use-ajax'><p class='guide-add-folder tool-tip' title='Add to My Folder'>Add Guide to My Folder</p></a>
      </div>
    </div>
  <?php endif; ?>
  
  <?php //print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

  
</article>
