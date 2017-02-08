<?php
/*
*
* 	@file
*	Template for rendering the 'My Folder Cart' block
*  	
*
*/
drupal_add_library('system', 'drupal.ajax');//make sure we load the ajax library otherwise most of the cart function wont work!


//VARIABLES
// $set = true if there are items in my folder
// $myfolder
$kitCount=count($myfolder['kit']);
$permitCount=count($myfolder['permit']);
$docCount=count($myfolder['doc']);
$guideCount=count($myfolder['guide']);
$total = $kitCount+$permitCount+$docCount+$guideCount;

//$total = count($myfolder['permit'])+count($myfolder['doc'])+count($myfolder['kit'])+count($myfolder['guide']);

?>

<div id='my-folder-cart-wrap' class='clearfix'>
	<div id='mail-whiteout'></div>
	<?php /*// MAIL MODALS /////////////////////////////////////////////////////////////////////////*/ ?>
	
	<div id='mail-modal'>
		<div class='mail-modal-contents'>
			<div id='mail-modal-close'><p><span>X</span></p></div>
			<h3>Email My Folder List</h3>
			<p>Send yourself a list of your folder content to return to your stored items anytime.</p>
			<div id='mail-modal-input-wrap'>
				<input id='mail-modal-input' type='text' placeholder='Email Address'></input>
				<a href='<?php echo $GLOBALS['base_url'].'/my-folder/mail'; ?>' id='mail-modal-send-link'><div id='mail-modal-send'><p>Send</p></div></a>
				
			</div>
			<div id='mail-modal-error'>Please check your email address and try again.</div>
		</div>
	</div>
	<?php if(isset($_SESSION['mail_status'])): ?>
		
		<?php if($_SESSION['mail_status']=='success'): //weird hack because drupal's ajax api wouldnt work with the email form submission ?>
			<div id='mail-modal-success' class='mail-modal-success'>
				<div class='mail-modal-contents'>
					<a href='<?php echo $GLOBALS['base_url'].'/my-folder/mail-reset'; ?>' class='use-ajax'><div id='mail-modal-close' class='mail-close-button'><p><span>X</span></p></div></a>
					<h3>Your list has been sent.</h3>
					<p>A list of your folder content will light up your inbox shortly. Simply click the button in the email to return to your stored items anytime.</p>
					<div id='mail-modal-input-wrap'>
						<a href='<?php echo $GLOBALS['base_url'].'/my-folder/mail-reset'; ?>' class='use-ajax'><div id='mail-close-button' class='mail-close-button'><p>Close</p></div></a>					
					</div>
				</div>
			</div>
		<?php endif; ?>

		<?php if($_SESSION['mail_status']=='fail'): //weird hack because drupal's ajax api wouldnt work with the email form submission ?>
			<div id='mail-modal-fail' class='mail-modal-fail'>
				<div class='mail-modal-contents'>
					<a href='<?php echo $GLOBALS['base_url'].'/my-folder/mail-reset'; ?>' class='use-ajax'><div id='mail-modal-close' class='mail-close-button'><p><span>X</span></p></div></a>
					<h3>Oops, something went wrong.</h3>
					<p>We're sorry for the inconvenience, please try again later.</p>
					<div id='mail-modal-input-wrap'>
						<a href='<?php echo $GLOBALS['base_url'].'/my-folder/mail-reset'; ?>' class='use-ajax'><div id='mail-close-button' ='mail-close-button'><p>Close</p></div></a>					
					</div>
				</div>
			</div>
		<?php endif; ?>

	<?php endif; ?>

	
	
	<?php /*// CART CONTENTS ///////////////////////////////////////////////////////////////////////////////////*/ ?>
	<div id='my-folder-banner-wrap'>
		<div id='my-folder-banner-inner'>
			<div id='my-folder-banner-inner-two'>
				<div id='my-folder-banner-icon'><div class='banner-img-wrap'><p><?php echo $total; ?></p></div></div>
				<div id='my-folder-banner-text'>
					<h1 class='my-folder-heading'>My Folder</h1>
					<p class='my-folder-sub-heading'>You have <span class='banner-inline-count'><?php echo $total; ?></span> documents in your folder. This list will be saved for 24 hours.</p>
				</div>
			</div>
		</div>
	</div>
	<a href='my-folder/remove-all/all' class='special-remove'>Special Remove all</a>
	<div id='my-folder-main-wrap' class='clearfix'>
		<div id='my-folder-main-inner' class='clearfix'>
			
			<div id='my-folder-sidebar-wrap'>
				<div id='my-folder-sidebar-inner'>
					<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-all/all'; ?>'><p id='my-folder-sidebar-download'>Download My Folder</p></a>
					<p id='my-folder-sidebar-email'>Email My Folder list</p>

					<p id='my-folder-sidebar-list-heading'>My Folder</p>
					<ul>
						<?php if($kitCount>0): ?>
							<li><div id='my-folder-sidebar-kit'><a href='#my-folder-starter-kits-wrap'><p class='my-folder-sidebar-item'>Starter Kits</p> <div class='my-folder-sidebar-kit-num'>(<?php echo count($myfolder['kit']); ?>)</div></a></div></li>
						<?php else: ?>
							<li><div id='my-folder-sidebar-kit'><p class='my-folder-sidebar-item my-folder-sidebar-no-items'>Starter Kits</p> <div class='my-folder-sidebar-kit-num my-folder-sidebar-no-items-num'>(<?php echo count($myfolder['kit']); ?>)</div></div></li>
						<?php endif; ?>

						<?php if($permitCount>0): ?>
							<li><div id='my-folder-sidebar-permit'><a href='#my-folder-permits-wrap'><p class='my-folder-sidebar-item'>Permits & Licenses</p> <div class='my-folder-sidebar-permit-num'>(<?php echo count($myfolder['permit']); ?>)</div></a></div></li>
						<?php else: ?>
							<li><div id='my-folder-sidebar-permit'><p class='my-folder-sidebar-item my-folder-sidebar-no-items'>Permits & Licenses</p> <div class='my-folder-sidebar-permit-num my-folder-sidebar-no-items-num'>(<?php echo count($myfolder['permit']); ?>)</div></div></li>
						<?php endif; ?>

						<?php if($docCount>0): ?>
							<li><div id='my-folder-sidebar-doc'><a href='#my-folder-doc-wrap'><p class='my-folder-sidebar-item'>Documents</p> <div class='my-folder-sidebar-doc-num'>(<?php echo count($myfolder['doc']); ?>)</div></a></div></li>
						<?php else: ?>
							<li><div id='my-folder-sidebar-doc'><p class='my-folder-sidebar-item my-folder-sidebar-no-items'>Documents</p> <div class='my-folder-sidebar-doc-num my-folder-sidebar-no-items-num'>(<?php echo count($myfolder['doc']); ?>)</div></div></li>
						<?php endif; ?>

						<?php if($guideCount >0): ?>
							<li><div id='my-folder-sidebar-guide'><a href='#my-folder-guide-wrap'><p class='my-folder-sidebar-item'>Guides</p> <div class='my-folder-sidebar-guide-num'>(<?php echo count($myfolder['guide']); ?>)</div></a></div></li>
						<?php else: ?>
							<li><div id='my-folder-sidebar-guide'><p class='my-folder-sidebar-item my-folder-sidebar-no-items'>Guides</p> <div class='my-folder-sidebar-guide-num my-folder-sidebar-no-items-num'>(<?php echo count($myfolder['guide']); ?>)</div></div></li>
						<?php endif; ?>
					</ul>
				</div>
			</div>

			<div id='my-folder-contents-wrap'>
				<div id='my-folder-buffer'></div>
				<?php if($total>0) : ?> <?php /* my folder has contents */ ?>
					
					<div id='my-folder-full'>
						
						<?php //dpm($myfolder); ?>
						<?php //dpm($_SESSION['folder']); ?>
						<?php //dpm($_SESSION); ?>
						<?php /*STARTER KITS*/ ?>
							
							<?php foreach($myfolder as $type=>$index) : ?>
								
								<?php ///////////////*KITS*///////////////// ?>				
								<?php if($type=='kit') : ?>
									<?php if(count($index)>0) : ?><?php /*if there are starter kits in my folder*/ ?>
										<?php 
											/*$kitList=array();
											foreach($myfolder['kit'] as $kit){
												array_push($kitList, $kit[0]);
											}
											$kitList=implode(',',$kitList);*/
										?>
										<div id='my-folder-starter-kits-wrap-inner'>
											
											<div id='my-folder-starter-kit-actions'>
												<div><h2>Starter Kits</h2> <div class='my-folder-kit-heading-num'><h2 class='count'>(<?php echo count($myfolder['kit']); ?>)</h2></div></div>
												<div class='my-folder-starter-kit-actions-buttons'>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-all/kit'; ?>'><p class='my-folder-starter-kit-actions-download-all'>Download all</p></a>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-all/kit'; ?>' class='use-ajax'><p class='my-folder-starter-kit-actions-remove-all'>Remove all</p></a>
												</div>
											</div>
											
											<?php foreach($index as $row) : ?>
												
												<div class='my-folder-kit-header'>
													<h3 id="<?php if( isset($row[0])){ echo $row[0]; } ?>" class='my-folder-kit-title'><?php if( isset($row[1])){ echo $row[1]; } ?></h3><?php /*Starter Kit Title*/ ?>	
													<div class='my-folder-kit-header-cta'>
														<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/kit/'.$row[0]; ?>'><span class='download-cta tool-tip' title='Download Starter Kit'></span></a>
														<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single/kit/'.$row[0]; ?>' class='use-ajax'><span class='remove-cta tool-tip' title='Remove Starter Kit'></span></a>
													</div>
												</div>

												<div class='my-folder-kit-inner-one'>
													<p class='my-folder-kit-info'><?php if(isset($row[5])){ echo $row[5]; } ?></p>

													<div class='my-folder-kit-section-1 my-folder-kit-section'><?php /////////////////////* Guides */////////////////////// ?>
														<div class='my-folder-kit-section-title'><h4>Guides</h4><div class='my-folder-kit-guide-heading-count'><h4>(<?php if(count($row[2])-1 >0){ echo count($row[2])-1;}else{ echo '0';}  ?>)</h4></div></div>
														
														<div class='section-kit-items'>
															<?php $i=0; $guideCount=count($row[2]); foreach($row[2] as $key) : ?>
																<?php //dpm($row[2]); ?>
																<?php 
																	
																	if(isset($key[0])) ://helps bypass the empty element at beginning of each section array
																		if(isset($key[0])){
																			$guideID = $key[0];
																		}
																		if(isset($key[1])){
																			$guideName = $key[1];
																		}
																		if(isset($key[2])){
																			$guideDescription = $key[2];
																		}
																		
																	?>
																		<?php if($i == $guideCount-1): ?>
																			<div class='my-folder-kit-item-wrapper-last <?php //echo $guideID; ?><?php echo 'kit-item-'.$row[0].'-2-'.$guideID; ?>'> 
																		<?php else: ?>
																			<div class='my-folder-kit-item-wrapper <?php echo 'node-'.$guideID; ?><?php echo 'kit-item-'.$row[0].'-2-'.$guideID; ?>'>
																		<?php endif; ?>
																		
																			<div class='my-folder-kit-item-header'>
																				<h5 class='my-folder-kit-item-title' id="<?php echo $guideID;  ?>"><?php echo $guideName; ?></h5><?php /*title*/ ?>
																				
																				<div class='my-folder-kit-item-actions'>
																					
																					<a class='my-folder-download-button' href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/guide/'.$guideID; ?>'><span class='download-cta tool-tip' title='Download Guide'></span></a>
																					<?php /* url is : ' my-folder/remove-single-kit-item/kitID/sectionID/NID ' */ ?>
																					<a class='my-folder-remove-button use-ajax' href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single-kit-item/'.$row[0].'/2/'.$guideID; ?>'><span class='remove-cta tool-tip' title='Remove Guide'></span></a>
																				</div>
																			</div>
																			<div class='my-folder-kit-item-description-wrap'>
																				<p class='my-folder-kit-item-description'><?php echo $guideDescription; ?></p><?php /*Description*/ ?>
																			</div>
																		</div>
																	<?php endif; $i++; ?>

															<?php endforeach; ?>
														</div>

														<div class='my-folder-kit-section-bottom'></div>
													</div>
													
													<div class='my-folder-kit-section-2 my-folder-kit-section'><?php //////* Related Documents *////// ?>
														<div  class='my-folder-kit-section-title'><h4>Related documents</h4><div class='my-folder-kit-doc-heading-count'><h4>(<?php if(count($row[3])-1 > 0){echo count($row[3])-1;}else{echo '0';}  ?>)</h4></div></div>
														<div class='section-kit-items'>
															<?php $j=0; $docCount=count($row[3]); foreach($row[3] as $key): //for($i=1;$i<count($row[3]);$i++): ?>
																
																<?php //if($i == count($row[3])-1): 
																	if(isset($key[0])):
																		if(isset($key[0])){
																			$docID= $key[0];
																		}
																		if(isset($key[1])){
																			$docName = $key[1];
																		}
																		if(isset($key[2])){
																			$docDescription = $key[2];	
																		}
																		
																?>
																	<?php if($j == $docCount-1): ?>	
																		<div class='my-folder-kit-item-wrapper-last <?php echo $docID; ?> <?php echo 'kit-item-'.$row[0].'-3-'.$docID; ?>'>
																	<?php else: ?>
																		<div class='my-folder-kit-item-wrapper <?php echo 'node-'.$docID; ?> <?php echo 'kit-item-'.$row[0].'-3-'.$docID; ?>'>
																	<?php endif; ?>
																	
																		<div class='my-folder-kit-item-header'>
																			<h5 class='my-folder-kit-item-title' id="<?php echo $docID; ?>"><?php echo $docName; ?></h5><?php /* title*/ ?>
																			<div class='my-folder-kit-item-actions'>
																				<a class='my-folder-view-button' href='<?php echo $GLOBALS['base_url'].'/node/'.$docID; ?>'><span class='view-cta tool-tip' title='View Document'></span></a>
																				<a class='my-folder-download-button' href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/doc/'.$docID; ?>'><span class='download-cta tool-tip' title='Download Document'></span></a>
																				<?php /* url is : ' my-folder/remove-single-kit-item/kitID/sectionID/NID ' */ ?>
																				<a class='my-folder-remove-button use-ajax' href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single-kit-item/'.$row[0].'/3/'.$docID; ?>'><span class='remove-cta tool-tip' title='Remove Document'></span></a>
																			</div>
																		</div>
																		<div class='my-folder-kit-item-description-wrap'>
																			<p class='my-folder-kit-item-description'><?php echo $docDescription; ?></p><?php /*Description*/ ?>
																		</div>
																	</div>
																<?php endif; $j++ ?>
															<?php endforeach; ?>
														</div>
														<div class='my-folder-kit-section-bottom'></div>
													</div>
													
													<div class='my-folder-kit-section-3 my-folder-kit-section'><?php /* Permits */ ?>
														
														<div class='my-folder-kit-section-title'><h4>Permits</h4><div class='my-folder-kit-permit-heading-count'><h4>(<?php if(count($row[4])-1>0){echo count($row[4])-1;}else{echo '0';}  ?>)</h4></div></div>
														
														<?php //foreach($row[3] as $f2=>$item) : ?>
														<div class='section-kit-items'>
															<?php $k=0; $permitCount=count($row[4]); foreach($row[4] as $key)://for($i=1;$i<count($row[4]);$i++): ?>
																<?php 
																	if(isset($key[0])):
																		if(isset($key[0])){
																			$permitID= $key[0];
																		}
																		if(isset($key[1])){
																			$permitName = $key[1];
																		}																		
																		if(isset($key[2])){
																			$permitDescription = $key[2];
																		}
																		
																?>

																	<?php if($i == count($row[4])-1): ?>
																		<div class='my-folder-kit-item-wrapper-last <?php echo 'node-'.$permitID; ?> <?php echo 'kit-item-'.$row[0].'-4-'.$permitID; ?>'>
																	<?php else: ?>
																		<div class='my-folder-kit-item-wrapper <?php echo 'node-'.$permitID; ?> <?php echo 'kit-item-'.$row[0].'-4-'.$permitID; ?>'>
																	<?php endif; ?>
																	
																		<div class='my-folder-kit-item-header'>
																			<h5 class='my-folder-kit-item-title' id="<?php echo $permitID ?>"><?php echo $permitName; ?></h5><?php /* title*/ ?>
																			<div class='my-folder-kit-item-actions'>
																				<a class='my-folder-view-button' href='<?php echo $GLOBALS['base_url'].'/node/'.$permitID; ?>'><span class='view-cta tool-tip' title='View Permit'></span></a>
                                        
                                        <?php 
                                          $node = node_load($permitID);
                                          $file= $node->field_form_1_pdf['und'][0]['filename'];
                                          if($file AND $file!=="") { ?>
                                            <a class='my-folder-download-button' href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/permit/'.$permitID; ?>'><span class='download-cta tool-tip' title='Download Permit'></span></a>
                                          <?php } ?>
                                        
																				
																				<?php /* url is : ' my-folder/remove-single-kit-item/kitID/sectionID/NID ' */ ?>
																				<a class='my-folder-remove-button use-ajax' href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single-kit-item/'.$row[0].'/4/'.$permitID; ?>'><span class='remove-cta tool-tip' title='Remove Permit'></span></a>
																			</div>
																		</div>
																		<div class='my-folder-kit-item-description-wrap'>
																			<p class='my-folder-kit-item-description'><?php echo $permitDescription; ?></p><?php /*Description*/ ?>
																		</div>
																	</div>
																<?php endif; ?>
															<?php endforeach; ?>
														</div>
														<div class='my-folder-kit-section-bottom'></div>
														<?php //endforeach; ?>

													</div>

												</div>
											
											<?php endforeach; ?>
										</div>
									<?php endif; ?>
								<?php endif; ?>

							<?php  endforeach; ?>
						

						<?php ////////////////*PERMITS*/////////////////// ?>
						
							<?php foreach($myfolder as $type=>$index) : ?>
								
								<?php if($type=='permit'): ?>
									<?php if(count($index)>0) : ?><?php /*if there are permits in my folder*/ ?>
										<div id='my-folder-permits-wrap'>	
											<div id='my-folder-permits-actions'>
												<div><h2>Permits</h2> <div class='my-folder-permit-heading-num'><h2 class='count'>(<?php echo count($myfolder['permit']); ?>)</h2></div></div>
												<div class='my-folder-permits-action-buttons'>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-all/permit'; ?>'><p class='my-folder-permits-actions-download-all'>Download all</p></a>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-all/permit'; ?>' class='use-ajax'><p class='my-folder-permits-actions-remove-all'>Remove all</p></a>
												</div>
											</div>

											<?php foreach($index as $row=>$item) : ?>
												<div class='my-folder-single-permit <?php echo 'node-'.$item[0]; ?>'>
													<div class='my-folder-single-permit-heading'>
														<?php /*<a href='<?php echo $GLOBALS['base_url'].'/node/'.$item[0]; ?>'><h3 id=permit-"<?php if( isset($item[0])){ echo $item[0]; } ?>"><?php if( isset($item[1])){ echo $item[1]; } ?></h3></a> */?>
														<h3 id='<?php if( isset($item[0])){ echo 'permit-'.$item[0]; } ?>'><?php if( isset($item[1])){ echo $item[1]; } ?></h3>

														<div class='my-folder-single-permit-action'>
															<a  href='<?php echo $GLOBALS['base_url'].'/node/'.$item[0]; ?>'><p class='my-folder-view-button tool-tip' title='View Permit'><span>View permit</spa></p></a>
                              <?php 
                              $node = node_load($item[0]);
                              $file= $node->field_form_1_pdf['und'][0]['filename'];
                              if($file AND $file!=="") { ?>
                                <a  href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/permit/'.$item[0]; ?>'><p class='my-folder-download-button tool-tip' title='Download Permit'><span>Download permit</span></p></a>
                              <?php } ?>
															<a  href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single/permit/'.$item[0]; ?>' class='use-ajax'><p class='my-folder-remove-button tool-tip' title='Remove Permit'><span>Remove permit</span></p></a>
														</div>
													</div>
													<p class='my-folder-permit-description'><?php if( isset($item[2])){ echo $item[2]; } ?></p><?php /*Permit Description*/ ?>
													
												</div>
											<?php endforeach; ?>
										</div>
									<?php endif; ?>
								<?php endif; ?>

							<?php endforeach; ?>
						

						<?php //////////////////*DOCUMENTS*/////////////////// ?>
							
							<?php foreach($myfolder as $type=>$index) : ?>
								
								<?php if($type=='doc'): ?>
									<?php if(count($index)>0) : ?><?php /*if there are docs in my folder*/ ?>
										<div id='my-folder-doc-wrap'>	
											<div id='my-folder-doc-actions'>
												<div><h2>Documents</h2> <div class='my-folder-doc-heading-num'><h2 class='count'>(<?php echo count($myfolder['doc']); ?>)</h2></div></div>
												<div class='my-folder-doc-action-buttons'>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-all/doc'; ?>'><p class='my-folder-permits-actions-download-all'>Download all</p></a>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-all/doc'; ?>' class='use-ajax'><p class='my-folder-doc-actions-remove-all'>Remove all</p></a>
												</div>
											</div>

											<?php foreach($index as $row=>$item) : ?>
												<div class='my-folder-single-doc <?php echo 'node-'.$item[0]; ?>'>
													<div class='my-folder-single-doc-heading'>
													<?php /* <a href='<?php echo $GLOBALS['base_url'].'/node/'.$item[0]; ?>'><h3 id=doc-"<?php if( isset($item[0])){ echo $item[0]; } ?>"><?php if( isset($item[1])){ echo $item[1]; } ?></h3></a> */ ?>
														<h3 id='<?php if( isset($item[0])){ echo 'doc-'.$item[0]; } ?>'><?php if( isset($item[1])){ echo $item[1]; } ?></h3>
														<div class='my-folder-single-doc-actions'>
															<a  href='<?php echo $GLOBALS['base_url'].'/node/'.$item[0]; ?>'><p class='my-folder-view-button tool-tip' title='View Document'><span>View Document</span></p></a>
															<a  href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/doc/'.$item[0]; ?>'><p class='my-folder-download-button tool-tip' title='Download Document'><span>Download Document</span></p></a>
															<a  href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single/doc/'.$item[0]; ?>' class='use-ajax'><p class='my-folder-remove-button tool-tip' title='Remove Document'><span>Remove Document</span></p></a>
														</div>
													</div>
													<p class='my-folder-doc-description'><?php if( isset($item[2])){ echo $item[2]; } ?></p><?php /*Doc Description*/ ?>
													
												</div>
											<?php endforeach; ?>
										</div>
									<?php endif; ?>
								<?php endif; ?>

							<?php endforeach; ?>

						<?php //////////////////* GUIDES *//////////////////// ?>

							<?php foreach($myfolder as $type=>$index): ?>

								<?php if($type=='guide'): ?>
									<?php if(count($index)>0): ?><?php /* if there are guides in my folder */ ?>
										<div id='my-folder-guide-wrap'>
											
											<div id='my-folder-guide-actions'>
												<div><h2>Guides</h2><div class='my-folder-guide-heading-num'><h2 class='count'>(<?php echo count($myfolder['guide']); ?>)</h2></div></div>
												<div class='my-folder-guide-action-buttons'>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-all/guide'; ?>'><p class='my-folder-permits-actions-download-all'>Download all</p></a>
													<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-all/guide'; ?>' class='use-ajax'><p class='my-folder-guide-actions-remove-all'>Remove all</p></a>
												</div>
											</div>

											<?php foreach($index as $row=>$item): ?>
												<div class='my-folder-single-guide <?php echo 'node-'.$item[0]; ?>'>
													<div class='my-folder-single-guide-heading'>
														<h3 id='<?php if( isset($item[0])){echo 'guide-'.$item[0]; } ?>'><?php if(isset($item[1])){echo $item[1];} ?></h3>
														<div class='my-folder-single-guide-action'>
															
															<a href='<?php echo $GLOBALS['base_url'].'/my-folder/download-single/guide/'.$item[0]; ?>'><p class='my-folder-download-button tool-tip' title='Download Guide'><span>Download Guide</span></p></a>
															<a href='<?php echo $GLOBALS['base_url'].'/my-folder/remove-single/guide/'.$item[0]; ?>' class='use-ajax'><p class='my-folder-remove-button tool-tip' title='Remove Guide'><span>Remove Guide</span></p></a>
														</div>
													</div>
													<p class='my-folder-guide-description'><?php if(isset($item[2])){echo $item[2];} ?></p>
												</div>
												
											<?php endforeach; ?>

										</div>
									<?php endif; ?>
								<?php endif; ?>

							<?php endforeach; ?>

					</div>
				
				<?php else :?> 	<?php /* my folder is empty */ ?>
					
					<div id='my-folder-empty'>
						<?php if(isset($_SESSION['folder'])){ dpm($_SESSION['folder']); }else{dpm('SESSION EMPTY');} ?>
						
						<div id="folder-empty">You have no resources in your folder at this time.</div>
					</div>

				<?php endif; ?>

			</div><?php /* #my-folder-contents-wrap */ ?>

		</div><?php /* #my-folder-main-inner */ ?>
	</div><?php /* #my-folder-main-wrap */ ?>
</div>
<div id='cart-mobile'>
	<div id='cart-mobile-inner'>
		<p>Please View this Site on a larger screen to use My Folder.</p>
	</div>
</div>