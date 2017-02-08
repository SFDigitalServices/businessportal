<?php
/**
 * @file
 * Returns the HTML for a Permit node.
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

$node_id=$content['field_permit_licence_name']['#object']->nid;
$title = ccsf_scripts_get_title($node_id);

  if(isset($content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'])){
    $permit_licence_name = $content['field_permit_licence_name']['#object']->field_permit_licence_name['und'][0]['value'];
  }
 
  if(isset($content['field_permit_licence_name']['#object']->field_description['und'][0]['value'])){
    $description = $content['field_permit_licence_name']['#object']->field_description['und'][0]['value'];
  }
  
  if(isset($content['field_permit_licence_name']['#object']->field_apply_online['und'][0]['url'])){
    $apply_online_url = $content['field_permit_licence_name']['#object']->field_apply_online['und'][0]['url'];
  }
  
  /* For use with teaser view */
  //if(isset($content['field_permit_licence_name']['#object']->field_view_permit['und'][0]['url'])){
  //   $view_permit_url = $content['field_permit_licence_name']['#object']->field_view_permit['und'][0]['url'];
  //}

  
  /*Might Remove*/
  //if(isset($content['field_permit_licence_name']['#object']->field_link['und'][0]['url'])){
    $download_url = $GLOBALS['base_url'].'/my-folder/download-single/permit/'.$node_id;
  //}

  /*Might Remove*/
  //if(isset($content['field_permit_licence_name']['#object']->field_link_2['und'][0]['url'])){
    $add_to_folder_url = $GLOBALS['base_url'].'/my-folder/add/permit/'.$node_id;
  //}
 
  if(isset($content['field_permit_licence_name']['#object']->field_information_text['und'][0]['value'])){
    $information = $content['field_permit_licence_name']['#object']->field_information_text['und'][0]['value'];
  }
  
  if(isset($content['field_permit_licence_name']['#object']->field_cost['und'][0]['value'])){
    $cost = $content['field_permit_licence_name']['#object']->field_cost['und'][0]['value'];
  }
  
  //get the tags for business types
  if(isset($content['field_permit_licence_name']['#object']->field_industry_tag['und'])){
    $industry_tag = $content['field_permit_licence_name']['#object']->field_industry_tag['und'];
  }

////////////GET A RANDOM INDUSTRY TAG THAT THE NODE HAS, LOAD RELATED NODES 
/*if(isset($industry_tag)){
  $amount = count($industry_tag);
  $random = rand(0,$amount-1);
  //echo $random;
  $related = taxonomy_select_nodes($industry_tag[$random]);
  echo '<pre>';
  print_r($related);
  echo '</pre>';
}*/
////////////

  // !!!!!!! FIX THIS !!!!!!//
  //get the tag name for the issuing dept
  
  if(isset($content['field_permit_licence_name']['#object']->field_issuing_department['und'][0]['tid'])){
    $issuing_dept_tid = $content['field_permit_licence_name']['#object']->field_issuing_department['und'][0]['tid'];
    //echo $issuing_dept_tid;
  }
  if(isset($content['field_permit_licence_name']['#object']->field_issuing_department['und'][0]['taxonomy_term']->name)){
    $issuing_dept_name = $content['field_permit_licence_name']['#object']->field_issuing_department['und'][0]['taxonomy_term']->name;
    
    $dept_nid = ccsf_scripts_get_department($issuing_dept_name);
  }


  if(isset($content['field_permit_licence_name']['#object']->field_government_level['und'][0]['tid'])){
    $government_level = $content['field_permit_licence_name']['#object']->field_government_level['und'][0]['tid'];// use taxonomy_get_term($tid);
    $government_level_term = taxonomy_term_load($government_level);
    $government_level = $government_level_term->name;
  }
  
  //prep array of forms
  $forms = ccsf_scripts_forms_prep($content);

  //echo '<pre>';
  //print_r($forms);
  //echo '</pre>';

  //get $nid for related items
  
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_1['und'][0]['value'])){
    $relatedOne=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_1['und'][0]['value']);
  }
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_2['und'][0]['value'])){
    $relatedTwo=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_2['und'][0]['value']);
  }
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_3['und'][0]['value'])){
    $relatedThree=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_3['und'][0]['value']);
  }
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_4['und'][0]['value'])){
    $relatedFour=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_4['und'][0]['value']);
  }
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_5['und'][0]['value'])){
    $relatedFive=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_5['und'][0]['value']);
  }
  if(isset($content['field_permit_licence_name']['#object']->field_related_item_6['und'][0]['value'])){
    $relatedSix=ccsf_scripts_related_item($content['field_permit_licence_name']['#object']->field_related_item_6['und'][0]['value']);
  }
 /**/
