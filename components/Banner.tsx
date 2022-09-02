import * as React from 'react';
import Image from 'next/image';
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/24/solid';

import { Movie } from '../utils';
import { baseUrl } from '../constants';

interface BannerProps {
  netflixOriginals: Movie[];
}
export const Banner: React.FC<BannerProps> = ({ netflixOriginals }) => {
  const [currentMovie, setCurrentMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    setCurrentMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${
            currentMovie?.backdrop_path || currentMovie?.poster_path
          }`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {currentMovie?.title ||
          currentMovie?.name ||
          currentMovie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {currentMovie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70">
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};
