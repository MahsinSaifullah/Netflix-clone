import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        {/* Banner */}
        <section>{/* movies ribbon */}</section>
      </main>
      {/* Movies Detail Modal */}
    </div>
  );
};

export default Home;
