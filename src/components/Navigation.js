import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
 
class Navigation extends Component {    
    render() {       
        const { categories } = this.props
        const linkList = categories.length ? (
            categories.map(cat => {
              return (
                <li key={cat.name}><NavLink  to={'/' + cat.name}>{cat.name}</NavLink></li>
              )
            })
        ) : '';
        return (
            <nav className="navigation">
                <ul>
                    {linkList}
                </ul>
            </nav>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.data.categories
    }
}


export default  connect(mapStateToProps)(Navigation)



