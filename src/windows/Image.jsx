import { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import useWindowStore from '#store/window';
import { ImageOff } from 'lucide-react';

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;
  const [imageError, setImageError] = useState(false);

  if (!data) {
    return null;
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data.name}</p>
      </div>
      <div className="preview p-2 bg-gray-200 max-h-[70vh] overflow-auto">
        {data.imageUrl && !imageError ? (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-fit object-contain object-center"
            onError={() => {
              console.error('Error loading image');
              setImageError(true);
            }}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500">
            <ImageOff className="w-12 h-12 mb-2" />
            <p className="text-sm">Failed to load image</p>
            <p className="text-xs text-gray-400 mt-1">{data.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;

