import React, { Component } from 'react';
import { connect } from 'react-redux'
 
class Carrency extends Component {
    getAdditionalCurrencies(){
        if(!this.props.current_currency) return false;
        const {currencies} = this.props;
        const addCurrencies = currencies.filter(currency => currency.label !== this.props.current_currency.label);
        return addCurrencies;
    }
    handleClick = (currency) => {
        this.props.setCurrency(currency);
    }
    componentDidMount(){
        this.props.setCurrency(this.props.currencies[0])
    }
    render() {        
        const currencies  = this.getAdditionalCurrencies();
        const currencyList = currencies.length ? (
            currencies.map(currency => {
              return (
                <li className='f-medium f-18' key={currency.label} onClick={() => this.handleClick(currency)}>{currency.symbol}</li>
              )
            })
        ) : '';
        return (
            <div className="carrencies">
                <div className="f-medium f-18 current-currency">
                    {this.props.current_currency ? (this.props.current_currency.symbol) : ''}
                </div>
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.5L4 3.5L7 0.5" stroke="black"/>
                </svg>

                <ul className='currencies-wrap'>
                    {currencyList}
                </ul>
            </div>
        );

    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
       setCurrency: (currency) => dispatch({type: 'SET_CURRENCY', currency})
    }
}


const mapStateToProps = (state) => {
    return {
        currencies: state.data.currencies,
        current_currency: state.currency.current_currency
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Carrency);
