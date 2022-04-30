import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import withRouter from './hoc/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Products from './views/Products';
import Product from './views/Product';
import Cart from './views/Cart';
import Header from './components/Header';


class App extends Component {

   render() {
      return (
         <div className="App">
            <Header />
            {this.props.defaultLink && this.props.currency ? (
               <>
                  <div className="wrapper">
                     <div className="bg-layer"></div>
                     <TransitionGroup component={null}>
                        <CSSTransition key={this.props.router.location.key} classNames="fade" timeout={600}>
                           <Routes>
                              <Route
                                 path="/"
                                 element={<Navigate to={'/' + this.props.defaultLink} />}
                              />
                              <Route path='/:cat_id' element={<Products />} />
                              <Route path='/:cat_id/:product_id' element={<Product />} />
                              <Route path='/cart' element={<Cart />} />
                           </Routes>
                        </CSSTransition>
                     </TransitionGroup>
                  </div>
               </>
            ) : (
               <div className="loader-wrap">
                  <div className="loader"></div>
               </div>
            )}

         </div>
      );
   }
}





const mapStateToProps = (state) => {
   return {
      defaultLink: state.defaultLink.defaultLink,
      currency: state.currency.current_currency
   }
}

export default withRouter(connect(mapStateToProps)(App))
