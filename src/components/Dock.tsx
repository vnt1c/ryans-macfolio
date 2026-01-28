import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { dockApps } from "#constants";
import { useWindowContext } from "#context/WindowContext";
import type { WindowKey, WindowState } from "#constants/index.js"

const Dock = () => {
  const { windows, openWindow, closeWindow } = useWindowContext();
  const dockRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX : number) => {
        const { left } = dock.getBoundingClientRect();

        icons.forEach((icon) => {
            const { left: iconLeft, width } = icon.getBoundingClientRect();
            const center = iconLeft - left + width / 2;
            const distance = Math.abs(mouseX - center);
            const intensity = Math.exp(-(distance ** 2.5) / 20000);

            gsap.to(icon, {
                scale: 1 + 0.25 * intensity,
                y: -15 * intensity,
                duration: 0.2,
                ease: "power1.out",
            });
        });
    };

    const handleMouseMove = (e : MouseEvent) => {
        const { left } = dock.getBoundingClientRect();

        animateIcons(e.clientX - left);
    }

    const resetIcons = () => {
        icons.forEach((icon) => gsap.to(icon, {
            scale: 1, y: 0, duration: 0.3, ease: 'power1.out',
        }))
    }

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', resetIcons);

    return () => {
        dock.removeEventListener('mousemove', handleMouseMove);
        dock.removeEventListener('mouseleave', resetIcons);
    }
  }, []);

  const toggleApp = (app: { id: WindowKey; canOpen: boolean }) => {
    if (!app.canOpen) return;

    const window: WindowState = windows[app.id];

    // Couldn't fetch window
    if (!window) {
      console.error(`Window not found for app ${app.id}.`);
      return;
    }

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }

    console.log(windows);
  }

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={0}
              disabled={!canOpen}
              onClick={() => toggleApp({ id: id as WindowKey, canOpen })}
            >
              <img src={`/images/${icon}`} alt={name} loading="lazy" className={canOpen ? "" : "opacity-60"}/>
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock 