import React, { FC } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

type props = {
  imageGallery: string[];
};

export const ImageGalleryComponent: FC<props> = ({ imageGallery }) => {
  return (
    <div className="w-full max-w-screen-lg overflow-hidden mx-auto bg-gray-50  h-auto">
      <ReactImageGallery
        showBullets={false}
        showFullscreenButton={false}
        showNav={false}
        slideOnThumbnailOver={true}
        showPlayButton={false}
        showThumbnails={imageGallery.length > 1}
        items={imageGallery.map((img) => ({
          original: img,
          thumbnail: img,
        }))}
        additionalClass="custom-image-gallery" // Apply custom class
      />
    </div>
  );
};
