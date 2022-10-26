import Image from 'next/image';
import { FC } from 'react';
import { Character } from '../entities/character';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="bg-orange-500  p-2 relative flex justify-center">
      <Image src={character.imageUrl} alt={`image ${character.name}`} />
      <div className="w-full h-10 absolute px-4 bottom-6 rotate-2">
        <div className="bg-white animate-bounce border-8 border-l-cyan-500 border-t-violet-500 border-r-teal-600 border-b-pink-500 px-2 py-1 text-sm">
          {character.name}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
