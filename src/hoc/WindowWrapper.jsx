import { useRef, useLayoutEffect, useEffect } from 'react';
import useWindowStore from '#store/window.js';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const window = windows[windowKey];
    const { isOpen = false, zIndex = 1000 } = window || {};
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      const animation = gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      return () => animation.kill();
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;
      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) { return () => {} }
      if (!window) {
        el.style.display = 'none';
        return;
      }
      el.style.display = isOpen ? 'block' : 'none';
    }, [isOpen, window]);

    useEffect(() => {
      if (!window) {
        console.error(`Window key "${windowKey}" does not exist in windows store`);
      }
    }, [window]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute resize"
      >
        {window && <Component {...props} />}
      </section>
    );
  };
  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || 'Component'
  })`;

  return Wrapped;
};

export default WindowWrapper;
