import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

class Navigation extends Component {
    state = {
        categories: []
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
                }
            }
           `}).then(result => {
                this.setState({ categories: result.data.categories })
                this.props.setLink(result.data.categories[0].name)
            });
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




