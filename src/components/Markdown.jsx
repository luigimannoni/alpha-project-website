import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

export default function Markdown({ file }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [file]);

  return (
    <ReactMarkdown>{markdown}</ReactMarkdown>
  );
}

Markdown.propTypes = {
  file: PropTypes.string.isRequired,
};
