<?php
/*
*
* 	@file
*	Template for rendering the 'My Folder Widget' block
*  	
*
*/
//VARIABLES
$count = count($myfolder['permit']) + count($myfolder['doc']) + count($myfolder['kit']) + count($myfolder['guide']);
if($count > 4){
	$recent = '5';
}else{
	$recent = $count;
}

$where = ccsf_get_url();

?>


    <nav>
	<div id="my-folder" class='<?php echo $where.'-color-section'; ?>'>
		<div id='myfolder-widget-wrap'>
		<div id='my-folder-widget-dot'><h2 id="my-folder-count"><?php echo $count; ?></h2></div>
		<div id='my-folder-close-x'><p><span>X</span></p></div>
		
			<?php if($count>0) : ?><?php //the folder has contents ?>
				<div id="my-folder-names">

					<?php if($recent==1): ?>
						<p class='my-folder-info'>You have <strong>1</strong> item in your folder. Content in your folder remains stored for 24 hours. Please download before closing the browser or email the list to yourself to return to your stored items anytime.</p>
					<?php elseif($recent>1): ?>
						<p class='my-folder-info'>You have <strong><?php echo $count; ?></strong> items in your folder. Content in your folder remains stored for 24 hours. Please download before closing the browser or email the list to yourself to return to your stored items anytime. Below are the <strong><?php echo $recent; ?></strong> most recently added.</p>
					<?php endif; ?>
            
					<?php $recentItems = array_reverse ($_SESSION['folder']['recent'],true); /* Reverse the array so they are displayed in the order of newest first */ ?>
					<?php $i=0; foreach($recentItems as $key) : ?>
						<?php if($i<5): ?>
							<a href='<?php echo $GLOBALS['base_url'].'/node/'.$key['id']; ?>'><p class="my-folder-title" id="node-<?php echo $key['id']; ?>"><?php echo $key['title']; ?></p></a>
						<?php endif; ?>
						<?php $i++; ?>
					<?php endforeach; ?>
					
					<a href='<?php echo base_path().'my-folder'; ?>' ><p class='my-folder-view-link'>View all in My Folder</p></a>
				</div>
			<?php else :?><?php //the folder is empty ?>
				<div id="my-folder-names">
					<p class='my-folder-info'>You have <strong><?php echo $count; ?></strong> items in your folder. Add permits and other resources to download later.</p>
				</div>
			<?php endif; ?>
				<div id='my-folder-first-item'>
					<h4>Attention</h4>
					<p class='first-info'>Content in your folder remains stored for 24 hours. Please download before closing the browser or email the list to yourself to return to your stored items anytime.</p>
					<a href='<?php echo base_path().'my-folder'; ?>' ><p class='my-folder-view-link'>View all in My Folder</p></a>
				</div>
		</div>
		<div id='my-folder-widget-whiteout'></div>
	</div>
    </nav>
