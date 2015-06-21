<?php
/**
 * @file
 * Defines the OgFlagNode class.
 */

/**
 * OG Version of the flag_node class.
 */
class OgFlagNode extends flag_node implements OgFlagEntityInterface {
  /**
   * The original flag settings from the flag module.
   *
   * @var array
   */
  protected $defaultValues = array();

  /**
   * Indicates that this instance of the flag is overridden in the current context.
   *
   * @var bool
   */
  public $isOverridden = FALSE;

  /**
   * Indicates that the overrides have been applied to this instance.
   *
   * @var bool
   */
  public $overridesApplied = FALSE;

  /**
   * The OG Context applied to this instance.
   *
   * Is either FALSE for not in an og context or an array with the following structure:
   * array(
   *   'group_type' => The type of group,
   *   'gid' => The ID of the group,
   * )
   *
   * @var bool|array
   */
  public $ogContext = FALSE;

  /**
   * Overrides the base class implementation to set the OG context.
   */
  function get_entity_id($entity) {
    $this->setContext($entity->nid);
    return parent::get_entity_id($entity);
  }

  /**
   * Overrides the base class implementation to set the OG context.
   */
  function flag($action, $entity_id, $account = NULL, $skip_permission_check = FALSE, $flagging = NULL) {
    $this->setContext($entity_id);
    return parent::flag($action, $entity_id, $account, $skip_permission_check, $flagging);
  }

  /**
   * Determines if the user has permission to use the flag in the current context.
   *
   * @param string $action
   *   The flag action, either 'flag' or 'unflag'.
   *
   * @param object|null $account
   *   The user account performing the action.
   *
   * @return bool
   *   TRUE if the user has permission to use the flag.
   *   FALSE if the user does not have permission ot use the flag.
   */
  public function user_access($action = 'flag', $account = NULL) {
    $access = parent::user_access($action, $account);

    if ($access && $this->overridesApplied) {
      $permission = "$action $this->name";
      $access = og_user_access($this->ogContext['group_type'], $this->ogContext['gid'], $permission, $account);
    }

    return $access;
  }

  /**
   * Updates the flag for the context of the current request.
   */
  public function setContext($entity_id = NULL) {
    if ($this->overridesApplied) {
      $this->ResetOverrides();
    }

    $og_context = og_flag_get_og_context($this, $entity_id);
    if ($og_context) {
      og_flag_apply_overrides($og_context, $this);
    }
  }

  /**
   * Initializes og_flag specific variables.
   */
  public function OgFlagInit() {
    foreach ($this as $k => $v) {
      if ($k != 'defaultValues') {
        $this->defaultValues[$k] = $v;
      }
    }
  }

  /**
   * Resets the instance to it's default values.
   */
  protected function ResetOverrides() {
    foreach ($this->defaultValues as $k => $v) {
      if ($k != 'default_values') {
        $this->$k = $v;
      }
    }
  }
}
