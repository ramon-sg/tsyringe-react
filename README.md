# Tsyringe React

A way to implement tsyringe together with react hooks, use it if you need dependency injection without interfaces or with a small container.

## Installation

First you have to [install](https://github.com/microsoft/tsyringe#installation) tsyringe

- `npm install --save tsyringe-react`
- `yarn add tsyringe-react`

## ´withInjection´ helper

A helper for register the function with the token and wrap the function with a `container.resolver`.

1. Wrap React hook with ´withInjection´ helper.

   ```ts
   // use-calc.ts
   import { withInjection } 'tsyringe-react'

   const useCalc = (n1: number, n2: number): number => {
     return n1 + n2;
   }

   export default withInjection('useCalc', useCalc) // add withInjection

   ```

2. Use the wrapped hook

   ```tsx
   // CalcCard.tsx
   import useCalc from 'use-calc';
   import { FC } from 'react';
   import { useResolve } from 'tsyringe-react';

   type CalcCardProps = {
     number1: number;
     number2: number;
   };

   const CalcCard: FC<CalcCardProps> = ({ number1, number2 }) => {
     const result = useCalc(number1, number2);

     return <div>Result : {result}</div>;
   };

   export default Calc;
   ```

3. inject mock in tests

```tsx
// Calc.test.tsx
import { render, screen } from '@testing-library/react';
import CalcCard from 'CalcCard';

test('should render result', () => {
  const number1 = 1;
  const number2 = 2;
  const result = 3;

  const mockUseCalc = jest.fn(() => result);

  // inject mock
  container.register('useCalc', {
    useValue: mockUseCalc,
  });

  const { container } = render(
    <CalcCard number1={number1} number2={number2} />
  );

  expect(container).toHaveTextContent('Result : 3');
  expect(mockUseCalc).toBeCalledWith(number1, number2);
});
```

## `useResolve` hook

1.- create container

```ts
// it is very important that the container import it from `tsyringe-react`
import { container } from 'tsyringe-react';
import { API_TOKEN } from 'constants';

container.register(API_TOKEN, { useFactory: () => process.env.API_TOKEN });
```

2.- create some class

```ts
// get-user.service.ts
import { User } from './user.entity';
import { injectable } from 'tsyringe-react';

@injectable
export class GetUserService {
  perform(apiToken: string): User {
    //...
  }
}
```

3.- Use `useResolve` hook

```tsx
// UserCard.tsx
import { API_TOKEN } from './constants';
import { GetUserService } from './get-user.service';

const UserCard: FC<CalcCardProps> = ({ number1, number2 }) => {
  // The token can be a string
  const apiToken = useResolve<string>(API_TOKEN);

  // The token can be a class, in which case `useResolve` returns an instance of that class
  const getUserService = useResolve<string>(API_TOKEN);

  const user = getUserService.perform(apiToken);

  return <div>user name : {user.name}</div>;
};

export default UserCard;
```

3. inject mock in tests

Note: in order not to conflict with the types, I use [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) to create the service mock

```tsx
// UserCard.test.tsx
import { mock } from 'jest-mock-extended';
import { render, screen } from '@testing-library/react';
import { API_TOKEN } from './constants';
import { GetUserService } from './get-user.service';

import UserCard from './UserCard';

test('should render user name', () => {
  const apiToken = '123';
  const user = new User('user one');
  const mockGetUserService = mock<GetUserService>();

  mockGetUserService.perform.mockReturnValue(user);

  // inject mocks
  container.register(API_TOKEN, { useValue: apiToken });
  container.register(GetUserService, { useValue: mockGetUserService });

  const { container } = render(<UserCard />);

  expect(container).toHaveTextContent('user name : user one);
  expect(mockGetUserService.perform).toBeCalledWith(apiToken);
});
```

## Example project

You can see an example of a next project in the `example` directory

```bash
git clone git@github.com:ramon-sg/tsyringe-react.git
cd tsyringe-react/example
yarn install
yarn dev

// open http://localhost:3000
```

## TODO

- [ ] Improve the example project with more tests
- [ ] A better RADME
- [ ] a better english :(
