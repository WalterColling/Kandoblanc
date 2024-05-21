import { createContext } from "react";

const LoadingContext = createContext({
  objectLoaded: false,
  setObjectLoaded: () => {},
});

export default LoadingContext;
