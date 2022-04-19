const initState = {
  categories: [],
  currencies: [],
  products_by_cat: []
}
  
  
  
const mainDataReducer = (state = initState, action) => {
  if(action.type === 'GET_DATA'){
    let {categories, currencies} = action.payload.data;
    return {
      ...state,
      categories: categories,
      currencies: currencies
    }
  }

  return state;
}



export default mainDataReducer