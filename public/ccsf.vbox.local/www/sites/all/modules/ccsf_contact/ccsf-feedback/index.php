<!DOCTYPE html>
<head>
	<meta charset='UTF-8'>
	
	<title>Give Feedback</title>
	
	<link rel='stylesheet' href='css/style.css'>
  	
	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'></script>
	<script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js'></script>
  <script src='js/jquery.ui.touch-punch.min.js'></script>
	<script src='js/ccsf_feedback.js'></script>
  
  <!--  Embedding Fontello Font-->
  <link rel="stylesheet" href="fontello/css/fontello.css">
  <link rel="stylesheet" href="fontello/css/animation.css">
  <!--if IE 7
    link(rel='stylesheet', href='fontello/css/fontello-ie7.css')
  -->
</head>

<body>

  <div id="page-wrap">
    <?php if(isset($_GET['msg']) AND $_GET['msg']=="success"): ?>
      <div class="contact_thanks">Success!</div>
      <br />
      <hr />
      <br /><br />
    <?php endif;?>
    
    
    
    <form id="feedback_form" action="https://www.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8" method="POST">
      <input type=hidden name="orgid" value="00D400000009pDc">
      <input type=hidden name="retURL" value="http://preview.tomorrowpartners.com/ccsf-feedback/?msg=success">

      <div class="field-group field-group-left">
        <div class="field">
          <label for="name" id="name_pcl" class="ph-text"><span>Name</span></label>
          <input  aria-labelledby="name_pcl" id="name" maxlength="80" name="name" size="20" type="text" class="txtBox required" autocomplete = "off" data-error-msg="Please tell us your name." />
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group field-group-right">
        <div class="field">
          <label for="email" id="email_pcl" class="ph-text"><span>Email</span></label>
          <input  aria-labelledby="email_pcl" id="email" maxlength="80" name="email" size="20" type="text" class="txtBox email" autocomplete = "off" data-error-msg="Please enter valid email." />
        </div>
        <div class="field_error"></div>
      </div>
      <div class="clear"></div>

      
      <div class="field-group">
        <div class="field field-textarea">
          <label for="00N40000002qX4r" class="ph-text">Message</label>
          <textarea name="00N40000002qX4r" id="00N40000002qX4r" wrap="soft" class="txtBox required" data-error-msg="The message field cannot be left blank."></textarea>
        </div>
        <div class="field_error"></div>
      </div>

      <div class="field-group">
        <div class="field field-submit">
          <div id="swipe_lock">
            <div id="swipe_control"><i class="icon-right-dir"></i></div>
            <span class="swipe_text">Swipe to unlock</span>
          </div>
          <button type="submit" class="btn-submit locked" disabled="disabled">Send <i class='icon-right-dir'></i></button>
          <input type="hidden"  id="external" name="external" value="1" />
        </div>
      </div>
    </form>
  </div>
</body>
</html>