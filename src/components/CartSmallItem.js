import React, { Component } from 'react';
import Attributes from './Attributes';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
 import SmallGallery from './SmallGallery';
 
class CartSmallItem extends Component {
    

    getPrice(product) {
        const { prices } = product;
        const price = prices.find(price => price.currency.label === this.props.currency.label);
        return (
            <span className='f-medium price'>{price.amount} {price.currency.label}</span>
        );
    }

    setAttribute = (e, attr) => {
        e.preventDefault();
        let attributes = this.props.product.selected_attr;
        const parent_index = attributes.findIndex(attribute => attribute.parrent_id === attr.parrent_id);
        const index = attributes.findIndex(attribute => attribute.id === attr.id);
        if(parent_index !== -1){
            attributes = attributes.filter(attribute => attribute.parrent_id !== attr.parrent_id);
            if(index === -1){
                attributes = [...attributes , attr]
            }
        }else{
            attributes = [...attributes , attr]
        }
        this.props.setAttr({id:this.props.product.id, attributes})
    }

    changeCount = (e,product, qnt) => {
        e.preventDefault();
        const count = product.qnt + qnt;
        this.props.changeCount({id:product.id, count})
    }


    render() {  
        const { product } = this.props;
        const path = this.props.type === 'small' ? product.category + '/' + product.id : '/' + product.category + '/' + product.id;
        const cartItem = product ? (

            (
                 <Link to={path} className="cart-product" key={product.id}>
                    <div className="left">
                        <span className="brand f-light">{product.brand}</span>
                        <span className="name f-light">{product.name}</span>
                        {this.getPrice(product)}
                        <Attributes 
                            attributes={product.attributes} 
                            type={this.props.type} 
                            selected_attr={product.selected_attr}
                            setAttribute={this.setAttribute}/>
                    </div> 
                    <div className="right">
                        <div className="qnt-control">
                            <button className="btn" onClick={ (e) => this.changeCount(e, product, 1)}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1V9" stroke="#1D1F22" />
                                    <path d="M1 5H9" stroke="#1D1F22" />
                                </svg>
                            </button>
                            <div className="count">
                                {product.qnt}
                            </div>
                            <button className="btn" onClick={ (e) => this.changeCount(e, product, -1)}>
                                <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1H9" stroke="#1D1F22" />
                                </svg>
                            </button>
                        </div>
                        {this.props.type === 'normal' ? (
                            <SmallGallery slides={product.gallery} altText={product.name}/>
                        ) : (
                            <div className="img-box">
                                <img src={product.gallery[0]} alt={product.name} className="img-absolute" />
                            </div>
                        )}
                        
                    </div>
                </Link>
            )

        ) : '';
        return (
            <>
                { cartItem }
            </>
           
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       changeCount: (payload) => dispatch({ type: 'CHANGE_COUNT',  payload }),
       setAttr: (payload) => dispatch({ type: 'SET_ATTRIBUTES',  payload })
    }
 }


export default connect(null, mapDispatchToProps)(CartSmallItem)