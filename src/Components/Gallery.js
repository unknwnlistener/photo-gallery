import React from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../config";
import { ImageBlock } from "./ImageBlock";

import "../styles/gallery.css";

export const Gallery = ({ allImages, setAllImages }) => {
  const deleteFromFirebase = (imageUrl) => {
    let imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        setAllImages(allImages.filter((image) => image !== imageUrl));
        alert("Deleted successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="gallery">
      <div className="gallery__container" id="photos">
        {allImages &&
          allImages.map((image) => {
            return (
              <div key={image} className="image">
                <ImageBlock image={image} deleteFn={deleteFromFirebase} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
