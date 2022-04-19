import React, {Component} from 'react'
import { connect } from 'react-redux'
import ProductItem from '../components/ProductItem';
import withRouter from '../hoc/withRouter';

class Products extends Component{
    getProducts(){
        const {categories} = this.props;
        const category = categories.find(cat => cat.name === this.props.router.params.cat_id);
        return category;
    } 
    
    render(){
        const category =  this.getProducts();
        const products =  category.products;
        const currency = this.props.current_currency;
        const productList = products && currency ? (products.map(function(product){
            return (
                <ProductItem product={product} currency={currency} key={product.id}/>
            )
        })) : '';
        return(
            <div className="products-page">
                <div className="container">
                    <h1 className='f-42 title'>{category.name}</h1>
                    <div className="product-list">
                        {productList}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        current_currency: state.currency.current_currency,
        categories: state.data.categories
    }
}



export default  withRouter(connect(mapStateToProps)(Products))