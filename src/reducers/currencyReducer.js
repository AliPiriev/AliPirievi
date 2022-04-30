const initState = {
  current_currency: null,
}


const currencyReducer = (state = initState, action) => {
  if (action.type === 'SET_CURRENCY') {
    let currency = action.currency;
    return {
      ...state,
      current_currency: currency,
    }
  }

  return state;
}



export default currencyReducer