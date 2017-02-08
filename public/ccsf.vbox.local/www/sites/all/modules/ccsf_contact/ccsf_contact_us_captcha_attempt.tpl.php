<?php
/*
* Template for the contact us form
*/
//$path = drupal_get_path('module', 'ccsf_contact');
//drupal_add_js("$path/js/jquery.ui.touch-punch.min.js");
?>
<div id='contact-us-wrap'>
	<?php if(isset($_GET['msg']) AND $_GET['msg']=="success"): ?>
      <div class="contact_thanks">Success!</div>
      <br />
      <hr />
      <br /><br />
    <?php endif;?>
    
    
    
    <form id="contact_form" action="<?php echo $GLOBALS['base_url'].'/sites/all/modules/ccsf_contact/contact_submit.php'?>" method="POST">
      <?php 
        require_once('sites/all/modules/ccsf_contact/recaptchalib.php');
        $publickey = "6LeR4_cSAAAAALdpQCoMOgq6mkI3G2Cm1-iyt-s3"; // you got this from the signup page
        //echo recaptcha_get_html($publickey);
      ?>

      <input type=hidden name="orgid" value="00D400000009pDc">
      <input type=hidden name="retURL" value="http://preview.tomorrowpartners.com/ccsf-contact/?msg=success">

      <div class="field-group">
        <div class="field">
          <label for="name" id="name_pcl" class="ph-text"><span>Contact Name</span></label>
          <input  aria-labelledby="name_pcl" id="name" maxlength="80" name="name" size="20" type="text" class="txtBox required" autocomplete = "off" data-error-msg="Please tell us your name." />
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group field-group-left">
        <div class="field">
          <label for="email" id="email_pcl" class="ph-text"><span>Email</span></label>
          <input  aria-labelledby="email_pcl" id="email" maxlength="80" name="email" size="20" type="text" class="txtBox email" autocomplete = "off" data-error-msg="Please enter valid email." />
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group field-group-right">
        <div class="field">
          <label for="phone" id="phone_pcl" class="ph-text"><span>Phone</span></label>
          <input  aria-labelledby="phone_pcl" id="phone" maxlength="40" name="phone" size="20" type="text" class="txtBox required" autocomplete = "off" data-error-msg="Please tell us your phone." />
        </div>
        <div class="field_error"></div>
      </div>
      <div class="clear"></div>

      <div class="field-group">
        <div class="field">
          <!--<label for="00N40000002qX56" class="ph-hidden">Best way to reach me</label>-->
          <div class="selectBox-container">
            <select  id="reach_me_field" name="reach_me_field" class="selectBox" title="Best way to reach me"  data-error-msg="Please enter best way to reach you.">
              <option value="">--None--</option>
              <option value="Email">Email</option>
              <option value="Telephone">Telephone</option>
            </select>
          </div>
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group">
        <div class="field">
          <div class="selectBox-container">
            <select  id="subject_field" name="subject_field" class="selectBox" title="Subject" data-error-msg="Please enter subject.">
              <option value="">--None--</option>
            <option value="I want to schedule an appointment with a business counselor.">I want to schedule an appointment with a business counselor.</option>
            <option value="I have a question that can be answered over email.">I have a question that can be answered over email.</option>
            <option value="I am experiencing technical issues with the site.">I am experiencing technical issues with the site.</option>
            </select>
          </div>
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group">
        <div class="field field-textarea">
          <label for="message_field" class="ph-text">Message</label>
          <textarea name="message_field" id="message_field" wrap="soft" class="txtBox required" data-error-msg="The message field cannot be left blank."></textarea>
        </div>
        <div class="field_error"></div>
      </div>
      <? echo recaptcha_get_html($publickey); ?> 
      <div class="field-group">
        <div class="field field-submit">
          
          
          <button type="submit" class="btn-submit locked">Send <i class='icon-right-dir'></i></button>
          <!--<input type="submit" name="submit" class="btn-submit" value="Send" />-->
          <input type="hidden"  id="external" name="external" value="1" />
        </div>
      </div>
    </form>
</div>