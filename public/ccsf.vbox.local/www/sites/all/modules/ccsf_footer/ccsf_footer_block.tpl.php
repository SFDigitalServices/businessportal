<?php 
/*
* CCSF footer block
*/
$where = ccsf_get_url();
$node = ccsf_footer_get_type();
if(isset($node)){
	$type=$node->type;
}
?>

<div id='ccsf-footer-wrap' class='<?php echo $where.'-color-section' ?> <?php if(isset($type)){echo $type.'-type';} ?>'>

	<div class='ccsf-footer-top'>
		<div class='footer-inner'>
			<div id='ccsf-footer-about' class='ccsf-footer-top-section'>
				<h3 class='ccsf-footer-header'>About this website</h3>
        <p class='ccsf-footer-copy'>The San Francisco Business Portal is the ultimate resource for <a href='<?php echo $GLOBALS['base_url'].'/start' ?>'>starting</a>, <a href='<?php echo $GLOBALS['base_url'].'/manage' ?>'>running</a>, and <a href='<?php echo $GLOBALS['base_url'].'/grow' ?>'>growing</a> a business in our City. With comprehensive information and tailored tools, the portal helps you navigate the process and quickly learn what it takes to be compliant.</p>
			</div>
			
			<div id='ccsf-footer-assistance' class='ccsf-footer-top-section'>
				<h3 class='ccsf-footer-header'>Get assistance</h3>
				<p class='ccsf-footer-copy'><a href='<?php echo $GLOBALS['base_url'].'/contact' ?>'>Contact us</a> for general advice or one-on-one assistance from a business counselor. We&rsquo;re here to help.</p>
			</div>
			
			<div id='ccsf-footer-twitter' class='ccsf-footer-top-section'>
				<h3 class='ccsf-footer-header'>Stay connected</h3>
				<?php 
                 // $block = block_load('views', 'tweets');
                  //print render(_block_get_renderable_array(_block_render_blocks(array($block))));
					echo views_embed_view('footer_twitter_feed', 'block');
                ?>


			</div>
			
			<div id='ccsf-footer-share' class='ccsf-footer-top-section'>
				<h3 class='ccsf-footer-header'>Share this page</h3>
				<p class='ccsf-footer-copy'>Share what you&rsquo;ve learned with your network.</p>
        
				<div id='ccsf-footer-share-links'>
          <?php $og_description = urlencode("The San Francisco Business Portal is the ultimate resource for starting,  running, and growing a business in our City. With comprehensive information and tailored tools, the portal helps you navigate the process and quickly learn what it takes to be compliant.");?>
					<a href='http://api.addthis.com/oexchange/0.8/forward/twitter/offer?text=<?php echo urlencode ("The San Francisco Business Portal is the go-to resource for building a business in the city by the bay. #sfbizportal");?>&url=businessportal.sfgov.org' target='_blank'><p class='footer-twitter'><span>Twitter</span></p></a>
					<a href='http://api.addthis.com/oexchange/0.8/forward/facebook/offer?text=<?php echo $og_description;?>&url=<?php echo remove_http($GLOBALS['base_url']) ?>' target='_blank'><p class='footer-facebook'><span>Facebook</span></p></a>
					<a href='http://api.addthis.com/oexchange/0.8/forward/linkedin/offer?text=<?php echo $og_description;?>&url=<?php echo remove_http($GLOBALS['base_url']); ?>' target='_blank'><p class='footer-linkedin'><span>Linkedin</span></p></a>
				</div>
			</div>
		</div>
	</div>
	
	<div class='ccsf-footer-middle'>
		<div class='footer-inner'>
			<div id='ccsf-logos'>
				<a href='http://www.sfmayor.org/' class='mayor' target='_blank'>Office of The Mayor</a>
				<a href='http://www.oewd.org/' class='workforce'target='_blank'>Office of Economic and Workforce Development</a>
				<a href='http://sfgsa.org/index.aspx?page=3805' class='small-business' target='_blank'>Office of Small Business</a>
				<a href='http://sfgov3.org/index.aspx?page=1421' class='technology' target='_blank'>Department of Technology</a>
			</div>
		</div>
	</div>
	
	<div class='ccsf-footer-bottom'>
		<div class='footer-inner'>
			<div id='ccsf-footer-menu'>
				<?php  
					$tree = menu_tree_all_data('menu-footer-menu');
					//menu_tree_add_active_path($tree);
					$output = menu_tree_output($tree);
					print drupal_render($output);
				?>
			</div>
			<div id='ccsf-copyright'>
				<div id='footer-date-section-wrap'>
			    	<div id="footer-date-section">
			    		<p id="last-modified-date"></p>
              <p class='copyrite'>&copy; <a href="http://www.sfgov.org" target="_blank">City & County of San Francisco</a></p>
			    		<p id='site-by'>Site by <a href="http://www.tomorrowpartners.com/" target="_blank" id='tommorow-partners-link'>Tomorrow Partners</a></p>
			    	</div>
				</div>
<?php /*        
        <div class='copyright-policy'>
          <p>All editorial and creative assets on this web site, including the code used to create web pages, are protected by US and international copyright laws. The City and County of San Francisco reserves all rights to this content.</p>
        </div>
*/?>
			</div>
		</div>
	</div>
  
  

</div>

<?php 
function remove_http($url) {
   $disallowed = array('http://', 'https://');
   foreach($disallowed as $d) {
      if(strpos($url, $d) === 0) {
         return str_replace($d, '', $url);
      }
   }
   return $url;
}?>
