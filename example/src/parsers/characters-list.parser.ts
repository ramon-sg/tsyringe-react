import { autoInjectable } from 'tsyringe';

import { CharacterParser } from './character.parser';
import { CharacterData } from '../types';
import { Character } from '../entities/character';

@autoInjectable()
export class CharactersListParser {
  constructor(private characterParser: CharacterParser) {}

  parse(dataList: CharacterData[] | undefined): Character[] {
    if (!dataList) return [];

    return dataList.map((data) => this.characterParser.parse(data));
  }
}
