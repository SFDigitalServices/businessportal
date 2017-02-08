<?php
/*
* Template for the feedback from
*/

//$path = drupal_get_path('module', 'ccsf_contact');
//drupal_add_js("$path/js/jquery.ui.touch-punch.min.js");

?>

<div id="feedback-wrap">
  <?php if(isset($_GET['msg']) AND $_GET['msg']=="success"): ?>
    <div class="contact_thanks">Thank you for your feedback! We appreciate and carefully read all the messages we receive but can&rsquo;t always respond. If you offered advice (or better yet, compliments), we take it all to heart. If you&rsquo;re having a technical issue, we&rsquo;ll get right on it. It&rsquo;s important to us that the San Francisco Business Portal runs smoothly.</div>
    <br />
    <hr />
    <br /><br />
  <?php endif;?>
  
  
  
  <form id="feedback_form" action="https://www.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" method="POST">
    <input type=hidden name="oid" value="00D400000009pDc">
    <input type=hidden name="retURL" value="<?php echo $GLOBALS['base_url']; ?>/feedback/?msg=success">
    
    <?php if(isset($_GET['debug']) AND $_GET['debug']=="1"): ?>
        <!--  ----------------------------------------------------------------------  -->
        <!--  NOTE: These fields are optional debugging elements. Please uncomment    -->
        <!--  these lines if you wish to test in debug mode.                          -->
          <input type="hidden" name="debug" value=1>                              
          <input type="hidden" name="debugEmail" value="mkumar@tomorrowpartners.com">
        <!--  ----------------------------------------------------------------------  -->
      <?php endif; ?>

    <div class="field-group field-group-left">
      <div class="field">
        <label for="00N40000002qibH" class="ph-text"><span>Name</span></label>
        <input aria-labelledby="00N40000002qibH_pcl" id="00N40000002qibH" maxlength="100" name="00N40000002qibH" size="20" type="text" class="txtBox required" autocomplete = "off" data-error-msg="Please tell us your name." />
      </div>
      <div class="field_error"></div>
    </div>

    <div class="field-group field-group-right">
      <div class="field">
        <label for="email" class="ph-text"><span>Email</span></label>
        <input aria-labelledby="email_pcl" id="email" maxlength="80" name="email" size="20" type="text" class="txtBox email" autocomplete = "off" data-error-msg="Please enter valid email." />
      </div>
      <div class="field_error"></div>
    </div>
    <div class="clear"></div>

    
    <div class="field-group">
      <div class="field field-textarea">
        <label for="00N40000002qibM" class="ph-text">Message</label>
        <textarea aria-labelledby="00N40000002qibM_pcl" id="00N40000002qibM" name="00N40000002qibM" type="text" wrap="soft" class="txtBox required" data-error-msg="The message field cannot be left blank."></textarea>
      </div>
      <div class="field_error"></div>
    </div>

    <div class="field-group">
      <div class="field field-submit">
        <div id="swipe_lock">
          <div id="swipe_control"><i class="icon-right-dir"></i></div>
          <span class="swipe_text">Slide to unlock</span>
        </div>
        <button type="submit" class="btn-submit locked" disabled="disabled">Send <i class='icon-right-dir'></i></button>
        <input type="hidden"  id="external" name="external" value="1" />
        <input type="hidden" aria-labelledby="lead_source_pcl" id="lead_source" name="lead_source" value="Portal Feedback" />
      </div>
    </div>
  </form>
</div>
