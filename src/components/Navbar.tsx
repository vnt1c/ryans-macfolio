import dayjs from "dayjs";

import { navLinks, navIcons } from "#constants/index";

const Navbar = () => {
  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold">Ryan's Portfolio</p>

            <ul>
                {navLinks.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map((icon) => (
                    <li key={icon.id}>
                        <img src={icon.img} className="icon-hover" 
                        alt={`icon-${icon.id}`} />
                    </li>
                ))}
            </ul>

            <time style={{ display: 'flex', gap: '0.5rem' }}>
                <span>{dayjs().format('ddd MMM D')}</span>
                <span>{dayjs().format('h:mm A')}</span>
            </time>
        </div>
    </nav>
  )
}

export default Navbar