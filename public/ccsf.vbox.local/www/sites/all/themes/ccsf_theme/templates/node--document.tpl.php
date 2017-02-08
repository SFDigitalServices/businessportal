<?php
/**
 * @file
 * Returns the HTML for a Document node.
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

  $node_id=$content['field_short_description']['#object']->nid;
  $title = ccsf_scripts_get_title($node_id);
  $download_url=$GLOBALS["base_url"].'/my-folder/download-single/doc/'.$node_id;
  $add_to_folder_url=$GLOBALS["base_url"].'/my-folder/add/doc/'.$node_id;

  //if(isset($content['field_short_description']['#object']->title)){
    //$title = $content['field_short_description']['#object']->title;
  //}
  if(isset($content['field_short_description']['#object']->field_short_description['und'][0]['value'])){
    $short_description = $content['field_short_description']['#object']->field_short_description['und'][0]['value'];
  }
  if(isset($content['field_short_description']['#object']->field_business_stage['und'][0]['taxonomy_term']->name)){
    $business_stage_one = $content['field_short_description']['#object']->field_business_stage['und'][0]['taxonomy_term']->name;
  }
  if(isset($content['field_short_description']['#object']->field_business_stage['und'][1]['taxonomy_term']->name)){
    $business_stage_two = $content['field_short_description']['#object']->field_business_stage['und'][1]['taxonomy_term']->name;
  }
  if(isset($content['field_short_description']['#object']->field_business_stage['und'][2]['taxonomy_term']->name)){
    $business_stage_three = $content['field_short_description']['#object']->field_business_stage['und'][2]['taxonomy_term']->name;
  }

  if(isset($content['field_short_description']['#object']->field_business_need['und'][0]['taxonomy_term']->name)){
    $business_need = $content['field_short_description']['#object']->field_business_need['und'][0]['taxonomy_term']->name;
  }
  //field_type
  //field_information
  if(isset($content['field_short_description']['#object']->field_document_file['und'][0]['filename'])){
    $file_name = $content['field_short_description']['#object']->field_document_file['und'][0]['filename'];
  }
  if(isset($content['field_short_description']['#object']->field_department_organization['und'][0]['taxonomy_term']->name)){
    $dept = $content['field_short_description']['#object']->field_department_organization['und'][0]['taxonomy_term']->name;
    //field_issuing_department['und'][0]['taxonomy_term']->name;
    
    $dept_nid = ccsf_scripts_get_department($dept);  
  }
  //get $nid for related items
  if(isset($content['field_description']['#object']->field_related_item_1['und'][0]['value'])){
    $relatedOne=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_1['und'][0]['value']);
  }
  if(isset($content['field_description']['#object']->field_related_item_2['und'][0]['value'])){
    $relatedTwo=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_2['und'][0]['value']);
  }
  if(isset($content['field_description']['#object']->field_related_item_3['und'][0]['value'])){
    $relatedThree=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_3['und'][0]['value']);
  }
  if(isset($content['field_description']['#object']->field_related_item_4['und'][0]['value'])){
    $relatedFour=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_4['und'][0]['value']);
  }
  if(isset($content['field_description']['#object']->field_related_item_5['und'][0]['value'])){
    $relatedFive=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_5['und'][0]['value']);
  }
  if(isset($content['field_description']['#object']->field_related_item_6['und'][0]['value'])){
    $relatedSix=ccsf_scripts_related_item($content['field_short_description']['#object']->field_related_item_6['und'][0]['value']);
  }
 /**/

$where = ccsf_get_url();
//echo $where;

