import React, { useState } from "react";
import delIcon from "../assets/trash.svg";

export const ImageBlock = ({ image, deleteFn }) => {
  const [isLoaded, setLoaded] = useState(false);

  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <>
      <img
        src={image}
        alt=""
        className="image__block"
        onLoad={() => handleImageLoaded()}
      />
      {isLoaded && (
        <img
          className="button-delete"
          onClick={() => deleteFn(image)}
          src={delIcon}
          alt="Delete icon"
        />
      )}
    </>
  );
};
