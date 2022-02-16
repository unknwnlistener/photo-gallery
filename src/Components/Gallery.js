import React, { useState } from "react";
import { ref, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../config";

export const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  const listRef = ref(storage);

  const getFromFirebase = () => {
    listAll(listRef)
      .then((res) => {
        setAllImages([]);
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setAllImages((allImages) => [...allImages, url]);
          });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      <button onClick={() => getFromFirebase()}>
        Get Images from Firebase
      </button>
      <div id="photos">
        {allImages &&
          allImages.map((image) => {
            return (
              <div key={image} className="image">
                <img src={image} alt="" />
                <button onClick={() => deleteFromFirebase(image)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
