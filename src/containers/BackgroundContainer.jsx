import React from 'react';
import PropTypes from 'prop-types';

export default function BackgroundContainer({ children }) {
  return (
    <section className="image-background py-6">
      {children || null}
    </section>
  );
}

BackgroundContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
