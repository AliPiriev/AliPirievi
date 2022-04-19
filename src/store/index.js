// import {createStore, combineReducers, applyMiddleware} from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import {
//     ApolloClient,
//     InMemoryCache,
//     ApolloProvider,
//     useQuery,
//     gql
//  } from "@apollo/client";

// const defaultState = {
//     products: [],
// } 

// const productReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case "GET_PRODUCTS":
//             return {...state, products: action.payload} 
//         default:
//             return state
//     }
// }
// const client = new ApolloClient({
//     uri: 'http://localhost:4000/',
//     cache: new InMemoryCache()
//  });
// export const getProductsAction = (payload) => ({type: 'GET_PRODUCTS', payload});
// export const getProducts = () => {
//     return function(dispatch){
//         client.query({
//         query: gql`
//         query {
//             categories {
//                 name
//                 products {
//                     id
//                     name
//                 }
//             }
//         }`}).then(result => dispatch(getProductsAction(result)));
//     }
// }

 
 

// const rootReducer = combineReducers({
//     productReducer
// })

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));