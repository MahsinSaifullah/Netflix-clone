import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import { Movie } from '../utils';
import { Thumbnail } from './Thumbnail';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}
export const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = React.useState(false);

  const handleChevronClick = (chevronType: 'left' | 'right') => {
    setHasScrolled(true);

    if (rowRef.current) {
      rowRef.current.scrollTo({
        left:
          rowRef.current.scrollLeft +
          (chevronType === 'left'
            ? -rowRef.current.clientWidth
            : rowRef.current.clientWidth),
        behavior: 'smooth',
      });
    }
  };

  React.useEffect(() => {
    const scrollListener: any = rowRef.current?.addEventListener(
      'scroll',
      () => {
        if (!rowRef.current) {
          return;
        }
        if (rowRef.current.scrollLeft <= 0) {
          setHasScrolled(false);
        } else {
          setHasScrolled(true);
        }
      }
    );

    return () => {
      scrollListener?.removeEventListener('scroll');
    };
  }, [rowRef.current]);

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleChevronClick('left')}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !hasScrolled && 'hidden'
          }`}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => {
            return <Thumbnail key={movie.id} movie={movie} />;
          })}
        </div>
        <ChevronRightIcon
          onClick={() => handleChevronClick('right')}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};
