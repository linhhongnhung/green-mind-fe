import React from 'react'
import Link from 'next/link'

interface TabMenuProps {
    name: string
    href: string
}

const TabMenu: React.FC<TabMenuProps> = (props) => {
    const { name, href } = props
    return (
        <Link 
            className="py-4 px-8
                       hover:bg-white hover:text-black
                       transition duration-100"
            href={href}>{name}
        </Link>
    )
}

export default TabMenu