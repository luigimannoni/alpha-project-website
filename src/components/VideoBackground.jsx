import React from 'react';

import mp4 from '../assets/login-screen.mp4';

export default function VideoBackground() {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={mp4} />
      </video>
    </div>
  );
}
