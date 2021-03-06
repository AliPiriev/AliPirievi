import React, { Component } from 'react'
import withRouter from '../hoc/withRouter';
import { connect } from 'react-redux'
import Gallery from '../components/Gallery';
import Attributes from '../components/Attributes';
import parse from 'html-react-parser';
import {getProductQuery} from '../queries/queries'
import AnimatedPage from '../components/AnimatedPage';

class Product extends Component {
    state = {
        selected_attr: [],
        product: null,
        loading: true
    }

    async componentDidMount() {
        let result = await getProductQuery(this.props.router.params.product_id);
        if(result){
            let product = null;
            if (result.data.product) {
                const _price = this.props.currency ? result.data.product.prices.find(price => price.currency.label === this.props.currency.label) : result.data.product.prices[0];
                const selected_attr = result.data.product.attributes.map(attr => {
                    const parrent_id = attr.id;
                    const id = attr.items.find((item, index) => index === 0).id
                    return {
                        unique: id + parrent_id,
                        parrent_id,
                        id
                    }
                })
                product = { ...result.data.product, _price, selected_attr }
            }
            this.setState({ product, loading: result.loading })
        }
    }

    setAttribute = (e, attributes) => {
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                selected_attr: attributes
            }
        }))
    }

    addToCart(product) {
        const cartProduct = { ...product, qnt: 1 }
        this.props.addToCart(cartProduct, true);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currency && prevProps.currency.label !== this.props.currency.label) {
            const _price = this.state.product.prices.find(price => price.currency.label === this.props.currency.label);
            this.setState(prevState => ({
                product: {
                    ...prevState.product,
                    _price
                }
            }))
        }
    }

    render() {
        const loading = this.state.loading;
        const product = this.state.product;

        const productDetails = product ? (
            <div className="product-details">
                <h2 className="f-semiBold f-30 brand">{product.brand}</h2>
                <h3 className="ttl f-30">{product.name}</h3>
                <Attributes
                    product={product}
                    type='normal'
                    setAttribute={this.setAttribute} />
                <div className="price">
                    <span className='f-bold f-18'>price:</span>
                    <span className='f-bold f-24'>{product._price.currency.label} {product._price.amount.toFixed(2)}</span>
                </div>
                {product.inStock ? (
                    <button className="f-semiBold green-btn" onClick={() => this.addToCart(product)}>
                        <span>add to cart</span>
                    </button>
                ) : (
                    <span className='f-bold'>Out Of Stock</span>
                )}

                <div className="text">{parse(product.description)}</div>
            </div>
        ) : loading ? (
            <div className="loading">
                <span>Loading ...</span>
            </div>
        ) : (
            <span>Product not exist (</span>
        );

        return (
            <AnimatedPage>
                <div className="product-page" >
                    <div className="container">
                        <div className="product-page-inner">
                            {product ? (
                                <Gallery slides={product.gallery} altText={product.name} />
                            ) : ''}
                            {productDetails}
                        </div>
                    </div>
                </div>
            </AnimatedPage>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (product, overwriteAttr) => dispatch({ type: 'ADD_TO_CART', product, overwriteAttr })
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency.current_currency,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))
