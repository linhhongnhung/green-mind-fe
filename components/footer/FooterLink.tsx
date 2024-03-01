import Link from "next/link";

interface FooterLinkProps {
  title: string;
  items: keyable[];
}

interface ItemProps {
  text: string;
  href: string;
}
interface keyable {
  [key: string]: any;
}

const FooterLink: React.FC<FooterLinkProps> = (props) => {
  const { title, items } = props;
  return (
    <div className="flex flex-col gap-6 max-sm:gap-2">
      <h3 className="font-bold">{title}</h3>
      {items.map((item, index) => {
        return <Item key={index} text={item.name} href={item.href} />;
      })}
    </div>
  );
};

const Item: React.FC<ItemProps> = (props) => {
  const { text, href } = props;
  return (
    <Link
      href={href}
      className="
        text-gray font-[400]
        hover:text-content transition"
    >
      {text}
    </Link>
  );
};

export default FooterLink;
