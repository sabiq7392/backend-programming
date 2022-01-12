/* eslint-disable semi */

/**
 * @IMPORTANT
 * this interface to set your type response data sent
 *
 * your response is here, is the data you send/manipulate for CRUD
 * the key and type based by your colum in database
 *
 * you can create another interface if there are different data to send
 */

export interface AuthDataWillSent {
  username: string,
  password: string,
}

export interface MainDataWillSent {
  // id: number, don't declare just keep in comment! unless you want it
  name: string,
  phone: string,
  address: string,
  status: 'positive' | 'recovered' | 'dead',
  in_date_at: string,
  out_date_at: string,
  // timestamp: string, don't declare just keep in comment! unless you want it
}
