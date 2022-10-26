/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { container, useResolve } from '../src';

describe('useResolve', () => {
  const token = 'some-token';
  const term = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
    container.clearInstances();
  });

  describe('when the term is registered', () => {
    beforeEach(() => {
      container.register(token, { useValue: term });
    });

    test('should return string', () => {
      const { result } = renderHook(() => useResolve<Function>(token));

      expect(result.current).toEqual(term);
    });
  });

  describe('when the term is not registered', () => {
    test('should throw Error', () => {
      expect(() => {
        renderHook(() => useResolve<Function>(token));
      }).toThrow(
        'Attempted to resolve unregistered dependency token: "some-token"'
      );
    });
  });
});
