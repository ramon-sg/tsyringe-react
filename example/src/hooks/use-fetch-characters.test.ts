/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { mock, mockFn } from 'jest-mock-extended';

import { CharactersListParser } from '../parsers/characters-list.parser';
import useFetchCharacters from './use-fetch-characters';
import { CHARACTERS_URL } from '../constants';
import { Character } from '../entities/character';
import { container } from '../../../dist';
import useFetch from './use-fetch';

describe('useFetchCharacters', () => {
  const error = new Error('some error');
  const data = { results: [] };

  const character1 = new Character(1, 'Rick Sanchez', '/assets/image1.jpeg');
  const character2 = new Character(2, 'Morty Smith', '/assets/image2.jpeg');

  const parsedCharacters = [character1, character2];

  // Mocks
  const mockUseFetch = mockFn<typeof useFetch>();
  const mockCaracterListParser = mock<CharactersListParser>();

  beforeEach(() => {
    // default returns
    mockUseFetch.mockReturnValue({ error: null, data: null, loading: false });
    mockCaracterListParser.parse.mockReturnValue([]);

    container.register('useFetch', { useValue: mockUseFetch });
    container.registerInstance(CharactersListParser, mockCaracterListParser);
  });

  afterEach(() => {
    jest.resetAllMocks();
    container.clearInstances();
  });

  test('should fetch url', () => {
    renderHook(() => useFetchCharacters());

    expect(mockUseFetch).toBeCalledWith(CHARACTERS_URL);
  });

  describe('when fetch fail', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({ error, data: null, loading: false });
    });

    test('should return error', () => {
      const { result } = renderHook(() => useFetchCharacters());

      expect(result.current.error).toEqual(error);
      expect(result.current.characters).toBeNull();
    });
  });

  describe('when fetch is successful', () => {
    beforeEach(() => {
      mockUseFetch.mockReturnValue({ data, error: null, loading: false });
      mockCaracterListParser.parse.mockReturnValue(parsedCharacters);
    });

    test('should return parsed characters', () => {
      const { result } = renderHook(() => useFetchCharacters());

      expect(result.current.characters).toEqual(parsedCharacters);
    });
  });
});
