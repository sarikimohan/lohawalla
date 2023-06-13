interface FieldData<T = string> {
  /**
   * the value of the field
   */
  value: T;
  /**
   * if there is an error during validation
   */
  error?: string;
  /**
   * after validtion, if it is okay
   */
  isValid?: boolean;
}