import { GetResult, PostResult } from './PromiseType';

/**
 * Important Interface
 * to set your type response data json
 * especially to create and put
 */

/**
 * your response is here, is the data you send/manipulate for CRUD
 * the key is named based by your colum name in database
 */
export interface DataAction {
  // id: number, don't declare just keep in comment!
  name: string,
  phone: string,
  address: string,
  status: 'positive' | 'recovered' | 'dead',
  in_date_at: string,
  out_date_at: string,
  // timestamp: string, don't declare just keep in comment!
}

/**
 * @status for status code, ex: "200 for OK, 404 for not found"
 * @message for message, ex: "data is succes to update"
 * @total get total the data you can get
 * @data get the result when the data is has been CRUD
 * @errors use to get error result when data is failed whether is CRUD or NO
 */
export interface DataJson {
  status: number,
  message?: string | undefined,
  total?: number;
  data?: GetResult | PostResult | any,
  errors?: any,
}
