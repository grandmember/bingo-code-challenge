export const generateBingoCards = (players: number, phrases: Set<string>) => {
  const cardPhrases: string[][] = [];

  Array(players)
    .fill(0)
    .forEach(() => {
      const shuffledPhrases = [...Array.from(phrases)].sort(
        () => 0.5 - Math.random()
      );
      const card = shuffledPhrases.slice(0, 25);
      cardPhrases.push(card);
    });

  return cardPhrases;
};
