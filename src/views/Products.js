import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductList from '../components/ProductList';
import withRouter from '../hoc/withRouter';
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

class Products extends Component {
    state = {
        products: [],
        loading: true,
        category: ''
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.router.params.cat_id !== this.props.router.params.cat_id) {
            this.getData();
        }
    }

    getData() {
        const id = this.props.router.params.cat_id;
        const client = new ApolloClient({
            uri: 'http://localhost:4000/',
            cache: new InMemoryCache()
        });
        const query = gql`
            query ($name: CategoryInput) {
                category(input: $name){
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
            }
        `;
        client.query({
            query: query,
            variables: {
                name: { title: id }
            }
        }).then(result => {
            result.data.category ? this.setState({ products: result.data.category.products, category: result.data.category.name, loading: result.loading }) : this.setState({ loading: result.loading });
        }).catch(e => {
            console.log(e)
        });
    }

    render() {
        const currency = this.props.current_currency;
        const products = this.state.products.map((product) => ({
            ...product,
            _price: product.prices.find(price => price.currency.label === currency.label)
        }));

        return (
            <div className="products-page">
                <div className="container">
                    <h1 className='f-42 title'>{this.state.category}</h1>
                    <div className="product-list">
                        <ProductList products={products} loading={this.state.loading} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        current_currency: state.currency.current_currency
    }
}

export default withRouter(connect(mapStateToProps)(Products))