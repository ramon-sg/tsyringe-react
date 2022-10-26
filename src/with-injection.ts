import { container } from './container';
import { GenericFunction } from './types';

/**
 * A helper for register the `fn` with the `token` and wrap the `fn` with a `useResolve`.
 *
 * If a function registered with the `token` is not found, the original
 * function (`fn`) is returned.
 *
 * @see {@link https://github.com/Microsoft/tsyringe#registry}
 * @see {@link https://github.com/Microsoft/tsyringe#resolution}
 *
 * @param {string} token - name used to resolve the injection
 * @param {Function} fn - injectable function
 * @param {boolean} register - indicates if it is necessary to register the ´fn´, by default it is ´true´
 * @returns {Function} a new function wrapped with `container.resolve`
 * @example
 * ```tsx
 * import { withInjection } from '@/di/helpers'
 *
 * const useSomeFunction = () => {
 *   return 'some text'
 * }
 *
 * export default useInjection('useSomeFunction', useSomeFunction)
 * ```
 */
export function withInjection<
  T extends GenericFunction,
  Params extends any[] = Parameters<T>,
  Return = ReturnType<T>
>(token: string, fn: T, register: boolean = true) {
  if (register) container.register(token, { useFactory: () => fn });

  const wrapper = (...params: Params): Return => {
    if (!container.isRegistered(token)) return fn(...params);

    const resolvedFn = container.resolve<T>(token);
    return resolvedFn(...params);
  };

  return wrapper as T;
}
