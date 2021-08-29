import React from 'react';
import MarkdownPage from '../containers/MarkdownPage';

import { react as MdInstall, attributes } from '../content/install.md';

export default function InstallPage() {
  return (
    <MarkdownPage title={attributes.title}>
      <MdInstall />
    </MarkdownPage>
  );
}
