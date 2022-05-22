const initState = {
    cart: [],
    modalState: true
}


const cartReducer = (state = initState, action) => {

    const objectsEqual = (o1, o2) =>
        typeof o1 === 'object' && Object.keys(o1).length > 0
            ? Object.keys(o1).length === Object.keys(o2).length
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
            : o1 === o2;
    const isAttrEqual = (a1, a2) =>
        a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));


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
        let newCart;

        const checker = state.cart.find(function (product) {
            if (product.id === action.product.id
                && isAttrEqual(product.selected_attr, action.product.selected_attr)) {
                return product;
            }
        });



        if (checker) {
            const products = state.cart.map(product => {
                if (product.id === checker.id
                    && isAttrEqual(product.selected_attr, action.product.selected_attr)) {
                    product.qnt++;
                }
                return product;
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
                if (product.id === action.payload.product.id
                    && isAttrEqual(product.selected_attr, action.payload.product.selected_attr)) {
                    return {
                        ...product,
                        qnt: action.payload.count
                    }
                }

                return product;
            })
        } else {
            newCart = state.cart.filter(function(product){
                if(product.id !== action.payload.product.id){
                    return product;
                }else if(product.id === action.payload.product.id && !isAttrEqual(product.selected_attr, action.payload.product.selected_attr)){
                    return product
                }
            })
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