import React from 'react';
import { array, func } from 'prop-types';
import './Table.css';

const Table = ({ currencies, renderPercentChange }) => {
  return (
    <div className="Table-container">
      <table className="Table">
        <thead className="Table-head">
          <tr>
            <th>Cryptocurrency</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24H Change</th>
          </tr>
        </thead>
        <tbody className="Table-body">
          {currencies.length > 0 ? (
            currencies.map(currency => (
              <tr key={currency.id}>
                <td>
                  <span className="Table-rank">{currency.rank}</span>
                  {currency.name}
                </td>
                <td>
                  <span className="Table-dollar">$ </span>
                  {currency.price}
                </td>
                <td>
                  <span className="Table-dollar">$ </span>
                  {currency.marketCap}
                </td>
                <td>{renderPercentChange(currency.percentChange24h)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td align="center" colSpan="4">
                Something has gone wrong. Please try again.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  currencies: array,
  renderPercentChange: func
};

export default Table;
