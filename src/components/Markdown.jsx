import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Markdown({ file }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    async function getMD() {
      const {react} = await import(`../content/${file}.md`);
      setMarkdown(react);
    }
    getMD();
  }, [file]);

  return (
    <>{markdown}</>
  );
}

Markdown.propTypes = {
  file: PropTypes.string.isRequired,
};
