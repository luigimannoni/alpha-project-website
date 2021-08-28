import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function Markdown({ file }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    async function getMD() {
      const text = await axios.get(file);
      setMarkdown(text);
    }
    getMD();
  }, [file]);

  return (
    <ReactMarkdown>{markdown}</ReactMarkdown>
  );
}

Markdown.propTypes = {
  file: PropTypes.string.isRequired,
};
