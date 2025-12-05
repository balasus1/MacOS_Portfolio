import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { locations } from '#constants';

const DEFAULT_LOCATION = locations.work;
const useLocationStore = create(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    navigationHistory: [DEFAULT_LOCATION],
    historyIndex: 0,
    viewMode: 'grid', // 'grid' or 'list'
    setActiveLocation: (location = null) => set((state) => {
      const newLocation = location || DEFAULT_LOCATION;
      // If navigating to a new location, add to history
      if (newLocation.id !== state.activeLocation?.id) {
        // Remove any forward history if we're navigating to a new location
        state.navigationHistory = state.navigationHistory.slice(0, state.historyIndex + 1);
        state.navigationHistory.push(newLocation);
        state.historyIndex = state.navigationHistory.length - 1;
      }
      state.activeLocation = newLocation;
    }),
    goBack: () => set((state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.activeLocation = state.navigationHistory[state.historyIndex];
      }
    }),
    goForward: () => set((state) => {
      if (state.historyIndex < state.navigationHistory.length - 1) {
        state.historyIndex++;
        state.activeLocation = state.navigationHistory[state.historyIndex];
      }
    }),
    setViewMode: (mode) => set((state) => {
      state.viewMode = mode;
    }),
    resetActiveLocation: () => set((state) => {
      state.activeLocation = DEFAULT_LOCATION;
      state.navigationHistory = [DEFAULT_LOCATION];
      state.historyIndex = 0;
    }),
  })),
);

export default useLocationStore;