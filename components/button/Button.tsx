import React, { MouseEventHandler } from "react"
import Link from "next/link"

interface ButtonProps {
    href: string;
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { href, text, onClick } = props
    return (
        <Link href={href}>
            <button className="w-[168px] h-[50px] rounded-[8px]
                                           bg-primary
                                           md:text-tiny
                                           relative
                                           hover:brightness-[0.6] transition delay-100 duration-300
                                           max-md:w-[132px] max-md:h-[44px]"
                    onClick={onClick}>
                {text}
            </button>
        </Link>
    )
}

export default Button