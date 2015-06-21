<?php

/**
 * Override or insert variables into the html template.
 */
function at_doubleq_preprocess_html(&$vars) {
  global $theme_key;

  // Add a class for the active color scheme
  if (module_exists('color')) {
    $class = check_plain(get_color_scheme_name($theme_key));
    $vars['classes_array'][] = 'color-scheme-' . drupal_html_class($class);
  }

  $settings_array = array(
    'body_background',
    'main_menu_position',
    'menu_bullets',
    'o_list_bullets',
    'u_list_bullets',
    'corner_radius',
    'box_shadows',
  );
  foreach ($settings_array as $setting) {
    $vars['classes_array'][] = at_get_setting($setting);
  }

  // Add Noggin module settings extra classes, not all designs can support header images
  if (module_exists('noggin')) {
    if (variable_get('noggin:use_header', FALSE)) {
      $va = at_get_setting('noggin_image_vertical_alignment');
      $ha = at_get_setting('noggin_image_horizontal_alignment');
      $vars['classes_array'][] = 'ni-a-' . $va . $ha;
      $vars['classes_array'][] = at_get_setting('noggin_image_repeat');
      $vars['classes_array'][] = at_get_setting('noggin_image_width');
    }
  }

}

/**
 * Override or insert variables into the html template.
 */
function at_doubleq_process_html(&$vars) {
  if (module_exists('color')) {
    _color_html_alter($vars);
  }
}


/**
 * Override or insert variables into the page template.
 */
function at_doubleq_preprocess_page(&$vars) {
  if ($vars['page']['header']) {
    $vars['header_attributes_array']['class'][] = 'with-region-header';
  }
  else {
    $vars['header_attributes_array']['class'][] = 'without-region-header';
  }
}



/**
 * Override or insert variables into the page template.
 */
function at_doubleq_process_page(&$vars) {
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

/**
 * Override or insert variables into the block template.
 */
function at_doubleq_preprocess_block(&$vars) {
  if ($vars['block']->module == 'superfish' || $vars['block']->module == 'nice_menu') {
    $vars['content_attributes_array']['class'][] = 'clearfix';
  }
  if (!$vars['block']->subject) {
    $vars['content_attributes_array']['class'][] = 'no-title';
  }
  //if ($vars['block']->region == 'menu_bar' || $vars['block']->region == 'menu_bar_top') {
    //$vars['title_attributes_array']['class'][] = 'element-invisible';
  //}

  $vars['content_attributes_array']['class'][] = 'clearfix';
}

/**
 * Override or insert variables into the block template.
 */
function at_doubleq_process_block(&$vars) {

  // AT doubleq gets an extra block content wrapper for most blocks
  $vars['content_processed'] = '<div' . $vars['content_attributes'] . '><div class="block-content-inner clearfix">' . $vars['content'] . '</div></div>';

  // Strip all block content wrappers if its the system main block or a menu bar.
  if (
    $vars['block']->region === 'menu_bar' ||
    $vars['block']->region === 'top_menu_bar' ||
    $vars['block_html_id'] === 'block-system-main') {
    $vars['content_processed'] = $vars['content'];
  }
}

/**
 * Preprocess variables for panels_pane.tpl.php
 */
function at_doubleq_preprocess_panels_pane(&$vars) {
  $vars['content_attributes_array']['class'][] = 'clearfix';
}

/**
 * Override or insert variables into the field template.
 */
function at_doubleq_preprocess_field(&$vars) {
  $element = $vars['element'];
  $vars['classes_array'][] = 'view-mode-'. $element['#view_mode'];
  $vars['image_caption_teaser'] = FALSE;
  $vars['image_caption_full'] = FALSE;
  if(at_get_setting('image_caption_teaser') == 1) {
    $vars['image_caption_teaser'] = TRUE;
  }
  if(at_get_setting('image_caption_full') == 1) {
    $vars['image_caption_full'] = TRUE;
  }
  $vars['field_view_mode'] = '';
  $vars['field_view_mode'] = $element['#view_mode'];
}
