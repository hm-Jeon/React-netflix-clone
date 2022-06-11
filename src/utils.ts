const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p";
export const DEFAULT_BACKDROP_PATH = "qD7QAWEi5mUPyrhwWHoh9qfOliG.jpg";

export type imageFormat = "w200" | "w500" | "original";

export function makeImagePath(id: string, format?: imageFormat) {
  return `${IMAGE_BASE_PATH}/${format ? format : "original"}/${id}`;
}

export const QUERY_SLIDERNAME = "sliderName";
export const QUERY_ID = "id";
