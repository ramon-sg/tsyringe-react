import { container, withInjection } from '../src';

describe('withInjection', () => {
  const fn = (n1: number, n2: number) => n1 + n2;

  let token: string;

  afterEach(() => {
    token = randomToken();
  });

  afterEach(() => {
    jest.resetAllMocks();
    container.clearInstances();
  });

  test('should return a wrapped function', () => {
    const wrappedFn = withInjection(token, fn);

    expect(wrappedFn(1, 2)).toEqual(3);
  });

  test('should register function', () => {
    withInjection(token, fn);

    expect(container.isRegistered(token)).toBe(true);
  });

  describe('when register is `false`', () => {
    test("shouldn't register the function", () => {
      withInjection(token, fn, false); // register = false;

      expect(container.isRegistered(token)).toBe(false);
    });
  });
});

function randomToken() {
  return Math.random().toString(36).substr(2, 5);
}
