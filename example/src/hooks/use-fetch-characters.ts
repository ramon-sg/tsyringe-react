import { withInjection, useResolve } from '../../../dist';

import { CharactersListParser } from '../parsers/characters-list.parser';
import { CharactersData } from '../types';
import { CHARACTERS_URL } from '../constants';
import useFetch from './use-fetch';

const useFetchCharacters = () => {
  const charactersListParser = useResolve(CharactersListParser);
  const { data, error, loading } = useFetch<CharactersData>(CHARACTERS_URL);

  const characters = !error ? charactersListParser.parse(data?.results) : null;

  return {
    characters,
    loading,
    error,
  };
};

export default withInjection('useFetchCharacters', useFetchCharacters);
