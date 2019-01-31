import React, { Component } from 'react';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { API_URL, spinnerStyles } from '../../config';
import { renderPercentChange } from '../../helpers';
import './CoinDetail.css';

class CoinDetail extends Component {
  state = {
    currency: {},
    loading: false,
    error: false
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const coinId = this.props.match.params.id;
    this.fetchCurrency(coinId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const newCurrencyId = nextProps.match.params.id;
      this.fetchCurrency(newCurrencyId);
    }
  }

  fetchCurrency = async currencyId => {
    const { data: currency } = await axios
      .get(`${API_URL}/cryptocurrencies/${currencyId}`)
      .catch(err => {
        console.warn(err);
        this.setState({
          error: true,
          loading: false
        });
        return { data: {} };
      });
    this.setState({ loading: false, currency });
  };

  render() {
    const { loading, error, currency } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <GridLoader color={'#ffffff'} size={50} css={spinnerStyles} />
        </div>
      );
    }

    if (error) {
      return <div className="error">Not data found. Please try again.</div>;
    }
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} {currency.symbol}
        </h1>
        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            24H Change{' '}
            <span className="Detail-value">
              {renderPercentChange(currency.percentChange24h)}
            </span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market Cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">24H Volume</span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Total Supply</span>
            {currency.totalSupply}
          </div>
        </div>
      </div>
    );
  }
}

export default CoinDetail;
