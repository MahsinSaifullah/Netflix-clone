import * as React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';

import { Movie } from '../utils';
import { thumbnailBaseUrl } from '../constants';
import { currentMovieState, modalState } from '../atoms';

interface ThumbnailProps {
  movie: Movie;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
  const setShowModal = useSetRecoilState(modalState);
  const setSelectedMovie = useSetRecoilState(currentMovieState);
  return (
    <div
      onClick={() => {
        setSelectedMovie(movie);
        setShowModal(true);
      }}
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`${thumbnailBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  );
};
