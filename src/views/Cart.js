import React, { Component } from 'react';
import { connect } from 'react-redux'
import AnimatedPage from '../components/AnimatedPage';
import SmallCartList from '../components/SmallCartList';
import withRouter from '../hoc/withRouter';

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
            const { _price } = product;
            result = Math.round((result + (_price.amount * product.qnt)) * 100) / 100;
        })
        return result;
    }
    calcCount = (products) => {
        let count = 0;
        products.forEach(product => {
            count = count + product.qnt;
        })
        return count;
    }
    calcTax = (total) => {
        let tax = Math.round((total * 0.21) * 100) / 100;
        return tax;
    }

    checkout = () => {
        alert('You successfully made order!')
        console.log('Products:')
        console.log(this.props.cart)
        console.log('currency: ', this.props.currency.label)
        this.props.router.navigate('/');
        this.props.clearCart();
    }

    render() {
        const products = this.props.cart;
        const total = this.countTotal(products);
        const count = this.calcCount(products);
        const tax = this.calcTax(total);
        const currency = this.props.currency;

        return (
            <AnimatedPage>
                <div className="cart-page">
                    <div className="container">
                        {products.length ? (
                            <>
                                <h1 className="f-32 f-bold title">Cart</h1>
                                <div className="list">
                                    <SmallCartList products={products} type='normal' />
                                </div>
                                <div className="bottom">
                                    <p>
                                        <span className='f-24'>Tax 21%:</span>
                                        <span className='f-24 f-bold'>{currency.symbol}{tax.toFixed(2)}</span>
                                    </p>
                                    <p>
                                        <span className='f-24'>Quantity:</span>
                                        <span className='f-24 f-bold'>{count}</span>
                                    </p>
                                    <p>
                                        <span className='f-24'>Total:</span>
                                        <span className='f-24 f-bold'>{currency.symbol}{total.toFixed(2)}</span>
                                    </p>
                                    <button className='btn green-btn' onClick={this.checkout}>
                                        <span>order</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className='f-bold f-30'>Your cart is currently empty!</span>
                        )}
                    </div>
                </div>
            </AnimatedPage>
        );

    }
}



const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        currency: state.currency.current_currency,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch({ type: 'CLEAR_CART' })
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
