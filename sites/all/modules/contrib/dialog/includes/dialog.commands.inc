<?php

/**
 * @file
 * AJAX commands.
 */

/**
 * Creates a Drupal Ajax 'open dialog' command.
 *
 * @param string $selector
 *   The selector of the dialog.
 * @param string $title
 *   The title of the dialog.
 * @param string $html
 *   An HTML string that will be placed in the dialog.
 * @param array $dialog_options
 *   (optional) Options to be passed to the dialog implementation. Any
 *   jQuery UI option can be used. See http://api.jqueryui.com/dialog.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_open_dialog($selector, $title, $html, array $dialog_options = array()) {
  // Add the library for handling the dialog in the response.
  drupal_add_library('dialog', 'drupal.dialog.ajax');

  $dialog_options['title'] = $title;

  // For consistency ensure the modal option is set to TRUE or FALSE.
  $dialog_options['modal'] = isset($dialog_options['modal']) && $dialog_options['modal'];

  return array(
    'command' => 'openDialog',
    'selector' => $selector,
    'data' => $html,
    'dialogOptions' => $dialog_options,
  );
}

/**
 * Creates a Drupal Ajax 'open modal dialog' command.
 *
 * The modal dialog differs from the normal modal provided by
 * dialog_command_open_dialog in that a modal prevents other interactions
 * on the page until the modal has been completed. Drupal provides a built-in
 * modal for this purpose, so no selector needs to be provided.
 *
 * @param string $title
 *   The title of the dialog.
 * @param string $html
 *   An HTML string that will be placed in the dialog.
 * @param array $dialog_options
 *   (optional) Settings to be passed to the dialog implementation. Any
 *   jQuery UI option can be used. See http://api.jqueryui.com/dialog.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_open_modal_dialog($title, $html, array $dialog_options = array()) {
  $dialog_options['modal'] = TRUE;

  return dialog_command_open_dialog('#drupal-modal', $title, $html, $dialog_options);
}

/**
 * Creates a Drupal Ajax 'close dialog' command.
 *
 * @param string $selector
 *   A CSS selector string of the dialog to close.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_close_dialog($selector = NULL) {
  return array(
    'command' => 'closeDialog',
    'selector' => $selector ? $selector : '#drupal-modal',
  );
}

/**
 * Creates a Drupal Ajax 'close modal dialog' command.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_close_modal_dialog() {
  return dialog_command_close_dialog('#drupal-modal');
}

/**
 * Creates a Drupal Ajax 'set dialog option' command.
 *
 * @param string $selector
 *   The selector of the dialog whose title will be set. If set to an empty
 *   value, the default modal dialog will be selected.
 * @param string $option_name
 *   The name of the option to set. May be any jQuery UI dialog option.
 *   See http://api.jqueryui.com/dialog.
 * @param mixed $option_value
 *   The value of the option to be passed to the dialog.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_set_dialog_option($selector, $option_name, $option_value) {
  return array(
    'command' => 'setDialogOption',
    'selector' => $selector ? $selector : '#drupal-modal',
    'optionName' => $option_name,
    'optionValue' => $option_value,
  );
}

/**
 * Creates a Drupal Ajax 'set dialog title' command.
 *
 * @param string $selector
 *   The selector of the dialog whose title will be set. If set to an empty
 *   value, the default modal dialog will be selected.
 * @param string $title
 *   The title that will be set on the dialog.
 *
 * @return
 *   An array suitable for use with the ajax_render() function.
 */
function dialog_command_set_dialog_title($selector, $title) {
  return dialog_command_set_dialog_option($selector, 'title', $title);
}
