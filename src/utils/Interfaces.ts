import { GetResult, PostResult } from './Types';

/**
 *  Important Interface
 * to set your type response data json
 * especially to create and put
 */

export interface TypeDataAction {
  // id: number, !don't declare!
  name: string,
  phone: string,
  address: string,
  status: 'positive' | 'negative' | 'dead',
  in_date_at: string,
  out_date_at: string,
  // timestamp: string, !don't declare!
}

export interface DataJson {
  status: number,
  message?: string | undefined,
  data?: GetResult | PostResult,
  errors?: any,
}

// ================================
