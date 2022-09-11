import * as React from 'react';
import axios from 'axios';
import MUIModal from '@mui/material/Modal';
import ReactPlayer from 'react-player/lazy';
import {
  XMarkIcon,
  PlayIcon,
  PlusIcon,
  PauseIcon,
} from '@heroicons/react/24/solid';
import {
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentMovieState, modalState } from '../atoms';
import { Element, Genre } from '../utils';

export const Modal: React.FC = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const selectedMovie = useRecoilValue(currentMovieState);
  const [trailer, setTrailer] = React.useState('');
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const handleOnClose = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    if (!selectedMovie) {
      return;
    }

    const fetchMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${
          selectedMovie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${selectedMovie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      );

      if (data?.videos) {
        const index = data.videos.results.findIndex((elem: Element) => {
          return elem.type === 'Trailer';
        });

        setTrailer(data.videos.results[index]?.key);

        if (data?.genres) {
          setGenres(data.genres);
        }
      }
    };

    fetchMovie();
  }, [selectedMovie]);

  return (
    <MUIModal
      open={showModal}
      onClose={handleOnClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleOnClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing={isPlaying}
            muted={isMuted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
              >
                {isPlaying ? (
                  <>
                    <PauseIcon className="h-7 w-7 text-black" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-7 w-7 text-black" />
                    Play
                  </>
                )}
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {selectedMovie?.vote_average || 0 * 10}% Match
              </p>
              <p className="font-light">
                {selectedMovie?.release_date || selectedMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{selectedMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>
                <div>
                  <span className="text-[gray]">Original language: </span>
                  {selectedMovie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {selectedMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MUIModal>
  );
};
