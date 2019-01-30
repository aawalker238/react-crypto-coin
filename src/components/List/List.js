import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { GridLoader } from 'react-spinners';
import { API_URL } from '../../config';
import Table from '../Table/Table';

const spinnerStyles = `
  position: absolute;
  top: 40vh;
  left: 40vw;
`;

class List extends Component {
  state = {
    loading: false,
    currencies: [],
    error: null
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
    const { data } = await axios
      .get(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
      .catch(err => {
        console.warn(err);
        return { data: {} };
      });
    console.log('hello data:', data);
    this.setState({
      currencies: data.currencies || this.state.currencies,
      loading: false
    });
  }

  renderPercentChange = percent => {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>;
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &uarr;</span>;
    } else {
      return <span>{percent}</span>;
    }
  };

  render() {
    const { loading, currencies } = this.state;
    return (
      <Fragment>
        {loading && (
          <GridLoader color={'#ffffff'} size={50} css={spinnerStyles} />
        )}
        <Table
          currencies={currencies}
          renderPercentChange={this.renderPercentChange}
        />
      </Fragment>
    );
  }
}

export default List;
