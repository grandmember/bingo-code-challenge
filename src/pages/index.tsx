/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable tailwindcss/no-custom-classname */
import 'animate.css';

import { useState } from 'react';

import BingoApp from '@/components/BingoApp';
import { Typography } from '@/components/Typography';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { GameContext } from '@/utils/contexts';

const Index = () => {
  const [gameState, setGameState] = useState<boolean>(false);
  const [game, setGame] = useState<any>(null);

  return (
    <GameContext.Provider value={{ gameState, setGameState, game, setGame }}>
      <Main
        meta={
          <Meta title="Next.js Boilerplate" description="Next js Boilerplate" />
        }
      >
        <div className="flex flex-col items-center">
          <Typography
            className="animate__animated animate__tada sm:flex md:flex lg:flex"
            variant="h2"
          >
            Conference Bingo
          </Typography>

          <BingoApp />
          {gameState === true && <YoutubeEmbed embedId={['aX9H5-i4Kek']} />}
        </div>
      </Main>
    </GameContext.Provider>
  );
};

export default Index;
