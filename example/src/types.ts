export type CharactersData = {
  info: CharactersInfo;
  results: CharacterData[];
};

export type CharactersInfo = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type CharacterData = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown',
}

type Location = {
  name: string;
  url: string;
};

enum Species {
  Alien = 'Alien',
  Human = 'Human',
}

enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}
