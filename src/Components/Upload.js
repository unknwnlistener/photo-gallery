import React, { useState } from "react";
import { storage } from "../config.js";
import { ref, uploadBytes } from "firebase/storage";

export const Upload = () => {
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

  return (
    <div className="upload__section">
      <header className="App-header">Photo Gallery</header>
      <input
        type="file"
        accept="image/x-png,image/jpeg"
        onChange={(e) => onImageChange(e)}
      />
      <button onClick={() => uploadToFirebase()}>Upload to Firebase</button>
    </div>
  );
};
