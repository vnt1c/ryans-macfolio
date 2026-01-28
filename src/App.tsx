import { Navbar, Welcome, Dock } from "#components";
import { WindowProvider } from "#context/WindowContext";
import gsap from "gsap/dist/gsap";
import Draggable from "gsap/dist/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <WindowProvider>
      <main>
        <Navbar />
        <Welcome />
        <Dock />
      </main>
    </WindowProvider>
  )
}

export default App