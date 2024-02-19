import React from 'react'
import Link from 'next/link';

interface TabItemProps {
    tabName: string
    tabLink: string
}

const TabItem: React.FC<TabItemProps> = (props) => {
    const { tabName, tabLink } = props
    return (
        <Link href={tabLink}
            className="mr-12
                       text-tiny
                       hover:text-black
                       transition delay-100 duration-100">
            {tabName}
        </Link>
    )
}

export default TabItem