$where = ccsf_get_url();

?>
<?php /////////////////////////////////////////* PAGE TEMPLATE */////////////////////////////////////////// ?>

<article class="node-<?php print $node->nid; ?> <?php print $classes; ?> clearfix"<?php print $attributes; ?>>

  

  <?php if(!$teaser): ?>
    <div class='permit-full-wrap'>
      
      <div class='permit-banner'>
        <div class='permit-banner-inner'>
          <div class='permit-banner-contents'>
            
            <div class='permit-banner-image'>
              <div class='permit-banner-image-inner'>
                <img src='<?php echo $GLOBALS['base_url']; ?>/sites/all/themes/ccsf_theme/images/graphics/icon_permits_02.png'/>
              </div>
            </div>

            <div class='permit-banner-text'>
              <?php if(isset($permit_licence_name)): ?>
                <h3 class='permit-name'><?php echo $permit_licence_name; ?></h3>
              <?php endif; ?>

              <?php if(isset($description)): ?>
                <p class='permit-description'><?php echo $description; ?></p>
              <?php endif; ?>
             
              
                <div class='permit-banner-actions'>
                  <?php if(isset($apply_online_url)): ?>
                    <a href='<?php echo $apply_online_url; ?>' target='_blank'><p id='permit-apply-cta' class='permit-banner-cta'>Access Online</p></a>
                  <?php endif; ?>
                  <?php if(count($forms)>0): ?>
                    <a href='<?php echo $download_url; ?>'><p id='permit-download-cta' class='permit-banner-cta'>Download</p></a>
                  <?php endif; ?>
                  <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p id='permit-folder-cta' class='permit-banner-cta'>Add to My Folder</p></a>
                </div>
            </div>

          </div>
        </div>
      </div>
      <div class='permit-full-content-wrap'>
        
        <div class='permit-full-sidebar'>
          
          <?php if(isset($cost)): ?>
            <div class='permit-cost'>
              <h3>Cost</h3>
              <p><?php echo $cost; ?></p>
            </div>
          <?php endif; ?>
          
          <?php if(isset($issuing_dept_name)): ?>
            <div class='permit-issuing-dpt'>
              <h3>Issuing Department</h3>
              <?php //$dept = ccsf_scripts_issuing_department($issuing_dept); ?>
              <a href='<?php echo $GLOBALS['base_url'].'/node/'.$dept_nid; ?>'><p><?php echo $issuing_dept_name; ?></p></a>
            </div>
          <?php endif; ?>
          
          <?php if(isset($industry_tag)): ?>
          <?php /* 
            <div class='permit-business-types'>
              <h3>Business Types</h3>
              
              <?php  $numItems=count($industry_tag); $i=0; $string='<p id="permit-business-tags-all">'; ?>
              <?php foreach($industry_tag as $term): ?>
                <?php $i++; $id = $term['tid']; $term_load = taxonomy_term_load($id); $name = $term_load->name; ?>
                <?php if($i == $numItems): ?>
                  <?php $string .= "<span id='". $id ."' class='permit-business-tag'>". $name ."</span>"; ?>
                <?php else: ?>
                  <?php $string .= "<span id='". $id ."' class='permit-business-tag'>". $name ."<span class='tag-comma'>,</span> </span>"; ?>
                <?php endif; ?>            
              <?php endforeach; ?>
              <?php $string .= '</p>'; ?>
              <?php echo $string; ?>
            </div>
            */ ?>
          <?php endif; ?>

          <?php if(isset($government_level)): ?>
            <div class='permit-govt-level'>
              <h3>Agency Type</h3>
              <p><?php echo $government_level; ?></p>
            </div>
          <?php endif; ?>

        </div><?php //* Permit sidebar *// ?>

        <div class='permit-full-main'>
          
          <?php if(isset($information)): ?>
            <div class='permit-main-information'>
              <h2>Information</h2>
              <p><?php echo $information; ?></p>
            </div>
          <?php endif; ?>

          <?php if(count($forms)>0): ?>
            <div class='permit-full-documents'>
              <h2>Permit Documents</h2>
              <p>The following documents are part of this permit. Fill out the necessary forms and submit them to the issuing department to apply.</p>
              
              <div class='permits-form-links'>  
                <?php foreach($forms as $item): ?>
                  <a href='<?php echo $GLOBALS["base_url"]; ?>/sites/default/files/forms/<?php echo $item['file']; ?>' target='_blank'><?php echo $item['name'] ?></a>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endif; ?>

          <div class='permit-related-items'>
            
                <?php 
                  $block = block_load('ccsf_related_nodes', 'ccsf_related_nodes_permit_block');
                  print render(_block_get_renderable_array(_block_render_blocks(array($block))));
                ?>

          </div><?php // * end related items *// ?>

        </div>

      </div><?php /* permit-full-content-wrap */ ?>

    </div><?php /*permit-full-wrap*/ ?>



  <?php elseif($teaser): ?><?php /* END FULL CONTENT VIEW */ ?>
    <?php if($where == 'start' || $where == 'manage' || $where == 'grow' || $where == 'node' || $where=='kits'): ?><?php /* set up for the featured items sections */ ?>
      
      <div class='permit-teaser-mode <?php echo $where.'-color-section' ?>'>
        
        <?php if(isset($permit_licence_name)): ?>
          <div class='permit-teaser-title'>
            <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $permit_licence_name; ?></h3></a>
          </div>
        <?php endif; ?>

        <?php if(isset($description)): ?>
          <div class='permit-teaser-description'><?php echo $description; ?></div>
        <?php endif; ?>
        
        
          <div class='permit-teaser-actions'>
              <a href='<?php echo $GLOBALS["base_url"].'/node/'.$node_id; ?>'><p class='permit-teaser-view-cta tool-tip' title='View Permit'><span>View</span></p></a>
            <?php if(count($forms)>0): ?>
              <a href='<?php echo $download_url; ?>'><p class='permit-teaser-download-cta tool-tip' title='Download Permit'><span>Download</span></p></a>
            <?php endif; ?>
              <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p class='permit-teaser-folder-cta tool-tip' title='Add to My Folder'><span>Add to my folder</span></p></a>
          </div>
        
        
      </div>
    
    <?php else: ?>
      
      <div class='permit-teaser-mode'>
      
        <div class='permit-teaser-title'>
          <?php if(isset($permit_licence_name)): ?>
            <a href='<?php echo $GLOBALS['base_url'].'/node/'.$node_id; ?>'><h3><?php echo $permit_licence_name; ?></h3></a>
          <?php endif; ?>
          
          <div class='permit-teaser-actions'>
              <a href='<?php echo $GLOBALS["base_url"].'/node/'.$node_id; ?>'><p class='permit-teaser-view-cta tool-tip' title='View Permit'><span>View</span></p></a>
            <?php if(count($forms)>0): ?>
              <a href='<?php echo $download_url; ?>'><p class='permit-teaser-download-cta tool-tip' title='Download Permit'><span>Download</span></p></a>
            <?php endif; ?>
              <a href='<?php echo $add_to_folder_url; ?>' class='use-ajax'><p class='permit-teaser-folder-cta tool-tip' title='Add to My Folder'><span>Add to my folder</span></p></a>
          </div>
          

        </div>

        <?php if(isset($description)): ?>
          <div class='permit-teaser-description'><?php echo $description; ?></div>
        <?php endif; ?>
        
      </div>
    
    <?php endif; ?>
    
  <?php endif; ?>
  <?php // print render($content['links']); ?>

  <?php //print render($content['comments']); ?>

</article>
