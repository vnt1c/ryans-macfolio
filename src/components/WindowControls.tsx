
import { useWindowContext } from "#context/WindowContext";
import type { WindowKey } from "#constants/index";

interface WindowControlsProps {
  target: WindowKey;
}

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowContext();
  // You can use closeWindow(target) when needed
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;