?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  
  <?php if(!$teaser): ?>
    <div class='doc-full-wrap'>
      
      <div class='doc-banner'>
        <div class='doc-banner-inner'>
          <div class='doc-banner-contents'>
            
            <div class='doc-banner-image'>
              <div class='doc-banner-image-inner'>
                <img src='<?php echo $GLOBALS['base_url']; ?>/sites/all/themes/ccsf_theme/images/graphics/icon_resources_02.png'/>
              </div>
            </div>

            <div class='doc-banner-text'>
              <?php if(isset($title)): ?>
                <h3 class='doc-name'><?php echo $title; ?></h3>
              <?php endif; ?>
              
              <?php if(isset($short_description)): ?>
                <p class='doc-description'><?php echo $short_description; ?></p>
              <?php endif; ?>

              <?php if(isset($file_name)): ?>
                <div class='doc-banner-actions'>
                  <a href='<?php echo $download_url; ?>'><p id='doc-download-cta' class='doc-banner-cta'>Download</p></a>
                  <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p id='doc-folder-cta' class='doc-banner-cta'>Add to My Folder</p></a>
                </div>
              <?php endif; ?>
            </div>

          </div>
        </div>
      </div>
      <div class='doc-full-content-wrap'>
        
        <div class='doc-full-sidebar'>
          
          <?php if(isset($business_stage_one) || isset($business_stage_two) || isset($business_stage_three) ): ?>
            <div class='doc-business-stage'>
              <h3>Business Stage</h3>
              
              <?php if(isset($business_stage_one)): ?>
                
                  <a href='<?php echo $GLOBALS['base_url'].'/'.$business_stage_one; ?>'><p><?php echo $business_stage_one; ?></p></a>
                
              <?php endif; ?>
              
              <?php if(isset($business_stage_two)): ?>
              <p>,</p>
              <a href='<?php echo $GLOBALS['base_url'].'/'.$business_stage_two; ?>'><p><?php echo $business_stage_two; ?></p></a>
              <?php endif; ?>
              
              <?php if(isset($business_stage_three)): ?>
              <p>,</p>
              <a href='<?php echo $GLOBALS['base_url'].'/'.$business_stage_three; ?>'><p><?php echo $business_stage_three; ?></p></a>
              <?php endif; ?>
            
            </div>
          <?php endif; ?>

          <?php if(isset($business_need)): ?>
            <div class='doc-business-need'>
              <h3>Business Need</h3>
              <?php if(isset($business_need)): ?>
                <p><?php echo $business_need; ?></p>
              <?php endif; ?>
            </div>
          <?php endif; ?>
          
          <!--
          <div class='doc-business-types'>
            <h3>Business Types</h3>
            
            <?php  //$numItems=count($industry_tag); $i=0; $string='<p>'; ?>
            <?php //foreach($industry_tag as $term): ?>
              <?php //$i++; $id = $term['tid']; $term_load = taxonomy_term_load($id); $name = $term_load->name; ?>
              <?php //if($i == $numItems): ?>
                <?php //$string .= "<a id='". $id ."'>". $name ."</a>"; ?>
              <?php //else: ?>
                <?php //$string .= "<a id='". $id ."'>". $name .", </a>"; ?>
              <?php //endif; ?>            
            <?php //endforeach; ?>
            <?php //$string .= '</p>'; ?>
            <?php //echo $string; ?>
          </div>
          -->
          <?php if(isset($dept)): ?>
            <div class='doc-dept'>
              <h3>Department or Organization</h3>
              <?php if(isset($dept)): ?>
                <a href='<?php echo $GLOBALS['base_url'].'/node/'.$dept_nid; ?>'><p><?php echo $dept; ?></p></a>
              <?php endif; ?>
            </div>
          <?php endif; ?>

        </div><?php //* doc sidebar *// ?>

        <div class='doc-full-main'>
          
          <?php if(isset($information)): ?>
            <div class='doc-main-information'>
              
              <h2>Information</h2>
              
                <p><?php echo $information; ?></p>
              
            </div>
          <?php endif; ?>

          

          <div class='doc-related-items'>
            
            
            
                <?php 
                  $block = block_load('ccsf_related_nodes', 'ccsf_related_nodes_doc_block');
                  print render(_block_get_renderable_array(_block_render_blocks(array($block))));
                ?>

          

          </div><?php // * end related items *// ?>

        </div>

      </div><?php /* doc-full-content-wrap */ ?>

    </div><?php /*doc-full-wrap*/ ?>



  <?php elseif($teaser): ?><?php /* END FULL CONTENT VIEW */ ?>



    <?php if($where == 'start' || $where == 'manage' || $where == 'grow' || $where == 'node' || $where=='kits'): ?><?php /* set up for the featured items sections */ ?>

      <div class='doc-teaser-mode <?php echo $where.'-color-section'; ?>'>
        
        <div class='doc-teaser-title'>
          <?php if(isset($title)): ?>
            <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $title; ?></h3></a>
          <?php endif; ?>
        </div>

        <?php if(isset($short_description)): ?>
          <div class='doc-teaser-description'><?php echo $short_description; ?></div>
        <?php endif; ?>

        <div class='doc-teaser-actions'>
            
            <a href='<?php echo $GLOBALS["base_url"].'/node/'. $node_id; ?>'><p class='doc-teaser-view-cta tool-tip' title='View Document'><span>View</span></p></a>
            <?php if(isset($file_name)): ?>
              <a href='<?php echo $download_url; ?>'><p class='doc-teaser-download-cta tool-tip' title='Download Document'><span>Download</span></p></a>
              <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p class='doc-teaser-folder-cta tool-tip' title='Add to My Folder'><span>Add to my folder</span></p></a>
            <?php endif; ?>
        </div>
        
      </div>    

    <?php else: ?>

      <div class='doc-teaser-mode'>
        
        <div class='doc-teaser-title'>
          <?php if(isset($title)): ?>
            <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $title; //echo $where; ?></h3></a>
          <?php endif; ?>
          
          <?php //if(count($forms)>0): ?>
          <div class='doc-teaser-actions'>
              <a href='<?php echo $GLOBALS["base_url"].'/node/'. $node_id; ?>'><p class='doc-teaser-view-cta tool-tip' title='View Document'><span>View</span></p></a>
              <?php if(isset($file_name)): ?>
                <a href='<?php echo $download_url; ?>'><p class='doc-teaser-download-cta tool-tip' title='Download Document'><span>Download</span></p></a>
                <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p class='doc-teaser-folder-cta tool-tip' title='Add to My Folder'><span>Add to my folder</span></p></a>
              <?php endif; ?> 
         </div>
          <?php //endif; ?>

        </div>

        <?php if(isset($short_description)): ?>
          <p class='doc-teaser-description'><?php echo $short_description; ?></p>
        <?php endif; ?>
        
      </div>
    
    <?php endif; ?>

  <?php endif; ?>
  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
