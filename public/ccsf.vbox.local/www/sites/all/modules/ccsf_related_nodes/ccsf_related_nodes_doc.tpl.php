<?php 
/*
* Related Doc nodes template
*/
$node = menu_get_object();
if ($node && $node->nid) {
  // You have a valid node to work with.

	$nid=$node->nid;
	$tag=$node->field_business_stage['und'];

	
	$amount = count($tag);
 	$random = rand(0,$amount-1);
 	
 	$theTag = $tag[$random]['tid'];
  	
  	$items = ccsf_scripts_docs_by_tid($theTag);

  	$docs=array();
  	foreach($items as $key){
  		$doc_nid=$key->entity_id;
  		if($doc_nid != $nid){//dont add it if its the same node you are on
  			array_push($docs,$doc_nid);
  		}
  		
  	}	
}

?>

<?php if(count($docs)>0): ?>
<div class='related-doc'>
  	<div class='related-doc-inner'>
		<h2>Related Documents</h2>
		<?php $i=0; foreach($docs as $id): ?>
			<?php if($i<6): ?>
				<?php if($id != $nid ): ?>
					<div class='related-doc-single'>
						<?php echo ccsf_scripts_related_by_id($id); ?>
					</div>
					<?php $i++; ?>
				<?php endif; ?>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
</div>
<?php endif; ?>