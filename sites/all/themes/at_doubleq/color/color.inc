<?php
// dq
$info = array(
  'fields' => array(
    'base'                 => t('Base'),
    'page'                 => t('Page'),
    'link'                 => t('Links'),
    'text'                 => t('Text'),
    'headings'             => t('Headings'),
    'borders'              => t('Borders'),
    'teaser'               => t('Teaser'),
    'sitename'             => t('Site name'),
    'siteslogan'           => t('Site slogan'),
    'top'                  => t('Header top'),
    'bottom'               => t('Header bottom'),
    'headertext'           => t('Header text'),
    'headerlinks'          => t('Header links'),
    'mainmenulinks'        => t('Main menu links'),
    'mainmenuhover'        => t('Main menu hover'),
    'dropmenubg'           => t('Drop menu'),
    'secondarytop'         => t('Secondary top'),
    'secondarybottom'      => t('Secondary bottom'),
    'secondarytext'        => t('Secondary text'),
    'secondarylinks'       => t('Secondary links'),
    'secondarytitles'      => t('Secondary titles'),
    'footerbg'             => t('Footer'),
    'footertext'           => t('Footer text'),
    'footerlinks'          => t('Footer links'),
    'footertitles'         => t('Footer titles'),
    'buttontext'           => t('Button text'),
    'buttonborder'         => t('Button border'),
    'buttontop'            => t('Button top'),
    'buttonbottom'         => t('Button bottom'),
  ),
  'schemes' => array(
    'default' => array(
      'title' => t('DoubleQ (default)'),
      'colors' => array(
        'base'                 => '#000000',
        'page'                 => '#ffffff',
        'link'                 => '#b68838',
        'text'                 => '#7e7e7e',
        'headings'             => '#636363',
        'borders'              => '#ececec',
        'teaser'               => '#f7f7f7',
        'sitename'             => '#fafaff',
        'siteslogan'           => '#fbfbfb',
        'top'                  => '#3f392d',
        'bottom'               => '#423c2f',
        'headertext'           => '#fffffe',
        'headerlinks'          => '#b9b9b9',
        'mainmenulinks'        => '#a0a0a0',
        'mainmenuhover'        => '#fafafa',
        'dropmenubg'           => '#27231c',
        'secondarytop'         => '#bb8c3b',
        'secondarybottom'      => '#c89640',
        'secondarytext'        => '#fefefe',
        'secondarylinks'       => '#f5efee',
        'secondarytitles'      => '#3f392c',
        'footerbg'             => '#b28539',
        'footertext'           => '#fdfdfd',
        'footerlinks'          => '#f9f9f9',
        'footertitles'         => '#3f392b',
        'buttontext'           => '#f5efe5',
        'buttonborder'         => '#b57300',
        'buttontop'            => '#cf9e4a',
        'buttonbottom'         => '#ac7f30',
      ),
    ),
    'dq_blue' => array (
      'title' => 'Oceanic',
      'colors' => array (
        'base' => '#000000',
        'page' => '#ffffff',
        'link' => '#408DD2',
        'text' => '#7e7e7e',
        'headings' => '#636363',
        'borders' => '#ececec',
        'teaser' => '#f7f7f7',
        'sitename' => '#fafaff',
        'siteslogan' => '#fbfbfb',
        'top' => '#111111',
        'bottom' => '#232323',
        'headertext' => '#fffffe',
        'headerlinks' => '#b9b9b9',
        'mainmenulinks' => '#a0a0a0',
        'mainmenuhover' => '#fafafa',
        'dropmenubg' => '#222222',
        'secondarytop' => '#0C5DA5',
        'secondarybottom' => '#043A6B',
        'secondarytext' => '#fefefe',
        'secondarylinks' => '#ebf2f8',
        'secondarytitles' => '#ebf2f6',
        'footerbg' => '#0C5DA5',
        'footertext' => '#fdfdfd',
        'footerlinks' => '#f9f9f9',
        'footertitles' => '#3f392b',
        'buttontext' => '#ebf2f9',
        'buttonborder' => '#043A6B',
        'buttontop' => '#679FD2',
        'buttonbottom' => '#408DD2',
      ),
    ),
    'dq_green' => array (
      'title' => 'Emerald',
      'colors' => array (
        'base' => '#000000',
        'page' => '#ffffff',
        'link' => '#238D44',
        'text' => '#7e7e7e',
        'headings' => '#636363',
        'borders' => '#ececec',
        'teaser' => '#f7f7f7',
        'sitename' => '#fafaff',
        'siteslogan' => '#fbfbfb',
        'top' => '#111111',
        'bottom' => '#232323',
        'headertext' => '#fffffe',
        'headerlinks' => '#b9b9b9',
        'mainmenulinks' => '#a0a0a0',
        'mainmenuhover' => '#fafafa',
        'dropmenubg' => '#001807',
        'secondarytop' => '#238D43',
        'secondarybottom' => '#007B25',
        'secondarytext' => '#fefefe',
        'secondarylinks' => '#fafefc',
        'secondarytitles' => '#fafefb',
        'footerbg' => '#238D42',
        'footertext' => '#fdfdfd',
        'footerlinks' => '#f9f9f9',
        'footertitles' => '#3f392b',
        'buttontext' => '#fafefd',
        'buttonborder' => '#1c6834',
        'buttontop' => '#26af50',
        'buttonbottom' => '#238D45',
      ),
    ),
  ),

  // CSS files
  'css' => array(
    'css/global.colors.css',
  ),

  // Images to copy over
  'copy' => array(
    'logo.png',
  ),

  // Gradient definitions.
  'gradients' => array(
    array(
      // (x, y, width, height).
      'dimension' => array(0, 0, 0, 0),
      // direction of gradient ('vertical' or 'horizontal').
      'direction' => 'vertical',
      // Keys of colors to use for the gradient.
      'colors' => array('top', 'bottom'),
    ),
  ),

  // color areas to fill (x, y, width, height)
  'fill' => array(),

  // coordinates of all the theme slices (x, y, width, height).
  'slices' => array(),

  // Reference color used for blending. Matches the base.png's colors.
  'blend_target' => '#ffffff',

  // Preview files.
  'preview_image' => 'color/color-preview.png',
  'preview_css' => 'color/preview.css',

  // base file for image generation
  'base_image' => 'color/base.png',
);
