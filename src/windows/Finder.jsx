import { Search, ChevronLeft, ChevronRight, Grid3x3, List } from 'lucide-react';
import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import { locations } from '#constants';
import useLocationStore from '#store/location';
import clsx from 'clsx';
import useWindowStore from '#store/window';

const Finder = () => {
  const {
    activeLocation,
    setActiveLocation,
    goBack,
    goForward,
    navigationHistory,
    historyIndex,
    viewMode,
    setViewMode,
  } = useLocationStore();
  const { openWindow } = useWindowStore();
  const sidebarSections = [
    { name: 'Favorites', items: Object.values(locations) },
    { name: 'Workspace', items: locations.work.children },
  ];

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < navigationHistory.length - 1;

  const openItem = (item) => {
    if (!item) return;

    if (item.fileType === 'pdf') {
      return openWindow('resume');
    }
    if (item.kind === 'folder') {
      return setActiveLocation(item);
    }
    if (['url', 'img'].includes(item.fileType) && item.href) {
      try {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } catch (error) {
        console.error('Failed to open link:', error);
      }
      return;
    }
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <div className="flex items-center gap-2 ml-4">
          <button
            type="button"
            onClick={goBack}
            disabled={!canGoBack}
            className={clsx(
              'p-1 rounded hover:bg-gray-200 transition-colors',
              !canGoBack && 'opacity-40 cursor-not-allowed'
            )}
            aria-label="Go back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goForward}
            disabled={!canGoForward}
            className={clsx(
              'p-1 rounded hover:bg-gray-200 transition-colors',
              !canGoForward && 'opacity-40 cursor-not-allowed'
            )}
            aria-label="Go forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <h2 className="flex-1 text-left font-semibold text-sm text-gray-700">
          {activeLocation?.name || 'Finder'}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={clsx(
              'p-1 rounded hover:bg-gray-200 transition-colors',
              viewMode === 'grid' && 'bg-gray-200'
            )}
            aria-label="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={clsx(
              'p-1 rounded hover:bg-gray-200 transition-colors',
              viewMode === 'list' && 'bg-gray-200'
            )}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <Search className="icon ml-2" />
        </div>
      </div>
      <div className="bg-white flex h-full">
        <div className="sidebar">
          {sidebarSections.map(({ name, items }) => (
            <LocationList
              key={name}
              locationName={name}
              items={items}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          ))}
        </div>
        <div className={clsx('content', viewMode === 'list' && 'list-view')}>
          {activeLocation?.children?.map((item) => (
            <div
              key={item.id}
              className={clsx('finder-item', viewMode === 'list' && 'list-item')}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const LocationList = ({
  locationName,
  items,
  activeLocation,
  setActiveLocation,
}) => (
  <div>
    <h3>{locationName}</h3>
    <ul>
      {items.map((location) => (
        <li
          key={location.id}
          onClick={() => setActiveLocation(location)}
          className={clsx(
            activeLocation && location.id === activeLocation.id
              ? 'active'
              : 'not-active'
          )}
        >
          <img src={location.icon} alt={location.name} className="w-4" />
          <p className="text-sm font-medium truncate">{location.name}</p>
        </li>
      ))}
    </ul>
  </div>
);

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
