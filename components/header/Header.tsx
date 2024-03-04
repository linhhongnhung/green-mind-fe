import TabItem from "./TabItem";
import TabIcon from "./TabIcon";
import Link from "next/link";
import { useCheckAuth } from "../authentication/AuthContext";
import { Button } from "..";
import { useState } from "react";
import TabMenu from "./TabMenu";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const currentURL = router.asPath;
  let hrefToPublic = ".";
  if (currentURL.split("/").length - 1 === 2) {
    hrefToPublic = "..";
  }

  const logoHref = `${hrefToPublic}/img/GREENMIND.svg`;

  const tabList = [
    {
      tabName: "Home",
      tabLink: "/",
    },
    {
      tabName: "Explore",
      tabLink: "/products",
    },
  ];

  const tabIconList = [
    {
      iconSrc: `${hrefToPublic}/icon/Cart.svg`,
      href: "/cart",
    },
    {
      iconSrc: `${hrefToPublic}/icon/History.svg`,
      href: "/history",
    },
    {
      iconSrc: `${hrefToPublic}/icon/Account.svg`,
      href: "/account",
    },
  ];

  const tabMenuList = [
    {
      name: "Home",
      href: "/cart",
    },
    {
      name: "Explore",
      href: "/products",
    },
    {
      name: "Cart",
      href: "/cart",
    },
    {
      name: "History",
      href: "/history",
    },
    {
      name: "Account",
      href: "/account",
    },
  ];

  const user = useCheckAuth();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (menuOpen && user) {
    return (
      <header
        className="
            bg-white drop-shadow-md
            sticky top-0 z-[1]"
      >
        <div
          className="
            px-6 py-[44px] mx-auto
            flex flex-col
            text-gray"
          onClick={handleMenu}
        >
          <Link href="/">
            <img src={logoHref} alt="GREENMIND logo" />
          </Link>
        </div>
        <div
          className="
            min-h-[1024px]
            py-[34px] mx-auto
            bg-primary
            flex flex-col
            text-gray"
          onClick={handleMenu}
        >
          <div className="flex flex-col">
            {tabMenuList.map((tab, index) => {
              return <TabMenu key={index} name={tab.name} href={tab.href} />;
            })}
            <div
              className="
                py-4 px-8
                hover:bg-white hover:text-black
                transition duration-100"
            >
              Back
            </div>
          </div>
        </div>
      </header>
    );
  } else if (menuOpen && !user) {
    return (
      <header
        className="
            bg-white drop-shadow-md
            sticky top-0 z-[1]"
      >
        <div
          className="
            px-6 py-[44px] mx-auto
            flex flex-col
            text-gray"
          onClick={handleMenu}
        >
          <Link href="/">
            <img src={logoHref} alt="GREENMIND logo" />
          </Link>
        </div>
        <div
          className="
            min-h-[1024px]
            py-[34px] mx-auto
            bg-primary
            flex flex-col
            text-gray"
          onClick={handleMenu}
        >
          <div className="flex flex-col">
            <TabMenu name="Home" href="/" />
            <TabMenu name="Explore" href="/products" />
            <TabMenu name="Login" href="/login" />
            <div
              className="
                py-4 px-8
                hover:bg-white hover:text-black
                transition duration-100"
            >
              Back
            </div>
          </div>
        </div>
      </header>
    );
  } else if (!menuOpen && !user) {
    return (
      <header
        className="
            max-h-[126px]
            bg-white drop-shadow-md
            sticky top-0 z-[1]"
      >
        <div
          className="
            max-w-[1440px]
            px-24 py-[44px]
            mx-auto
            flex justify-betwee
            text-gray
            max-md:px-6"
        >
          <Link href="/" className="mr-24 my-auto max-md:mr-0">
            <img src={logoHref} alt="GREENMIND logo" />
          </Link>
          <div className="flex justify-between w-[1010px] max-md:hidden">
            <div className="flex my-auto">
              {tabList.map((tab, index) => {
                return (
                  <TabItem
                    key={index}
                    tabName={tab.tabName}
                    tabLink={tab.tabLink}
                  />
                );
              })}
            </div>
            <div className="flex">
              {tabIconList.map((tab, index) => {
                return (
                  <TabIcon key={index} iconSrc={tab.iconSrc} href={tab.href} />
                );
              })}
              <div className="text-black ml-16">
                <Button key={0} href="/login" text="Login" onClick={() => {}} />
              </div>
            </div>
          </div>

          {/* Responsive mobile */}
          <div className="flex md:hidden max-md:w-[200px]">
            <div className="flex md:hidden ml-auto">
              <div
                className="
                    ml-[50px] my-auto
                    hover:opacity-70
                    transition duration-100"
                onClick={handleMenu}
              >
                <img src="./icon/FilterRight.svg" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header
        className="
            max-h-[126px]
            bg-white drop-shadow-md
            sticky top-0 z-[1]"
      >
        <div
          className="
            max-w-[1440px]
            px-24 py-[44px]
            mx-auto
            flex justify-between
            text-gray
            max-md:px-6"
        >
          <Link href="/" className="mr-24 my-auto max-md:mr-0">
            <img src={logoHref} alt="GREENMIND logo" />
          </Link>
          <div className="flex justify-between w-[1010px] max-md:hidden">
            <div className="flex">
              {tabList.map((tab, index) => {
                return (
                  <TabItem
                    key={index}
                    tabName={tab.tabName}
                    tabLink={tab.tabLink}
                  />
                );
              })}
            </div>
            <div className="flex">
              {tabIconList.map((tab, index) => {
                return (
                  <TabIcon key={index} iconSrc={tab.iconSrc} href={tab.href} />
                );
              })}
            </div>
          </div>

          {/* Responsive mobile */}
          <div className="flex md:hidden max-md:w-[200px]">
            <div className="flex md:hidden ml-auto">
              <div
                className="
                    ml-[50px] my-auto
                    hover:opacity-70
                    transition duration-100"
                onClick={handleMenu}
              >
                <img src={`${hrefToPublic}/icon/FilterRight.svg`} alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
