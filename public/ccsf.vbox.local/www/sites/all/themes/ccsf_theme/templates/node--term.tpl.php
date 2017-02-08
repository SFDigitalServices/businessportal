<?php
/**
 * @file
 * Returns the HTML for a Term node.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728164
 */
?>
<?php
 ////////////////////////////////////////////* VARIABLES *////////////////////////////////////////////////
// echo '<pre>';
// print_r($content);
// echo '</pre>';
 /**/

$node_id=$content['field_description']['#object']->nid;
$title=$content['field_description']['#object']->title;

if(isset( $content['field_description']['#object']->field_description['und'][0]['value'] )){
  $description = $content['field_description']['#object']->field_description['und'][0]['value'];
}
if( isset( $content['field_description']['#object']->field_source['und'][0]['url'] ) ){
  $source = $content['field_description']['#object']->field_source['und'][0]['url'];
}
  //if(isset($content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'])){
  //  $permit_licence_name = $content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'];
  //}
 

?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  

  


  <?php if($teaser || !$teaser): ?><?php /* Same view for both */ ?>
    <div class='term-teaser-mode'>
     
      <div class='term-teaser-title'>
        <h3><?php echo $title; ?></h3>
      </div>

      <?php if(isset($description)): ?>
        <p class='term-teaser-description'><?php echo $description; ?></p>
      <?php endif; ?>

      <?php if(isset($source)): ?>
        <p class='term-teaser-source'>Source / <a href='<?php echo $source; ?>' target="_blank"><?php echo $source; ?></a></p>
      <?php endif; ?>
      
    </div>
  <?php endif; ?>
  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
