/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

interface PlayerSelectionProps {
  onStart: (usernames: string[]) => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [usernames, setUsernames] = useState(['', '']);

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlayerCount = parseInt(e.target.value, 10);
    setPlayerCount(newPlayerCount);
    setUsernames(Array(newPlayerCount).fill(''));
  };

  const handleUsernameChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newUsernames = [...usernames];
    newUsernames[index] = e.target.value;
    setUsernames(newUsernames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(usernames);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-2/3 space-y-4 px-10 md:w-1/2 lg:md:w-1/2 xl:w-1/3 2xl:w-1/4"
      >
        <div>
          <label
            htmlFor="playerCount"
            className="block text-sm font-medium text-gray-700 "
          >
            Number of Players:
          </label>
          <select
            id="playerCount"
            className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={playerCount}
            onChange={handlePlayerCountChange}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {usernames.map((username, index) => (
          <div key={index}>
            <label
              htmlFor={`username${index}`}
              className="block text-sm font-medium text-gray-700"
            >
              Username {index + 1}:
            </label>
            <input
              id={`username${index}`}
              type="text"
              className="mt-1 block w-full border border-gray-300 bg-white px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => handleUsernameChange(index, e)}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="animate__animated animate__rubberBand w-full rounded-md bg-teal-600 px-4 py-2 text-white focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerSelection;
