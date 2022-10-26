/**
 * @jest-environment jsdom
 */

import { container } from '../../../dist';

import { render, screen } from '@testing-library/react';
import { mockFn } from 'jest-mock-extended';

import useFetchCharacters from '../hooks/use-fetch-characters';
import CharactersList from './CharactersList';
import { Character } from '../entities/character';

describe('CharactersList', () => {
  const error = new Error('some error');
  const defaultResult = { loading: false, error: null, characters: null };

  const character1 = new Character(1, 'Rick Sanchez', '/assets/image1.jpeg');
  const character2 = new Character(2, 'Morty Smith', '/assets/image2.jpeg');

  const characters = [character1, character2];

  const mockUseFetchCharacters = mockFn<typeof useFetchCharacters>();

  beforeEach(() => {
    mockUseFetchCharacters.mockReturnValue(defaultResult);

    container.register('useFetchCharacters', {
      useValue: mockUseFetchCharacters,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    container.clearInstances();
  });

  describe('when the characters are loaded', () => {
    beforeEach(() => {
      mockUseFetchCharacters.mockReturnValue({ ...defaultResult, characters });
    });

    test('should render the characters', () => {
      const { container } = render(<CharactersList />);

      expect(container).toHaveTextContent(character1.name);
      expect(container).toHaveTextContent(character2.name);
    });
  });

  describe('when something goes wrong', () => {
    beforeEach(() => {
      mockUseFetchCharacters.mockReturnValue({ ...defaultResult, error });
    });

    test('should render error message', () => {
      render(<CharactersList />);

      expect(screen.getByRole('alert')).toHaveTextContent(error.message);
    });
  });

  describe('when loading is true', () => {
    beforeEach(() => {
      mockUseFetchCharacters.mockReturnValue({
        ...defaultResult,
        loading: true,
      });
    });

    test('should render loading message', () => {
      render(<CharactersList />);

      expect(screen.getByRole('dialog')).toHaveTextContent('Loading...');
    });
  });
});
