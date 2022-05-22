import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductList from '../components/ProductList';
import withRouter from '../hoc/withRouter';
import AnimatedPage from '../components/AnimatedPage';
import {getProductsQuery} from '../queries/queries'

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

    async getData() {
        let result = await getProductsQuery(this.props.router.params.cat_id);
        if(result){
            result.data.category ? this.setState({ products: result.data.category.products, category: result.data.category.name, loading: result.loading }) : this.setState({ loading: result.loading });
        }
    }

    render() {
        const currency = this.props.current_currency;
        const products = this.state.products.map((product) => ({
            ...product,
            _price: product.prices.find(price => price.currency.label === currency.label)
        }));

        return (
            <AnimatedPage>
                <div className="products-page">
                    <div className="container">
                        <h1 className='f-42 title'>{this.state.category}</h1>
                        <div className="product-list">
                            <ProductList products={products} loading={this.state.loading} />
                        </div>
                    </div>
                </div>
            </AnimatedPage>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        current_currency: state.currency.current_currency
    }
}

export default withRouter(connect(mapStateToProps)(Products))