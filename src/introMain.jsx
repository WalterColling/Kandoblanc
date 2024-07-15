import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Intro from "./Intro";
import Loading from "./components/html/Loading";
import LoadingContext from "./components/LoadingContext";
import IntroCopy from "./components/html/IntroCopy";

import MobileScroll from "./components/html/MobileScroll";

const Root = () => {
  const [objectLoaded, setObjectLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ objectLoaded, setObjectLoaded }}>
      <Intro />
    </LoadingContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
