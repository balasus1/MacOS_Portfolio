import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { INITIAL_Z_INDEX,WINDOW_CONFIG } from '#constants';

const validateWindowKey = (windows, windowKey) => {
  if (!windows || !Object.prototype.hasOwnProperty.call(windows, windowKey)) {
    console.error(`Window key "${windowKey}" does not exist`);
    return false;
  }
  return true;
};

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey, data = null) =>
      set((state) => {
        if (!validateWindowKey(state.windows, windowKey)) return;
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        if (!validateWindowKey(state.windows, windowKey)) return;
        const win = state.windows[windowKey];
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        if (!validateWindowKey(state.windows, windowKey)) return;
        const win = state.windows[windowKey];
        win.zIndex = state.nextZIndex++;
      }),
    minimizeWindow: (windowKey) =>
      set((state) => {
        if (!validateWindowKey(state.windows, windowKey)) return;
        const win = state.windows[windowKey];
        win.isOpen = false;
      }),
    maximizeWindow: (windowKey) =>
      set((state) => {
        if (!validateWindowKey(state.windows, windowKey)) return;
        const win = state.windows[windowKey];
        win.isOpen = true;
        win.zIndex = state.nextZIndex++;
      }),
  })),
);

export default useWindowStore;