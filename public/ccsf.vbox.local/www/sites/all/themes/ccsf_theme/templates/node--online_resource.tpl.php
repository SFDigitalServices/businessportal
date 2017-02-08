<?php
/**
 * @file
 * Returns the HTML for a Online resource node.
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

$node_id=$content['field_description']['#object']->nid;
$title=ccsf_scripts_get_title($node_id);//workaround for a panels bug.

if(isset( $content['field_description']['#object']->field_link['und'][0]['url'] )){
  $link = $content['field_description']['#object']->field_link['und'][0]['url'];
}
if( isset( $content['field_description']['#object']->field_description['und'][0]['value'] ) ){
  $description = $content['field_description']['#object']->field_description['und'][0]['value'];
}

  //if(isset($content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'])){
  //  $permit_licence_name = $content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'];
  //}

$where = ccsf_get_url();

?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>
<nav>
<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>


  <?php if($teaser || !$teaser): ?><?php /* Same view for both */ ?>
    
    <?php if($where == 'start' || $where=='manage' || $where == 'grow' || $where == 'node' || $where == 'kits'): ?>
    
      <div class='resource-teaser-mode-two <?php echo $where.'-color-section' ?>'>
        <div class='resource-teaser-title'>
          <h3><?php echo $title; ?></h3>
          
        </div>
        <?php if(isset($description)): ?>
          <div class='resource-teaser-description'><?php echo $description; ?></div>
        <?php endif; ?>
        <?php if(isset($link)): ?>
          <div class='resource-teaser-actions'>
            <a href='<?php echo $link; ?>' target='_blank'><p class='resource-link-cta tool-tip' title='View Online Resource'><span><?php echo $link; ?></span></p></a>
          </div>
        <?php endif; ?>
      </div>

    <?php else: ?><?php /* If viewing on a page that is in the start manage grow sections */ ?>
  
      <div class='resource-teaser-mode'>
        <div class='resource-teaser-title'>
          <h3><?php echo $title; ?></h3>
          <?php if(isset($link)): ?>
            <div class='resource-teaser-actions'>
              <a href='<?php echo $link; ?>' target='_blank'><p class='resource-link-cta tool-tip' title='View Online Resource'><span>Link</span></p></a>
            </div>
          <?php endif; ?>
        </div>
        <?php if(isset($description)): ?>
          <div class='resource-teaser-description'><?php echo $description; ?></div>
        <?php endif; ?>
      </div>

    <?php endif; ?>

  <?php endif; ?>
  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
</nav>
