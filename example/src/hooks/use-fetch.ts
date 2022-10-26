import { useEffect, useState } from 'react';
import { container } from 'tsyringe';
import fetch from 'unfetch';

import { GenericFunction, withInjection } from '../../../dist';

export const useFetch = <Data = any>(url: string) => {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};

export function withInjection2<
  T extends GenericFunction,
  Params extends any[] = Parameters<T>,
  Return = ReturnType<T>
>(token: string, fn: T, register: boolean = true) {
  if (register) {
    console.log('register', token);
    container.register(token, { useValue: fn });
  }

  const wrapper = (...params: Params): Return => {
    console.log(`${token} is registered? ${container.isRegistered(token)}`);

    if (!container.isRegistered(token)) return fn(...params);

    const resolvedFn = container.resolve<T>(token);

    return resolvedFn(...params);
  };

  return wrapper as T;
}

export default withInjection('useFetch', useFetch);
