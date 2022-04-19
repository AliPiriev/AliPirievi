import React, { Component } from 'react';
import Navigation from './Navigation';
import Currency from './Currency';
import Cart from './Cart';
import { NavLink } from 'react-router-dom'
import Logo from '../assets/img/logo.png'

class Header extends Component {
    render() {        
        return (
            <header className='header'>
                <div className="container">
                    <div className="header-inner">
                        <Navigation/>
                        <div className="logo">
                            <NavLink  to='/'>
                                <img src={Logo} alt="logo" />
                            </NavLink>     
                        </div>
                        <div className="right">
                            <Currency/>
                            <Cart/>
                        </div>
                    </div>
                </div>
            </header>
        );

    }
}




export default Header;
