import React, { useState } from "react";
import { storage } from "../config.js";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

export const Upload = ({ allImages, setAllImages }) => {
  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const uploadToFirebase = () => {
    if (image) {
      console.log("Name: ", storage);
      const imageRef = ref(storage, image.name);
      uploadBytes(imageRef, image).then((snapshot) => {
        alert("Image uploaded successfully to Firebase");
      });
    } else {
      alert("Please upload an image first");
    }
  };

  const getFromFirebase = () => {
    let listRef = ref(storage);
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

  return (
    <div className="main">
      <header className="App__header">Photo Gallery</header>
      <div className="controls">
        <input
          id="upload"
          type="file"
          accept="image/x-png,image/jpeg"
          onChange={(e) => onImageChange(e)}
        />
        <button onClick={() => uploadToFirebase()}>Upload to Firebase</button>
        <button onClick={() => getFromFirebase()}>
          Get Images from Firebase
        </button>
      </div>
    </div>
  );
};
