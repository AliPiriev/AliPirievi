import { combineReducers } from 'redux'
import defaultLink from './defaultLinkReducer'
import currency from './currencyReducer'
import cart from './cartReducer'
export default combineReducers({
  defaultLink,
  currency,
  cart
})
