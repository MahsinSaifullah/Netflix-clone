import { DocumentData } from 'firebase/firestore';
import { atom } from 'recoil';
import { Movie } from '../utils';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const currentMovieState = atom<Movie | DocumentData | null>({
  key: 'currentMovieState',
  default: null,
});
