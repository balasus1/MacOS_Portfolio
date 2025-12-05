import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import useWindowStore from '#store/window';

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

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
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-full h-fit object-contain object-center"
            onError={(e) => {
              console.error('Error loading image:', data.imageUrl);
              e.target.style.display = 'none';
            }}
            loading="lazy"
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;

