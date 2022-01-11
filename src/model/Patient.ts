import Model from './Model';

export default class Patient extends Model {
  /**
   * @desc after set this you can call all eloquent in model
   * @example await Patient.all(), await Patient.find(res, { name: 'sabiq' }), etc
   * @value is based on database table name "patients"
   * @property for access patients table.
   */
  public static table = 'patients';
}
