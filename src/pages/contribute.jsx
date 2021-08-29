import React from 'react';
import MarkdownPage from '../containers/MarkdownPage';

import { react as MdContribute, attributes } from '../content/contribute.md';

export default function ContributePage() {
  return (
    <MarkdownPage title={attributes.title}>
      <MdContribute />
    </MarkdownPage>
  );
}
