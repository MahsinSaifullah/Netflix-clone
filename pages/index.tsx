import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';

import { Header, Banner } from '../components';
import { requestUrls, Movie } from '../utils';

interface HomeProps {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}
const Home: NextPage<HomeProps> = ({ netflixOriginals }) => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section>{/* movies ribbon */}</section>
      </main>
      {/* Movies Detail Modal */}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requestUrls.netflixOriginals).then((res) => res.json()),
    fetch(requestUrls.trending).then((res) => res.json()),
    fetch(requestUrls.topRated).then((res) => res.json()),
    fetch(requestUrls.actionMovies).then((res) => res.json()),
    fetch(requestUrls.comedyMovies).then((res) => res.json()),
    fetch(requestUrls.horrorMovies).then((res) => res.json()),
    fetch(requestUrls.romanceMovies).then((res) => res.json()),
    fetch(requestUrls.documentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
