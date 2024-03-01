import Link from "next/link";

interface PlantCardProps {
  image: string;
  name: string;
  price: number;
  href: string;
}

const PlantCard: React.FC<PlantCardProps> = (props) => {
  const { image, name, price, href } = props;
  return (
    <Link
      href={href}
      className="
        flex flex-col
        p-6 rounded-[16px]
        hover:brightness-[0.93] hover:bg-white hover:scale-105 transition duration-200
        max-sm:mx-auto max-sm:p-4"
    >
      <img
        className="max-w-[299.33px] max-h-[363px] max-md:w-48 max-sm:w-36"
        src={image}
        alt="plant"
      />
      <h3 className="mt-3 mb-[7px] md:text-tiny font-bold">{name}</h3>
      <span className="text-gray md:text-tiny">{price} đ</span>
    </Link>
  );
};

export default PlantCard;
