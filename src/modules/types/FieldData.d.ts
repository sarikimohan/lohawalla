interface FieldData {
  /**
   * the value of the field
   */
  value: string;
  /**
   * if there is an error during validation
   */
  error?: string;
  /**
   * after validtion, if it is okay
   */
  isValid?: boolean;
}