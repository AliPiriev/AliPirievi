import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

class Carrency extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    state = {
        currencies: [],
        active: false
    }
    handleClick = (currency) => {
        this.props.setCurrency(currency);
        this.props.changePriceCurrency(currency);
        this.toggle();
    }
    toggle = () => {
        this.setState({
            active: !this.state.active
        })
    }
    componentDidMount() {
        this.getData();
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                active: false
            })
        }
    }
    getData() {
        const client = new ApolloClient({
            uri: 'http://localhost:4000/',
            cache: new InMemoryCache()
        });
        const query = gql`
            query {
                currencies{
                    label
                    symbol
                }
            }
        `;
        client.query({
            query: query,
        }).then(result => {
            this.setState({
                currencies: result.data.currencies
            })
            this.props.setCurrency(result.data.currencies[0])
        }).catch(e => {
            console.log(e)
        });
    }
    render() {
        const currencies = this.state.currencies;
        const currencyList = currencies.length ? (
            currencies.map(currency => {
                return (
                    <li key={currency.label} onClick={() => this.handleClick(currency)}>
                        <span className='f-medium f-18' >{currency.symbol}</span>
                        <span className='f-medium f-18' >{currency.label}</span>
                    </li>
                )
            })
        ) : '';
        return (
            <div className={`carrencies ${this.state.active ? "active" : ""}`} ref={this.wrapperRef}>
                <div className="top" onClick={this.toggle}>
                    <div className="f-medium f-18 current-currency" >
                        {this.props.current_currency ? (this.props.current_currency.symbol) : ''}
                    </div>
                    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.5L4 3.5L7 0.5" stroke="black" />
                    </svg>
                </div>
                <ul className='currencies-wrap'>
                    {currencyList}
                </ul>
            </div>
        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency: (currency) => dispatch({ type: 'SET_CURRENCY', currency }),
        changePriceCurrency: (currency) => dispatch({ type: 'CHANE_CURRENCY', currency })
    }
}


const mapStateToProps = (state) => {
    return {
        current_currency: state.currency.current_currency
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Carrency);
