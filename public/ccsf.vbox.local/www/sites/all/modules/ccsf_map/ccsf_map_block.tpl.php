<?php
/*
* CCSF Map Block
*/
$where = ccsf_get_start_url();
//sdpm($where);
?>



<div id="map">
  <div class="footer-inner container"></div>
<div class="panel-pane pane-views pane-map <?php echo $where.'-map-section'; ?> <?php if($where=='home'){echo 'home-pane-map';} ?>">
  
  <div class="map-controls">
    <div class="nav-controls">
      <a class="prev" href="http://preview.tomorrowpartners.com/ccsf-roadmap/#" data-x=".00001" data-y="0" style="opacity: 0;"><i class="icon-angle-left"></i></a>
      <a class="next" href="http://preview.tomorrowpartners.com/ccsf-roadmap/#" data-x=".1" data-y="0" style="opacity: 1;"><i class="icon-angle-right"></i></a>
    </div>
  </div>

  <div class="view view-map view-id-map view-display-id-default view-dom-id-5694841ef4ee3d9fb535c0b7c0db609a" tabindex="5000" style="overflow: hidden; outline: none; cursor: -webkit-grab;">
    <div class="view-content handle">
      <div class="steps" style="margin-left: 159px; padding-right: 159px;">
        <div class="views-row views-row-1 views-row-odd views-row-first">
          <div class="views-field views-field-field-heading"><div class="field-content">Get Started</div></div>
        </div>
        
        
          <?php if($where=='plan'): ?>
        <div class="views-row views-row-2 views-row-even views-row-current">
          <div class='map-row-inner'> 
          
            <div class="flag">You are here</div>
            <?php else: ?>
             <div class="views-row views-row-2 views-row-even">
              <div class='map-row-inner'> 
            <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/create-a-plan'; ?>" class="views-field views-field-field-number">1</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/create-a-plan'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s1.png'; ?>" width="140" height="140" alt="Hands filing" title="Hands filing"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/create-a-plan'; ?>">Create a Business Plan</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/create-a-plan'; ?>"><p>Writing out business goals and action steps not only helps you clarify and organize priorities, it gives potential lenders a clear vision of your roadmap to profitability.</p></a></div>
            <?php if($where=='plan'): ?>
                <!-- -->
              <?php else: ?>
                <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/create-a-plan'; ?>">Go<i class="icon icon-play"></i></a></div>
              <?php endif; ?>
          </div>
        </div>
        
        
          <?php if($where=='structure'): ?>
        <div class="views-row views-row-3 views-row-odd views-row-current">
            <div class='map-row-inner'> 
              <div class="flag">You are here</div>
            <?php else: ?>
              <div class="views-row views-row-3 views-row-even">
                <div class='map-row-inner'> 
            <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-structure'; ?>" class="views-field views-field-field-number">2</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-structure'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s2.png'; ?>" width="140" height="140" alt="Hands typing" title="Hands typing"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-structure'; ?>">Choose a Structure</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-structure'; ?>"><p>Choosing the legal structure that best suits your business is a top priority. The most common structures include: sole proprietorship, partnership, limited liability company (LLC), and corporation.</p></a></div>
            <?php if($where=='structure'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-structure'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
                
          </div>
        </div>
        
        
          <?php if($where=='register'): ?>
        <div class="views-row views-row-4 views-row-even views-row-current">
          <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-4 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/register-your-business'; ?>" class="views-field views-field-field-number">3</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/register-your-business'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s3.png'; ?>" width="140" height="140" alt="Hand + pen completing form" title="Hand + pen completing form"><div class="overlay"  ></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/register-your-business'; ?>">Register Your Business</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/register-your-business'; ?>"><p>All San Francisco businesses – even the smallest – must register with the City. Depending on your business, you may need to register with the State or Federal government too.</p></a></div>
            <?php if($where=='register'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/register-your-business'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
              
          </div>
        </div>
        
        
          <?php if($where=='name'): ?>
          <div class="views-row views-row-5 views-row-odd views-row-current">
            <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-5 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-name'; ?>" class="views-field views-field-field-number">4</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-name'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s4.png'; ?>" width="140" height="140" alt="Noriega Produce" title="Noriega Produce"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-name'; ?>">Choose a Name</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-name'; ?>"><p>You’ve chosen that perfect business name. So what’s the next step to make it legal and protect your brand?</p></a></div>
            <?php if($where=='name'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/choose-a-name'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
            
          </div>
        </div>
        
        
          <?php if($where=='financial'): ?>
            <div class="views-row views-row-6 views-row-even views-row-current">
              <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-6 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/financial-options'; ?>" class="views-field views-field-field-number">5</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/financial-options'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s5.png'; ?>" width="140" height="140" alt="Balance sheet + pencil" title="Balance sheet + pencil"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/financial-options'; ?>">Financial Options</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/financial-options'; ?>"><p>Once you have a clear understanding of what it takes to start and run your business, explore options to raise or borrow the money you need.</p></a></div>  
            <?php if($where=='financial'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/financial-options'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
            
          </div>
        </div>
        
        
          <?php if($where=='location'): ?>
            <div class="views-row views-row-7 views-row-odd views-row-current">
              <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-7 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/location-options'; ?>" class="views-field views-field-field-number">6</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s6.png'; ?>" width="140" height="140" alt="Market Street sign" title="Market Street sign"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options'; ?>">Location Options</a></div>
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options'; ?>"><p>Before you commit to a location or space, know what you’re getting into. Every location has zoning laws defining where you can legally operate a business.</p></a></div>  
            <?php if($where=='location'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
              
          </div>
        </div>
        
        
          
          <?php if($where=='zoning'): ?>
            <div class="views-row views-row-8 views-row-even views-row-current">
              <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-8 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/location-options/zoning-building'; ?>" class="views-field views-field-field-number">7</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/zoning-building'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s7.png'; ?>" width="140" height="140" alt="Blueprints" title="Blueprints"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/zoning-building'; ?>">Zoning &amp; Building</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/zoning-building'; ?>"><p>Planning to make changes to your space? Obtaining a building permit and following the proper steps will ensure you are ready for final inspections.</p></a></div>
            <?php if($where=='zoning'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/zoning-building'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
              
          </div>
        </div>
        
        
          
          <?php if($where=='ada'): ?>
            <div class="views-row views-row-9 views-row-odd views-row-current">
              <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-9 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
        
            <a href="<?php echo $GLOBALS['base_url'].'/start/location-options/ada'; ?>" class="views-field views-field-field-number">8</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/ada'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s8.png'; ?>" width="140" height="140" alt="Wheelchair sign" title="Wheelchair sign"><div class="overlay"></div></a></div>
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/ada'; ?>">ADA Compliance</a></div>  
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/ada'; ?>"><p>A business that is accessible to all not only helps your customers, it’s the law. The Americans with Disabilities Act (ADA) and state regulations require that businesses be open to people with disabilities.</p></a></div>
            <?php if($where=='ada'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/location-options/ada'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
              
          </div>
        </div>
        
        
          <?php if($where=='hire'): ?>
          <div class="views-row views-row-10 views-row-even views-row-current">
            <div class='map-row-inner'> 
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-10 views-row-even">
              <div class='map-row-inner'> 
          <?php endif; ?>
            <a href="<?php echo $GLOBALS['base_url'].'/start/hire-employees'; ?>" class="views-field views-field-field-number">9</a>
            <div class="views-field views-field-field-image"><a href="<?php echo $GLOBALS['base_url'].'/start/hire-employees'; ?>"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s9.png'; ?>" width="140" height="140" alt="Man in grocery store" title="Man in grocery store"><div class="overlay"></div></a></div> 
            <div class="views-field views-field-field-heading"><a href="<?php echo $GLOBALS['base_url'].'/start/hire-employees'; ?>">Hire Employees</a></div>
            <div class="views-field views-field-body"><a href="<?php echo $GLOBALS['base_url'].'/start/hire-employees'; ?>"><p>Hiring your first employee is a big step and introduces new complexities. As an employer, you must consider labor regulations and payroll taxes at the local, state, and federal levels.</p></a></div>
            <?php if($where=='hire'): ?>
              <!-- -->
            <?php else: ?>
              <div class="views-field views-field-field-link"><a href="<?php echo $GLOBALS['base_url'].'/start/hire-employees'; ?>">Go<i class="icon icon-play"></i></a></div>
            <?php endif; ?>
          </div>
        </div>
  
        
          <?php /*
          <?php if($where=='structure'): ?>
            <div class="views-row views-row-11 views-row-odd views-row-last views-row-current">
            <div class="flag">You are here</div>
          <?php else: ?>
            <div class="views-row views-row-11 views-row-even">
          <?php endif; ?>
          */ ?>

          <!-- REMOVE THIS ONCE CODE ABOVE IS ACTIVE -->
          <div class="views-row views-row-11 views-row-even">
          <!-- REMOVE THIS ONCE CODE ABOVE IS ACTIVE -->
            <div class='map-row-inner'> 
              <div class="views-field views-field-field-number">10</div>
              <div class="views-field views-field-field-image"><img typeof="foaf:Image" src="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_map/images/s10.png'; ?>" width="140" height="140" alt="Open sign" title="Open sign"><div class="overlay"></div></div>
              <div class="views-field views-field-field-heading">Open for Business</div>
              <div class="views-field views-field-body"><p>Congratulations, your doors are open. Now you can focus on managing and growing your business</p></div>
            </div>
          </div>
        <div class="clear"></div>
      </div><!-- .steps -->
      <div class="clear"></div>
    </div><!-- .view-content.handle -->
  
  </div><!-- .view-map -->
</div><!-- .pane-map -->


  </div><!-- #page -->



<!--<div id="ascrail2000" class="nicescroll-rails" style="width: 0px; z-index: 1001; cursor: -webkit-grab; position: absolute; top: 0px; left: 1458px; height: 520px; display: none; opacity: 0.2;"><div style="position: relative; top: 0px; float: right; width: 0px; height: 520px; border: 0px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; background-color: rgb(66, 66, 66); background-clip: padding-box;"></div></div><div id="ascrail2000-hr" class="nicescroll-rails" style="height: 0px; z-index: 1001; top: 520px; left: 0px; position: absolute; display: block; width: 1458px; opacity: 0.2;"><div style="position: relative; top: 0px; height: 0px; width: 605px; border: 0px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; left: 0px; background-color: rgb(66, 66, 66); background-clip: padding-box;"></div></div>-->