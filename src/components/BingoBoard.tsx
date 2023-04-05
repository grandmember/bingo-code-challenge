// import React, { useEffect, useState } from 'react';

// import { generateBingoCards } from '@/helpers/generateBingoCards';
// import { phrases } from '@/helpers/phrases';

// import BingoCard from './BingoCard';

// const BingoBoard: React.FC = () => {
//   const [cardPhrases, setCardPhrases] = useState<string[][]>([]);
//   // const defaultNumberOfPlayers = 2;
//   // const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
//   //   defaultNumberOfPlayers
//   // ); // Change the number of players/boards as needed

//   useEffect(() => {
//     const generatedCards = generateBingoCards(2, phrases); // Change the number of players/boards as needed
//     setCardPhrases(generatedCards);
//   }, []);

//   return (
//     <div className="flex justify-center">
//       <div className="justify-self-auto rounded-2xl bg-black shadow-2xl">
//         {cardPhrases.map((tempPhrases, index) => (
//           <BingoCard key={index} bingoCells={tempPhrases.} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BingoBoard;
