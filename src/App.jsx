import React from 'react';
import { Root, Routes } from 'react-static';
import { Router } from './components/Router';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BackgroundContainer from './containers/BackgroundContainer';

// Styles
import './app.scss';

function App() {
  return (
    <Root>
      <Hero />
      <Navigation />
      <BackgroundContainer>
        <div className="content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
      </BackgroundContainer>
    </Root>
  );
}

export default App;
