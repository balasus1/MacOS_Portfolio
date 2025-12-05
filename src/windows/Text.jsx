import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import useWindowStore from '#store/window';

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) {
    return null;
  }

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>
      <div className="text-content p-6 overflow-auto">
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="w-full max-w-md mx-auto mb-6 rounded-lg"
            onError={(e) => {
              console.error('Error loading image:', data.image);
              e.target.style.display = 'none';
            }}
            loading="lazy"
          />
        )}
        {data.subtitle && (
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {data.subtitle}
          </h3>
        )}
        {data.description && Array.isArray(data.description) && (
          <div className="space-y-4">
            {data.description.map((paragraph, index) => (
              <p
                key={`${data.name}-paragraph-${index}`}
                className="text-gray-700 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;

