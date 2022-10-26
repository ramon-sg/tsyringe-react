import { autoInjectable } from '../../../dist';
import { Character } from '../entities/character';

import { CharacterData } from '../types';

@autoInjectable()
export class CharacterParser {
  parse({ id, name, image }: CharacterData): Character {
    const character = new Character(id, name, image);

    return character;
  }
}
