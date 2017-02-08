<?php 
/*
* Starter kit block template
*
* Variables = $kit
* an array containing the contents of the specified starter kit
*/





?>

<?php //dpm($kit); ?>
<?php //dpm($_SESSION['folder']); ?>
<div class='starter-kit-wrap'>
	<div class='starter-kit-inner'>
		
		<div id='kit-heading-section'>
			<h3><?php echo $kit[1]; ?></h3>
			<p><?php echo $kit[5]; ?></p>
		</div>

		<h4 id='kit-whats-inside'>What&#8217;s inside</h4>
		
		<div id='kit-guides'><?php /* GUIDES */  ?>
			
			<h4 class='kit-section-name'>Guides <span>(<?php if(count($kit[2])-1==-1){echo '0';}else{echo count($kit[2])-1;}  ?>)<span></h4>
			<div class='kit-section-inner-wrap'>
			<?php for($i=1; $i<count($kit[2]); $i++): //GUIDES
				if(isset($kit[2][$i][0])){
					$guideID = $kit[2][$i][0];
				}
				if(isset($kit[2][$i][1])){
					$guideTitle = $kit[2][$i][1];
				}
				if(isset($kit[2][$i][2])){
					$guideDescription = $kit[2][$i][2];
				}
				
			 ?>	
				<div class='kit-single-item-wrap'>
					<div class='kit-item kit-guide'>
						<p class='kit-title'><?php if(isset($guideTitle)){echo $guideTitle;} ?></p>
						<div class='kit-item-actions'>
							
							<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/guide/'.$guideID; ?>' class='tool-tip' title='Download Guide'><span class='kit-download' ></span></a>
							<a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/guide/'.$guideID; ?>' class='use-ajax kit-item-folder tool-tip' title='Add to My Folder'><span class='kit-folder'></span></a>
						</div>
					</div>

					<div class='kit-item-description-wrap'>
						<?php if(isset($guideDescription)) : ?><p class='kit-item-description'><?php echo $guideDescription;  ?></p><?php endif; ?>
					</div>
				</div>

			<?php endfor; ?>
			<div class='kit-bottom-holder'></div>
			</div>
		</div>
		
		<div id='kit-docs'><?php /* DOCS */ ?>
			
			<h4 class='kit-section-name'>Related Documents <span>(<?php if(count($kit[3])-1==-1){echo '0';}else{echo count($kit[3])-1;} ?>)</span></h4>
			<div class='kit-section-inner-wrap'>
			<?php for($i=1; $i<count($kit[3]); $i++): 
				if(isset($kit[3][$i][0])){
					$docID = $kit[3][$i][0];
				}
				if(isset($kit[3][$i][1])){
					$docTitle = $kit[3][$i][1];
				}
				if(isset($kit[3][$i][2])){
					$docDescription = $kit[3][$i][2];
				}
				
			?>
				<div class='kit-single-item-wrap'>
					<div class='kit-item kit-doc'>
						<p class='kit-title'><?php if(isset($docTitle)){ echo $docTitle; } ?></p>
						<div class='kit-item-actions'>
							<a href='<?php echo $GLOBALS['base_url'].'/node/'.$docID; ?>' class='tool-tip' title='View Document'><span class='kit-view'></span></a>
							<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/doc/'.$docID; ?>' class='tool-tip' title='Download Document'><span class='kit-download'></span></a>
							<a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/doc/'.$docID; ?>' class='use-ajax kit-item-folder tool-tip' title='Add to My Folder'><span class='kit-folder'></span></a>
						</div>
						
					</div>

					<div class='kit-item-description-wrap'>
						<?php if(isset($docDescription)): ?><p class='kit-item-description'> <?php  echo $docDescription; ?></p><?php endif; ?>
					</div>
				</div>
			
			<?php endfor; ?>
			<div class='kit-bottom-holder'></div>
			</div>
		</div>

		<div id='kit-permits'><?php /*  PERMITS  */ ?>

			<h4 class='kit-section-name'>Permits <span>(<?php if(count($kit[4])-1==-1){echo '0';}else{echo count($kit[4])-1;} ?>)</span></h4>
			<div class='kit-section-inner-wrap'>
			<?php for($i=1; $i<count($kit[4]); $i++): 
				if(isset($kit[4][$i][0])){
					$permitID = $kit[4][$i][0];
				}
				if(isset($kit[4][$i][1])){
					$permitTitle = $kit[4][$i][1];
				}
				if(isset($kit[4][$i][2])){
					$permitDescription = $kit[4][$i][2];
				}
				
				
			?>
				<div class='kit-single-item-wrap'>
					<div class='kit-item kit-doc'>
						<p class='kit-title'><?php if(isset($permitTitle)){echo $permitTitle;} ?></p>
						<div class='kit-item-actions'>
							<a href='<?php echo $GLOBALS['base_url'].'/node/'.$kit[4][$i][0]; ?>' class='tool-tip' title='View Permit'><span class='kit-view'></span></a>
              
              <?php 
                $node = node_load($permitID);
                $file= $node->field_form_1_pdf['und'][0]['filename'];
                if($file AND $file!=="") { ?>
                  <a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/permit/'.$permitID; ?>' class='tool-tip' title='Download Permit'><span class='kit-download'></span></a>
                <?php } 
              ?>
              
							<a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/permit/'.$permitID ; ?>' class='use-ajax kit-item-folder tool-tip' title='Add to My Folder'><span class='kit-folder'></span></a>
						</div>
					</div>

					<div class='kit-item-description-wrap'>
						<?php if(isset($permitDescription)): ?> <p class='kit-item-description'> <?php echo $permitDescription; ?></p><?php endif; ?>
					</div>
				</div>

			<?php endfor; ?>
			<div class='kit-bottom-holder'></div>
			</div>
		</div>

		
	</div>
	<div class='kit-whole-actions'>
		<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/kit/'.$kit[0]; ?>'><p class='kit-download-all'>Download kit<span></span></p></a>
		<a href='<?php echo $GLOBALS['base_url'].'/my-folder/add/kit/'. $kit[0]; ?>' class='use-ajax'><p class='kit-folder-all kit-item-folder'>Add kit to My Folder<span></span></p></a>
	</div>
</div>