import http from '../http'
import { IPricebook } from '../http/pricebook'

export const getPricebooksList = async (): Promise<Array<IPricebook>> => {
  const response = await http.pricebook.getList()
  return response.data.pricebooks
}
