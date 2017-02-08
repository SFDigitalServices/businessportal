<?php 
/*
* Related Permit nodes template
*/
$node = menu_get_object();
if ($node && $node->nid) {
  // You have a valid node to work with.

	$nid=$node->nid;
	$tag=$node->field_industry_tag['und'];

	$amount = count($tag);
 	$random = rand(0,$amount-1);

  	$theTag = $tag[$random]['tid'];
  	
  	$items = ccsf_scripts_permits_by_tid($theTag);

  	$permits=array();
  	foreach($items as $key){
  		$permit_nid=$key->entity_id;
  		if($permit_nid != $nid){
  			array_push($permits,$permit_nid);
  		}
  		
  	}	
}

?>

<?php if(count($permits)>0 ): ?>
<div class='related-permit'>
  	<div class='related-permit-inner'>
		<h2>Related Permits and Licenses</h2>
		<?php $i=0; foreach($permits as $id): ?>
			<?php if($i<6): ?>
				<?php if($id != $nid): ?>
					<div class='related-permit-single'>
						<?php echo ccsf_scripts_related_by_id($id); ?>
					</div>
					<?php $i++; ?>
				<?php endif; ?>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
</div>
<?php endif; ?>