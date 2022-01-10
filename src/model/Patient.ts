import Model from './Model';

export default class Patient extends Model {
  /**
   * !important to set this based on your table name
   * this property for access your table.
   * so becareful!
   */
  public static table = 'patients';
}
