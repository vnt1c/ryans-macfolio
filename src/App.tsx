import gsap from "gsap/dist/gsap";
import Draggable from "gsap/dist/Draggable";

import { Navbar, Welcome, Dock, Home } from "#components";
import { Finder, Resume, Safari, Terminal, Text, Contact } from "#windows";
import { WindowProvider } from "#context/WindowContext";
import { LocationProvider } from "#context/LocationContext";
 
gsap.registerPlugin(Draggable);


const App = () => {
  return (
    <LocationProvider>
      <WindowProvider>
        <main>
          <Navbar />
          <Welcome />
          <Dock />

          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Text />
          <Contact />
          <Home />
        </main>
      </WindowProvider>
    </LocationProvider>
  );
}

export default App