<?php

/**
 * @file
 * Default theme implementation for displaying search results.
 *
 * This template collects each invocation of theme_search_result(). This and
 * the child template are dependent to one another sharing the markup for
 * definition lists.
 *
 * Note that modules may implement their own search type and theme function
 * completely bypassing this template.
 *
 * Available variables:
 * - $search_results: All results as it is rendered through
 *   search-result.tpl.php
 * - $module: The machine-readable name of the module (tab) being searched, such
 *   as "node" or "user".
 *
 *
 * @see template_preprocess_search_results()
 *
 * @ingroup themeable
 */
?>
<?php //dpm($search_totals); ?>
<div id='search-results-banner'>
	<div id='search-results-banner-inner'>
		<div id="search-results-banner-text">
			<?php $search_term = $_GET;  $simplified_term = str_replace('search_pages/','',$search_term['q']); ?>
			<h2>Search Results</h2>
			<p>Your search for &#8220;<?php echo $simplified_term; ?>&#8221; returned <?php if($search_totals !=NULL){print $search_totals;}else{echo '0';}  ?> results. View your results below or search again.</p>
		</div>
		
	</div>
</div>
<div id='carrot'></div>
<?php if ($search_results): ?>

  <ol class="search-results <?php print $module; ?>-results">
    <?php print $search_results; ?>
  </ol>
  <?php print $pager; ?>
<?php else : ?>
  <h2 class='no-results'><?php print t('Your search yielded no results.');?></h2>
  
<?php endif; ?>
