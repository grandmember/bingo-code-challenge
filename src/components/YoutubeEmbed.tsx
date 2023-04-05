/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import 'animate.css';

import React from 'react';

interface YoutubeEmbedProps {
  embedId: string[];
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => (
  <div className="video-responsive animate__animated animate__tada animate__infinite mt-10">
    <iframe
      width="400vw"
      height="400vh"
      src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      autoFocus={true}
    />
  </div>
);

export default YoutubeEmbed;
