import Link from "next/link"

interface SocialNetworkProps {
    name: string
    icon: string
    href: string
}

const SocialNetwork: React.FC<SocialNetworkProps> = (props) => {
    const { icon, href, name } = props
    return (
        <Link href={href} passHref rel="noopener noreferrer" target="_blank"
            className="w-12 h-12
                       rounded-full border-gray border
                       flex
                       hover:bg-primary hover:brightness-90 transition duration-200">
            <img className="m-auto" src={icon} alt={name} />
        </Link>
    )
}

export default SocialNetwork