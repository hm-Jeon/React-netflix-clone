const IMAGE_BASE_PATH = "https://image.tmdb.org/t/p";
export const DEFAULT_IMAGE =
  "https://www.mth.co.kr/wp-content/uploads/2014/12/default-placeholder.png";

export type imageFormat = "w200" | "w500" | "original";

export function makeImagePath(id: string, format?: imageFormat) {
  return `${IMAGE_BASE_PATH}/${format ? format : "original"}/${id}`;
}

export const QUERY_SLIDERNAME = "sliderName";
export const QUERY_ID = "id";
