import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import {
   ApolloClient,
   InMemoryCache,
   gql
} from "@apollo/client";
import Products from './views/Products';
import Product from './views/Product';
import Cart from './views/Cart';
import Header from './components/Header';

class App extends Component {
   state = {
      defaultLink: '/'
   }

   componentDidMount() {
      const client = new ApolloClient({
         uri: 'http://localhost:4000/',
         cache: new InMemoryCache()
      });
      client.query({
         query: gql`
         query {
            categories {
               name
               products {
                  id
                  name
                  inStock
                  gallery
                  description
                  category
                  attributes{
                     id
                     name
                     type
                     items{
                        displayValue
                        value
                        id
                     }
                  }
                  prices{
                     currency{
                        label
                        symbol
                     }
                     amount
                  }
                  brand
               }
            }
            currencies {
               label
               symbol
            }
         }
         `}).then(result => {
            if (result.data.categories[0]) {
               this.setState({
                  defaultLink: result.data.categories[0].name
               })
            }
            this.props.getData(result);
         });
   }


   render() {
      return (
         <div className="App">
            {this.props.data.categories.length ? (
               <Router>
                  <Header />
                  <div className="wrapper">
                     <div className="bg-layer"></div>
                     <Routes>
                        <Route
                           path="/"
                           element={<Navigate to={'/' + this.state.defaultLink} />}
                        />
                        <Route path='/:cat_id' element={<Products />} />
                        <Route path='/:cat_id/:product_id' element={<Product />} />
                        <Route path='/cart' element={<Cart />} />
                     </Routes>
                  </div>
               </Router>
            ) : (
               <div className="loader-wrap">
                  <div className="loader"></div>
               </div>
            )}

         </div>
      );
   }
}



const mapDispatchToProps = (dispatch) => {
   return {
      getData: (data) => dispatch({ type: 'GET_DATA', payload: data })
   }
}

const mapStateToProps = (state) => {
   return {
      data: state.data
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
