import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
import { socials } from "#constants/index"

const Contact = () => {
  return <>
    <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
    </div>

    <div className="p-5 space-y-5">
        <img src="/images/ryan.jpeg" alt="ryan" className="w-20 h-20 rounded-full" />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech?</p>
        <p>ryanhung111@gmail.com</p>

        <ul>
            {socials.map(({ id, bg, link, icon, text}) => (
                <li key={id} style={{backgroundColor: bg}}>
                    <a href={link} target="_blank" >
                        <img src={icon} alt={text} className="size-5" />
                        <p>{text}</p>
                    </a>
                </li>
            ))}
        </ul>
    </div>
  </>
}

const ContactWindow = WindowWrapper(Contact, 'contact')

export default ContactWindow;