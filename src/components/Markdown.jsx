import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

export default function Markdown({ file }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    async function getMD() {
      const module = await import(`../content/${file}.md`);
      const {data} = await axios.get(module.default);
      setMarkdown(data);
    }
    getMD();
  }, [file]);

  return (
    // <p>{markdown}</p>
    <ReactMarkdown>{markdown}</ReactMarkdown>
  );
}

Markdown.propTypes = {
  file: PropTypes.string.isRequired,
};
