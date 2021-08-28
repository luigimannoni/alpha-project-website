import React from 'react';
import { Helmet } from 'react-helmet';
import { Root, Routes, addPrefetchExcludes } from 'react-static';
import { Router } from './components/Router';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BackgroundContainer from './containers/BackgroundContainer';

// Styles
import './app.scss';

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['install']);

export default function App() {
  return (
    <Root>
      <Helmet>
        <meta charSet="utf-8" />
        <title>The Alpha Project</title>
      </Helmet>
      <Hero />
      <Navigation />
      <BackgroundContainer>
        <div className="content">
          <React.Suspense fallback={<em>Loading</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
      </BackgroundContainer>
    </Root>
  );
}
