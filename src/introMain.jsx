import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Intro from "./Intro";
import Loading from "./components/html/Loading";
import LoadingContext from "./components/LoadingContext";
import IntroCopy from "./components/html/IntroCopy";
import SimpleComponent from "./components/simpleComponent";
import IntroCopy2 from "./components/html/IntroCopy2";

const Root = () => {
  const [objectLoaded, setObjectLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ objectLoaded, setObjectLoaded }}>
      <IntroCopy />
      <Loading />
      <Intro />
      <SimpleComponent />
    </LoadingContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
