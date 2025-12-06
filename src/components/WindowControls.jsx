import useWindowStore from '#store/window';

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  return (
    <div className="window-controls">
      <button
        type="button"
        className="close"
        onClick={() => closeWindow(target)}
        aria-label="Close window"
      />
      <button
        type="button"
        className="minimize"
        onClick={() => minimizeWindow(target)}
        aria-label="Minimize window"
      />
      <button
        type="button"
        className="maximize"
        onClick={() => maximizeWindow(target)}
        aria-label="Maximize window"
      />
    </div>
  );
};

export default WindowControls;