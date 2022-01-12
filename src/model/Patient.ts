import Model from './Model';

export default class Patient extends Model {
  /**
   *
   * @desc after set this you can call all eloquent in model
   * @example await Patient.all(), await Patient.find(res, { name: 'sabiq' }), etc
   * @table for access patients table
   * @value is based on database table name "patients"
   */
  public static table = 'patients';
}
