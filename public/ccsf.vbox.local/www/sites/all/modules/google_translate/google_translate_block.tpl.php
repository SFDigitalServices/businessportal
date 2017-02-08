<?php
/*
*	@file
*	contains the google translate widget
*/
?>

<!--<div id="google_translate_element1">
    <div id="goog-toggle">
        <a class="goog-te-menu-value" href="javascript:void(0)"><span>Language</span></a>
    </div>
    <div class="goog-menu2">
        <div id="goog-menu2a"></div>
    </div>
</div>-->
<div id="google_translate_element" style="width: 100%;"></div>
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,zh-TW,es', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL, autoDisplay: false},'google_translate_element');
  }
</script>
<noscript>Unable to load google translation scripts.</noscript>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<noscript>Unable to load google translation scripts.</noscript>

<!--
<script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
  pageLanguage: 'en',
  includedLanguages: 'en,es,zh-CN',
  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
</script>
<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
-->
        