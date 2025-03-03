import React, { useState, useEffect } from "react";
const ImageUploader = ({ fieldName, onImageChange, images }) => {
  const [imageData, setImageData] = useState({ images: [], previews: [] });
  useEffect(() => {
    if (images && images.length > 0) {
      setImageData({
        images: images,
        previews: images.map((image) => URL.createObjectURL(image)), 
      });
    }
  }, [images]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [];
    const updatedPreviews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} is not an image. Please select a valid image.`);
        continue;
      }
      updatedImages.push(file); 
      updatedPreviews.push(URL.createObjectURL(file)); 
      if (updatedImages.length === files.length) {
        setImageData((prevState) => {
          const newData = {
            ...prevState,
            images: [...prevState.images, ...updatedImages],
            previews: [...prevState.previews, ...updatedPreviews],
          };
          if (onImageChange) {
            onImageChange(fieldName, newData.images); 
          }

          return newData;
        });
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImageData((prevState) => {
      const newData = { ...prevState };
      const newImages = newData.images.filter((_, i) => i !== index);
      const newPreviews = newData.previews.filter((_, i) => i !== index);

      newData.images = newImages;
      newData.previews = newPreviews;
      if (onImageChange) {
        onImageChange(fieldName, newImages);
      }

      return newData;
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <label htmlFor={`file-input-${fieldName}`} className="block">
        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-green-500">
          <span className="text-gray-500">Click to upload {fieldName}</span>
        </div>
      </label>
      <input
        id={`file-input-${fieldName}`}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="mt-6 grid grid-cols-3 gap-4">
        {imageData.previews.map((preview, index) => (
          <div key={index} className="relative group overflow-hidden rounded-md shadow-md">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-24 object-cover"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
