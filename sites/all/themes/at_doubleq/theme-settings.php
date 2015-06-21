<?php

/**
 * @file
 * Implimentation of hook_form_system_theme_settings_alter()
 *
 * @param $form: Nested array of form elements that comprise the form.
 * @param $form_state: A keyed array containing the current state of the form.
 */

function at_doubleq_form_system_theme_settings_alter(&$form, &$form_state)  {
  // Include a hidden form field with the current release information
  $form['at-release'] = array(
    '#type' => 'hidden',
    '#default_value' => '7.x-3.x',
  );

  // Tell the submit function its safe to run the color inc generator
  // if running on AT Core 7.x-3.x
  $form['at-color'] = array(
    '#type' => 'hidden',
    '#default_value' => TRUE,
  );

  // EXTENSIONS
  $enable_extensions = isset($form_state['values']['enable_extensions']);
  if (($enable_extensions && $form_state['values']['enable_extensions'] == 1) || (!$enable_extensions && $form['at-settings']['extend']['enable_extensions']['#default_value'] == 1)) {

    // Remove option to use full width wrappers
    $form['at']['modify-output']['design']['page_full_width_wrappers'] = array(
      '#access' => FALSE,
      '#default_value' => 0,
    );

    // Header layout
    $form['at']['mainmenu'] = array(
      '#type' => 'fieldset',
      '#title' => t('Main menu position'),
      '#description' => t('<h3>Main menu</h3><p>Change the position of the main menu bar.</p>'),
    );
    $form['at']['mainmenu']['main_menu_position'] = array(
      '#type' => 'radios',
      '#title' => t('Branding position'),
      '#default_value' => at_get_setting('main_menu_position'),
      '#options' => array(
        'mmp-inline'  => t('Inline Right'),
        'mmp-below-left' => t('Below branding - left aligned'),
        'mmp-below-right' => t('Below branding - right aligned'),
        'mmp-below-center' => t('Below branding - center aligned'),
      ),
    );

    // Rounded corners
    $form['at']['corners'] = array(
      '#type' => 'fieldset',
      '#title' => t('Rounded corners'),
      '#description' => t('<h3>Rounded Corners</h3><p>Rounded corners are implimented using CSS and only work in modern compliant browsers.</p><p>Rounded corners apply to node teasers and image borders in the DoubleQ theme.'),
    );
    $form['at']['corners']['corner_radius'] = array(
      '#type' => 'select',
      '#title' => t('Content radius'),
      '#default_value' => at_get_setting('corner_radius'),
      '#description' => t('Change the corner radius.'),
      '#options' => array(
        'rc-0' => t('none'),
        'rc-3' => t('3px'),
        'rc-6' => t('6px'),
        'rc-9' => t('9px'),
        'rc-12' => t('12px'),
      ),
    );

    // Textures
    $form['at']['pagestyles']['textures'] = array(
      '#type' => 'fieldset',
      '#title' => t('Textures'),
      '#description' => t('<h3>Body Textures</h3><p>This setting adds a texture over the main background colors - the darker the background the more these stand out, on light backgrounds the effect is subtle.</p><p>In DoubleQ the textures are applied to the secondary content region and the main footer background.'),
    );
    $form['at']['pagestyles']['textures']['body_background'] = array(
      '#type' => 'select',
      '#title' => t('Select texture'),
      '#default_value' => at_get_setting('body_background'),
      '#options' => array(
        'bb-n'   => t('None'),
        'bb-b'   => t('Bubbles'),
        'bb-hs'  => t('Horizontal stripes'),
        'bb-dp'  => t('Diagonal pattern'),
        'bb-dll' => t('Diagonal lines - loose'),
        'bb-dlt' => t('Diagonal lines - tight'),
        'bb-sd'  => t('Small dots'),
        'bb-bd'  => t('Big dots'),
      ),
    );

    // Menu styles
    $form['at']['menu_styles'] = array(
      '#type' => 'fieldset',
      '#title' => t('Menu Bullets'),
      '#description' => t('<h3>Menu Bullets</h3><p>This setting allows you to customize the bullet images used on menus items. Bullet images only show on normal vertical block menus.</p>'),
    );
    $form['at']['menu_styles']['menu_bullets'] = array(
      '#type' => 'select',
      '#title' => t('Menu Bullets'),
      '#default_value' => at_get_setting('menu_bullets'),
      '#options' => array(
        'mb-n'  => t('None'),
        'mb-dd' => t('Drupal default'),
        'mb-ah' => t('Arrow head'),
        'mb-ad' => t('Double arrow head'),
        'mb-ca' => t('Circle arrow'),
        'mb-fa' => t('Fat arrow'),
        'mb-sa' => t('Skinny arrow'),
      ),
    );

    // List styles
    $form['at']['list_styles'] = array(
      '#type' => 'fieldset',
      '#title' => t('List Bullets'),
      '#description' => t('<h3>List Bullets</h3><p>This will add custom bullets to item lists and ol/ul in content.</p>'),
    );
    $form['at']['list_styles']['u_list_bullets'] = array(
      '#type' => 'select',
      '#title' => t('Unordered List Bullets'),
      '#default_value' => at_get_setting('u_list_bullets'),
      '#options' => array(
        'ulb-n'      => t('None'),
        'ulb-disc'   => t('Disc (browser default)'),
        'ulb-circle' => t('Circle'),
        'ulb-square' => t('Square'),
        'ulb-tick'   => t('Tick (image)'),
        'ulb-plus'   => t('Plus sign (image)'),
        'ulb-cross'  => t('Cross (image)'),
      ),
    );
    $form['at']['list_styles']['o_list_bullets'] = array(
      '#type' => 'select',
      '#title' => t('Ordered List Bullets'),
      '#default_value' => at_get_setting('o_list_bullets'),
      '#options' => array(
        'olb-n'      => t('None'),
        'olb-decimal'   => t('Decimal (browser default)'),
        'olb-lower-alpha' => t('lower-alpha (a,b,c,d)'),
        'olb-upper-alpha' => t('Upper-alpha (A,B,C,D)'),
        'olb-lower-roman'  => t('Lower-roman (i,ii,iii,iv)'),
        'olb-upper-roman'   => t('Upper-roman (I,II,III,IV)'),
      ),
    );

  }
  //dsm($form);
}
