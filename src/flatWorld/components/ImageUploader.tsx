import React, { useState } from 'react';

const ImageUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && <img src={imageSrc} alt="Uploaded Preview" style={{ width: '300px', height: 'auto' }} />}
    </div>
  );
};

export default ImageUploader;
