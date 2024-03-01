"use client";
import React, { useState } from "react";

interface CategoryItemProps {
  img: string;
  name: string;
  desc: string;
}

const CategoryItem: React.FC<CategoryItemProps> = (props) => {
  const { img, name, desc } = props;

  const [isHoverd, setIsHoverd] = useState(false);
  const handleHover = () => {
    setIsHoverd(true);
  };
  const handleNoHover = () => {
    setIsHoverd(false);
  };

  return (
    <div
      className="
        flex flex-col
        rounded-[16px]
        lg:hover:translate-y-[96px] max-lg:translate-y-[96px] transition duration-500"
      onMouseEnter={handleHover}
      onMouseLeave={handleNoHover}
    >
      <div>
        <div>
          <img className="mx-auto max-sm:w-48" src={img} alt="plants" />
        </div>
        <h3 className="font-bold text-tiny my-3">{name}</h3>
      </div>
      <div
        className={
          isHoverd
            ? "lg:opacity-1 transition duration-1000"
            : "lg:opacity-0 transition duration-500"
        }
      >
        <p className="text-gray md:text-tiny mb-6">{desc}</p>
        {/* <button className="
                        w-[147px] h-[51px]
                        rounded-[8px] bg-white
                        pr-[21px] mx-auto
                        md:text-tiny
                        hover:scale-110 transition duration-300">
                <img className="absolute ml-[100.5px] mt-[6px]" src="./icon/Next.svg" />
                    Explore
            </button> */}
      </div>
    </div>
  );
};

export default CategoryItem;
