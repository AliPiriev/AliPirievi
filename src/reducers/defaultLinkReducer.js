const initState = {
  defaultLink: null,
}



const defaultLinkReducer = (state = initState, action) => {
  if (action.type === 'SET_DEFAULT_LINK') {
    let defaultLink = action.link;
    return {
      ...state,
      defaultLink: defaultLink,
    }
  }

  return state;
}



export default defaultLinkReducer