import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ObjectPage from "./ObjectPage";
import Loading from "./components/html/Loading";
import LoadingContext from "./components/LoadingContext";
import ScrollTestComponent from "./components/ScrollTestComponent";

const Root = () => {
  const [objectLoaded, setObjectLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ objectLoaded, setObjectLoaded }}>
      <Loading />
      <ObjectPage />
    </LoadingContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
