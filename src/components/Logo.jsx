import React from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/logo.png';

export default function Logo({ className }) {
  return (
    <img
      className={`${className}`}
      src={logo}
      alt="The Alpha Project"
    />
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: 'alpha-logo',
};
