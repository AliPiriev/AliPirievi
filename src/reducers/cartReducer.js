const initState = {
    cart: [],
    modalState: true
}


const cartReducer = (state = initState, action) => {

    if (action.type === 'TOGGLE_STATE') {
        const newState = !state.modalState;
        return {
            ...state,
            modalState: newState,
        }
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            cart: [],
        }
    }

    if (action.type === 'ADD_TO_CART') {
        const index = state.cart.findIndex(({ id }) => id === action.product.id);
        let newCart;
        if (index !== -1) {
            const products = state.cart.map(item => {
                if (item.id === action.product.id) {
                    item.qnt++;
                }
                if (action.overwriteAttr) {
                    item.selected_attr = action.product.selected_attr;
                }
                return item
            })
            newCart = products;
        } else {
            newCart = [...state.cart, action.product];
        }
        return {
            ...state,
            cart: newCart,
        }
    }

    if (action.type === 'CHANGE_COUNT') {
        let newCart;
        if (action.payload.count > 0) {
            newCart = state.cart.map((product) => {
                if (product.id !== action.payload.id) {
                    return product
                }

                return {
                    ...product,
                    qnt: action.payload.count
                }

            })
        } else {
            newCart = state.cart.filter((product) => product.id !== action.payload.id);
        }


        return {
            ...state,
            cart: newCart,
        }
    }

    if (action.type === 'CHANE_CURRENCY') {
        const newCart = state.cart.map((product) => ({
            ...product,
            _price: product.prices.find(price => price.currency.label === action.currency.label)

        }))

        return {
            ...state,
            cart: newCart,
        }
    }

    if (action.type === 'SET_ATTRIBUTES') {
        const newCart = state.cart.map((product) => {
            if (product.id !== action.payload.id) {
                return product
            }

            return {
                ...product,
                selected_attr: action.payload.attributes
            }

        })


        return {
            ...state,
            cart: newCart,
        }
    }

    return state;
}



export default cartReducer