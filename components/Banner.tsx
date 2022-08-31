import * as React from 'react';

import { Movie } from '../utils';

interface BannerProps {
  netflixOriginals: Movie[];
}
export const Banner: React.FC<BannerProps> = () => {
  return <div>Banner</div>;
};
