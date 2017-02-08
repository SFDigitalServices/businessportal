<?php
/**
 * @file
 * Returns the HTML for a Department node.
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
//if(isset($content['field_website_url']['#object']->nid)){
  $node_id = $content['field_website_url']['#object']->nid;
//}
//if(isset($content['field_website_url']['#object']->title)){
  $title = ccsf_scripts_get_title($node_id);
//}
if(isset($content['field_website_url']['#object']->field_website_url['und'][0]['value'])){
  $website_url = $content['field_website_url']['#object']->field_website_url['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_phone_number['und'][0]['value'])){
  $phone = $content['field_website_url']['#object']->field_phone_number['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_physical_address['und'][0]['value'])){
  $physical_address = $content['field_website_url']['#object']->field_physical_address['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_mailing_address['und'][0]['value'])){
  $mailing_address = $content['field_website_url']['#object']->field_mailing_address['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_email['und'][0]['value'])){
  $email = $content['field_website_url']['#object']->field_email['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_contact_us_url['und'][0]['value'])){
  $contact_url = $content['field_website_url']['#object']->field_contact_us_url['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_dept_description['und'][0]['value'])){
  $description = $content['field_website_url']['#object']->field_dept_description['und'][0]['value'];
}
if(isset($content['field_website_url']['#object']->field_department_type['und'][0]['taxonomy_term']->name)){
  $dept_type = $content['field_website_url']['#object']->field_department_type['und'][0]['taxonomy_term']->name;
}

$where = ccsf_get_url();

?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    //print render($content);
  ?>
  <?php ///////////////////////////////////////// ?>
  <?php if(!$teaser): ?>
    <div class='dept-full-wrap'>
      
      <div class='dept-banner'>
        <div class='dept-banner-contents'>
          
          <div class='dept-banner-image'>
            <img src='<?php echo $GLOBALS['base_url']; ?>/sites/all/themes/ccsf_theme/images/graphics/icon_pin.png'/>
          </div>

          <div class='dept-banner-text'>
            <?php if(isset($title)): ?>
              <h1 class='dept-name'><?php echo $title; ?></h1>
            <?php endif; ?>
            
            <?php if(isset($description)): ?>
              <div class='dept-description'>
                <?php echo $description; ?>
              </div>
            <?php endif; ?>
            
            <?php if(isset($website_url)): ?>
              <a href='<?php echo $website_url; ?>'><p id='dept-visit-cta' class='dept-banner-cta'>Visit website</p></a>
            <?php endif; ?>
            
          </div>

        </div>
      </div>
      <div class='dept-full-content-wrap'>
        
        <div class='dept-full-sidebar'>
          
          <?php if(isset($dept_type)): ?>
          <div class='dept-agency'>
            <h3>Agency Type</h3>
              <p><?php echo $dept_type; ?></p>
          </div>
          <?php endif; ?>
          
        </div><?php //* dept sidebar *// ?>

        <div class='dept-full-main'>
          
          <div class='dept-main-information'>
            <?php if( isset($phyical_address) || isset($mailing_address) || isset($phone) || isset($website_url) ): ?>
              <h2>Contact Information</h2>
            <?php endif; ?>
            
            <?php if(isset($physical_address)): ?>
              <h3>Physical Address</h3>
              <p><?php echo $physical_address; ?></p>
            <?php endif; ?>

            <?php if(isset($mailing_address)): ?>
              <h3>Mailing Address</h3>
              <p><?php echo $mailing_address; ?></p>
            <?php endif; ?>

            <?php if(isset($phone)): ?>
              <h3>Phone</h3>
              <p><?php echo $phone; ?></p>
            <?php endif; ?>

            <?php if(isset($website_url)): ?>
              <h3>Website</h3>
              <a href='<?php echo $website_url; ?>'><p><?php echo $website_url; ?></p></a>
            <?php endif; ?>
          </div>

        </div>

      </div><?php /* dept-full-content-wrap */ ?>

    </div><?php /*dept-full-wrap*/ ?>



  <?php elseif($teaser): ?><?php /* END FULL CONTENT VIEW */ ?>
    <?php if($where == 'start' || $where == 'manage' || $where == 'grow' || $where=='kits'): ?>
      <?php ?>
      <div class='dept-teaser-mode <?php echo $where.'-color-section' ?>'>
        <?php if(isset($title)): ?>
          <div class='dept-teaser-title'>
            <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $title; ?></h3></a>
          </div>
        <?php endif; ?>

        <?php if(isset($description)): ?>
          <div class='dept-teaser-description'><?php echo $description; ?></div>
        <?php endif; ?>

        <div class='dept-teaser-actions'>
              <a href='<?php echo $GLOBALS["base_url"].'/node/'.$node_id; ?>'><p class='dept-teaser-view-cta tool-tip' title='View Department'><span>View</span></p></a>
        </div>
      
      </div>

    <?php else: ?>

      <div class='dept-teaser-mode'>
      
      <div class='dept-teaser-title'>
        <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $title; ?></h3></a>
        
        <?php //if(count($forms)>0): ?>
        <div class='dept-teaser-actions'>
            <a href='<?php echo $GLOBALS["base_url"].'/node/'.$node_id; ?>'><p class='dept-teaser-view-cta tool-tip' title='View Department'><span>View</span></p></a>
            
        </div>
        <?php //endif; ?>

      </div>

      <?php if(isset($description)): ?>
        <div class='dept-teaser-description'>
          <?php echo $description; ?>
        </div>
      <?php endif; ?>
      
    </div>

    <?php endif; ?>
    
  <?php endif; ?>

  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
