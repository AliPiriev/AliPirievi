import React, {Component} from 'react'
import withRouter from '../hoc/withRouter';
import { connect } from 'react-redux'
import Gallery from '../components/Gallery';
import Attributes from '../components/Attributes';


class Product extends Component{
    state = {
        selected_attr: []
    }

    getProduct(){
        const {categories} = this.props;
        const category = categories.find(cat => cat.name === this.props.router.params.cat_id);
        const product = category.products.find(product => product.id === this.props.router.params.product_id);
        return product;
    } 
    getPrice(product){
        if(!product || !this.props.currency) return false;
        const {prices} = product;
        const price = prices.find(price => price.currency.label === this.props.currency.label);
        return price;
    }

    setAttribute = (e, attr) => {
        let attributes = this.state.selected_attr;
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
        this.setState({
            selected_attr: attributes
        })
    }

    addToCart(product){
        const cartProduct = {...product, selected_attr: this.state.selected_attr, qnt: 1}
        this.props.addToCart(cartProduct);
    }
    
    
    render(){
        const product = this.getProduct();
        const price = this.getPrice(product);
        const productDetails = product ? ( 
            <div className="product-details">
                <h2 className="f-semiBold f-30 brand">{product.brand}</h2>
                <h3 className="ttl f-30">{product.name}</h3>
                <Attributes 
                    attributes={product.attributes} 
                    type='normal' 
                    selected_attr={this.state.selected_attr}
                    setAttribute={this.setAttribute}/>
               {price ? (
                   <div className="price">
                        <span className='f-bold f-18'>price:</span>
                        <span className='f-bold f-24'>{price.currency.label} {price.amount}</span>
                    </div>
               ) : ''}
                <button className="f-semiBold green-btn" onClick={() => this.addToCart(product)}>
                    <span>add to cart</span>
                </button>
                <div className="text" dangerouslySetInnerHTML={{__html: product.description}}></div>
            </div>
        ) : 'Product not exist';

        return(
            <div className="product-page">
                <div className="container">
                    <div className="product-page-inner">
                        <Gallery slides={product.gallery} altText={product.name}/>
                        {productDetails} 
                    </div>
                </div>
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
       addToCart: (product) => dispatch({type: 'ADD_TO_CART', product})
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.data.categories,
        currency: state.currency.current_currency,
    }
}
 
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))
