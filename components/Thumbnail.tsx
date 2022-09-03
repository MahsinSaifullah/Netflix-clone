import * as React from 'react';
import Image from 'next/image';

import { Movie } from '../utils';
import { thumbnailBaseUrl } from '../constants';

interface ThumbnailProps {
  movie: Movie;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`${thumbnailBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};
