import gsap from "gsap/dist/gsap";
import Draggable from "gsap/dist/Draggable";

import { Navbar, Welcome, Dock } from "#components";
import { Terminal } from "#windows";
import { WindowProvider } from "#context/WindowContext";
 
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <WindowProvider>
      <main>
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
      </main>
    </WindowProvider>
  )
}

export default App