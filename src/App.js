import React, { useState } from "react";
import { Gallery } from "./components/Gallery";
import { Upload } from "./components/Upload";

import "./styles/main.css";

function App() {
  const [allImages, setAllImages] = useState([]);

  return (
    <div className="App">
      <Upload allImages={allImages} setAllImages={setAllImages}></Upload>
      <Gallery allImages={allImages} setAllImages={setAllImages}></Gallery>
    </div>
  );
}

export default App;
