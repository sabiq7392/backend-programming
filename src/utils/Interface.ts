/**
 *  Important Interface
 * to set your type response data json
 */

export interface TypeData {
  name: string,
  nim: number,
  email: string,
  prodi: string,
}

export interface TypeDataJson<T> {
  status: number,
  message: string,
  data?: T,
}

// ================================
