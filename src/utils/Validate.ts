export default class Validate {
  public static string(isValidate: string) {
    return isValidate && typeof isValidate === 'string';
  }

  public static number(isValidate: number) {
    return isValidate && typeof isValidate === 'number';
  }
}
