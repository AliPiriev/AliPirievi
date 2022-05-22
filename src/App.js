import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header';
import AnimatedRoutes from './components/AnimatedRoutes';


class App extends Component {

   render() {
      return (
         <div className="App">
            <Router>
               <Header />
               {this.props.defaultLink && this.props.currency ? (
                  <>
                     <div className="wrapper">
                        <div className="bg-layer"></div>
                        <AnimatedRoutes />
                     </div>
                  </>
               ) : (
                  <div className="loader-wrap">
                     <div className="loader"></div>
                  </div>
               )}
            </Router>
         </div >
      );
   }
}


const mapStateToProps = (state) => {
   return {
      defaultLink: state.defaultLink.defaultLink,
      currency: state.currency.current_currency
   }
}

export default connect(mapStateToProps)(App);
