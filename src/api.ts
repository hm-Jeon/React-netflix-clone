const API_KEY = "45752647e93c37993f110ad7ea4cee48";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getNowPlayingMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
  ).json();
}

export async function getPopularMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
  ).json();
}

export async function getTopRatedMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1&region=kr`
    )
  ).json();
}
