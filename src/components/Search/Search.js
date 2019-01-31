import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { API_URL } from '../../config';
import './Search.css';

class Search extends Component {
  state = {
    query: '',
    loading: false,
    searchResults: []
  };

  handleInputChange = async event => {
    const query = event.target.value;

    if (!query) {
      return '';
    }

    this.setState({
      loading: true,
      query
    });

    await axios
      .get(`${API_URL}/autocomplete?searchQuery=${query}`)
      .then(({ data: searchResults }) => {
        this.setState({ searchResults });
      })
      .catch(err => {
        console.warn(err);
        return { data: {} };
      });
    this.setState({
      loading: false
    });
  };

  handleRedirect = currencyId => {
    this.setState({
      query: '',
      searchResults: []
    });

    this.props.history.push(`/currency/${currencyId}`);
  };

  renderSearchResults = () => {
    const { searchResults, query } = this.state;

    if (!query) {
      return '';
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="Search-result-container">
        <div className="Search-no-result">No results found.</div>
      </div>
    );
  };

  render() {
    const { loading, query } = this.state;
    return (
      <div className="Search">
        <span className="Search-icon" />
        <input
          className="Search-input"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Search for currency..."
          value={query}
        />

        {loading && (
          <div className="Search-loading">
            <GridLoader color={'#ffffff'} size={4} />
          </div>
        )}

        {this.renderSearchResults()}
      </div>
    );
  }
}

export default withRouter(Search);
