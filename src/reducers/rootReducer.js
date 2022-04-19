import { combineReducers } from 'redux'
import data from './mainDataReducer'
import currency from './currencyReducer'
import cart from './cartReducer'
export default combineReducers({
  data,
  currency,
  cart
})
