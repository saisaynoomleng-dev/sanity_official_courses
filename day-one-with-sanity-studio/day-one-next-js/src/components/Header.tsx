import NavLink from "./NavLink"

type NavLinkProp = {
    name: string
    url: string
}


const Header = () => {
    const navLinks: NavLinkProp[] = [
        { name: 'Home', url: '/' },
        { name: 'Artists', url: '/artist' },
        { name: 'Events', url: '/events' }
    ]
    return (
        <header className="container mx-auto flex my-4 justify-between items-center">
            <h1 className="font-bold text-2xl">LiveEvents.com </h1>

            {navLinks.map((link: NavLinkProp) => (
                <NavLink key={link.name} name={link.name} url={link.url} />
            ))}

        </header>
    )
}

export default Header