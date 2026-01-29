import { locations } from "#constants"
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/dist/Draggable";
import { useWindowContext } from "#context/WindowContext";
import { useLocationContext } from "#context/LocationContext";
import type { LocationItem } from "#context/LocationContext";

const projects: LocationItem[] = locations.work?.children ?? [];

const Home = () => {
  const { setActiveLocation } = useLocationContext();
  const { openWindow } = useWindowContext();

  const handleOpenProjectFinder = (project: LocationItem) => {
    setActiveLocation(project)
    openWindow("finder");
  }

  useGSAP(() => {
    Draggable.create('.folder');
  }, [])

  return (
    <section id="home">
        <ul>
            {projects.map((project: LocationItem) => (
                <li
                  key={project.id}
                  className={clsx("group folder", project.windowPosition)}
                  onClick={() => handleOpenProjectFinder(project)}
                >
                  <img src="/images/folder.png" alt={project.name} />
                  <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home