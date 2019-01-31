import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { API_URL, spinnerStyles } from '../../config';
import Table from '../Table/Table';
import Pagination from '../Pagination/Pagination';

class List extends Component {
  state = {
    loading: false,
    currencies: [],
    error: null,
    totalPages: 0,
    page: 1
  };

  async componentDidMount() {
    await this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    this.setState({
      loading: true
    });
    const { currencies, page } = this.state;
    const { data } = await axios
      .get(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .catch(err => {
        console.warn(err);
        return { data: {} };
      });
    this.setState({
      currencies: data.currencies || currencies,
      loading: false,
      totalPages: data.totalPages
    });
  };

  handlePaginationClick = async direction => {
    let nextPage = this.state.page;
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;
    console.log('nextPage:', nextPage);
    this.setState(
      {
        page: nextPage
      },
      () => this.fetchCurrencies()
    );
  };

  render() {
    const { loading, currencies, totalPages, page } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <GridLoader color={'#ffffff'} size={50} css={spinnerStyles} />
        </div>
      );
    }
    return (
      <Fragment>
        <Table currencies={currencies} loading={loading} />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </Fragment>
    );
  }
}

export default List;
