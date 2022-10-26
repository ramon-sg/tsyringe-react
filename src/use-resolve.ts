import { InjectionToken, container } from './container';
import { GenericClass } from './types';

/**
 * Resolve a token into an instance
 *
 * @see {@link https://github.com/Microsoft/tsyringe#resolution}
 *
 * @param token — The dependency token or Class
 * @return — An instance of the dependency
 * @example
 * ´´´tsx
 *  const apiKey = useResolve<string>(API_KEY);
 *  const instance = useResolve(Service);
 * ´´´
 */
export const useResolve = <T>(
  token: InjectionToken<T> | GenericClass<T>
): T => {
  const instance = container.resolve<T>(token);
  return instance;
};
