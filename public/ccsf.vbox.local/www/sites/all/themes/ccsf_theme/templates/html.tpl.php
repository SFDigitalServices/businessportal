<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 7]><html class='ie7' <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class='ie8' <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 9]><html class='ie9' <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php print $html_attributes . $rdf_namespaces; ?> xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraphprotocol.org/schema/" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"lang="en" dir="ltr"><!--<![endif]-->

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1 minimum-scale=1">
  <?php endif; ?>

  <meta name="title" content="San Francisco Business Portal" />
  <meta name="description" content="The San Francisco Business Portal is the ultimate resource for starting, running, and growing a business in our City. With comprehensive information and tailored tools, the portal helps you navigate the process and quickly learn what it takes to be compliant." />

  <meta property="og:image" content="<?php echo $GLOBALS['base_url'].'/sites/default/files/og_logo.png';?>" >
  <meta property="og:title" content="San Francisco Business Portal" >
  <meta property="og:description" content="The San Francisco Business Portal is the ultimate resource for starting,  running, and growing a business in our City. With comprehensive information and tailored tools, the portal helps you navigate the process and quickly learn what it takes to be compliant.">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="San Francisco Business Portal">

  <meta content="summary" name="twitter:card">
  <meta content="" name="twitter:url"><!-- add final URL here -->
  <meta content="San Francisco Business Portal" name="twitter:title">
  <meta content="" name="twitter:image"><!-- add final URL of desired twitter image here -->
  <meta content="The San Francisco Business Portal is the go-to resource for building a business in the city by the bay. businessportal.sfgov.org #sfbizportal" name="twitter:description">


  <meta http-equiv="cleartype" content="on">

  <META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
  <script>
  //IE9 fix
    if(!(window.console && console.log)) {
      console = {
        log: function(){},
        debug: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
      };
    }
  </script>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  

 
  
  
  <?php if ($add_html5_shim and !$add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
  <?php elseif ($add_html5_shim and $add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
  <?php elseif ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
    <![endif]-->
  <?php endif; ?>

  <?php /* Google Fonts */ ?>
  <link href='http://fonts.googleapis.com/css?family=Droid+Serif' rel='stylesheet' type='text/css'>


</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id='browser-update-wrap'></div>
  <?php if ($skip_link_text && $skip_link_anchor): ?>
    <p id="skip-link">
      <a href="#<?php print $skip_link_anchor; ?>" class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
    </p>
  <?php endif; ?>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
<script>
(function(){
  if(jQuery('.home-section-5-wrap').length > 0) {
    jQuery('.home-section-5-wrap .field-type-link-field').each(function() {
      jQuery('a', jQuery(this)).attr('target', '_blank');
    })
    jQuery('.home-section-5-wrap a').attr('traget', '_blank');
  }
  
  if(jQuery.browser.android !== undefined && jQuery.browser.mobile !== undefined && (jQuery.browser.name === "" || jQuery.browser.name==='undefined')) {
    if(jQuery('.view-filters').length > 0) {
      jQuery('.view-filters').css({'overflow' : 'hidden'});
    }
  }
  
  // code for remove download link/button on iPad and iPhone
  if(jQuery.browser.ipad !== undefined ||  jQuery.browser.iphone !== undefined || jQuery.browser.mobile !== undefined || jQuery.browser.android !== undefined) {
    jQuery('body').addClass('hide-download');
    // My Folder Page
    jQuery('#my-folder-sidebar-download').parents('a').remove(); //download all button in sidebar
    jQuery('.my-folder-permits-actions-download-all').parents('a').remove(); //download all link    
    jQuery('.my-folder-download-button').parents('a').remove(); //download icon in list
    jQuery('.my-folder-starter-kit-actions-download-all').parents('a').remove();
    jQuery('.download-cta').parents('a').remove();
    
    
    // Permit & Licenses
    jQuery('#permit-download-cta').parents('a').remove(); //individual page
    jQuery('.permit-teaser-download-cta').parents('a').remove(); //listing page
    jQuery('.required-items-download-cta').parents('a').remove(); //download all link
    
    
    // Resources Page
    jQuery('.doc-teaser-download-cta').parents('a').remove(); // listing and related document
    jQuery('#doc-download-cta').parents('a').remove(); //individual page
    
    //Start a Business > Starter Kits + Individual
    jQuery('.kit-download-all').parents('a').remove();
    jQuery('.guide-download').parents('a').remove();
    jQuery('.kit-download').parents('a').remove();
  }
  
  
  //making image and title clickable on starter kits main page.
  jQuery('.panels-flexible-row-template_3-2-inside .kits-color-section').each(function() {
    var $item = jQuery(this);
    href = jQuery('.field-type-link-field a', $item).attr('href');
//    jQuery('.field-name-field-img, .field-name-field-heading .field-item', $item).css({'cursor': 'pointer'});
//    jQuery('.field-name-field-heading .field-item', $item).css({'display': 'inline'});
    jQuery('.field-name-field-img', $item).wrap('<a href="'+href+'" class="custom-js-link"></a>');
    jQuery('.field-name-field-heading .field-item', $item).wrapInner('<a href="'+href+'" class="custom-js-link"></a>');
    
//    jQuery('.field-name-field-img, .field-name-field-heading .field-item', $item).click(function() {
      
      
      
//      location.href = jQuery('.field-type-link-field a', $item).attr('href');
//    });
  });
  
  
  var page = document.documentElement.className;
//  console.log(page);
  if( page.indexOf('ie7')>-1 ||  page.indexOf('ie8')>-1 || page.indexOf('ie9')>-1 || page.indexOf('lt-ie9')>-1 || page.indexOf('lt-ie8')>-1 || page.indexOf('lt-ie7')>-1 || page.indexOf('iem7')>-1 ){
    //console.log('your browser is too old');
    var newDiv = document.createElement('div');
    newDiv.id = 'browser-update';
    newDiv.className = 'brower-update';
    newDiv.innerHTML = '<div id="browser-update-inner"><h2>Update Your Browser</h2><p>Your browser is out of date. You will be unable to use many of the features of this website. Would you like to update now?</p><a href="http://www.microsoft.com/en-us/download/internet-explorer.aspx" target="_blank"><p>Yes please</p></a></div>';
    document.getElementById('browser-update-wrap').appendChild(newDiv);
  }

  var ua = navigator.userAgent;
  //var msie = false;
  //var ff = false;
  var chrome = false;

  //Javascript Browser Detection - FireFox
  /*if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua))//test for Firefox/x.x or Firefox x.x
  {
      var ff = (/Firefox[\/\s](\d+\.\d+)/.test(navigator.ua)); //True or False
      var ffversion = new Number(RegExp.$1) //gets browser version
     // alert("FF: " + ff + ' version:' + ieversion);
  }*/

  //Javascript Browser Detection - Chrome
  if (ua.lastIndexOf('Chrome/') > 0) {
      var version = ua.substr(ua.lastIndexOf('Chrome/') + 7, 2);
      //alert("chrome " + version);
      if(version<25){
        var newDiv = document.createElement('div');
        newDiv.id = 'browser-update';
        newDiv.className = 'brower-update';
        newDiv.innerHTML = '<div id="browser-update-inner"><h2>Update Your Browser</h2><p>Your browser is out of date. You will be unable to use many of the features of this website. Please update your browser and come back.</p><a href="https://www.google.com/chrome/browser/" target="_blank"><p>Yes please.</p></a></div>';
        document.getElementById('browser-update-wrap').appendChild(newDiv);
      }
  }

  //Javascript Browser Detection - Safari
  /*if (ua.lastIndexOf('Safari/') > 0) {
      var version = ua.substr(ua.lastIndexOf('Safari/') + 7, 2);
      //alert("Safari " + version);
  }*/

})();
</script>
<noscript>Not able to check browser version.</noscript>
</html>
