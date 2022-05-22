import React, { Component } from 'react';
import Attributes from './Attributes';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SmallGallery from './SmallGallery';

class SmallCartList extends Component {

    setAttribute = (e, attributes, id) => {
        e.preventDefault();
        this.props.setAttr({ id, attributes })
    }

    changeCount = (e, product, qnt) => {
        e.preventDefault();
        const count = product.qnt + qnt;
        this.props.changeCount({ product, count })
    }


    render() {
        const { products } = this.props;
        const cartItemList = products.length ? (
            products.map((product, index) => {
                const path = this.props.type === 'small' ? product.category + '/' + product.id : '/' + product.category + '/' + product.id;
                return (
                    <Link to={path} className="cart-product" key={product.id + index}>
                        <div className="left">
                            <span className="brand f-light">{product.brand}</span>
                            <span className="name f-light">{product.name}</span>
                            <span className='f-medium price'>{product._price.amount.toFixed(2)} {product._price.currency.label}</span>
                            <Attributes
                                type={this.props.type}
                                product={product}
                                setAttribute={this.setAttribute} />
                        </div>
                        <div className="right">
                            <div className="qnt-control">
                                <button className="btn" onClick={(e) => this.changeCount(e, product, 1)}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1V9" stroke="#1D1F22" />
                                        <path d="M1 5H9" stroke="#1D1F22" />
                                    </svg>
                                </button>
                                <div className="count">
                                    {product.qnt}
                                </div>
                                <button className="btn" onClick={(e) => this.changeCount(e, product, -1)}>
                                    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1H9" stroke="#1D1F22" />
                                    </svg>
                                </button>
                            </div>
                            {this.props.type === 'normal' ? (
                                <SmallGallery slides={product.gallery} altText={product.name} />
                            ) : (
                                <div className="img-box">
                                    <img src={product.gallery[0]} alt={product.name} className="img-absolute" />
                                </div>
                            )}

                        </div>
                    </Link>
                )
            })
        ) : '';
        return (
            <>
                {cartItemList}
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCount: (payload) => dispatch({ type: 'CHANGE_COUNT', payload }),
        setAttr: (payload) => dispatch({ type: 'SET_ATTRIBUTES', payload })
    }
}


export default connect(null, mapDispatchToProps)(SmallCartList)