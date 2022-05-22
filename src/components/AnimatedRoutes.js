import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import { connect } from 'react-redux';
import withRouter from '../hoc/withRouter';
import Products from '../views/Products';
import Product from '../views/Product';
import Cart from '../views/Cart';

class AnimatedRoutes extends Component {
   render() {
      return (
         <AnimatePresence exitBeforeEnter>
            <Routes location={this.props.router.location} 
               key={this.props.router.location.pathname}>
               <Route
                  path="/"
                  element={<Navigate to={'/' + this.props.defaultLink} />}
               />
               <Route path='/:cat_id' element={<Products />} />
               <Route path='/:cat_id/:product_id' element={<Product />} />
               <Route path='/cart' element={<Cart />} />
            </Routes>
            </AnimatePresence>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      defaultLink: state.defaultLink.defaultLink
   }
}


export default withRouter(connect(mapStateToProps)(AnimatedRoutes))