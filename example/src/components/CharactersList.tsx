import { FC } from 'react';
import useFetchCharacters from '../hooks/use-fetch-characters';
import CharacterCard from './CharacterCard';

const CharactersList: FC = () => {
  const { characters, error, loading } = useFetchCharacters();

  if (error)
    return (
      <p role="alert" className="text-red-600">
        {error.message}
      </p>
    );
  if (loading) return <p role="dialog">Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {characters?.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharactersList;
