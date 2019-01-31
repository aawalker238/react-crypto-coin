import React from 'react';
export const renderPercentChange = percent => {
  if (percent > 0) {
    return <span className="percent-raised">{percent}% &uarr;</span>;
  } else if (percent < 0) {
    return <span className="percent-fallen">{percent}% &uarr;</span>;
  } else {
    return <span>{percent}</span>;
  }
};
