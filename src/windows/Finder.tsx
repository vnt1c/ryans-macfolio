import { WindowControls } from "#components"
import { useLocationContext } from "#context/LocationContext"
import type { LocationItem } from "#context/LocationContext"
import WindowWrapper from "#hoc/WindowWrapper"
import { Search } from "lucide-react"
import { locations } from "#constants/index";
import clsx from "clsx";
import { useWindowContext } from "#context/WindowContext";

const Finder = () => {
  const { openWindow } = useWindowContext();
  const { activeLocation, setActiveLocation } = useLocationContext();

  const openItem = (item: LocationItem): void => {
    if (item.fileType === 'pdf') {
      openWindow("resume");
      return;
    }
    if (item.kind === 'folder') {
      setActiveLocation(item);
      return;
    }
    if (["fig", "url"].includes(item.fileType ?? "") && item.href) {
      window.open(item.href, "_blank");
    }
    openWindow(`${item.fileType}${item.kind}` as any, item);
  };

  const renderList = (header: string, items: LocationItem[]) => (
    <div>
      <h3>{header}</h3>
        <ul>
            {items.map((item) => (
              <li
                className={clsx(item.id === activeLocation.id ? 'active' : 'not-active')}
                key={item.id}
                onClick={() => setActiveLocation(item)}
              >
                <img src={item.icon} className="w-4" alt={item.name} />
                <p className="text-sm font-medium truncate">{item.name}</p>
              </li>
            ))}
        </ul>
    </div>
  )


  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList('Favorites', Object.values(locations) as LocationItem[])}
          {renderList('Work', locations.work.children as LocationItem[])}
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li key={item.id} className={item.position} onClick={() => openItem(item)}>
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;