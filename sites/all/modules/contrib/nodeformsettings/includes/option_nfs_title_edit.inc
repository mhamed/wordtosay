<?php

/**
 * Change the page title when editing a node
 */
function _option_nfs_title_edit($form, &$form_state, $settings, $node) {
  if (!empty($node->nid)) {
    $replace_pairs = array(
      '!node_title' => $node->title,
      '!node_type' => node_type_get_name($node),
    );
    $title = strtr($settings['nfs_title_edit'], $replace_pairs);
    drupal_set_title(t($title));
  }

  return $form;
}
