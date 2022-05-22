import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {getCategoriesQuery} from '../queries/queries'

class Navigation extends Component {
    state = {
        categories: []
    }

    async componentDidMount() {
        let categories = await getCategoriesQuery();
        if(categories){
            this.setState({ categories })
            this.props.setLink(categories[0].name)
        }
    }

    render() {
        const categories = this.state.categories;
        const linkList = categories.length ? (
            categories.map(cat => {
                return (
                    <li key={cat.name}><NavLink to={'/' + cat.name}>{cat.name}</NavLink></li>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setLink: (link) => dispatch({ type: 'SET_DEFAULT_LINK', link })
    }
}


export default connect(null, mapDispatchToProps)(Navigation)




