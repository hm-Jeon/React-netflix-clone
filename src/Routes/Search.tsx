import { useLocation } from "react-router-dom";

function Search() {
  // URLSearchParams: URL string에서 parameter값을 parsing해준다. get() 함수를 이용한다.
  const keyword = new URLSearchParams(useLocation().search).get("keyword");
  console.log(keyword);
  return null;
}

export default Search;
