import { Navbar, Welcome, Dock } from "#components";
import { WindowProvider } from "#context/WindowContext";

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