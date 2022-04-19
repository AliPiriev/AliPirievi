import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartSmallItem from '../components/CartSmallItem';

class Cart extends Component {
    state = {
        active: false
    }

    toggleCart = () => {
        this.setState({
            active: !this.state.active
        })
        document.querySelector('body').classList.toggle('active');
    }
    countTotal(products) {
        let result = 0;
        products.forEach(product => {
            const { prices } = product;
            const price = prices.find(price => price.currency.label === this.props.currency.label);
            result = Math.round((result + price.amount) * 1e12) / 1e12;
        })
        return result;
    }

    checkout = () => {
        const even = (element) => !element.selected_attr.length;
        if (this.props.cart.some(even)) {
            alert('Please select products attributes')
        } else {
            alert('You successfully made check out!')
            console.log(this.props.cart)
            console.log('currency: ', this.props.currency.label)
        }
    }

    render() {
        const products = this.props.cart;
        const cartList = products.length ? (
            products.map(product => {
                return (
                    <CartSmallItem product={product} currency={this.props.currency} key={product.id} type='normal'/>
                )
            })
        ) : '';

        return (
            <div className="cart-page">
                <div className="container">
                    <h1 className="f-32 f-bold title">Cart</h1>
                    <div className="list">
                        {cartList}
                    </div>
                </div>
            </div>
        );

    }
}

// const mapDispatchToProps = (dispatch) => {
//     return ''
// }


const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        currency: state.currency.current_currency,
    }
}



export default connect(mapStateToProps)(Cart)
