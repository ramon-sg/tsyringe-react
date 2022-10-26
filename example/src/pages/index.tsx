import type { NextPage } from 'next';
import Head from 'next/head';

import CharactersList from '../components/CharactersList';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Example</title>
      </Head>

      <div className="mx-10 my-10 bg-gray-300 rounded-md p-4">
        <code>
          <CharactersList />
        </code>
      </div>
    </div>
  );
};

export default Home;
