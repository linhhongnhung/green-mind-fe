import Link from "next/link"
import SocialNetwork from "./SocialNetwork"
import FooterLink from "./FooterLink"

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary">
            <div className="max-w-[1440px]
                            px-24 pt-14 mx-auto
                            md:text-tiny
                            flex justify-between
                            max-lg:px-12
                            max-md:flex-col
                            max-sm:px-6">

                <div className="flex flex-col">
                    <Link href="/">
                        <img src="./img/GREENMIND.svg" alt="GREENMIND" />
                    </Link>
                    <p className="text-gray md:max-w-[189px] my-6 max-sm:my-4">We help you find your dream plant</p>
                    <div className="flex gap-6">
                        {
                            socialNetworks.map((socialNetwork, index) => {
                                return <SocialNetwork
                                    key={index}
                                    name={socialNetwork.name}
                                    icon={socialNetwork.icon}
                                    href={socialNetwork.href} />
                            })
                        }
                    </div>
                </div>

                <div className="flex gap-6
                                max-md:mt-12
                                max-sm:flex-col max-sm:gap-5">
                    {
                        footerLinks.map((footerLinkItem, index) => {
                            return <FooterLink key={index}
                                title={footerLinkItem.title}
                                items={footerLinkItem.items}
                            />
                        })
                    }
                </div>
            </div>
            <p className="max-w-[1440px] mt-[98px] pb-12 mx-auto px-24 text-gray md:text-tiny
                          max-lg:px-12
                          max-sm:px-6 max-sm:mt-12">
                2023 all Right Reserved Term of use GREENMIND
            </p>
        </footer>
    )
}

export default Footer

const socialNetworks = [
    {
        name: "Facebook",
        icon: "./icon/Facebook.svg",
        href: "https://www.facebook.com"
    },
    {
        name: "Instagram",
        icon: "./icon/Instagram.svg",
        href: "https://www.instagram.com"
    },
    {
        name: "Twitter",
        icon: "./icon/Twitter.svg",
        href: "https://www.twitter.com"
    }
]

const footerLinks = [
    {
        title: "Information",
        items: [
            {
                name: "About",
                href: "/"
            },
            {
                name: "Product",
                href: "/"
            },
            {
                name: "Blog",
                href: "/"
            }
        ]

    },
    {
        title: "Company",
        items: [
            {
                name: "Community",
                href: "/"
            },
            {
                name: "Career",
                href: "/"
            },
            {
                name: "Our story",
                href: "/"
            }
        ]

    },
    {
        title: "Contact",
        items: [
            {
                name: "Getting Started",
                href: "/"
            },
            {
                name: "Pricing",
                href: "/"
            },
            {
                name: "Resources",
                href: "/"
            }
        ]

    }
]